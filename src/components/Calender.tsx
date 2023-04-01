
import { Button } from "react-bootstrap";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Calender() : JSX.Element {
    const [month, setMonth] = useState(new Date() );
    const decreaseMonth = ()=> {
        setMonth(new Date(month.getFullYear(), month.getMonth()-1, 1) );
    }
    const increaseMonth = ()=> {
        setMonth(new Date(month.getFullYear(), month.getMonth()+1, 1) );
    }

    //For JS Date, month is 0-indexed and day of month is 1-indexed but day of week is 0-indexed
    const numberOfDays : number = new Date(month.getFullYear(), month.getMonth()+1, 0).getDate();
    const monthName : string = month.toLocaleString("default", { month: "long" });

    const currentMonth : number = month.getMonth();
    const currentYear : number = month.getFullYear();

    let buffer : Array<JSX.Element> = [];
    const startWeekday : number = new Date(month.getFullYear(), month.getMonth(), 1).getDay();
    for(let i : number = 0; i < startWeekday; ++i) {
        buffer.push(<Button type="button">"."</Button>);
    }
    for(let i : number = 1; i <= numberOfDays; ++i) {
        const dateOfMonth : Date = new Date(month.getFullYear(), month.getMonth(), i);
        const weekDay : number = dateOfMonth.getDay();
        buffer.push(<Button type="button">{i < 10 ? "0"+i : i}</Button>);
        if(weekDay == 6)
            buffer.push(<br/>);
    }
    const endWeekday : number = new Date(month.getFullYear(), month.getMonth(), numberOfDays).getDay();
    for(let i : number = endWeekday + 1; i < 7; ++i) {
        buffer.push(<Button type="button">"."</Button>);
    }

    return(<div>
        <Button type="button" onClick={decreaseMonth}>&lt;-</Button>
        {monthName} {month.getFullYear()}
        <Button type="button" onClick={increaseMonth}>-&gt;</Button>
        <br/>
        {buffer}
    </div>);
}
