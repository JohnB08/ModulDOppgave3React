
import { ButtonProps } from "../../Types/Types"
import Style from "./Button.module.css"


/**
 * Knapp, har tre forskjellige stylinger basert på bruk.
 * @param buttonType,  velger class basert på input
 * @returns 
 */
export const Button = ({buttonType, buttonText, onClick}: ButtonProps) =>{
    const classNames = ["button", buttonType]
    const adjustedClassNames = classNames.map(name=>{return Style[name]
    }).join(" ")
return (
    <button onClick={onClick} className={adjustedClassNames}>{buttonText}</button>
)
}