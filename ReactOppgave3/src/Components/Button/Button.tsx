
import {  MouseEventHandler, ReactElement } from "react"
import Style from "./Button.module.css"


interface ButtonProps {
    buttonType: "Filled" | "Link"| "none",
    buttonText: string | ReactElement,
    onClick: MouseEventHandler | undefined
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
return (
    <button onClick={onClick} className={adjustedClassNames}>{buttonText}</button>
)
}