
export default function BookingForm() : JSX.Element {
    fetch("http://localhost:3000/_api/bookings")
        .then(res=> res.json() )
        .then(json=> console.log(json) )
        .catch(err=> console.log(err) );
    return(<form>
        <label>
            Email:
            <input type="email" placeholder="foo@bar.com" name="booking-email" id="booking-email" required></input>
        </label>
    </form>);
}
