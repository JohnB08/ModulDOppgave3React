import fs from "node:fs"


const url = "https://data.ssb.no/api/klass/v1/versions/1710.json"
const filePath = "../src/Data/Kommuneliste.json"
const fetchApi = async(url) =>{
    const response = await fetch(url)
    const result = await response.json()
    return result
}


/**
 * Fetcher gjeldene kommuneliste fra ssb, separerer ut kommunenavn og kommunekode, sorterer de alfabetisk og lagrer de lokalt i en JSON fil.
 */
const fetchAndWrite = async() =>{
    const fetchedData = await fetchApi(url)
    const sanitizedData = []
    fetchedData.classificationItems.forEach(entry=>{
        const kommuneData = {
            name: entry.name,
            code: entry.code
        }
        sanitizedData.push(kommuneData)
    })
    const sortedData = sanitizedData.sort(function(a,b){return a.name.localeCompare(b.name)})
    fs.writeFileSync(filePath, JSON.stringify(sortedData))
}

await fetchAndWrite()