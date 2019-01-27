$(document).ready(function(){ 
//initial array of giphies
var giphies = ["cat", "pigeon", "bears"];
function renderButtons(){
    $("#giphies-view").empty();
    for(var i = 0; i < giphies.length; i++){
        var a = $("<button>");
        a.addClass("giphy btn btn-warning");
        a.attr("data-name", giphies[i]);
        a.text(giphies[i]);
        $("#giphies-view").append(a);
        renderImages();
    }
}    

// This function handles events where one button is clicked
$("#add-giphy").on("click", function(event) {    
    // event.preventDefault() prevents the form from trying to submit itself.
    // We're using a form so that the user can hit enter instead of clicking the button if they want
    event.preventDefault();
    
    // This line will grab the text from the input box
    var giphy = $("#giphy-input").val().trim().toLowerCase();
    // The movie from the textbox is then added to our array
    if(giphies.includes(giphy)){
        return;
    }
    giphies.push(giphy.toLowerCase());
    // calling renderButtons which handles the processing of our movie array
    renderButtons();
  });

  function renderImages(){
    $(".giphy").on("click", function(){
        var giphy2 = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            giphy2 + "&api_key=dc6zaTOxFJmzC&limit=10";
            
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            var results = response.data;
            console.log(results);
            for (let i = 0; i < results.length; i++) {
                var giphyDiv = $("<div>");
                var p = $("<p>").text("Rating: " + results[i].rating + " Title: " + results[i].title);
                p.addClass("font-weight-bold");
                var image = $("<img>");
                image.attr("src", results[i].images.fixed_height_still.url);
                image.attr("data-still", results[i].images.fixed_height_still.url);  
                image.attr("data-animate", results[i].images.fixed_height.url);
                image.addClass("gif");
                image.attr("data-state", "still");
                giphyDiv.append(p);
                giphyDiv.append(image);
                $("#gifs-appear-here").prepend(giphyDiv);
            }

            $(".gif").on("click", function() {
                // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
                var state = $(this).attr("data-state");
                // If the clicked image's state is still, update its src attribute to what its data-animate value is.
                // Then, set the image's data-state to animate
                // Else set src to the data-still value
                if (state === "still") {
                  $(this).attr("src", $(this).attr("data-animate"));
                  $(this).attr("data-state", "animate");
                } else {
                  $(this).attr("src", $(this).attr("data-still"));
                  $(this).attr("data-state", "still");
                }
              });

        });
     });
  }

  // Calling the renderButtons function at least once to display the initial list of movies
  renderButtons();
});
