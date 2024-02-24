// index.js
import mysql from "mysql2";
import { promisify } from "util";

const createDatabase = async () => {
  const connection = mysql.createConnection({
    host: "localhost",
    user: "hyfuser",
    password: "hyfpassword",
  });

  const queryAsync = promisify(connection.query).bind(connection);

  try {
    await queryAsync("CREATE DATABASE IF NOT EXISTS african_recipes");
    console.log("Database created successfully.");
  } catch (error) {
    console.error("Error creating database:", error);
  } finally {
    connection.end();
  }
};

const createTables = async () => {
  const connection = mysql.createConnection({
    host: "localhost",
    user: "hyfuser",
    password: "hyfpassword",
    database: "recipes",
  });

  const queryAsync = promisify(connection.query).bind(connection);

  try {
    await queryAsync(`
      CREATE TABLE IF NOT EXISTS recipes (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT
      )
    `);
    console.log("Table 'recipes' created successfully.");

    await queryAsync(`
      CREATE TABLE IF NOT EXISTS ingredients (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL
      )
    `);
    console.log("Table 'ingredients' created successfully.");

    await queryAsync(`
      CREATE TABLE IF NOT EXISTS steps (
        id INT AUTO_INCREMENT PRIMARY KEY,
        description TEXT NOT NULL
      )
    `);
    console.log("Table 'steps' created successfully.");

    await queryAsync(`
      CREATE TABLE IF NOT EXISTS recipe_ingredients (
        recipe_id INT,
        ingredient_id INT,
        FOREIGN KEY (recipe_id) REFERENCES recipes(id),
        FOREIGN KEY (ingredient_id) REFERENCES ingredients(id)
      )
    `);
    console.log("Table 'recipe_ingredients' created successfully.");

    await queryAsync(`
      CREATE TABLE IF NOT EXISTS recipe_steps (
        recipe_id INT,
        step_id INT,
        FOREIGN KEY (recipe_id) REFERENCES recipes(id),
        FOREIGN KEY (step_id) REFERENCES steps(id)
      )
    `);
    console.log("Table 'recipe_steps' created successfully.");

    await queryAsync(`
      INSERT INTO recipes (name, description) VALUES
      ('Jollof Rice', 'A popular West African dish made with rice, tomatoes, and spices.'),
      ('Injera', 'A sourdough flatbread originating from Ethiopia and Eritrea.'),
      ('Tagine', 'A North African stew named after the earthenware pot in which it is cooked.')
    `);
    console.log("Data inserted into 'recipes' table successfully.");

    await queryAsync(`
      INSERT INTO ingredients (name) VALUES
      ('Rice'),
      ('Tomatoes'),
      ('Spices'),
      ('Flour'),
      ('Water'),
      ('Yeast'),
      ('Meat'),
      ('Vegetables')
    `);
    console.log("Data inserted into 'ingredients' table successfully.");

    await queryAsync(`
      INSERT INTO steps (description) VALUES
      ('Cook rice with spices and tomatoes'),
      ('Mix flour, water, and yeast to make dough'),
      ('Cook meat and vegetables in a stew pot')
    `);
    console.log("Data inserted into 'steps' table successfully.");
    
    // Inserting relationships
    await queryAsync(`
      INSERT INTO recipe_ingredients (recipe_id, ingredient_id) VALUES
      (1, 1),
      (1, 2),
      (1, 3),
      (2, 4),
      (2, 5),
      (2, 6),
      (3, 7),
      (3, 8)
    `);
    console.log("Data inserted into 'recipe_ingredients' table successfully.");

    await queryAsync(`
      INSERT INTO recipe_steps (recipe_id, step_id) VALUES
      (1, 1),
      (1, 2),
      (3, 3)
    `);
    console.log("Data inserted into 'recipe_steps' table successfully.");

  } catch (error) {
    console.error("Error creating tables or inserting data:", error);
  } finally {
    connection.end();
  }
};

const main = async () => {
  await createDatabase();
  await createTables();
};

main();
