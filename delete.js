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

  try {
    const deleteQuery = "DELETE FROM african_recipes WHERE category = 'Side Dish'";
    const result = await query(deleteQuery);
    console.log("Deleted rows:", result.affectedRows);
  } catch (error) {
    console.error("Error executing query:", error.message);
  } finally {
    con.end();
  }
});
