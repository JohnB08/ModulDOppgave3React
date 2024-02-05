import { BasicSearchProp } from "../../Types/Types"
import { InputField } from "../InputField/InputField"
import Style from "./BasicSearch.module.css"
import { Button } from "../Button/Button"





/**
 * Home page basic search. Har kun input og søke knapp. 
 * @param param0 
 * @returns 
 */
export const BasicSearch = ({onChangeInputField, onClickHandler, inputError}: BasicSearchProp)=>{
    return(
        <>
        <h1>Søk på bedrifter nær deg!</h1>
        <div className={Style.BasicSearch}>
        <h3>Enkelt søk med Organisasjonsnavn, eller Organisasjonsnr: </h3>
        <div className={Style.SearchContainer}>
        <InputField placeholder="Navn eller Nr..." name="Navn eller OrgNr: " onChangeFunction={onChangeInputField} error={inputError}></InputField>
        <Button buttonText="Søk" buttonType="Filled" onClick={onClickHandler} value=""></Button>
        </div>
        </div>
        </>
    )
}