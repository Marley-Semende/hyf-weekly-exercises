const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
const recipesData = require("./data");
dotenv.config();

async function main() {
  const client = new MongoClient(process.env.URI);

  try {
    await client.connect();
    console.log("Connected to MongoDB database successfully!");

    const db = client.db("recipes");

    // create collection
    const collection = await db.createCollection("africanRecipes");
    console.log("africanRecipes collection created successfully!");

    //insert into collection
    for (const recipe of recipesData) {
      await collection.insertOne(recipe);
    }
    console.log(
      `${recipesData.length} recipes data has been inserted successfully!`
    );
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await client.close();
  }
}

main();

module.exports = main;
