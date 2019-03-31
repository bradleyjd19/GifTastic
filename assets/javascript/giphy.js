// Hold all script until page loads
$(document).ready(function () {

  var teams = [

    {
      name: "Virginia Cavaliers",
      song: "./assets/sounds/UVA.mp3",
      background: "url('./assets/images/UVA.jpg')",
      border: "#F84C1E",
      buttonColor: "#232D4B",
      textColor: "#F84C1E"
    },

    {
      name: "North Carolina Tar Heels",
      song: "./assets/sounds/UNC.mp3",
      background: "url('./assets/images/UNC.jpg')",
      border: "#7BAFD4",
      buttonColor: "#7BAFD4",
      textColor: "#FFF"
    },

    {
      name: "Kansas Jayhawks",
      song: "./assets/sounds/Kansas.mp3",
      background: "url('./assets/images/KU.jpg')",
      border: "#0051BA",
      buttonColor: "#0051BA",
      textColor: "#E8000D"
    },

    {
      name: "Michigan State Spartans",
      song: "./assets/sounds/MSU.mp3",
      background: "url('./assets/images/MSU.jpg')",
      border: "#18453B",
      buttonColor: "#18453B",
      textColor: "#FFFFFF"
    },

    {
      name: "Kentucky Wildcats",
      song: "./assets/sounds/UK.mp3",
      background: "url('./assets/images/UK.jpg')",
      border: "#0033A0",
      buttonColor: "#0033A0",
      textColor: "#FFFFFF"
    },

    {
      name: "Tennessee Volunteers",
      song: "./assets/sounds/Tenn.mp3",
      background: "url('./assets/images/Tenn.jpg')",
      border: "#FF8200",
      buttonColor: "#FF8200",
      textColor: "#FFFFFF"
    },

    {
      name: "Wisconsin Badgers",
      song: "./assets/sounds/Wisc.mp3",
      background: "url('./assets/images/Wisc.jpg')",
      border: "#C5050C",
      buttonColor: "#C5050C",
      textColor: "#FFFFFF"
    },

    {
      name: "Louisville Cardinals",
      song: "./assets/sounds/Louis.mp3",
      background: "url('./assets/images/Louis.jpg')",
      border: "#AD0000",
      buttonColor: "#AD0000",
      textColor: "#000000"
    },

    {
      name: "Ohio State Buckeyes",
      song: "./assets/sounds/OhioSt.mp3",
      background: "url('./assets/images/OhioSt.jpg')",
      border: "#BB0000",
      buttonColor: "#BB0000",
      textColor: "#FFFFFF"
    },

    {
      name: "Notre Dame Fighting Irish",
      song: "./assets/sounds/ND.mp3",
      background: "url('./assets/images/ND.jpg')",
      border: "#0C2340",
      buttonColor: "#0C2340",
      textColor: "#AE9142"
    }
  ]


  function createButton() {
    $("#buttonBlock").empty();
    for (var i = 0; i < teams.length; i++) {
      var itemButton = $("<button>");
      itemButton
        .addClass("item-button")
        .attr("data-name", teams[i].name)
        .attr("background", teams[i].background)
        .attr("border", teams[i].border)
        .attr("buttonColor", teams[i].buttonColor)
        .attr("textColor", teams[i].textColor)
        .text(teams[i].name)
        .attr("song", teams[i].song);
      $("#buttonBlock").append(itemButton);
    }
  }

  createButton();

  function displayItem() {
    var searchItem = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=Z2oqC6QA07XEayWCxxTuZiCVJIsR9OKl&q=" + searchItem + " basketball&limit=10&rating=PG&lang=en";


    $("#bgImg").css("background-image", $(this).attr("background"));
    $("#teamAudio").attr("src", $(this).attr("song"));
    $(".teamGif").css("border-color", $(this).attr("border"));
    $(".item-button").css("background-color", $(this).attr("buttonColor"));
    $(".item-button").css("color", $(this).attr("textColor"));
    $("#add-item").css("background-color", $(this).attr("buttonColor"));
    $("#add-item").css("color", $(this).attr("textColor"));
    $(".download-button").css("background-color", $(this).attr("buttonColor"));
    $(".download-button").css("color", $(this).attr("textColor"));
    $(".p-title").css("color", $(this).attr("textColor"));
    $(".p-rating").css("color", $(this).attr("textColor"));


    var teamAudio = document.getElementById("teamAudio");
    teamAudio.play();
    teamAudio.volume = 0.1;

    $.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(function (response) {
        var results = response.data;
        for (var i = 0; i < results.length; i++) {
          console.log(response);
          var image = results[i].images;
          var rating = results[i].rating;
          var title = results[i].title;
          var itemDiv = $("<div>");
          itemDiv.addClass("item");
          var img1 = $("<img>");
          img1
            .addClass("teamGif")
            .attr("src", image.fixed_height_still.url)
            .attr("data-still", image.fixed_height_still.url)
            .attr("data-animate", image.fixed_height.url)
            .attr("data-state", "still");
          var p1 = $("<p>");
          p1
            .addClass("p-title")
            .text("Title: " + title.toUpperCase());
          var p2 = $("<p>");
          p2
            .addClass("p-rating")
            .text("Rating: " + rating.toUpperCase());
          var downloadLink = $("<a>");
          downloadLink
            .attr("href", image.fixed_height.url)
            .attr("value", "download");
          var downloadButton = $("<button>");
          downloadButton
            .addClass("download-button")
            .text("Download GIF");
          downloadLink.append(downloadButton);
          itemDiv
            .append(img1)
            .append(p1)
            .append(p2)
            .append(downloadLink);
          $("#item-view").prepend(itemDiv);
        }
      });
  }

  $(document).on("click", ".teamGif", function () {
    var state = $(this).attr("data-state");
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    }
    else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  })

  $(document).on("click", ".item-button", displayItem);


  $("#add-item").on("click", function (event) {
    event.preventDefault();
    var item = $("#item-input").val().trim();
    teams.push({name: item, song: "./assets/sounds/User.mp3", background: "url('./assets/images/User.jpg"});
    $("#item-input").val("");
    console.log(teams);
    createButton();
  })


});