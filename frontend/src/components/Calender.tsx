
import { Button } from "react-bootstrap";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Calender() : JSX.Element {
    const [month, setMonth] = useState(new Date() );
    const decreaseMonth = ()=> {
        setMonth(new Date(month.getFullYear(), month.getMonth()-1, 1) );
    };
    const increaseMonth = ()=> {
        setMonth(new Date(month.getFullYear(), month.getMonth()+1, 1) );
    };

    //For JS Date, month is 0-indexed and day of month is 1-indexed but day of week is 0-indexed
    const numberOfDays : number = new Date(month.getFullYear(), month.getMonth()+1, 0).getDate();
    const monthName : string = month.toLocaleString("default", { month: "long" });
    const currentYear : number = month.getFullYear();


    const weekLst : Array<JSX.Element> = [];
    let week : Array<JSX.Element> = [];
    const startWeekday : number = new Date(month.getFullYear(), month.getMonth(), 1).getDay();
    for(let i  = 0; i < startWeekday; ++i) {
        const key : number = weekLst.length * 10 + i;
        week.push(<td key={key}><Button type="button" variant="dark" disabled>&nbsp;&nbsp;&nbsp;&nbsp;</Button></td>);
    }
    for(let i  = 1; i <= numberOfDays; ++i) {
        const dateOfMonth : Date = new Date(month.getFullYear(), month.getMonth(), i);
        const weekDay : number = dateOfMonth.getDay();
        const key : number = weekLst.length * 10 + weekDay;
        week.push(<td key={key}><Button type="button" variant="light">{i < 10 ? "0"+i : i}</Button></td>);
        if(weekDay == 6) {
            weekLst.push(<tr key={weekLst.length}>{week}</tr>);
            week = [];
        }
    }
    const endWeekday : number = new Date(month.getFullYear(), month.getMonth(), numberOfDays).getDay();
    for(let i : number = endWeekday + 1; i < 7; ++i) {
        const key : number = weekLst.length * 10 + i;
        week.push(<td key={key}><Button type="button" variant="dark" disabled>&nbsp;&nbsp;&nbsp;&nbsp;</Button></td>);
    }
    weekLst.push(<tr key={weekLst.length}>{week}</tr>);


    return(<div style={{border: "2px solid gray", padding: "4px", width: "max-content"}}>
        <table style={{captionSide: "top"}}>
            <caption style={{color: "white"}}>
                <span style={{display: "flex", justifyContent: "space-between"}}>
                    <Button type="button" onClick={decreaseMonth} style={{marginLeft: "8px"}}>&lt;</Button>
                    {monthName} {currentYear}
                    <Button type="button" onClick={increaseMonth} style={{marginRight: "8px"}}>&gt;</Button>
                </span>
            </caption>
            <thead>
                <tr>
                    <th scope="col">Sun</th>
                    <th scope="col">Mon</th>
                    <th scope="col">Tue</th>
                    <th scope="col">Wed</th>
                    <th scope="col">Thu</th>
                    <th scope="col">Fri</th>
                    <th scope="col">Sat</th>
                </tr>
            </thead>
            <tbody>
                {weekLst}
            </tbody>
        </table>
    </div>);
}
