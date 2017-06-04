$( document ).ready(function() {

  var animalsArray = ["dog", "cat", "rabbit", "hampster", "skunk", "goldfish", "bird", "ferret", "turtle", "sugar glider", "chinchilla", "hedgehog", "hermit crab", "gerbil", "pygmy goat", "chicken", "capybara", "teacup pig", "serval", "salamander", "frog"];

  function renderButtons() {

    //$("#animals-view").empty();

    for (var i = 0; i < animalsArray.length; i++) {
      var animalsButton = $("<button>");
      animalsButton.addClass("gif");
      animalsButton.attr("data-name", animalsArray[i]);
      animalsButton.text(animalsArray[i]);
      $("#animals-view").append(animalsButton);
    }
  }
  
  $("button").on("click", function() {
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
        var animalImage = $("<img>");
        animalImage.attr("src", results[i].images.fixed_height.url);
        gifDiv.append(p);
        gifDiv.append(animalImage);
        $("#gifs-appear-here").prepend(gifDiv);
      }
    });
  });

  $("#add-animal").on("click", function() {

    event.preventDefault();

    var animalUserInput = $("#animal-input").val().trim();
    animalsArray.push(animalUserInput);
    renderButtons();
    /* var newAnimalButton = $("<button>");
    newAnimalButton.addClass("gif");
    newAnimalButton.attr("data-name", animalUserInput);
    newAnimalButton.text(animalUserInput);
    $("#animals-view").append(newAnimalButton); */
  })
  renderButtons();

});
