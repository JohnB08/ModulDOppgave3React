
import './App.css'
import { errorMessage, LocalData, MainData} from './Types/Types'
import { BasicSearch } from './Components/BasicSearch/BasicSearch'
import { FilterContainer } from './Components/FilterContainer/FilterContainer'
import { NavBar } from './Components/NavBar/NavBar'
import { OutputField } from './Components/OutputField/OutputField'
import { useFetchApi } from './CustomHooks/fetchApi'
import { ChangeEvent, MouseEvent, useState } from 'react'
import { needClean } from './Util/Util.tsx'
import { SearchHistory } from './Components/SearchHistory/SearchHistory.tsx'
import { updateLocalStorage } from './CustomHooks/updateLocalStorage.tsx'

export default function App() {


  const emptyError: errorMessage = {isError: false, errorMessage: ""}
  const localStorageData = localStorage.getItem("bedriftSøkSearchHistory") ? localStorage.getItem("bedriftSøkSearchHistory") : null
  const emptyStringArray: LocalData = []
  const parsedData: LocalData = localStorageData ? JSON.parse(localStorageData) : emptyStringArray
  const [name, setName] = useState<string|undefined>("")
  const [orgnr, setOrgNr] = useState<string|undefined>()
  const [startdate, setStartDate] = useState<string|undefined>("")
  const [endDate, setEndDate] = useState<string|undefined>("")
  const [kommuneCode, setKommuneCode] = useState<string|undefined>("")
  const [pageState, setPageState] = useState<string|undefined>("Home")
  const [inputError, setInputError] = useState<errorMessage>(emptyError)
  const [nameInputError, setNameInputError] = useState<errorMessage>(emptyError)
  const [orgInputError, setOrgInputError] = useState<errorMessage>(emptyError)
  const mainUrl = "https://data.brreg.no/enhetsregisteret/api/enheter?size=10"
  const [currentLocalData, setCurrentLocalData] = useState(parsedData)
  const [url, setUrl] = useState(mainUrl)
  const {data, error, isLoading} = useFetchApi<MainData>(url, undefined)
  const [localData] = updateLocalStorage(currentLocalData)


    /**
   * resetter alle søkeparametere.
   */
  const resetFilters=()=>{
      setName("")
      setEndDate("")
      setStartDate("")
      setKommuneCode("")
      setOrgNr("")
      pageState === "Home" ? setInputError({isError: false, errorMessage: ""}) : (setNameInputError({isError: false, errorMessage: ""}), setOrgInputError({isError: false, errorMessage: ""}))
      setUrl(mainUrl)
    }

  
  /**
   * Leser søkeinput på "home" og søker enten etter navn eller nr basert på hva bruker skriver inn. Mangler Error Tilbakemelding.
   * @param event oppdaterer etterhvert som bruker skriver basert på changeevent.
   * @returns kjører enten newOrgNr() eller setName() basert på input
   */
  const readInput = (event: ChangeEvent<HTMLInputElement>) =>{
    event.target.value === "" ? resetFilters() : event.target.value
    let potInput = event.target.value
    if (potInput.length > 180) return
    needClean(potInput) ? setInputError({isError: true, errorMessage: "Contains illegal Characters"}) : parseInt(potInput) ? newOrgNr(event) : (setName(potInput), setInputError(emptyError))
  }

  /**
   * Oppdaterer name basert på inputfelt i advanced
   * @param event 
   */
  const newName = (event: ChangeEvent<HTMLInputElement>) =>{
    let potNewName = event.target.value
    needClean(potNewName) ? setNameInputError({isError: true, errorMessage: "Contains illegal Characters"}) : (setName(potNewName), setNameInputError(emptyError))
  }
  /**
   * Oppdaterer orgnr basert på inputfelt i advanced eller home
   * @param event 
   */
  const newOrgNr = (event: ChangeEvent<HTMLInputElement>)=>{
  let potOrgNr = event.target.value
  if (pageState === "Home")
  {
    potOrgNr.length === 9 ? (setOrgNr(potOrgNr), setInputError(emptyError) ): setInputError({isError: true, errorMessage: "Make sure OrgNr is exacly 9 numbers long"})
  } else {
    potOrgNr.length === 9 ? (setOrgNr(potOrgNr), setOrgInputError(emptyError) ): setOrgInputError({isError: true, errorMessage: "Make sure OrgNr is exacly 9 numbers long"})
  }
  }

  /**
   * oppdaterer startdato søkeparameter basert på datoinput
   * @param event 
   */
  const updateStartDate = (event: ChangeEvent<HTMLInputElement>) =>{
      setStartDate(event.target.value)
    }

  /**
   * oppdaterer sluttdato søkeparameter basert på datoinput
   * @param event 
   */
  const updateEndDate = (event:ChangeEvent<HTMLInputElement>)=>{
      setEndDate(event.target.value)
    }

  /**
   * oppdaterer kommunekode basert på dropdown value
   * @param event 
   */
  const updateKommuneCode = (event:ChangeEvent<HTMLInputElement>)=>{
      setKommuneCode(event.target.value)
    }


    /**
     * Funksjon som oppdaterer url til value til knappen som blir trykt. 
     * her må jeg definere event target som en HTMLButtonElement type for at .value skal bli godkjent. 
     * @param event 
     */
  const updateUrlHistory = (event:MouseEvent) =>{
    const button = event.target as HTMLButtonElement
    setUrl(button.value)
  }


  /**
   * Går til neste side hvis det er flere sider å vise.
   * @param data 
   */
  const nextPageHandler = (data:MainData | null) =>{
      data? setUrl(data._links.next.href) : null
    }

  /**
   * Går tilbake til første side hvis første side er tilgjengelig.
   * @param data 
   */
  const firstPageHandler = (data:MainData | null) =>{
      data ? setUrl(data._links.first.href) : null
    }

  /**
   * Går til siste side hvis siste side er tilgjengelig.
   * @param data 
   */
  const lastPageHandler = (data:MainData | null)=>{
      data ? setUrl(data._links.last.href) : null
    }

  /**
   * Går til forrige side hvis forrige side er tilgjengelig.
   * @param data 
   */
  const prevPageHandler = (data:MainData | null)=>{
      data? setUrl(data._links.prev.href) : null
    }

  /**
   * setter pagestate til "home"
   */
  const setHome = () =>{
      setPageState("Home")
    }

  /**
   * setter pagestate til "advanced"
   */
  const setAdvanced = () =>{
      setPageState("Advanced")
    }

  const setSearch = () =>{
    setPageState("SearchHistory")
  }

/**
 * Funksjon for å håndtere søkehistorikk i local storage. Storer kun 5 values. 
 * @param url 
 */
  const localStorageHandler = (url: string)=>{
    localData.length >= 5 ? localData.shift() : localData
    localData.push([orgnr? orgnr : "", name? name : startdate ? startdate : "", url, new Date().toDateString()])
    console.log(localData)
    setCurrentLocalData(localData)
    
  }
    
  /**
   * oppdaterer url med queries.
   * Har jeg tid vil jeg heller gjøre dette med queries.
   */
const updateApiData = () =>{
    let addedName = name?  `&navn=${name}` : name
    let addedOrgNr = orgnr? `&organisasjonsnummer=${orgnr}` : orgnr
    let addedStartDate = startdate? `&fraStiftelsesdato=${startdate}` : startdate
    let addedEndDate = endDate? `&tilStiftelsesdato=${endDate}` : endDate
    let addedKommuneCode = kommuneCode? `&kommunenummer=${kommuneCode}` : kommuneCode
    let newUrl = `${mainUrl}${addedName ? addedName : ""}${addedOrgNr ? addedOrgNr : ""}${addedStartDate? addedStartDate: ""}${addedEndDate? addedEndDate: ""}${addedKommuneCode?addedKommuneCode:""}`
    setUrl(newUrl)
    localStorageHandler(newUrl)
  }

  return(
    <>
    <NavBar homeBtnHandler={setHome} advancedSearchHandler={setAdvanced} searchHistoryHandler={setSearch}></NavBar>
    {pageState === "Home" ? <BasicSearch onChangeInputField={readInput} onClickHandler={updateApiData} inputError={inputError}></BasicSearch> : ""}
    {pageState === "Advanced" ? <FilterContainer onClickReset={resetFilters} onClickSearch={updateApiData} onChangeHandlerDateTo={updateEndDate} onChangeHandlerDateFrom={updateStartDate} onChangeHandlerInputFieldName={newName} onChangeHandlerInputFieldOrgNr={newOrgNr} onSelectHandler={updateKommuneCode} SelectedKommune={kommuneCode} nameInputError={nameInputError} orgInputError={orgInputError}></FilterContainer> : ""}
    {pageState === "SearchHistory" ? <SearchHistory localData={localData} onClickHandler={updateUrlHistory}></SearchHistory> : ""}
    {isLoading? "" : error? {error} : data?._embedded ? <OutputField data={data._embedded.enheter} nextHandlerFunction={()=>nextPageHandler(data)} prevHandlerFunction={()=>prevPageHandler(data)} startHandlerFunction={()=>firstPageHandler(data)} endHandlerFunction={()=>lastPageHandler(data)}></OutputField> : <p>Ingen Resultat</p>}
    
    </>
  )
}
