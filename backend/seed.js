import mongoose from "mongoose";
import dotenv from "dotenv";
import flavors from "./data/flavors.js";
import Flavor from "./models/Flavor.js";

dotenv.config();

mongoose.connect(process.env.MONGO_URI);

const seedData = async () => {
  try {

    await Flavor.deleteMany();   // clears old data

    await Flavor.insertMany(flavors);

    console.log("Flavors added successfully!");

    process.exit();

  } catch (error) {

    console.log(error);
    process.exit(1);

  }
};

seedData();