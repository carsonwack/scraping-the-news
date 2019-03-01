const db = require("../models");






module.exports = function (app) {

    app.get("/", function (req, res) {
        db.Article.find({})
            .then(function (dbArticles) {
                res.render("index", {
                    articles: dbArticles
                });
            })
            .catch(function (err) {
                console.log(err);
            })
    });


    app.delete("/delete/:id", function (req, res) {
        db.Article.remove( {_id: req.params.id} )
            .then(function (dbArticles) {
                res.render("index", {
                    articles: dbArticles
                });
            })
            .catch(function (err) {
                console.log(err);
            })
    });


    app.get("/saved", function (req, res) {
        db.Article.find({ saved: true })
            .then(function (dbArticles) {
                res.render("saved", {
                    articles: dbArticles
                });
            })
            .catch(function (err) {
                console.log(err);
            })
    });



    // app.get("/delete/:id")



















    app.get("*", function (req, res) {
        // Render 404 page for any unmatched routes
        res.render("404");
    });






};