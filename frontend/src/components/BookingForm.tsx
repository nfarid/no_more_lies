import { useEffect, useState } from "react";
import Calender from "./Calender";
import TimePicker from "./TimePicker";
import { Availables, Times, V4 } from "./types";
import { Col, Container, Row } from "react-bootstrap";

export default function BookingForm() : JSX.Element {
    const [slotLst, setSlotLst] = useState<Availables>([]);
    const [timeLst, setTimeLst] = useState<Times>([]);
    const [timeSlot, setTimeSlot] = useState<V4 | null>(null);
    useEffect(()=>{
        fetch("http://localhost:3000/_api/bookings")
            .then(res=> res.json() )
            .then(lst=> {
                for(const month of lst) {
                    month.monthYear = new Date(month.monthYear);
                    for(const day of month.days) {
                        day.date = new Date(day.date);
                        for(const time of day.times)
                            time.slot = new Date(time.slot);
                    }
                }
                setSlotLst(lst);
            }).catch(err=> console.error(err) );
    },[]);
    const setDay = (time: Times) => () => setTimeLst(time);

    return(<Container>
        <form action="http://localhost:3000/_api/bookings/" method="POST">
            <br/>
            <Row>
                <p>Do you want to  train?</p>
            </Row>
            <Row>
                <label>
                    Drop email below:
                    <br/>
                    <input type="email" placeholder="foo@bar.com" name="booking-email" id="booking-email" required></input>
                </label>
            </Row>
            <br/>
            <Row>
                <Col><Calender slotLst={slotLst} setDay={setDay}/></Col>
                <Col><TimePicker timeLst={timeLst} setTimeSlot={setTimeSlot}/></Col>
            </Row>
            {timeSlot? <input type="hidden" name="booking-id" value={timeSlot.toString()}/> : ""}
            <Row>
                {timeSlot? <input type="submit" onClick={()=> confirm("Are you sure?")}/> : ""}
            </Row>
        </form>
    </Container>);
}
