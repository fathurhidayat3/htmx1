require("dotenv").config();

const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const dummyRoutes = require("./src/routes/dummy");
const mainRoutes = require("./src/routes");

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./src/views"));

app.use("/", dummyRoutes);
app.use("/", mainRoutes);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
