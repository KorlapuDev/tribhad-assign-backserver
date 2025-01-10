const User = require("../model/user");
const bcrypt = require("bcryptjs");

const loginUser = async (email, password) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User not found.");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid credentials.");
    }

    return user;
  } catch (error) {
    throw new Error(error.message || "An error occurred during login.");
  }
};

module.exports = { loginUser };
