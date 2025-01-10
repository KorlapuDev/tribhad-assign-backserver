require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./db/index");
const userRouter = require("./router/userRouter");

const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/health", (req, res) => {
  return res.status(200).send({
    statusCode: 200,
    response: "sucess",
    message: "The backend server is started working",
  });
});

app.use("/api/user", userRouter);

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`\nServer is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error(
      "Failed to start the server due to DB connection issue:",
      err
    );
  });

///--> mongodb://kabhishek1372000:kabhishek1372000@undefined/?replicaSet=atlas-315w4d-shard-0&ssl=true&authSource=admin

///mongodb://localhost:27017/
