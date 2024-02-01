import { useEffect, useState } from "react"

interface ApiResponse<T>{
    data: T|null
    error: any;
}
const mainUrl = "https://data.brreg.no/enhetsregisteret/api/enheter?size=10"
/**
 * Denne "react Hooken" vil kunne oppdatere data dependency etter en api call, og jeg kan bruke den til å sette f.eks en loading 
 * @param url URL til api, er brukt som en dependancy i useEffect via arrayet i bunn sånn at useEffect kun kjører når url endrer seg.
 *
 * @returns et array med data og evt. errors som kan destruktureres og brukes.
 * 
 */
export function useFetchApi<T>(url: string, options: any): ApiResponse<T>{
    const [data, setData] = useState<T|null>(null)
    const [error, setError] = useState<any>(null)

    useEffect(()=>{
        const fetchApi = async()=>{
            if (url === mainUrl) return
            try{
            const response = options ? await fetch(url, options) : await fetch(url)
            const result = await response.json()
            setData(result)
            } catch (error){
                setError("Couldn't fetch data")
            }
        }
        fetchApi();
    }, [url])
    return {data, error}
}