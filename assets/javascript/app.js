var queryURL = "https://api.giphy.com/v1/gifs/trending?api_key=95rwhoPJYSBsC6SoYkUgvPkzeaB769U9";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log(response);
      var results = response.data;
      console.log(results[1]);
    });
 
//initial array of giphies
var giphies = ["daulphins", "pigeons", "bears"];
function renderButtons(){
    $("#giphies-view").empty();
    for(var i = 0; i < giphies.length; i++){
        var a = $("<button>");
        a.addClass("giphy");
        a.attr("data-name", giphies[i]);
        a.text(giphies[i]);
        $("#giphies-view").append(a);
    }
}    
// This function handles events where one button is clicked
$("#add-giphy").on("click", function(event) {
    // event.preventDefault() prevents the form from trying to submit itself.
    // We're using a form so that the user can hit enter instead of clicking the button if they want
    event.preventDefault();

    // This line will grab the text from the input box
    var giphy = $("#giphy-input").val().trim();
    // The movie from the textbox is then added to our array
    giphies.push(giphy);

    // calling renderButtons which handles the processing of our movie array
    renderButtons();
  });

  // Calling the renderButtons function at least once to display the initial list of movies
  renderButtons();
