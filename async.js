const mongoose = require("mongoose");
const Recipe = require("./models/Recipe.model");

const data = require("./data");
const MONGODB_URI = "mongodb://localhost:27017/recipe-app-async";

const firstRecipe = data[0];

const createData = async () => {
  try {
    // CONNECT TO DATA BASE
    const connectingDB = await mongoose.connect(MONGODB_URI);
    console.log(`Connected to the database: "${connectingDB.connection.name}"`);

    // ADD ONE RECIPE
    const oneRecipe = await Recipe.create(firstRecipe);
    console.log(`New recipe added: ${oneRecipe.title}`);

    // ADD MANY RECIPES
    const manyRecipes = await Recipe.insertMany(data);
    manyRecipes.forEach((recipe) =>
      console.log(`New recipe added: ${recipe.title}`)
    );

    // UPDATE ONE RECIPE
    const updateRecipe = await Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 },
      { new: true }
    );
    console.log(`Recipe Updated: ${updateRecipe}`);

    // DELETE RECIPE
    await Recipe.deleteOne({ title: "Carrot Cake" });
    console.log(`Recipe Deleted`);

    // DISCONNECT FROM DATA BASE
    await mongoose.disconnect();
    console.log("Disconnected");
  } catch (error) {
    console.log(error);
  }
};

createData();
