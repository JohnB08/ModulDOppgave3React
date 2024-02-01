import {FormEventHandler} from "react"
import data from "../../Data/Kommuneliste.json"
import Style from "./KommuneOption.module.css"


interface OptionProps{
    SelectedKommune: string | undefined
    onSelectChangeHandler: FormEventHandler | undefined
}


export const KommuneOption = ({onSelectChangeHandler, SelectedKommune}: OptionProps) =>{
        return(
        <>
        <label className={Style.SelectorLabel}> Velg Kommune:
        <select className={Style.Selector} value={SelectedKommune} onChange={onSelectChangeHandler}>
            <option value="">--Velg Kommune--</option>
            {data ? data.classificationItems.map((entry, i)=>{
                return <option value={entry.code} key={i}>{entry.name}</option>
            }) : null}
        </select>
        </label>
        </>
    )
}