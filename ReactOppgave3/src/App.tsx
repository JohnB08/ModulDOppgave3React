
import './App.css'
import { BasicSearch } from './Components/BasicSearch/BasicSearch'
import { FilterContainer } from './Components/FilterContainer/FilterContainer'
import { NavBar } from './Components/NavBar/NavBar'
import { OutputField } from './Components/OutputField/OutputField'
import { useFetchApi } from './CustomHooks/fetchApi'
import { ChangeEvent, useState } from 'react'

export default function App() {


  interface MainData{
    _embedded: any
    _links: any
    page: any
  }

  const [name, setName] = useState<string|undefined>("")
  const [orgnr, setOrgNr] = useState<string|undefined>()
  const [startdate, setStartDate] = useState<string|undefined>("")
  const [endDate, setEndDate] = useState<string|undefined>("")
  const [kommuneCode, setKommuneCode] = useState<string|undefined>("")
  const [pageState, setPageState] = useState<string|undefined>("Home")
  const mainUrl = "https://data.brreg.no/enhetsregisteret/api/enheter?size=10"
  const [url, setUrl] = useState(mainUrl)
  const {data, error, isLoading} = useFetchApi<MainData>(url, undefined)
  const sanitizeList = /[{!"£$#¤%&/()=?+´`}]/;

  
  /**
   * Leser søkeinput på "home" og søker enten etter navn eller nr basert på hva bruker skriver inn. Mangler Error Tilbakemelding.
   * @param event oppdaterer etterhvert som bruker skriver basert på changeevent.
   * @returns kjører enten newOrgNr() eller setName() basert på input
   */
  const readInput = (event: ChangeEvent<HTMLInputElement>) =>{
    event.target.value === "" ? (setOrgNr(""), setName(""), setUrl(mainUrl)) : event.target.value
    let potInput = event.target.value
    if (potInput.length > 180) return
    let needClean = sanitizeList.test(potInput)
    needClean ? event.target.value = "" : parseInt(potInput) ? newOrgNr(event) : (setName(potInput), console.log("nytt navn: ", potInput), console.log(url))
  }

  /**
   * Oppdaterer name basert på inputfelt
   * @param event 
   */
  const newName = (event: ChangeEvent<HTMLInputElement>) =>{
    let potNewName = event.target.value
    let needClean = sanitizeList.test(potNewName)
    needClean ? event.target.value = "" : setName(potNewName)
  }
  /**
   * Oppdaterer orgnr basert på inputfelt
   * @param event 
   */
  const newOrgNr = (event: ChangeEvent<HTMLInputElement>)=>{
  let potOrgNr = event.target.value
  potOrgNr.length === 9 ? setOrgNr(potOrgNr) : null
  console.log("Nytt orgnr: ", potOrgNr)
  }

  /**
   * oppdaterer startdato søkeparameter basert på datoinput
   * @param event 
   */
  const updateStartDate = (event: ChangeEvent<HTMLInputElement>) =>{
      setStartDate(event.target.value)
      console.log(startdate)
    }

  /**
   * oppdaterer sluttdato søkeparameter basert på datoinput
   * @param event 
   */
  const updateEndDate = (event:ChangeEvent<HTMLInputElement>)=>{
      setEndDate(event.target.value)
      console.log(endDate)
    }

  /**
   * oppdaterer kommunekode basert på dropdown value
   * @param event 
   */
  const updateKommuneCode = (event:ChangeEvent<HTMLInputElement>)=>{
      setKommuneCode(event.target.value)
      console.log(kommuneCode)
    }


  /**
   * resetter alle søkeparametere.
   */
  const resetFilters=()=>{
      setName("")
      setEndDate("")
      setStartDate("")
      setKommuneCode("")
      setOrgNr("")
      setUrl(mainUrl)
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
    
  /**
   * oppdaterer url med queries
   */
const updateApiData = () =>{
    let addedName = name?  `&navn=${name}` : name
    let addedOrgNr = orgnr? `&organisasjonsnummer=${orgnr}` : orgnr
    let addedStartDate = startdate? `&fraStiftelsesdato=${startdate}` : startdate
    let addedEndDate = endDate? `&tilStiftelsesdato=${endDate}` : endDate
    let addedKommuneCode = kommuneCode? `&kommunenummer=${kommuneCode}` : kommuneCode
    let newUrl = `${mainUrl}${addedName ? addedName : ""}${addedOrgNr ? addedOrgNr : ""}${addedStartDate? addedStartDate: ""}${addedEndDate? addedEndDate: ""}${addedKommuneCode?addedKommuneCode:""}`
    setUrl(newUrl)
  }
  console.log(data)

  return(
    <>
    <NavBar homeBtnHandler={setHome} advancedSearchHandler={setAdvanced}></NavBar>
    {pageState === "Home" ? <BasicSearch onChangeInputField={readInput} onClickHandler={updateApiData}></BasicSearch> : ""}
    {pageState === "Advanced" ? <FilterContainer onClickReset={resetFilters} onClickSearch={updateApiData} onChangeHandlerDateTo={updateEndDate} onChangeHandlerDateFrom={updateStartDate} onChangeHandlerInputFieldName={newName} onChangeHandlerInputFieldOrgNr={newOrgNr} onSelectHandler={updateKommuneCode} SelectedKommune={kommuneCode}></FilterContainer> : ""}
    {isLoading? "" : error? {error} : data?._embedded ? <OutputField data={data._embedded.enheter} nextHandlerFunction={()=>nextPageHandler(data)} prevHandlerFunction={()=>prevPageHandler(data)} startHandlerFunction={()=>firstPageHandler(data)} endHandlerFunction={()=>lastPageHandler(data)}></OutputField> : <p>Ingen Resultat</p>}
    
    </>
  )
}
