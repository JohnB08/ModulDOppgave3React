import { Button } from "../Button/Button"
import { Logo } from "../Logo/Logo"
import Style from "./NavBar.module.css"

export const NavBar = () =>{
    return(
        <div className={Style.NavBar}>
            <Button buttonText={<Logo></Logo>} buttonType="none" onClick={undefined}></Button>
            <div className={Style.NavButtonContainer}>
                <Button buttonText={"Home"} buttonType="Link" onClick={undefined}></Button>
                <Button buttonText={"Advanced Search"} buttonType="Link" onClick={undefined}></Button>
                <Button buttonText={"Search History"} buttonType="Link" onClick={undefined}></Button>
            </div>
        </div>
    )
}