

// my array of strings...
var topics = ["music", "guitars", "shaolin", "kung-fu", "usmc", "devil dog", "new balance", "running", "technology", "programming", "coding", "metal"];

var cols = ["one", "two", "three"];

var imgArr = [];

var offset = 0;

// begin displayTopicInfo
// this function will pull 10 images from giphy based on the topic button that was clicked
function displayTopicInfo() {

     console.log("first offset= " + offset);

    var topic = $(this).attr("data-topic");

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=lGNx50F6NOhKeyW9vGDG7TSYe6QU5uOY&limit=10&offset=" + offset + "";

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

            // Creating and storing an image tag
            var topicImage = $("<img>");

            var p = $("<p>").html("Rated: <strong>" + rating + "</strong>");

            p.addClass("info");

            var dl = results[i].images.fixed_width.url;

            var icon = "<a href=" + dl + " download=" + dl +" target='_blank'><i class='topic-i fas fa-cloud-download-alt'></i></a>";

            topicImage.addClass("still giphy blue-tooltip");
            
            // Setting the src attribute of the image to a property pulled off the result item
            topicImage.attr("src", results[i].images.fixed_width_still.url);

            topicImage.attr("data-toggle", "tooltip");

            topicImage.attr("title", response.data[i].title.charAt(0).toUpperCase() + response.data[i].title.slice(1).replace("GIF", ""));

            // Appending the paragraph and image tag             
            p.append(icon);

            wrap.prepend(p);

            wrap.prepend(topicImage);

            $("#my-images").prepend(wrap);

            console.log("topic image: " + topicImage);

            // call the bootstrap tooltip function
            $("[data-toggle='tooltip']").tooltip();
            
        } // end loop

        // adding 10 to the offset variable to provide new content (gifs) each time a button is clicked
        offset = (offset++) + 10;
        console.log("offset= " + offset);
        
    }) // end ajax response

} // end displayTopicInfo

function displayWeatherInfo() {
    
    function getLocation() {
        
        var geolocation = navigator.geolocation;

        geolocation.getCurrentPosition(showLocation);
    }

    function showLocation(position) {

        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;

        $("#location").text("Your location: " + latitude + ", " + longitude);

        $("#location").addClass("wx-location");
    }

    getLocation();

    var wxQueryURL = "https://api.openweathermap.org/data/2.5/group?id=4460162,4464368,4487042&units=imperial&APPID=1ed6912e3f31b4ce678c0998a30021be";

    $.ajax({
        url: wxQueryURL,
        method: "GET"
    }).then(function (wxResponse) {

        console.log(wxResponse);

        console.log(wxResponse.list[0].name); // city in triangle (0-chapel hill, 1-durham, 2-raleigh)

        console.log(wxResponse.list[0].main.temp);

        for(i = 0; i < wxResponse.cnt; i++) {

            // container for the wx info
            var wxInfo = $("<li>");
            console.log("initial wxInfo: " + wxInfo);
            
            // city
            var city = wxResponse.list[i].name;
            console.log("city: " + city);

            // wx
            var cityWx = wxResponse.list[i].main.temp;
            console.log("cityWx: " + cityWx);

            // add variables to the empty <li>
            wxInfo.append(city + " ");
            wxInfo.append(cityWx);
            console.log("wxInfo: " + wxInfo);

            // add class to ul
            $("#wx-slider").addClass("wx-slider-style");

            // add li to ul
            $("#wx-slider").append(wxInfo);

            
        } // end for loop

        

        // var wxResults = wxResponse;
        // var wxName = wxResponse.name;
        // var wxData = wxResponse.main.temp;

        // console.log(wxResults, wxName, wxData);

        // $("#wx-info").addClass("wx-style");  
        // $("#wx-info").text(" " + wxName + " " + wxData);
        
    }) // end wx ajax call

    // put the weather information into a slideshow-type style
    $("#wx-slider > li:gt(0)").hide();

    setInterval(function () {
        $('#wx-slider > li:first')
            .fadeOut(1000)
            .next()
            .fadeIn(1000)
            .end()
            .appendTo('#wx-slider');
    }, 3000);

} // end displayWeatherInfo

// begin pause/play function
// this function will start the images' animation on click and pause it when clicked again
$("#my-images").on("click", ".giphy", function () {

    var src = $(this).attr("src");
    //console.log(src);

    if ($(this).hasClass("still")) {

        // play

        $(this).attr("src", src.replace(/\_s.gif/i, ".gif"));
        $(this).removeClass("still");

    } else {

        // still

        $(this).addClass("still");
        $(this).attr("src", src.replace(/\.gif/i, "_s.gif"));

    }

}) // end pause/play function

// begin renderButtons()
// The main topic buttons that will generate the gifs...

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

displayWeatherInfo();


