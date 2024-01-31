import { ChangeEventHandler } from "react"
import { InputField } from "../InputField/InputField"
import Style from "./BasicSearch.module.css"



interface BasicSearchProp{
    onChangeInputField: ChangeEventHandler | undefined
}

export const BasicSearch = ({onChangeInputField}: BasicSearchProp)=>{
    return(
        <>
        <div className={Style.BasicSearch}>
        <h3>Enkelt søk med Organisasjonsnavn, eller Organisasjonsnr: </h3>
        <InputField placeholder="Navn eller Nr..." name="Navn eller OrgNr: " onChangeFunction={onChangeInputField}></InputField>
        </div>
        </>
    )
}