
import dbPool from "./pool.js";

export async function getAllAvailables() : Promise<Date[]> {
    const result = await dbPool.query("SELECT slot FROM Availables ORDER BY slot ASC;");
    return result.rows;
}
