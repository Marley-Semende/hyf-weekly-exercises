const mysql = require("mysql");
const util = require("util");

const con = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "africanRecipes"
});

const query = util.promisify(con.query).bind(con);

con.connect(async function(err) {
  if (err) {
    console.error("Error connecting to database:", err.message);
    return;
  }
  console.log("Connected to database successfully!");

  const createTableQuery = "CREATE TABLE african_recipes (name VARCHAR(255) NOT NULL, id INT AUTO_INCREMENT PRIMARY KEY, category VARCHAR(255), ingredients TEXT, instructions TEXT)";

  try {
    await query(createTableQuery);
    console.log("Table created successfully!");
  } catch (error) {
    console.error("Error creating table:", error.message);
  } finally {
    con.end((err) => {
      if (err) {
        console.error("Error closing database connection:", err.message);
        return;
      }
      console.log("Database connection closed successfully.");
    }); 
  }
});
