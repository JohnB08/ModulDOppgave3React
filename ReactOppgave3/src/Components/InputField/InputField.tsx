import { ChangeEventHandler } from "react"
import Style from "./inputField.module.css"

interface InputProps{
    placeholder: string | undefined
    name: string | undefined
    onChangeFunction: ChangeEventHandler | undefined
    error: {
        isError: boolean
        errorMessage: string|undefined
    }
}

export const InputField = ({placeholder = undefined, name = undefined, onChangeFunction, error = {isError: false, errorMessage: undefined}}:InputProps) =>{

    return(
        <>
        <label className={[Style.InputLabel, error.isError ? Style.errorClass : ""].join(" ")}>{error.isError ? error.errorMessage : name}
        <input className={Style.InputField} type="text" placeholder={placeholder} defaultValue={""} onChange={onChangeFunction}></input>
        </label>
        </>
    )
}