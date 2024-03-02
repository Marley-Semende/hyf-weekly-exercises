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
    const insertIngredientsQuery = `
      INSERT INTO ingredients (name)
      VALUES ('Rice'), ('Chicken broth'), ('Tomatoes'), ('Onion'), ('Bell pepper'), ('Spices'), ('Oil'), ('Mixed vegetables'), ('Flour'), ('Water'), ('Salt'), ('Ripe plantains'), ('Maize meal'), ('Boerewors sausages');
    `;
    await query(insertIngredientsQuery);
    console.log("Ingredients inserted successfully!");

    const insertRecipesQuery = `
      INSERT INTO recipes (name, category)
      VALUES
        ('Jollof Rice', 'Main Course'),
        ('Chapati', 'Side Dish'),
        ('Dodo (Fried Plantains)', 'Side Dish'),
        ('Pap and Wors', 'Main Course');
    `;
    await query(insertRecipesQuery);
    console.log("Recipes inserted successfully!");

    const insertInstructionsQuery = `
      INSERT INTO instructions (recipe_id, step_number, instruction)
      VALUES
        (1, 1, 'Cook onions, bell pepper, and spices in oil.'),
        (1, 2, 'Add tomatoes and broth, then rice.'),
        (1, 3, 'Simmer until rice is cooked.'),
        (1, 4, 'Stir in mixed vegetables'),
        (2, 1, 'Mix flour, water, and salt to form dough.'),
        (2, 2, 'Roll out into thin circles.'),
        (2, 3, 'Cook in a skillet until browned.'),
        (3, 1, 'Peel and slice plantains.'),
        (3, 2, 'Heat oil in a pan.'),
        (3, 3, 'Fry plantains until golden brown.'),
        (3, 4, 'Sprinkle with salt to taste. Serve hot.'),
        (4, 1, 'Boil water and add maize meal.'),
        (4, 2, 'Simmer until thickened.'),
        (4, 3, 'Grill sausages. Serve together.');
    `;
    await query(insertInstructionsQuery);
    console.log("Instructions inserted successfully!");

    const insertRecipeIngredientsQuery = `
      INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
      VALUES
        (1, 1), (1, 2), (1, 3), (1, 4), (1, 5), (1, 6), (1, 7), (1, 8),
        (2, 9), (2, 10), (2, 11),
        (3, 12), (3, 7), (11),
        (4, 13), (4, 7);
    `;
    await query(insertRecipeIngredientsQuery);
    console.log("Recipe-Ingredient associations inserted successfully!");

  } catch (error) {
    console.error("Error executing queries:", error.message);
  } finally {
    con.end();
  }
});
