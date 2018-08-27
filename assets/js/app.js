

// my array of strings...
var topics = ["music", "guitars", "shaolin", "kung-fu", "usmc", "devil dog", "new balance", "running", "technology", "programming", "coding", "metal"];

var cols = ["one", "two", "three"];

function displayTopicInfo() {

    var topic = $(this).attr("data-topic");

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=lGNx50F6NOhKeyW9vGDG7TSYe6QU5uOY&limit=12";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

    console.log(response);
        // storing the data from the AJAX request in the results variable
        var results = response.data;

        // Looping through each result item
        for (var i = 0; i < results.length; i++) {
        // Creating and storing an image tag
        var topicImage = $("<img>");
        // Setting the src attribute of the image to a property pulled off the result item
        topicImage.attr("src", results[i].images.fixed_width.url);

        // // Appending the paragraph and image tag to the animalDiv
        // animalDiv.append(p);
        // animalDiv.append(animalImage);

        // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
        $("#my-images").prepend(topicImage);
        
        }

    }) // end ajax response
}
        

    function renderButtons() {

    $("#my-buttons").empty();

    for(i=0; i < topics.length; i++) {

        // jquery button into a variable...my plan is to loop this variable...
        var a = $("<button>");

        //a.addClass("col-md-4");

        a.addClass("topic col-md-3");

        a.attr("data-topic", topics[i]);

        a.text(topics[i]);

        $("#my-buttons").append(a);
        }

} // end renderButtons();


$(".topic").on("click", function (event) {
    event.preventDefault();

});


$(document).on("click", ".topic", displayTopicInfo);

renderButtons();


// function renderColumns() {

//     $("#my-columns").empty();

//     for (j = 0; j < topics.length; j++) {

//         // jquery button into a variable...my plan is to loop this variable...
//         var c = $("<div>");
//         c.addClass("col-md-4");
//         c.text("columns from LOOPS"+[j]);
//         $("#my-columns").append(c);
//     }

// } // end renderColumns();

// renderColumns();







