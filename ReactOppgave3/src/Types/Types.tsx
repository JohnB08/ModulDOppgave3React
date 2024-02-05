import { ChangeEventHandler, FormEventHandler, MouseEventHandler, ReactElement } from "react"


/* Dette er en liste over all datastruktur som blir brukt i koden. */

/**
 * Dette er strukturen for alle properties som BasicSearch trenger
 */
export interface BasicSearchProp{
    onChangeInputField: ChangeEventHandler | undefined,
    onClickHandler: MouseEventHandler | undefined
    inputError: {
        isError: boolean
        errorMessage: string|undefined
    }
}


/**
 * Dette er startstrukturen for LocalData, det som blir storet i localStorage
 */
export type LocalData = string[][]


/**
 * Dette er datastrukturen til knappecomponent.
 */
export interface ButtonProps {
    buttonType: "Filled" | "Link"| "none",
    buttonText: string | ReactElement,
    value: string
    onClick: MouseEventHandler | undefined
}

/**
 * Dette er dataStrukturen til Date component.
 */
export interface DateProps{
    toOrFrom: "to" | "from"
    onChangeFunction: ChangeEventHandler | undefined
}


/**
 * Dette er strukturen til hvordan hovedataen som kommer inn skal se ut.
 */
export interface MainData{
    _embedded: any
    _links: any
    page: any
  }


  /**
   * Dette er strukturen på hvordan errorMessage skal bli passed ned til input
   */
export type errorMessage = {
    isError: boolean
    errorMessage: string|undefined
  }


  /**
   * Dette er alle properties til filtersøk komponenten.
   */
export interface FilterProps{
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


/**
 * Dette er props for SearchHistory Component.
 */
export interface SearchHistoryProps{
    localData: LocalData
    onClickHandler: MouseEventHandler
}

/**
 * Dette er alle props til Input
 */
export interface InputProps{
    placeholder: string | undefined
    name: string | undefined
    onChangeFunction: ChangeEventHandler | undefined
    error: {
        isError: boolean
        errorMessage: string|undefined
    }
}


/**
 * Dette er props til Option Component
 */
export interface OptionProps{
    SelectedKommune: string | undefined
    onSelectChangeHandler: FormEventHandler | undefined
}


/**
 * Dette er alle props til NavBar
 */
export interface NavBarProps{
    homeBtnHandler: MouseEventHandler | undefined
    advancedSearchHandler: MouseEventHandler | undefined
    searchHistoryHandler: MouseEventHandler | undefined
}

/**
 * Dette er hvordan BedriftData skal være strukturert fra API.
 */
export interface BedriftData {
    antallAnsatte: number
    /* Det hadde holdt med kun forretningsadresse??? */
    forretningsadresse?: {
        adresse?: string[]
        kommune?: string
        land: string
        landkode: string
        postnummer?: string
        poststed?: string
    }
    /* Det at noen ekstremt få er lagret med postadresse i steden for
    med forretningsadresse føles ut som er gjort bare for hat. */
    postadresse?:{
        adresse: string[]
        land: string
        landkode: string
        poststed: string
    }
    institusjonellSektorkode: {
        beskrivelse: string
        kode: string
    }
    konkurs: boolean
    maalform: string
    naeringskode1?: {
        beskrivelse: string
        kode: string
    }
    navn: string
    organisasjonsform: {
        beskrivelse: string
        kode: string
        _links:{
            self: {
                href: string
            }
        }
    }
    organisasjonsnummer: string
    registreringsdatoEnhetsregisteret: string
    registrertIForetaksregisteret: boolean
    registrertIFrivillighetsregisteret: boolean
    registrertIMvaregisteret: boolean
    registrertIStiftelsesregisteret: boolean
    underAvvikling: boolean
    underTvangsavviklingEllerTvangsopplosning: boolean
    _links: {
        self: {
            href: string
        }
    }

}


/**
 * Dette er alle props som Output trenger.
 */
export interface OutputProps {
    data: BedriftData[]
    startHandlerFunction: MouseEventHandler | undefined
    nextHandlerFunction: MouseEventHandler | undefined
    prevHandlerFunction: MouseEventHandler | undefined
    endHandlerFunction: MouseEventHandler | undefined
}