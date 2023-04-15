
import dbPool from "./pool.js";

export async function getAllAvailables() : Promise<Date[]> {
    const result = await dbPool.query("SELECT slot FROM Availables ORDER BY slot ASC;");
    return result.rows;
}

//TODO: Improve this
export async function bookSlot(slot: Date, email: string) {
    const dbClient =  await dbPool.connect();
    try {
        await dbClient.query("BEGIN");
        const insertResultPromise =  dbClient.query("INSERT INTO Reservations (slot,email) VALUES ($1, $2);", [slot, email]);
        const deleteResult = await dbClient.query("DELETE FROM Availables WHERE slot=$1;", [slot]);
        if(deleteResult.rowCount !== 1) {
            const err = new Error("Booking slot no longer exist");
            err.name = "DeleteError";
            throw err;
        }
        await insertResultPromise;
        await dbClient.query("COMMIT");
    } catch(err: any) {
        console.log("ROLLBACK");
        dbClient.query("ROLLBACK");
        throw err;
    }
}
