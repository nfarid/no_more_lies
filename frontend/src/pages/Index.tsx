
import Calender from "../components/Calender";
import TimePicker from "../components/TimePicker";
import { Stack } from "react-bootstrap";

export default function Index() {
    return (<>
    <Stack direction="horizontal" gap={2}>
            <Calender/>
            <TimePicker/>
    </Stack>
    </>);
}
