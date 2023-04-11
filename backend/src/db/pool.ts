

import pg from "pg";
const { Pool } = pg;

const dbPool = new Pool({
    host: process.env.PG_HOST,
    port: parseInt(process.env.PG_PORT || ""),
    database: process.env.PG_DATABASE,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
});

//Do not use pool.query if you are using a transaction.
//You must use the same client instance for all statements within a transaction.

//Column names cannot be parameterised.

export default dbPool;
