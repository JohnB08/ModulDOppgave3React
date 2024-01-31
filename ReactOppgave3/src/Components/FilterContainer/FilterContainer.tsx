import { ChangeEventHandler, FormEventHandler, MouseEventHandler } from "react"
import { Button } from "../Button/Button"
import { DateSelector } from "../DateSelector/DateSelector"
import { InputField } from "../InputField/InputField"
import { KommuneOption } from "../KommuneOption/KommuneOption"
import Style from "./FilterContainer.module.css"

interface FilterProps{
    onClickSearch: MouseEventHandler | undefined
    onClickReset: MouseEventHandler | undefined
    onChangeHandlerDateTo: ChangeEventHandler | undefined
    onChangeHandlerDateFrom: ChangeEventHandler | undefined
    onChangeHandlerInputField: ChangeEventHandler | undefined
    onSelectHandler: FormEventHandler | undefined
}


export const FilterContainer = ({onClickSearch, onClickReset, onChangeHandlerDateTo, onChangeHandlerDateFrom, onChangeHandlerInputField, onSelectHandler}: FilterProps) =>{
    return(
        <div className={Style.FilterContainer}>
            <h3>Avansert søk, med valgfri filtrering: </h3>
            <div className={Style.NameInputContainer}>
                <InputField placeholder="OrganisasjonsNavn..." name="Navn: " onChangeFunction={onChangeHandlerInputField}></InputField>
                <Button buttonType="Filled" buttonText={"Søk"} onClick={onClickSearch}></Button>
                <Button buttonType="Filled" buttonText={"Reset"} onClick={onClickReset}></Button>
            </div>
            <div className={Style.FilterInputs}>
                <KommuneOption onSelectChangeHandler={onSelectHandler}></KommuneOption>
                <DateSelector toOrFrom="from" onChangeFunction={onChangeHandlerDateFrom}></DateSelector>
                <DateSelector toOrFrom="to" onChangeFunction={onChangeHandlerDateTo}></DateSelector>
            </div>
            <div className={Style.OrgNrInputContainer}>
                <InputField placeholder="Organisasjonsnr..." name="OrgNr: " onChangeFunction={onChangeHandlerInputField}></InputField>
                <Button buttonType="Filled" buttonText={"Søk"} onClick={onClickSearch}></Button>
                <Button buttonType="Filled" buttonText={"Reset"} onClick={onClickReset}></Button>
            </div>
        </div>
    )
}