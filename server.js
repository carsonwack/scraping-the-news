require("dotenv").config();
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");

// const PORT = process.env.PORT || 8080;
const PORT = 8080;

const app = express();


// Middleware
app.use(logger("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

// Handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");



// const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoScraperDB";
// mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

// // --------------------------------------





// ---------------------------------------------------
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);
// ---------------------------------------------------


























app.listen(PORT, function () {
  console.log("App running on port " + PORT + "!");
});

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoScraperDB";
mongoose.connect(MONGODB_URI);