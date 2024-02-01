import Style from "./Logo.module.css"
import mainLogo from "../../assets/BedriftsøkLogo.svg"


/**
 * Logo til bediftsøk
 * @returns img element med logo
 */
export const Logo = () =>{
    return(
        <img src={mainLogo} className={Style.mainLogo}></img>
    ) 
}