

$(function () {

    $(document).on("click", "#scrape", scrapeAndSave);
    $(document).on("click", "#del-button", deleteArt);
    $(document).on("click", "#save-button", makeArtSaved);
    $(document).on("click", "#remove-button", makeArtUnsaved);


    // MODAL
    $(document).on("click", "#notes-button", displayModal);

    $(document).on("click", "#save-note", saveNote);

    $(document).on("click", "#notes-del-button", deleteNote);


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
        refreshSavedArticles();
    });
};

// function deleteNote() {
//     let idToDelete = $(this)
//         .attr("data-id");

//     $.ajax({
//         method: "DELETE",
//         url: "/note/delete/" + idToDelete
//     }).then(function () {
//         refreshNotes(idToDelete);
//     });
// };


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


function refreshSavedArticles() {
    $.ajax({
        method: "GET",
        url: "/saved/articles"
    })
        .then(function (data) {
            let $articles = data.map(function (art) {

                let $li = `<li data-id="${art._id}" class="list-group-item"> <a href="${art.link}">${art.title}</a> 
                <button type="button" href="/remove/${art._id}" class="btn btn-outline-danger btn-sm" id="remove-button" data-id="${art._id}">Remove</button> 
                <button type="button" data-toggle="modal" data-target="#myModal" class="btn btn-outline-primary btn-sm" id="notes-button" data-id="${art._id}">Notes</button> </li>`

                return $li;
            });
            $("#articles-list-saved").empty();
            $("#articles-list-saved").append($articles);
        })
};





// ------Modal-----
function displayModal() {
    $("#modal-title").text("");
    $("#modal-text").empty();

    let notesId = $(this).attr("data-id");

    $.ajax({
        method: "GET",
        url: "/articles/" + notesId
    })

        .then(function (data) {
            console.log(data);
            $("#modal-title").text(data.title);

            $("#modal-text").append(`<input id="titleinput" name="title" placeholder="Title"> 
          <textarea id="bodyinput" name="body"> </textarea>
          <button data-id= "${data._id}" id="save-note"> Save Note </button>`)

            if (data.note.length > 0) {

                let $li = data.note.map(function (note) {

                    let $li = `<li data-id="${note._id}" class="list-group-item" id="saved-note">
                    <p id="note-title">${note.title}</p> 
                    <button type="button" href="/delete/${note._id}" class="btn btn-outline-danger btn-sm" id="notes-del-button" data-id="${note._id}">&times</button>
                    <p id="note-body">${note.body}</p> </li>`

                    return $li;
                });
                $("#saved-notes").empty();
                $("#saved-notes").append($li);
            }

        })

};



function saveNote() {
    let noteId = $(this).attr("data-id");

    $.ajax({
        method: "POST",
        url: "/articles/" + noteId,
        data: {
            title: $("#titleinput").val().trim(),
            body: $("#bodyinput").val().trim()
        }
    })

        .then(function (data) {
            $("#titleinput").val("");
            $("#bodyinput").val("");
            console.log(data + "  TEST");
            refreshNotes(noteId);
        })
};



function refreshNotes(noteId) {

    $.ajax({
        method: "GET",
        url: "/articles/" + noteId
    })

        .then(function (data) {

            let $li = data.note.map(function (note) {

                let $li = `<li data-id="${note._id}" class="list-group-item" id="saved-note">
                <p id="note-title">${note.title}</p> 
                <button type="button" href="/note/delete/${note._id}" class="btn btn-outline-danger btn-sm" id="notes-del-button" data-id="${note._id}">&times</button> 
                <p id="note-body">${note.body}</p> 
                </li>`;

                return $li;
            });
            $("#saved-notes").empty();
            $("#saved-notes").append($li);
        })
};













