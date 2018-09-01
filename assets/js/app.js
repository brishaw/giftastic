

// my array of strings...
var topics = ["music", "guitars", "shaolin", "kung-fu", "usmc", "devil dog", "new balance", "running", "technology", "programming", "coding", "metal"];

var cols = ["one", "two", "three"];

var imgArr = [];

function displayTopicInfo() {

    var topic = $(this).attr("data-topic");

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=lGNx50F6NOhKeyW9vGDG7TSYe6QU5uOY&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
    
        // storing the data from the AJAX request in the results variable
        var results = response.data;
        console.log(results);
        // Looping through each result item
        for (var i = 0; i < results.length; i++) {

            var wrap = $("<div>");
            wrap.addClass("col-sm-6 wrapper col-md-4 wrapper");

            var rating = response.data[i].rating.toUpperCase();
        
            //var title = response.data[i].title.charAt(0).toUpperCase() + response.data[i].title.slice(1).replace("GIF", "").trim().substring(0, 15).trim(this) + "...";
            

            // Creating and storing an image tag
            var topicImage = $("<img>");

            //var p = $("<p>").html("<strong>" + title + "</strong>" + "Rated: " + rating);
            //var p = $("<p>").text("Rated: " + rating);
            var p = $("<p>").html("Rated: <strong>" + rating + "</strong>");

            var dl = results[i].images.fixed_width.url;
            // var dl = results[i].embed_url;
            
            
            // var icon = "<a href=" + dl + " download" + dl + "><i class='topic-i fas fa-cloud-download-alt'></i></a>";

            var icon = "<a href=" + dl + " download=" + dl +"><i class='topic-i fas fa-cloud-download-alt'></i></a>";

            topicImage.addClass("still giphy");
            
            // Setting the src attribute of the image to a property pulled off the result item

            topicImage.attr("src", results[i].images.fixed_width_still.url);

            // Appending the paragraph and image tag to the animalDiv

            // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
            
            p.append(icon);

            //$("#my-images").prepend(p);
            wrap.prepend(p);

            // $("#my-images").prepend(topicImage);
            wrap.prepend(topicImage);

            $("#my-images").prepend(wrap);

            console.log("topic image: " + topicImage);

        } // end loop

        $("#my-images").on("click", ".giphy", function(){

            var src = $(this).attr("src");
            //console.log(src);

            if($(this).hasClass("still")) {

                // play

                $(this).attr("src", src.replace(/\_s.gif/i, ".gif"));
                $(this).removeClass("still");         
            
            } else {

                // still

                $(this).addClass("still");
                $(this).attr("src", src.replace(/\.gif/i, "_s.gif"));
                
            }
            
            imgArr.push(topicImage);
            console.log(imgArr);

        }) // end pause/play function

        

    }) // end ajax response
  
} // end displayTopicInfo

    function renderButtons() {

    $("#my-buttons").empty();

    for(i=0; i < topics.length; i++) {

        // jquery button into a variable...my plan is to loop this variable...
        var a = $("<button>");

        a.addClass("topic col-md-3 my-col");

        a.attr("data-topic", topics[i]);

        a.text(topics[i]);

        $("#my-buttons").append(a);

        $("#topic-input").val(" ");

    }

} // end renderButtons();

// user adds topic button with form from top of the page

$("#add-topic").on("click", function(event){

    event.preventDefault();

    var topicInput = $("#topic-input").val().trim();

    topics.unshift(topicInput);

    renderButtons();

}) // end add-topic

$(document).on("click", ".topic", displayTopicInfo);

renderButtons();






