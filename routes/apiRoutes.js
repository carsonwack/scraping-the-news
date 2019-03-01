const axios = require("axios");
const cheerio = require("cheerio");

const db = require("../models");

module.exports = function (app) {


    app.get("/scrape", function (req, res) {

        axios.get("https://fivethirtyeight.com/sports/").then(function (response) {
            var $ = cheerio.load(response.data);

            let count = 0;
            let articlesArray = [];

            $("h2").each(function (i, element) {
                if (count === 5) {
                    return false;
                }
                var result = {};
                result.title = $(this)
                    .children("a")
                    .text().trim();
                result.link = $(this)
                    .children("a")
                    .attr("href");

                articlesArray.push(result);

                // DB query
                db.Article.create(result)
                    .then(function (dbArticle) {
                        console.log(dbArticle);
                    })

                    .catch(function (err) {
                        console.log(err);
                    });

                count++;
            });

            res.json(articlesArray);
        });
    });



    app.put("/save/:id", function (req, res) {
        db.Article.findOneAndUpdate(
            { _id: req.params.id },
            { $set: 
                {
                    saved: true
                }
            }
        ).then(function(data) {
            res.status(200).end();
        }).catch(function(error) {
            console.log(error);
        });
    });


    app.put("/remove/:id", function (req, res) {
        db.Article.findOneAndUpdate(
            { _id: req.params.id },
            { $set: 
                {
                    saved: false
                }
            }
        ).then(function(data) {
            res.status(200).end();
        }).catch(function(error) {
            console.log(error);
        });
    });













    app.get("/articles", function (req, res) {
        db.Article.find({})
            .then(function (dbArticles) {
                res.json(dbArticles);
            })
            .catch(function (err) {
                console.log(err);
            });
    });



    app.get("/saved/articles", function (req, res) {
        db.Article.find( { saved: true } )
            .then(function (dbArticles) {
                res.json(dbArticles);
            })
            .catch(function (err) {
                console.log(err);
            });
    });












};