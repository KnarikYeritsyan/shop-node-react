import mysql from 'mysql2';

const {DB_PASSWORD, DB_USER, DB_NAME, DB_HOST, DB_PORT} = process.env;

const connection = mysql.createConnection({
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME
});

const db = connection.promise();

export default db;