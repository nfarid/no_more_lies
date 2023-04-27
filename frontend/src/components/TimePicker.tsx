
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import {V4, Times} from "./types";
import { useState } from "react";


export default function TimePicker({timeLst, setTimeSlot}: {timeLst: Times, setTimeSlot: React.Dispatch<React.SetStateAction<V4 | null>>}) : JSX.Element {
    const [pickedTime, setPickedTime] = useState<typeof timeLst[0] | null>(null);


    const hourLst : Array<JSX.Element> = [];
    for(const time of timeLst) {
        const variant = pickedTime === time ? "primary" : "light";
        const key = time.id.toString();
        const formattedTime = String(time.slot.getHours() ).padStart(2,"0") + ":" + String(time.slot.getMinutes() ).padStart(2,"0");
        const onClick = ()=> {setTimeSlot(time.id); setPickedTime(time);};
        hourLst.push(<li key={key}><Button type="button" variant={variant} onClick={onClick}>{formattedTime}</Button></li>);
    }

    return (<ul style={{listStyleType: "none"}}>
        {hourLst}
    </ul>);
}
