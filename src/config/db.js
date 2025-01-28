const pg = require('pg');
const dotenv = require('dotenv').config();

const pool = new pg.Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT
});

// Create connection for the log database
const pool2 = new pg.Pool({
    host: process.env.LOG_DB_HOST,
    user: process.env.LOG_DB_USER,
    database: process.env.LOG_DB_NAME,
    password: process.env.LOG_DB_PASS,
    port: process.env.LOG_DB_PORT
});

// Test Connections
pool.connect((err, client, release) => {
    if (err) {
        console.error('Error connecting to main database:', err.stack);
    } else {
        console.log('Connected to main database');
        release(); // release the client back to the pool
    }
});

pool2.connect((err, client, release) => {
    if (err) {
        console.error('Error connecting to log database:', err.stack);
    } else {
        console.log('Connected to log database');
        release(); // release the client back to the pool
    }
});

module.exports = {
    pool,
    pool2
};
