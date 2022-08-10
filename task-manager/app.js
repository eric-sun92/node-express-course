const PORT = process.env.PORT || 3000;
const express = require("express");
const app = express();
require("dotenv").config();

// middleware
app.use(express.static("./public"));
app.use(express.json());

// routes
const taskRoutes = require("./routes/tasks");
app.use("/api/v1/tasks", taskRoutes);

const notFound = require("./middleware/not-found");
app.use(notFound);

const errorHandlerMiddleware = require("./middleware/error");
app.use(errorHandlerMiddleware);

// db
const connectDB = require("./db/connect");
const url = process.env.DB_URL;

const start = async () => {
  try {
    await connectDB(url);
    app.listen(PORT, () => console.log(`server running on port ${PORT}`));
  } catch (err) {
    console.log(err);
  }
};

start();
