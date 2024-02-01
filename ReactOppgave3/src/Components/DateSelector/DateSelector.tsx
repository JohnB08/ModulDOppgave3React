import { ChangeEventHandler } from "react"
import Style from "./DateSelector.module.css"

interface DateProps{
    toOrFrom: "to" | "from"
    onChangeFunction: ChangeEventHandler | undefined
}

/**
 * Date selector. blir brukt for å sette fra eller til dato i query.
 * @param param0 
 * @returns 
 */
export const DateSelector = ({toOrFrom, onChangeFunction}: DateProps) =>{
    return(
    <label className={Style.InputLabel}> {(toOrFrom === "to") ? "Til StiftelsesDato: " : "Fra StiftelsesDato: "}
    <input className={Style.DateInput} type="Date" onChange={onChangeFunction} defaultValue={"1995-01-01"} min={"1995-01-01"}></input>
    </label>
    )
}