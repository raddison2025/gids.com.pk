require('dotenv').config();
const mysql = require("mysql2");

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,       // Database Host from .env
  user: process.env.DB_USER,       // Database User from .env
  password: process.env.DB_PASSWORD,  // Database Password from .env
  database: process.env.DB_NAME,   // Database Name from .env
  port: process.env.DB_PORT || 3306,  // Default to 3306 if not provided
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Convert pool to use Promises for async/await support
const db = pool.promise();

// Function to create the 'users' table if it doesn't exist
async function createUsersTable() {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS mytable (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL        
    );
  `;

  try {
    await db.query(createTableQuery);
    console.log("✅ Table 'mytable' is ready.");
  } catch (err) {
    console.error("❌ Error creating table:", err);
  }
}

// Ensure the table exists on startup
createUsersTable().catch(err => console.error("❌ Table Initialization Failed:", err));

// Handle MySQL connection errors at the pool level
pool.on("error", (err) => {
  console.error("❌ MySQL Connection Error:", err);
});

// Export the database connection pool for use in other files
module.exports = { db, pool };
