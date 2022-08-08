const express = require("express");
const app = express();
const tasks = require("./routes/tasks");

// middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.get("/hello", (req, res) => {
  res.send("Task manager App");
});

app.use("/api/v1/tasks", tasks);

app.listen(3000, () => console.log("server running"));
