


/**
 * Denne fetchApi funksjonen er typesafe, fordi den bruker generics type T for erstatning av andre med krevende typer.
 * Jeg kan senere definere hva typen er mer spesifikt utenfor funksjonen. 
 * f.eks hvis jeg har en datatype som er MyDataType{
 * myString: string
 * myNumber: number
 * }
 * kan jeg assigne den til denne funksjonen senere som erstatning av generic T.
 * 
 * const myResults = await fetchApi<MyDataType>(someurl)
 * @param url URL til api
 * @returns json objektet ferdig parset. 
 */
const fetchApi = async <T>(url:string): Promise<T> =>{
    const response = await fetch(url)
        if (!response.ok){
            throw new Error("Network Request Failed")
        }
    const result: T = await response.json()
    return result
}