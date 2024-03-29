import { OptionProps } from "../../Types/Types"
/* Valgte å bruke en json fil her, for denne endres kun årlig.
synes det da er bedre å ha den statisk tilgjengelig, enn at client skal fetche fra ssb api hver gang. */
import data from "../../Data/Kommuneliste.json"
import Style from "./KommuneOption.module.css"




/**
 * Dropdown med kommunenavn i alfabetisk rekkefølge, hver option har en value tilsvarende kommunekoden.
 * @param param0 
 * @returns 
 */
export const KommuneOption = ({onSelectChangeHandler, SelectedKommune}: OptionProps) =>{
        return(
        <>
        <label className={Style.SelectorLabel}> Velg Kommune:
        <select className={Style.Selector} value={SelectedKommune} onChange={onSelectChangeHandler}>
            <option value="">--Velg Kommune--</option>
            {data ? data.map((entry, i)=>{
                return <option value={entry.code} key={i}>{entry.name}</option>
            }) : null}
        </select>
        </label>
        </>
    )
}