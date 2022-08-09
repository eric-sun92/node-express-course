const PORT = process.env.PORT || 3000;
const express = require("express");
const app = express();
// const methodOverride = require("method-override");

const tasks = require("./routes/tasks");
const connectDB = require("./db/connect");

require("dotenv").config();

const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

// middleware
app.use(express.static("./public"));
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(methodOverride("_methodOverride"));

//routes
app.use("/api/v1/tasks", tasks);

app.use(notFound);

app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await connectDB(process.env.DB_URL);
    app.listen(PORT, () => console.log("server running"));
  } catch (err) {
    console.log(err);
  }
};

start();
