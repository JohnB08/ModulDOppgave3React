import { ChangeEventHandler } from "react"
import Style from "./DateSelector.module.css"

interface DateProps{
    toOrFrom: "to" | "from"
    onChangeFunction: ChangeEventHandler | undefined
}

export const DateSelector = ({toOrFrom, onChangeFunction}: DateProps) =>{
    return(
    <label className={Style.InputLabel}> {(toOrFrom === "to") ? "Til StiftelsesDato: " : "Fra StiftelsesDato: "}
    <input className={Style.DateInput} type="Date" onChange={onChangeFunction} defaultValue={"1995-01-01"} min={"1995-01-01"}></input>
    </label>
    )
}