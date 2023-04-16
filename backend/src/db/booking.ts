
import dbPool from "./pool.js";

import type { v4 } from "uuid";
//Default postgres uuid type is v4: https://www.postgresql.org/docs/current/functions-uuid.html


export type Availables = {monthYear: Date, days: {date: Date, times: {id: typeof v4, slot: Date}[] }[] }[];

export async function getAllAvailables() : Promise<Availables> {
    const result = await dbPool.query("SELECT id, slot FROM Availables ORDER BY slot ASC;");
    const rows : {id: typeof v4, slot: Date}[] = result.rows;

    //Turn the flat result into a hierarchical structure, grouped by dates
    const ret : Availables =[];
    for(const row of rows) {
        const month = row.slot.getMonth();
        const year = row.slot.getFullYear();
        const monthYear = new Date(year, month);
        let lastMonth = ret.slice(-1)[0];
        if(!lastMonth || lastMonth.monthYear.getTime() !== monthYear.getTime() ) {
            ret.push({monthYear: monthYear, days: []});
            lastMonth = ret.slice(-1)[0];
        }
        
        const day = row.slot.getDate();
        let lastDay = lastMonth.days.slice(-1)[0];
        if(!lastDay || lastDay.date.getDate() !== day) {
            lastMonth.days.push({date: new Date(year, month, day), times: []});
            lastDay = lastMonth.days.slice(-1)[0];
        }

        lastDay.times.push({id: row.id, slot: row.slot});
    }


    return ret;
}

//TODO: Improve this
export async function bookSlot(slot: Date, email: string) {
    // const dbClient =  await dbPool.connect();
    // try {
    //     await dbClient.query("BEGIN");
    //     const insertResultPromise =  dbClient.query("INSERT INTO Reservations (slot,email) VALUES ($1, $2);", [slot, email]);
    //     const deleteResult = await dbClient.query("DELETE FROM Availables WHERE slot=$1;", [slot]);
    //     if(deleteResult.rowCount !== 1) {
    //         const err = new Error("Booking slot no longer exist");
    //         err.name = "DeleteError";
    //         throw err;
    //     }
    //     await insertResultPromise;
    //     await dbClient.query("COMMIT");
    // } catch(err: any) {
    //     console.log("ROLLBACK");
    //     dbClient.query("ROLLBACK");
    //     throw err;
    // }
}
