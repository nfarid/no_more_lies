
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import {V4} from "./Calender";

export type Times = {id: V4, slot: Date}[];

export default function TimePicker({timeLst, setTimeSlot}: {timeLst: Times, setTimeSlot: React.Dispatch<React.SetStateAction<V4 | null>>}) : JSX.Element {
    
    const hourLst : Array<JSX.Element> = [];
    for(const time of timeLst)
        hourLst.push(<li key={time.id.toString()}><Button type="button" onClick={()=> setTimeSlot(time.id)}>{time.slot.getHours()}:{time.slot.getMinutes()}</Button></li>);

    return (<ul>
        {hourLst}
    </ul>);
}
