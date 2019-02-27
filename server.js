require("dotenv").config();
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");


const axios = require("axios");
const cheerio = require("cheerio");


const db = require("./models");

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
mongoose.connect("mongodb://localhost/mongoScraperDB", { useNewUrlParser: true });

// --------------------------------------






// API routes

app.get("/scrape", function(req, res) {

    axios.get("https://fivethirtyeight.com/sports/").then(function(response) {
      var $ = cheerio.load(response.data);
  
    let count = 0;

      $("h2").each(function(i, element) {
        if (count === 5) {
            return false;
        }
        var result = {};
  
        // Add the text and href of every link, and save them as properties of the result object
        result.title = $(this)
          .children("a")
          .text().trim();
        result.link = $(this)
          .children("a")
          .attr("href");

  
        // Create a new Article using the `result` object built from scraping
        db.Article.create(result)
          .then(function(dbArticle) {
            console.log(dbArticle);
          })

          .catch(function(err) {
            console.log(err);
          });

        count ++;
      });

  
      res.send("Scrape Complete");
    });
  });










// HTML routes

app.get("*", function (req, res) {
    // Render 404 page for any unmatched routes
    res.render("404");
});












// --------------------------------------
























app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});