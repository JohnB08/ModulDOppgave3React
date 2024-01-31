import { ChangeEventHandler, FormEventHandler } from "react"
import { useFetchApi } from "../../customHooks/fetchApi"
import Style from "./KommuneOption.module.css"

interface KommuneData {
    changelogs: any[]
    classificationVariants: any[]   
    classificationItems: any[]
    contactPerson: {
        name: string
        email: string
        phone: string
    }
    correspondenceTables: any[]
    derivedFrom: string
    introduction: string
    lastModified: string
    legalBase: string
    levels: any[]
    name: string
    owningSection: string
    publications: string
    published: any[]
    validFrom: string
    _links: {
        self:{
            href: string
        }
    }
}

interface OptionProps{
    onSelectChangeHandler: FormEventHandler | undefined
}


export const KommuneOption = ({onSelectChangeHandler}: OptionProps) =>{
    const {data} = useFetchApi<KommuneData>("https://data.ssb.no/api/klass/v1/versions/1710.json", undefined)
        return(
        <>
        <label className={Style.SelectorLabel}> Velg Kommune:
        <select className={Style.Selector}>
            <option value="">--Velg Kommune--</option>
            {data ? data.classificationItems.map((entry, i)=>{
                return <option value={entry.code} onChange={onSelectChangeHandler} key={i}>{entry.name}</option>
            }) : null}
        </select>
        </label>
        </>
    )
}