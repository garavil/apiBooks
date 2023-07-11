const mysql = require ("mysql2");

const pool = mysql.createPool(
    {
                    host: "localhost",
                    user: "root",
                    password: "Admin.1234",
                    database: "AppBooks",
                    waitForConnections: true,
                    connectionLimit: 10,
                    maxIdle: 10,
                    idleTimeout: 60000,
                    queueLimit: 0,

    }).promise();

console.log("Conexión correcta")

module.exports = { pool };
    