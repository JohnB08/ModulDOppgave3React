import { NavBarProps } from "../../Types/Types"
import { Button } from "../Button/Button"
import { Logo } from "../Logo/Logo"
import Style from "./NavBar.module.css"

/**
 * navbar med logo og tre knapper. Jeg har ikke rukket å implementere Search History funksjonalitet, så det blir et utvidet prosjekt.
 * @param param0 
 * @returns 
 */
export const NavBar = ({homeBtnHandler, advancedSearchHandler, searchHistoryHandler}: NavBarProps) =>{
    return(
        <div className={Style.NavBar}>
            <Button buttonText={<Logo></Logo>} buttonType="none" onClick={homeBtnHandler} value={""}></Button>
            <div className={Style.NavButtonContainer}>
                <Button buttonText={"Home"} buttonType="Link" onClick={homeBtnHandler} value={""}></Button>
                <Button buttonText={"Advanced Search"} buttonType="Link" onClick={advancedSearchHandler} value={""}></Button>
                <Button buttonText={"Search History"} buttonType="Link" onClick={searchHistoryHandler} value={""}></Button>
            </div>
        </div>
    )
}