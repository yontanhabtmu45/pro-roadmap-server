// require mysql2 from 'mysql2/promise'
const mysql = require('mysql2/promise');
// require dotenv
const dotenv = require('dotenv');
dotenv.config(); // Load environment variables from .env file

// create a connection to the database
const dbConfig = {
    connectionLimit: 10,
    password: process.env.DB_PASS, 
    user: process.env.DB_USER,    
    host: process.env.DB_HOST,    
    database: process.env.DB_NAME 
};

// prepare the connection pool
const pool = mysql.createPool(dbConfig);

// prepare async function that will execute the sql query
const executeQuery = async (sql, params = []) => {
    try {
        const connection = await pool.getConnection(); // Use pool.getConnection()
        const [rows] = await connection.execute(sql, params);
        connection.release();
        return rows;
    } catch (error) {
        console.error('Error executing query:', error);
        throw error;
    }
};

// export modules
module.exports = { executeQuery };