const mongoose = require("mongoose");

const connectDB = async () => {
  const DB_NAME = "tribhad";
  try {
    const connectionInstance = await mongoose.connect(
      `mongodb+srv://kabhishek1372000:FBWMAu5v28anOmkC@abhishekscluster.drkxv.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`
    );
    console.log(`\nDatabase is connected`);
  } catch (error) {
    console.error("MongoDB connection FAILED: ", error);
    process.exit(1);
  }
};

module.exports = connectDB;
