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
    onChangeHandlerInputFieldName: ChangeEventHandler | undefined
    onChangeHandlerInputFieldOrgNr: ChangeEventHandler | undefined
    onSelectHandler: FormEventHandler | undefined
    SelectedKommune: string | undefined
    nameInputError: {
        isError: boolean
        errorMessage: string | undefined
    }
      orgInputError: {
        isError: boolean
        errorMessage: string | undefined
    }
}


export const FilterContainer = ({onClickSearch, onClickReset, onChangeHandlerDateTo, onChangeHandlerDateFrom, onChangeHandlerInputFieldName, onChangeHandlerInputFieldOrgNr,  onSelectHandler, SelectedKommune, nameInputError, orgInputError}: FilterProps) =>{
    return(
        <div className={Style.FilterContainer}>
            <h3>Avansert søk, med valgfri filtrering: </h3>
            <div className={Style.NameInputContainer}>
                <InputField placeholder="OrganisasjonsNavn..." name="Navn: " onChangeFunction={onChangeHandlerInputFieldName} error={nameInputError}></InputField>
                <Button buttonType="Filled" buttonText={"Søk"} onClick={onClickSearch}></Button>
                <Button buttonType="Filled" buttonText={"Reset"} onClick={onClickReset}></Button>
            </div>
            <div className={Style.FilterInputs}>
                <KommuneOption onSelectChangeHandler={onSelectHandler} SelectedKommune={SelectedKommune}></KommuneOption>
                <DateSelector toOrFrom="from" onChangeFunction={onChangeHandlerDateFrom}></DateSelector>
                <DateSelector toOrFrom="to" onChangeFunction={onChangeHandlerDateTo}></DateSelector>
            </div>
            <div className={Style.OrgNrInputContainer}>
                <InputField placeholder="Organisasjonsnr..." name="OrgNr: " onChangeFunction={onChangeHandlerInputFieldOrgNr} error={orgInputError}></InputField>
                <Button buttonType="Filled" buttonText={"Søk"} onClick={onClickSearch}></Button>
                <Button buttonType="Filled" buttonText={"Reset"} onClick={onClickReset}></Button>
            </div>
        </div>
    )
}