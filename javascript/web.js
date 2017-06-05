$( document ).ready(function() {

  var animalsArray = ["dog", "cat", "rabbit", "hampster", "skunk", "goldfish", "bird", "ferret", "turtle", "sugar glider", "chinchilla", "hedgehog", "hermit crab", "gerbil", "pygmy goat", "chicken", "capybara", "teacup pig", "serval", "salamander", "frog"];

  function renderButtons() {

    $("#animals-view").empty();

    for (var i = 0; i < animalsArray.length; i++) {
      var animalsButton = $("<button>");
      animalsButton.addClass("gif");
      animalsButton.attr("data-name", animalsArray[i]);
      animalsButton.text(animalsArray[i]);
      $("#animals-view").append(animalsButton);
    }
  }
  
  function displayAnimals() {
    var animal = $(this).attr("data-name");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
      animal + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
      })

    .done(function(response) {

      var results = response.data;

      for (var i = 0; i < results.length; i++) {
        var gifDiv = $("<div class='item'>");
        var rating = results[i].rating;
        var p = $("<p>").text("Rating: " + rating);


        // Somewhere in these two lines of code I would have to set the data still and animation properties, but no clue.
        var animalImage = $("<img>");
        animalImage.attr("src", results[i].images.fixed_height.url);



        gifDiv.append(p);
        gifDiv.append(animalImage);
        $("#gifs-appear-here").prepend(gifDiv);
      }
    });
  }

  $("#add-animal").on("click", function(event) {

    event.preventDefault();

    var animalUserInput = $("#animal-input").val().trim();
    animalsArray.push(animalUserInput);
    renderButtons();
  })

  $(document).on("click", ".gif", displayAnimals);
  renderButtons();

  $(".gif").on("click", function() {
    var state = $(this).attr("data-state");

    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
  });
});
