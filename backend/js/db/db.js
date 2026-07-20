import mysql2 from "mysql2/promise.js";

async function connect() {
    const connection = await mysql2.createConnection({
        host: process.env.BD_HOST,
        port: Number(process.env.BD_PORT),
        user: process.env.BD_USER,
        password: process.env.BD_PASSWORD,
        database: process.env.BD_NAME,
    });

    return connection;
}

async function executeQuery(query, params = []) {
    const connection = await connect();

    try {
        const result = await connection.execute(query, params);
        return result;
    } catch (error) {
        console.log(`Identified error on executeQuery: ${error}`);
    } finally {
        await connection.end();
    }
}

export { executeQuery };
