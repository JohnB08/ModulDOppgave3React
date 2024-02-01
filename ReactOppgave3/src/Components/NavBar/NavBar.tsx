import { MouseEventHandler } from "react"
import { Button } from "../Button/Button"
import { Logo } from "../Logo/Logo"
import Style from "./NavBar.module.css"


interface NavBarProps{
    homeBtnHandler: MouseEventHandler | undefined
    advancedSearchHandler: MouseEventHandler | undefined
}

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