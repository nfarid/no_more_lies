
import bcrypt from "bcryptjs";

import dbPool from "./pool.js";

//TODO: Remember how express middleware handle async
export async function createAccount(email: string, password: string) {
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);
    const result = await dbPool.query("INSERT INTO Account (email, password_hash) VALUES ($1, $2)  RETURNING id;",
        [email, password_hash]);
    const id = result.rows[0].id;
    return id;
}

export async function verifyAccount(email: string, password: string) {
    const result = await dbPool.query("SELECT * FROM Account WHERE email=$1", [email]);
    if(result.rowCount != 1)
        return null;

    const account = result.rows[0];
    const match = await bcrypt.compare(password, account.password_hash);
    return match ? {id: parseInt(account.id)} : null;
}
