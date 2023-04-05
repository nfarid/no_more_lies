
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default function TimePicker() : JSX.Element {
    
    const hourLst : Array<JSX.Element> = [];
    for(let hour : number = 0; hour < 24; ++hour)
        hourLst.push(<li key={hour}><Button type="button">{hour}:00</Button></li>);

    return (<ul>
            {hourLst}
    </ul>);
}
