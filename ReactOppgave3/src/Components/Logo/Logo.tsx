import Style from "./Logo.module.css"
import mainLogo from "../../assets/BedriftsøkLogo.svg"

export const Logo = () =>{
    return(
        <img src={mainLogo} className={Style.mainLogo}></img>
    ) 
}