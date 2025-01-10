const { registerUser } = require("../service/userRegister");
const { loginUser } = require("../service/userLogin");

const register = async (req, res) => {
  try {
    const userData = req.body;

    if (!userData.fullName || !userData.email || !userData.password) {
      return res.status(400).send({
        statusCode: 400,
        response: "failed",
        message: "All fields are required",
      });
    }

    const newUser = await registerUser(userData);

    if (!newUser) {
      return res.status(400).send({
        statusCode: 400,
        response: "failed",
        message: "user not registered!",
      });
    }

    return res.status(201).json({
      statusCode: 201,
      message: "User registered successfully!",
      data: newUser,
    });
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      message: "internal server error",
      error: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({
        statusCode: 400,
        response: "failed",
        message: "All fields are required",
      });
    }

    const user = await loginUser(email, password);

    if (!user) {
      return res.status(400).send({
        statusCode: 400,
        response: "failed",
        message: "login failed!",
      });
    }

    return res.status(200).send({
      statusCode: 200,
      message: "login successful!",
      data: { fullname: user.fullName, email: user.email },
    });
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      message: "internal server error",
      error: error.message,
    });
  }
};

module.exports = { register, login };
