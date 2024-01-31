
import './App.css'
import { BasicSearch } from './Components/BasicSearch/BasicSearch'
import { Button } from './Components/Button/Button'
import { FilterContainer } from './Components/FilterContainer/FilterContainer'
import { NavBar } from './Components/NavBar/NavBar'
import { useFetchApi } from './customHooks/fetchApi'
import { SetStateAction, useState } from 'react'

function App() {

  const [name, setName] = useState("")
  const [orgnr, setOrgNr] = useState("")
  const [startdate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const mainUrl = "https://data.brreg.no/enhetsregisteret/api/enheter?size=10"
  const [url, setUrl] = useState(mainUrl)
  const {data, error} = useFetchApi<any>(url, undefined)
  const sanitizeList = /[{!"@£$#¤%&/()=?+´`}]/;

  const readInput = (event) =>{
    event.target.value === "" ? (setOrgNr(""), setName("")) : event.target.value
    let potInput = event.target.value
    if (potInput.length > 180) return
    let needClean = sanitizeList.test(potInput)
    needClean ? event.target.value = "" : parseInt(potInput) ? newOrgNr(event) : (setName(potInput), console.log("nytt navn: ", potInput), console.log(url))
    }

    const updateStartDate = (event) =>{
      setStartDate(event.target.value)
      console.log(startdate)
    }
    
    const updateEndDate = (event)=>{
      setEndDate(event.target.value)
      console.log(endDate)
    }

  const newOrgNr = (event)=>{
    let potOrgNr = event.target.value
    setOrgNr(potOrgNr)
    console.log("Nytt orgnr: ", potOrgNr)
    }
  
  const updateApiData = () =>{
    let addedName = name?  `&navn=${name}` : name
    let addedOrgNr = orgnr? `&organisasjonsnummer=${orgnr}` : orgnr
    let addedStartDate = startdate? `&fraStiftelsesdato=${startdate}` : startdate
    let addedEndDate = endDate? `&tilStiftelsesdato=${endDate}` : endDate
    console.log(mainUrl)
    let newUrl = `${mainUrl}${addedName ? addedName : ""}${addedOrgNr ? addedOrgNr : ""}${addedStartDate? addedStartDate: ""}${addedEndDate? addedEndDate: ""}`
    console.log(newUrl)
    setUrl(newUrl)
    console.log("Clicked!")
  }
  console.log(data)

  return(
    <>
    <NavBar></NavBar>
    <BasicSearch onChangeInputField={readInput}></BasicSearch>
    <FilterContainer onClickReset={undefined} onClickSearch={updateApiData} onChangeHandlerDateTo={updateEndDate} onChangeHandlerDateFrom={updateStartDate} onChangeHandlerInputField={undefined} onSelectHandler={undefined}></FilterContainer>
    <Button buttonText="Test" buttonType='Filled' onClick={updateApiData}></Button>
    </>
  )
}

export default App
