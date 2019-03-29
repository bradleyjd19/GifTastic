// Hold all script until page loads
$(document).ready(function () {

  var teams = [

    team1 = {
      name: "Virginia Cavaliers",
      song: "./assets/sounds/UVA.mp3",
      background: "url('./assets/images/UVA.jpg')",
      border: "orange"
    },

    team2 = {
      name: "North Carolina Tar Heels",
      song: "./assets/sounds/UNC.mp3",
      background: "url('./assets/images/UNC.jpg')",
      border: "skyblue"
    },

    team3 = {
      name: "Kansas Jayhawks",
      song: "./assets/sounds/Kansas.mp3",
      background: "url('./assets/images/UNC.jpg')",
      border: "dodgerblue"
    },

    // team4 = {
    //   name: "Indiana Hoosiers", 
    // },

    // team5 = {
    //   name: "Michigan State Spartans",
    //   song: "./assets/sounds/MSU.mp3",
    //   background: "url('./assets/images/UNC.jpg')"
    // },

    // team6 = {
    //   name: "Kentucky Wildcats",
    //   song: "./assets/sounds/UK.mp3",
    //   background: "url('./assets/images/UNC.jpg')"
    // },

    // team7 = {
    //   name: "Tennessee Volunteers", 
    // },

    // team8 = {
    //   name: "Wisconsin Badgers", 
    // },

    // team9 = {
    //   name: "Arizona Wildcats",
    //   song: "./assets/sounds/Zona.mp3",
    //   background: "url('./assets/images/UNC.jpg')"
    // },

    // team10 = {
    //   name: "Duke Blue Devils", 
    // }
  ]


  function createButton() {
    $("#buttonBlock").empty();
    for (var i = 0; i < teams.length; i++) {
      var itemButton = $("<button>");
      itemButton
        .attr("id", "item-button")
        .attr("data-name", teams[i].name)
        .attr("background", teams[i].background)
        .attr("border", teams[i].border)
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
    
    var teamAudio = document.getElementById("teamAudio");
    teamAudio.play();
    teamAudio.volume = 0.2;
      
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
          p1.text("Title: " + title);
          var p2 = $("<p>");
          p2.text("Rating: " + rating);
          var downloadLink = $("<a>");
          downloadLink
            .attr("href", image.fixed_height.url)
            .attr("value", "download");
          var downloadButton = $("<button>");
          downloadButton
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

  $(document).on("click", "#item-button", displayItem);


  $("#add-item").on("click", function (event) {
    event.preventDefault();
    var item = $("#item-input").val().trim();
    teams.push(item);    
    $("#item-input").val("");
    console.log(teams);
    createButton();
  })


});