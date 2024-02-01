import { InputProps } from "../../Types/Types"
import Style from "./inputField.module.css"




/**
 * En inputfield som blir brukt både for nummer og tall. Sterilisering av data blir gjort av onchangefunction og error.
 * @param param0 
 * @returns 
 */
export const InputField = ({placeholder = undefined, name = undefined, onChangeFunction, error = {isError: false, errorMessage: undefined}}:InputProps) =>{

    return(
        <>
        <label className={[Style.InputLabel, error.isError ? Style.errorClass : ""].join(" ")}>{error.isError ? error.errorMessage : name}
        <input className={Style.InputField} type="text" placeholder={placeholder} defaultValue={""} onChange={onChangeFunction}></input>
        </label>
        </>
    )
}