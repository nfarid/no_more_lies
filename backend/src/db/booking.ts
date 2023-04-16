
import dbPool from "./pool.js";

import type { v4 } from "uuid";
//Default postgres uuid type is v4: https://www.postgresql.org/docs/current/functions-uuid.html

export type V4 = typeof v4;
export type Availables = {monthYear: Date, days: {date: Date, times: {id: V4, slot: Date}[] }[] }[];

export async function getAllAvailables() : Promise<Availables> {
    const result = await dbPool.query("SELECT id, slot FROM Availables ORDER BY slot ASC;");
    const rows : {id: V4, slot: Date}[] = result.rows;

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

export async function bookSlot(id: V4, email: string) {
    const dbClient =  await dbPool.connect();
    try {
        await dbClient.query("BEGIN");

        const deleteResult = await dbClient.query("DELETE FROM Availables WHERE id=$1 RETURNING slot", [id]);
        if(deleteResult.rowCount !== 1) {
            const err = new Error("Booking slot no longer exist");
            err.name = "DeleteError";
            throw err;
        }
        const slot = deleteResult.rows[0].slot as Date;

        await dbClient.query("INSERT INTO Reservations (slot,email) VALUES ($1, $2);", [slot, email]);

        await dbClient.query("COMMIT");
    } catch(err: any) {
        console.log("ROLLBACK");
        dbClient.query("ROLLBACK");
        throw err;
    }
}
