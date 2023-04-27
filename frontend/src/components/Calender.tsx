
import { Button } from "react-bootstrap";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import type { Availables, Times } from "./types";


export default function Calender({slotLst, setDay} : {slotLst: Availables, setDay: (time: Times) => () => void}) : JSX.Element {
    if(slotLst.length == 0)
        return <p>No available slots</p>;

    const [clickedDate, setClickedDate] = useState<number>(0);
    const [monthIndex, setMonthIndex] = useState<number>(0);
    const month = slotLst[monthIndex].monthYear;
    const decreaseMonth = ()=> {
        setMonthIndex( (monthIndex-1+slotLst.length) % slotLst.length);
    };
    const increaseMonth = ()=> {
        setMonthIndex( (monthIndex+1) % slotLst.length);
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
    let dayIndex = 0;
    for(let i  = 1; i <= numberOfDays; ++i) {
        let variant = "secondary";
        let disabled = true;
        let onClick = undefined;
        if(slotLst[monthIndex].days[dayIndex].date.getDate() == i) {
            console.log(i);
            disabled = false;
            variant = "light";
            if(i === clickedDate)
                variant = "primary";
            dayIndex = (dayIndex+1) % slotLst[monthIndex].days.length;
            onClick = ()=> {setClickedDate(i); setDay(slotLst[monthIndex].days[dayIndex].times)();};
        }

        const dateOfMonth : Date = new Date(month.getFullYear(), month.getMonth(), i);
        const weekDay : number = dateOfMonth.getDay();
        const key : number = weekLst.length * 10 + weekDay;
        week.push(<td key={key}><Button type="button" variant={variant} disabled={disabled} onClick={onClick}>{i < 10 ? "0"+i : i}</Button></td>);
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
