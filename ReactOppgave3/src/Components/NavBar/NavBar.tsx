import { NavBarProps } from "../../Types/Types"
import { Button } from "../Button/Button"
import { Logo } from "../Logo/Logo"
import Style from "./NavBar.module.css"

/**
 * navbar med logo og tre knapper. Jeg har ikke rukket å implementere Search History funksjonalitet, så det blir et utvidet prosjekt.
 * @param param0 
 * @returns 
 */
export const NavBar = ({homeBtnHandler, advancedSearchHandler}: NavBarProps) =>{
    return(
        <div className={Style.NavBar}>
            <Button buttonText={<Logo></Logo>} buttonType="none" onClick={homeBtnHandler}></Button>
            <div className={Style.NavButtonContainer}>
                <Button buttonText={"Home"} buttonType="Link" onClick={homeBtnHandler}></Button>
                <Button buttonText={"Advanced Search"} buttonType="Link" onClick={advancedSearchHandler}></Button>
                <Button buttonText={"Search History"} buttonType="Link" onClick={undefined}></Button>
            </div>
        </div>
    )
}