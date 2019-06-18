//setting vars for user input as well as query's for apis
var userInput;
var currentLocation;
var queryYelp;
var queryNYT;
var querySky;
var queryWeather;


    //first hiding divs
//when we click on the submit button and get a result, we will show divs
$("#eventsSection").hide();
$("#foodSection").hide();
$("#travelSection").hide();
$("#weatherForecast").hide();
$("#museumSection").hide();
$(".container").hide();




var placesAutocomplete = places({
    appId: 'plX4APBGR5XG',
    apiKey: 'a0250e396f720f7da8e49b95796ec378',
    container: document.querySelector('#searchInput')
  }).configure({
    type: 'city',
    hitsPerPage: 1,
    aroundLatLngViaIP: true
  });


//a function to update weather
//if we get a response from the data base, we call this function
function updateWeather(weatherData){
    var weatherTemp = ((weatherData.main.temp-273.15)* 1.80 + 32);
    var weatherSky = weatherData.weather[0].main;
    var weatherIcon = weatherData.weather[0].icon;
    $("#weatherHeader").text("Weather Forecast for " +userInput);
    $("#tempText").text(Math.round(weatherTemp)+ " ºF ");
    $("#tempText").append("<img src=https://openweathermap.org/img/w/"+weatherIcon+".png>");
    $(".container").show();
    $("#weatherForecast").show();
}

//a function to update flights
//if we get a response from the data base, we call this function
function updateSky(skyData){

}

//a function to update NYT
//if we get a response from the data base, we call this function
function updateNYT(nytData){
    for(var i =0; i<4; i++){
        var article = nytData.response.docs;
        $("#travelURL"+i).attr("href", nytData.response.docs[i].web_url);
        $("#headTravel"+i).text(nytData.response.docs[i].headline.main);
        $("#nytButton"+i).attr("href", nytData.response.docs[i].web_url);
        $("#nytButton"+i).attr("target", "_blank");

    }
    $(".container").show();
    $("#travelSection").show();
}

function updateYelpFood(yelpData){
    for(var i=0; i<yelpData.businesses.length ; i++){
        //set rb as response.businesses
        var rb = yelpData.businesses[i];
        //set variables from the API to the variables
        var name = rb.name;
        var price = rb.price;
        var rating = rb.rating; 
        var yelpLink = rb.url;
        var picture = rb.image_url;

        $("#cardFoodImage"+i).attr("src", picture);
        $("#cardFoodLink"+i).attr("href", yelpLink);
        $("#cardFoodTitle"+i).text(name);
        $("#foodPrice"+i).text("Price: " + price);
        $("#foodRating"+i).text("Rating: " + rating +" Stars");
        $("#foodButton"+i).attr("href", yelpLink);
        $("#foodButton"+i).colorbox({iframe:true, width:"80%", height:"80%"});
        }

    $(".container").show();

    $("#foodSection").show();
}

function updateYelpEvent(yelpEvent){


            for(var j=0; j<yelpEvent.events.length; j++){
            //  set rt as response.businesses
            var rt = yelpEvent.events[j];
            //set variables from the API to the variables
            var nameEvent = rt.name;
            var description = rt.description;
            var free = rt.is_free;
            var eventUrl = rt.event_site_url;
            var imageEvent = rt.image_url;
            $("#eventImage"+j).attr("src", imageEvent);
            $("#eventTitle"+j).text(nameEvent);
            $("#descEvent"+j).text(description);
            if(free === true){
                $("#freeEvent"+j).text("The event is free!");
            }
            else{
                $("#freeEvent"+j).text("Sorry, this event is not free.");
            }
            $("#eventButton"+j).attr("href", eventUrl);
            $("#eventButton"+j).attr("target", "_blank");


          
            }
            $(".container").show();
            $("#eventsSection").show();
           
        }


function updateYelpPlaces(yelpPlaces){
   
            for(var j=0; j<yelpPlaces.businesses.length; j++){
            //  set rt as response.businesses
            var place = yelpPlaces.businesses[j];
            //set variables from the API to the variables
            var namePlace = place.name;
            var closedPlace = place.is_closed;
            var ratingPlace = place.rating;
            var linkPlace = place.url;
            var imagePlace = place.image_url;
            $("#museumImage"+j).attr("src", imagePlace);
            $("#museumTitle"+j).text(namePlace);
            if(closedPlace === false){
                $("#museumPrice"+j).text("Sorry, the museum is closed");
            }
            else{
                $("#museumPrice"+j).text("Yay! the museum is open!");
            }
            $("#museumRating"+j).text("Rating: "+ratingPlace +" Stars");
            $("#museumButton"+j).attr("href", linkPlace);
            $("#museumButton"+j).attr("target", "_blank");
            }
            $(".container").show();
            $("#museumSection").show();
        }




//When a button is clicked, we want to grab that value and use that value to search our apis
$("#searchButton").on("click", function() {
    //setting position back
    $("#searchSection").attr("style", " ");
    // Velocity JS Animation for logo
    $("#navLogo, #navTagline").velocity("fadeIn", { duration: 1500 });
    // End animation for logo
    
    //we want to get the users input
    //we do that by getting the id of the input and then the val
    userInput = $("#searchInput").val().trim();
    var nowInMillisconds = parseInt(moment().format('x'));
    var nowInSeconds = Math.floor(nowInMillisconds/1000);
    //next we want to set a query's
    queryWeather = "https://api.openweathermap.org/data/2.5/weather?q="+userInput+",US&appid=e921e4ee26a025090f4ff9b62f27ad89";
    // querySky = "Whatever the url is"+userInput+"api key";
    queryNYT = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q="+userInput+"&fq=headline:(36 hours "+userInput+")&fq=section_name:(Travel)&api-key=vMdLSfd0YAZw8KWXtnoXqszuA5lKGB1T";
    queryYelpFood= "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?location="+userInput+"&limit=10";
    queryYelpEvents = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/events?location="+userInput+"&limit=9&start_date="+nowInSeconds+"&sort_on=time_start&sort_by=asc";
    queryYelpPlaces = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?location="+userInput+"&categories=museums&limit=10";
    
    //next we are going to call our api's
    //using a ajax call, we call our url and methond
    //when we get a response, we update each section;
    $.ajax({
        url: queryWeather,
        method: "GET"
    }).then(updateWeather);
    
    $.ajax({
        url: querySky,
        method: "GET"
    }).then(updateSky);

    $.ajax({
        url: queryNYT,
        method: "GET"
    }).then(updateNYT);

    $.ajax({
        url: queryYelpFood,
        headers: {
            'Authorization':'Bearer 2ozrOdoM-iqGVuP5uozgiBk6CunvT4pCllsN7PdRctZR63EopSt0ZruMP-E6Xiv7YOzffRRDGwVqUUwMLjVdKlYk_n49Q9d7WpshV0LSbgThn9oclFErTIuS14ECXXYx',
           },
        method: "GET"
    }).then(updateYelpFood);
   

    $.ajax({
        url: queryYelpEvents,
        headers: {
            'Authorization':'Bearer 2ozrOdoM-iqGVuP5uozgiBk6CunvT4pCllsN7PdRctZR63EopSt0ZruMP-E6Xiv7YOzffRRDGwVqUUwMLjVdKlYk_n49Q9d7WpshV0LSbgThn9oclFErTIuS14ECXXYx',
           },
        method: "GET"
    }).then(updateYelpEvent);

    $.ajax({
        url: queryYelpPlaces,
        headers: {
            'Authorization':'Bearer 2ozrOdoM-iqGVuP5uozgiBk6CunvT4pCllsN7PdRctZR63EopSt0ZruMP-E6Xiv7YOzffRRDGwVqUUwMLjVdKlYk_n49Q9d7WpshV0LSbgThn9oclFErTIuS14ECXXYx',
           },
        method: "GET"
    }).then(updateYelpPlaces);
});

