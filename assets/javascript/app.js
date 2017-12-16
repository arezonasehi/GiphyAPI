

var animals = ["dog", "cat", "alligator", "alpaca", "ant", "cobra", "bear", "kitten", "panda"];
console.log(animals);


function displayGifs() {
	$("#animalGifs").empty(); 
    var word = $(this).attr("data-name");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + word + "&api_key=dc6zaTOxFJmzC&limit=10";
	
	$.ajax({
		url: queryURL,
		method: "GET"
	})
	.done(function(response) {
	  var results = response.data;
	  for (var i = 0; i < results.length; i++) {
	    var rating = results[i].rating;
	    var p = $("<p>").text("Rating: " + rating);
	    var square = $("<div class='imgClass'>");
	    square.append(p);
	    var imgURL = $("<img>");
	    imgURL.attr("src", results[i].images.fixed_height_still.url);
	    imgURL.attr("data-still", results[i].images.fixed_height_still.url);
        imgURL.attr("data-animate", results[i].images.fixed_height.url);
        imgURL.attr("data-state", "still");
        imgURL.addClass("imgClass");
	    square.append(imgURL);
	    $("#animalGifs").append(square);
	    
	  }

		  $(".imgClass").on("click", function(){
				var state = $(this).attr("data-state");
				console.log(state);
				if (state == "still"){
				    $(this).attr("src", $(this).data("animate"));
				    $(this).attr("data-state", "animate");
				} else{
				    $(this).attr("src", $(this).data("still"));
				    $(this).attr("data-state", "still");
				}

			});

		});
	
}

function renderButtons() {
    $("#animalStuff").empty(); 
    for (var i = 0; i < animals.length; i++){
        var gifButton = $("<button class='animal btn btn-primary'>");
        gifButton.attr("data-name", animals[i]);
        gifButton.text(animals[i]);
        $("#animalStuff").append(gifButton);
    }
}


$("#animalSubmit").on("click", function(event){
	event.preventDefault();
	var newAnimal = $("#animal-input").val().trim();
	if (newAnimal == "") {
		return false;
	}
	animals.push(newAnimal);
	renderButtons();
	return false;
})

$(document).on("click", ".animal", displayGifs);
renderButtons();



