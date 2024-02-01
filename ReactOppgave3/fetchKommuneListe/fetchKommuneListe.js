import fs from "node:fs"


const url = "https://data.ssb.no/api/klass/v1/versions/1710.json"
const filePath = "../src/Data/Kommuneliste.json"
const fetchApi = async(url) =>{
    const response = await fetch(url)
    const result = await response.json()
    return result
}

const fetchAndWrite = async() =>{
    const fetchedData = await fetchApi(url)
    fs.writeFileSync(filePath, JSON.stringify(fetchedData))
}

await fetchAndWrite()