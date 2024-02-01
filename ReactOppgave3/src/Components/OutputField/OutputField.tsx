import { MouseEventHandler, useState } from "react"
import { Button } from "../Button/Button"
import Style from "./OutputField.module.css"


interface BedriftData {
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

interface OutputProps {
    data: BedriftData[]
    startHandlerFunction: MouseEventHandler | undefined
    nextHandlerFunction: MouseEventHandler | undefined
    prevHandlerFunction: MouseEventHandler | undefined
    endHandlerFunction: MouseEventHandler | undefined
}

/**
 * Displayer litt mer detaljert info om bedriften. Blir displayet i table når bruker trykker på navnet i table.
 * @param data 
 * @returns 
 */
const displayBedriftInfo = (data:BedriftData) =>{
        return (
            <div className={Style.BedriftsData}>
                <h2>{data.navn}</h2>
                <p>Om: {data.naeringskode1?.beskrivelse}</p>
                <p>Antall Ansatte: {data.antallAnsatte}</p>
                <p>Først registrert: {data.registreringsdatoEnhetsregisteret}</p>
                <p>Konkurs: {data.konkurs ? "Ja" : "Nei"}</p>
            </div>
        )
    }

/**
 * Displayer et enkelt table med organisasjonsnr og navn og postadresse. bruker kan trykke på navnet for å få opp mer info om bedrift.
 * @param param0 
 * @returns 
 */
export const OutputField = ({data, startHandlerFunction, prevHandlerFunction, nextHandlerFunction, endHandlerFunction}: OutputProps) =>{
    const [displayCurrentBedrift, setDisplay] = useState("")

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
        {data.map((entry:BedriftData)=>{
            return (
                <tr className={Style.ContentContainer} key={entry.organisasjonsnummer}>
                <td>{entry.organisasjonsnummer}</td>
                <td><Button buttonText={entry.navn} buttonType="none" onClick={()=>setDisplay(entry.organisasjonsnummer)}></Button>{displayCurrentBedrift === entry.organisasjonsnummer ? displayBedriftInfo(entry) : ""}</td>
                {/* HVORFOR HAR DE TO FORSKJELLIGE MÅTER Å LAGRE ADRESSEN PÅ????? */}
                <td>{entry.forretningsadresse?.landkode === "NO" ? `${entry.forretningsadresse.postnummer}/${entry.forretningsadresse.poststed}` : entry.forretningsadresse ? `${entry.forretningsadresse.land}/${entry.forretningsadresse.landkode}` : `${entry.postadresse?.land}/${entry.postadresse?.landkode}`}</td>
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