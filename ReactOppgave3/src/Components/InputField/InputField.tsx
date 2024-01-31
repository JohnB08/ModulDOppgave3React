import { ChangeEventHandler } from "react"
import Style from "./inputField.module.css"

interface InputProps{
    placeholder: string | undefined
    name: string | undefined
    onChangeFunction: ChangeEventHandler | undefined
}

export const InputField = ({placeholder = undefined, name = undefined, onChangeFunction}:InputProps) =>{
    return(
        <>
        <label className={Style.InputLabel}>{name}
        <input className={Style.InputField} type="text" placeholder={placeholder} defaultValue={""} onChange={onChangeFunction}></input>
        </label>
        </>
    )
}