const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const users = require("./routes/users");
const port = process.env.PORT;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/users", users);

app.listen(port, () => {
  console.log(`App is listenig port ${port}`);
});

