
import './App.css'
import { BasicSearch } from './Components/BasicSearch/BasicSearch'
import { Button } from './Components/Button/Button'
import { FilterContainer } from './Components/FilterContainer/FilterContainer'
import { NavBar } from './Components/NavBar/NavBar'
import { OutputField } from './Components/OutputField/OutputField'
import { useFetchApi } from './CustomHooks/fetchApi'
import { ChangeEvent, useState } from 'react'

export default function App() {

  const [name, setName] = useState<string|undefined>("")
  const [orgnr, setOrgNr] = useState<string|undefined>("")
  const [startdate, setStartDate] = useState<string|undefined>("")
  const [endDate, setEndDate] = useState<string|undefined>("")
  const [kommuneCode, setKommuneCode] = useState<string|undefined>("")
  const mainUrl = "https://data.brreg.no/enhetsregisteret/api/enheter?size=10"
  const [url, setUrl] = useState(mainUrl)
  const {data, error} = useFetchApi<any>(url, undefined)
  const sanitizeList = /[{!"£$#¤%&/()=?+´`}]/;

  const readInput = (event: ChangeEvent<HTMLInputElement>) =>{
    event.target.value === "" ? (setOrgNr(""), setName(""), setUrl(mainUrl)) : event.target.value
    let potInput = event.target.value
    if (potInput.length > 180) return
    let needClean = sanitizeList.test(potInput)
    needClean ? event.target.value = "" : parseInt(potInput) ? newOrgNr(event) : (setName(potInput), console.log("nytt navn: ", potInput), console.log(url))
    }

    const updateStartDate = (event: ChangeEvent<HTMLInputElement>) =>{
      setStartDate(event.target.value)
      console.log(startdate)
    }
    
    const updateEndDate = (event:ChangeEvent<HTMLInputElement>)=>{
      setEndDate(event.target.value)
      console.log(endDate)
    }

    const updateKommuneCode = (event:ChangeEvent<HTMLInputElement>)=>{
      setKommuneCode(event.target.value)
      console.log(kommuneCode)
    }
    const resetFilters=()=>{
      setName("")
      setEndDate("")
      setStartDate("")
      setKommuneCode("")
      setOrgNr("")
      setUrl(mainUrl)
    }
    const nextPageHandler = (data) =>{
      setUrl(data._links.next.href)
    }
    const firstPageHandler = (data) =>{
      setUrl(data._links.first.href)
    }
    const lastPageHandler = (data)=>{
      setUrl(data._links.last.href)
    }
    const prevPageHandler = (data)=>{
      console.log(data._links.prev)
      setUrl(data._links.prev.href)
    }

  const newOrgNr = (event: ChangeEvent<HTMLInputElement>)=>{
    let potOrgNr = event.target.value
    setOrgNr(potOrgNr)
    console.log("Nytt orgnr: ", potOrgNr)
    }
  
  const updateApiData = () =>{
    let addedName = name?  `&navn=${name}` : name
    let addedOrgNr = orgnr? `&organisasjonsnummer=${orgnr}` : orgnr
    let addedStartDate = startdate? `&fraStiftelsesdato=${startdate}` : startdate
    let addedEndDate = endDate? `&tilStiftelsesdato=${endDate}` : endDate
    let addedKommuneCode = kommuneCode? `&kommunenummer=${kommuneCode}` : kommuneCode
    console.log(mainUrl)
    let newUrl = `${mainUrl}${addedName ? addedName : ""}${addedOrgNr ? addedOrgNr : ""}${addedStartDate? addedStartDate: ""}${addedEndDate? addedEndDate: ""}${addedKommuneCode?addedKommuneCode:""}`
    console.log(newUrl)
    setUrl(newUrl)
    console.log("Clicked!")
  }
  console.log(data)

  return(
    <>
    <NavBar></NavBar>
    <BasicSearch onChangeInputField={readInput}></BasicSearch>
    <FilterContainer onClickReset={resetFilters} onClickSearch={updateApiData} onChangeHandlerDateTo={updateEndDate} onChangeHandlerDateFrom={updateStartDate} onChangeHandlerInputField={undefined} onSelectHandler={updateKommuneCode} SelectedKommune={kommuneCode}></FilterContainer>
    <Button buttonText="Test" buttonType='Filled' onClick={updateApiData}></Button>
    {data? <OutputField data={data._embedded.enheter} nextHandlerFunction={()=>nextPageHandler(data)} prevHandlerFunction={()=>prevPageHandler(data)} startHandlerFunction={()=>firstPageHandler(data)} endHandlerFunction={()=>lastPageHandler(data)}></OutputField> : ""}
    
    </>
  )
}
