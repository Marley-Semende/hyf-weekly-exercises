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
    const insertRecipeOne = `
      INSERT INTO african_recipes (name, category, ingredients, instructions)
      VALUES (
        'Jollof Rice',
        'Main Course',
        'Rice, chicken broth, tomatoes, onion, bell pepper, spices, oil, mixed vegetables',
        '1. Cook onions, bell pepper, and spices in oil. 
        2. Add tomatoes and broth, then rice. 
        3. Simmer until rice is cooked. 
        4. Stir in mixed vegetables'
      )`;

    await query(insertRecipeOne);
    console.log("Recipe one inserted successfully!");

    const insertMultiple = "INSERT INTO african_recipes (name, category, ingredients, instructions) VALUES ?";
    const values = [
      ['Chapati', 'Side Dish', 'Flour, water, oil, salt', '1. Mix flour, water, and salt to form dough. 2. Roll out into thin circles. 3. Cook in a skillet until browned.'],
      ['Dodo (Fried Plantains)', 'Side Dish', 'Ripe plantains, oil, salt', '1. Peel and slice plantains. 2. Heat oil in a pan. 3. Fry plantains until golden brown. 4. Sprinkle with salt to taste. 5. Serve hot.'],
      ['Pap and Wors', 'Main Course', 'Maize meal, water, salt, boerewors sausages', '1. Boil water and add maize meal. 2. Simmer until thickened. 3. Grill sausages. 4. Serve together.']
    ];

    await query(insertMultiple, [values]);
    console.log("3 recipes inserted successfully!");
  } catch (error) {
    console.error("Error executing query:", error.message);
  } finally {
    con.end();
  }
});
