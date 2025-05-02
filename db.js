const mysql = require("mysql2");

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: "dpg-d0a63jruibrs73b2btd0-a",      // MySQL Server Host
  user: "aaa_57eg_user",         // MySQL Username
  password: "hfNyXAKr06oY7SxEzxenaDxDf9e9nGTK",       // MySQL Password
  database: "aaa_57eg",      // MySQL Database Name
  waitForConnections: true,
  connectionLimit: 10,    // Maximum number of connections
  queueLimit: 0,
});

// Convert pool to use Promises for async/await support
const db = pool.promise(); // This allows using async/await with `db.query()`

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
