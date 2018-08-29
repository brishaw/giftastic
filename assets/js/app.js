

// my array of strings...
var topics = ["music", "guitars", "shaolin", "kung-fu", "usmc", "devil dog", "new balance", "running", "technology", "programming", "coding", "metal"];

var cols = ["one", "two", "three"];

var imgArr = [];

function displayTopicInfo() {

    var topic = $(this).attr("data-topic");

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=lGNx50F6NOhKeyW9vGDG7TSYe6QU5uOY&limit=12";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
       
        //console.log(response);
        


    
        // storing the data from the AJAX request in the results variable
        var results = response.data;

        
        

        // Looping through each result item
        for (var i = 0; i < results.length; i++) {

            

            var rating = response.data[i].rating;
            
            //console.log(rating);
            
            var p = $("<p>").text("Rated: " + rating);
            
            var icon = "<a href='' download><i class='topic-i fas fa-cloud-download-alt'></i></a>";

            // Creating and storing an image tag
            var topicImage = $("<img>");

            topicImage.addClass("still giphy");
            
            // Setting the src attribute of the image to a property pulled off the result item

            // var still_image = topicImage.attr("src", results[i].images.fixed_width_still.url);

            // var animated_image = topicImage.attr("src", results[i].images.fixed_width.url);

            // var state = topicImage.attr("src", results[i].images.fixed_width_still.url);

            topicImage.attr("src", results[i].images.fixed_width_still.url);

            // topicImage.addClass("still");

            // Appending the paragraph and image tag to the animalDiv

            // topicDiv.append(topicImage);
            // topicDiv.append(p);
        

            // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
            
            p.append(icon);

            $("#my-images").prepend(p);

            $("#my-images").prepend(topicImage);

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
        })
  
        //******** attempt ONE ************ */
        // $("#my-images img").on("click", function(){
        //     imgArr = [];

        //     imgArr.push(this);

        //     console.log(imgArr[0].currentSrc);

        //     var modImgArr = [imgArr[0].currentSrc];

        //     console.log("modImgArr: " + modImgArr);
        // })
        // en **** attempt ONE ***

    }) // end ajax response

   
} // end displayTopicInfo
        



// $(function () {
//     $('img').each(function (e) {
//         var src = $(e).attr('src');
//         $(e).hover(function () {
//             $(this).attr('src', src.replace('.gif', '_anim.gif'));
//         }, function () {
//             $(this).attr('src', src);
//         });
//     });
// });



    function renderButtons() {

    $("#my-buttons").empty();

    for(i=0; i < topics.length; i++) {

        // jquery button into a variable...my plan is to loop this variable...
        var a = $("<button>");

        //a.addClass("col-md-4");

        a.addClass("topic col-md-3 my-col");

        a.attr("data-topic", topics[i]);

        a.text(topics[i]);

        $("#my-buttons").append(a);
        }

} // end renderButtons();

// user adds topic button with form from top of the page

$("#add-topic").on("click", function(event){

    event.preventDefault();

    var topicInput = $("#topic-input").val().trim();

    topics.push(topicInput);

    renderButtons();

}) // end add-topic

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







