import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import users from "./data/users.js";
import products from "./data/products.js";
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const importData = async () => {
  try {
    // deletes existing Orders, Products and Users
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    // inserts sample users from users array
    const createdUsers = await User.insertMany(users);

    // assigns the admin user to each product in the products array
    const adminUser = createdUsers[0]._id;

    // inserts the modified product objects into the Products collection
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    await Product.insertMany(sampleProducts);

    console.log("Data Imported!".green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    // deletes all documents from the specified collection
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log("Data Destroyed!".red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

// Checks the second argument passed to the script using process.argv[2]
if (process.argv[2] === "-d") {
  destroyData(); //function to delete all data
} else {
  importData(); //function to create all data
}
