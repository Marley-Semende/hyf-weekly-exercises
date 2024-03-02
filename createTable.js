//Question 1. Was your database already in 2NF / 3 NF?
/* Answer => 

1.) No. I have seperated instructions into a separate table, and each recipe's instructions are now stored 
as individual rows associated with the recipe's ID.
2.) Since i created a new table for instructions I also removed the instructions column from the recipes tables so there 
wont be any repetition..
3.) And ive established the relationships between the tables.
4.) 
*/
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

  const createTablesQuery = `
    CREATE TABLE african_recipes (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      category VARCHAR(255)
    );

    CREATE TABLE ingredients (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL
    );

    CREATE TABLE instructions (
      id INT AUTO_INCREMENT PRIMARY KEY,
      recipe_id INT,
      step_number INT,
      instruction TEXT,
      FOREIGN KEY (recipe_id) REFERENCES recipes(id)
    );

    CREATE TABLE recipe_ingredients (
      recipe_id INT,
      ingredient_id INT,
      FOREIGN KEY (recipe_id) REFERENCES recipes(id),
      FOREIGN KEY (ingredient_id) REFERENCES ingredients(id),
      PRIMARY KEY (recipe_id, ingredient_id)
    );
  `;

  try {
    await query(createTablesQuery);
    console.log("Tables created successfully!");
  } catch (error) {
    console.error("Error creating tables:", error.message);
  } finally {
    con.end();
  }
});




