const User = require("../model/user");
const { encryptPassword } = require("../utils/helpers");

const registerUser = async (userData) => {
  try {
    const { fullName, email, password, mobile } = userData;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("User with this email already exists.");
    }

    const hashedPassword = await encryptPassword(password);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
      mobile,
    });
    return await newUser.save();
  } catch (error) {
    throw new Error(error.message || "An error occurred during registration.");
  }
};

module.exports = { registerUser };
