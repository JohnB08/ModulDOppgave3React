
import { JSXElementConstructor, ReactElement } from "react"
import Style from "./Button.module.css"


interface ButtonProps {
    buttonType: "Filled" | "Link",
    buttonText: string | ReactElement,
    onClick: Function | undefined
}

/**
 * 
 * @param buttonType,  velger class basert på input
 * @returns 
 */
export const Button = ({buttonType, buttonText, onClick}: ButtonProps) =>{
    const classNames = ["button", buttonType]
    const adjustedClassNames = classNames.map(name=>{return Style[name]
    }).join(" ")
    console.log(adjustedClassNames)
return (
    <button onClick={()=>onClick} className={adjustedClassNames}>{buttonText}</button>
)
}