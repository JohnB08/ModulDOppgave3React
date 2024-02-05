import { useEffect, useState } from "react"
import { LocalData } from "../Types/Types"


const emptyStringArray:LocalData = []


/**
 * Dette er en funksjon for å oppdatere LocalStorage med de siste søkene gjort.
 * @param stringArray 
 * @returns 
 */
export const updateLocalStorage=(stringArray:string[][])=>{
    const [localData, setLocalData] = useState<string[][]>(emptyStringArray)
    useEffect(()=>{
        const storeLocalStorage = () =>{
            if (Array.isArray(stringArray) && stringArray.length > 0){
                localStorage.setItem("bedriftSøkSearchHistory", JSON.stringify(stringArray))
                setLocalData(stringArray)
            }
}
storeLocalStorage()
}, [stringArray])
return [localData]
}


