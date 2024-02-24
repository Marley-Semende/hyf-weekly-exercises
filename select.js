// queryDatabase.js
import mysql from "mysql2";
import { promisify } from "util";

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "recipes",
});

const queryAsync = promisify(connection.query).bind(connection);

const getRecipes = async () => {
  try {
    const recipes = await queryAsync("SELECT * FROM recipes");
    console.log("Recipes:", recipes);
  } catch (error) {
    console.error("Error fetching recipes:", error);
  } finally {
    connection.end();
  }
};

const getIngredients = async () => {
  try {
    const ingredients = await queryAsync("SELECT * FROM ingredients");
    console.log("Ingredients:", ingredients);
  } catch (error) {
    console.error("Error fetching ingredients:", error);
  } finally {
    connection.end();
  }
};

const getSteps = async () => {
  try {
    const steps = await queryAsync("SELECT * FROM steps");
    console.log("Steps:", steps);
  } catch (error) {
    console.error("Error fetching steps:", error);
  } finally {
    connection.end();
  }
};

const main = async () => {
  await getRecipes();
  await getIngredients();
  await getSteps();
};

main();
