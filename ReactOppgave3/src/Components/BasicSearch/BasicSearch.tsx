import { ChangeEventHandler, MouseEventHandler } from "react"
import { InputField } from "../InputField/InputField"
import Style from "./BasicSearch.module.css"
import { Button } from "../Button/Button"



interface BasicSearchProp{
    onChangeInputField: ChangeEventHandler | undefined,
    onClickHandler: MouseEventHandler | undefined
}

export const BasicSearch = ({onChangeInputField, onClickHandler}: BasicSearchProp)=>{
    return(
        <>
        <div className={Style.BasicSearch}>
        <h3>Enkelt søk med Organisasjonsnavn, eller Organisasjonsnr: </h3>
        <div className={Style.SearchContainer}>
        <InputField placeholder="Navn eller Nr..." name="Navn eller OrgNr: " onChangeFunction={onChangeInputField}></InputField>
        <Button buttonText="Søk" buttonType="Filled" onClick={onClickHandler}></Button>
        </div>
        </div>
        </>
    )
}