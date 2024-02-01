import { ChangeEventHandler, FormEventHandler, MouseEventHandler, ReactElement } from "react"

export interface BasicSearchProp{
    onChangeInputField: ChangeEventHandler | undefined,
    onClickHandler: MouseEventHandler | undefined
    inputError: {
        isError: boolean
        errorMessage: string|undefined
    }
}

export interface ButtonProps {
    buttonType: "Filled" | "Link"| "none",
    buttonText: string | ReactElement,
    onClick: MouseEventHandler | undefined
}

export interface DateProps{
    toOrFrom: "to" | "from"
    onChangeFunction: ChangeEventHandler | undefined
}

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

export interface InputProps{
    placeholder: string | undefined
    name: string | undefined
    onChangeFunction: ChangeEventHandler | undefined
    error: {
        isError: boolean
        errorMessage: string|undefined
    }
}

export interface OptionProps{
    SelectedKommune: string | undefined
    onSelectChangeHandler: FormEventHandler | undefined
}

export interface NavBarProps{
    homeBtnHandler: MouseEventHandler | undefined
    advancedSearchHandler: MouseEventHandler | undefined
}

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

export interface OutputProps {
    data: BedriftData[]
    startHandlerFunction: MouseEventHandler | undefined
    nextHandlerFunction: MouseEventHandler | undefined
    prevHandlerFunction: MouseEventHandler | undefined
    endHandlerFunction: MouseEventHandler | undefined
}