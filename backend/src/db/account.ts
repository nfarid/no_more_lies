
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
