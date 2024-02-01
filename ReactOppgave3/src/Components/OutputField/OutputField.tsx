import { MouseEventHandler } from "react"
import { Button } from "../Button/Button"
import Style from "./OutputField.module.css"


interface BedriftData {
    antallAnsatte: number
    forretningsadresse: {
        adresse: string[]
        kommune: string
        land: string
        landkode: string
        postnummer: string
        poststed: string
    }
    institusjonellSektorkode: {
        beskrivelse: string
        kode: string
    }
    konkurs: boolean
    maalform: string
    naeringskode1: {
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
    registreringsdatoHenhetsregisteret: string
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

interface OutputProps {
    data: BedriftData[]
    startHandlerFunction: MouseEventHandler | undefined
    nextHandlerFunction: MouseEventHandler | undefined
    prevHandlerFunction: MouseEventHandler | undefined
    endHandlerFunction: MouseEventHandler | undefined
}


export const OutputField = ({data, startHandlerFunction, prevHandlerFunction, nextHandlerFunction, endHandlerFunction}: OutputProps) =>{
    return (
        <>
    <table className={Style.ContentTable}>
        <tr className={Style.ContentContainer}>
            <th>
                Organisasjonsnummer: 
            </th>
            <th>
                OrganisasjonsNavn: 
            </th>
            <th>
                PostNummer/PostSted: 
            </th>
        </tr>
        {data.map((entry:BedriftData, i)=>{
            return (
                <tr className={Style.ContentContainer} key={i}>
                <td>{entry.organisasjonsnummer}</td>
                <td>{entry.navn}</td>
                <td>{entry.forretningsadresse.postnummer}/{entry.forretningsadresse.poststed}</td>
                </tr>
            )
        })}
    </table>
    <div className={Style.ButtonContainer}>
        <div className={Style.StartAndPrev}>
            <Button buttonText="Start" buttonType="Filled" onClick={startHandlerFunction}></Button>
            <Button buttonText="Prev" buttonType="Filled" onClick={prevHandlerFunction}></Button>
        </div>
        <div className={Style.NextAndEnd}>
            <Button buttonText="next" buttonType="Filled" onClick={nextHandlerFunction}></Button>
            <Button buttonText="End" buttonType="Filled" onClick={endHandlerFunction}></Button>
        </div>
    </div>
    </>
    )
}