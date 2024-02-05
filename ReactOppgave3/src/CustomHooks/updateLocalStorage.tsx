import { useEffect, useState } from "react"
import { LocalData } from "../Types/Types"


const emptyStringArray:LocalData = []

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


