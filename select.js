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
    const result = await query("SELECT name AS recipe_name, category AS recipe_category FROM african_recipes WHERE category = 'Main Course'");
    console.log("Selected data:", result);
  } catch (error) {
    console.error("Error executing query:", error.message);
  } finally {
    con.end();
  }
});
