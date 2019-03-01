

$(function () {

    $(document).on("click", "#scrape", scrapeAndSave);
    $(document).on("click", "#del-button", deleteArt);
    $(document).on("click", "#save-button", makeArtSaved);
    $(document).on("click", "#remove-button", makeArtUnsaved);
    $(document).on("click", "#notes-button", notesModal);

});


function scrapeAndSave() {
    $.ajax({
        method: "GET",
        url: "/scrape"
    }).done(function () {
        window.location.replace("/");
    });
};

function deleteArt() {
    let idToDelete = $(this)
        .attr("data-id");
    $.ajax({
        method: "DELETE",
        url: "/delete/" + idToDelete
    }).then(function () {
        refreshArticles();
    });
};

function makeArtSaved() {
    let idToSave = $(this)
        .attr("data-id");

    $.ajax({
        method: "PUT",
        url: "/save/" + idToSave
    }).always(function () {
        refreshArticles();
    });
};

function makeArtUnsaved() {
    let idToRemove = $(this)
        .attr("data-id");

    $.ajax({
        method: "PUT",
        url: "/remove/" + idToRemove
    }).always(function () {
        console.log('TEST');
        refreshSaved();
    });
};



function notesModal() {
    // 
};



function refreshArticles() {
    $.ajax({
        method: "GET",
        url: "/articles"
    })
        .then(function (data) {
            let $articles = data.map(function (art) {

                let $li = `<li data-id="${art._id}" class="list-group-item"> <a href="${art.link}">${art.title}</a> 
                <button type="button" href="/save/${art._id}" class="btn btn-outline-success btn-sm" id="save-button" data-id="${art._id}">Save</button>
                <button type="button" href="/delete/${art._id}" class="btn btn-outline-danger btn-sm" id="del-button" data-id="${art._id}">Delete</button> </li>`

                return $li;
            });
            $("#articles-list").empty();
            $("#articles-list").append($articles);
        })
};


function refreshSaved() {
    $.ajax({
        method: "GET",
        url: "/saved/articles"
    })
        .then(function (data) {
            let $articles = data.map(function (art) {

                let $li = `<li data-id="${art._id}" class="list-group-item"> <a href="${art.link}">${art.title}</a> 
                <button type="button" href="/remove/${art._id}" class="btn btn-outline-danger btn-sm" id="remove-button" data-id="${art._id}">Remove</button> 
                <button type="button" class="btn btn-outline-primary btn-sm" id="notes-button" data-id="${art._id}">Notes</button> </li>`

                return $li;
            });
            $("#articles-list-saved").empty();
            $("#articles-list-saved").append($articles);
        })
};


