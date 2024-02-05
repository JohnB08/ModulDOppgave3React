import { SearchHistoryProps } from "../../Types/Types"
import { Button } from "../Button/Button"

export const SearchHistory = ({localData, onClickHandler}: SearchHistoryProps) =>{
      return(
        <ul>
            {localData.map((data)=>{
                return(
                    <li key={data[2]}>
                        <Button buttonText={data[1] ? data[1] : "Ingen Navn Brukt"} buttonType="none" value={data[2]} onClick={onClickHandler}></Button>
                        <p>{data[3]}</p>
                    </li>
                )
            })}
        </ul>
    )
}