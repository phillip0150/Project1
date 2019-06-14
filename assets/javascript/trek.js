//setting vars for user input as well as query's for apis
var userInput;
var currentLocation;
var queryYelp;
var queryNYT;
var querySky;
var queryWeather;

//first hiding divs
//when we click on the submit button and get a result, we will show divs
$("#eventSection").hide();
$("#foodSection").hide();
$("#travelSection").hide();
$("#weatherForecast").hide();

//a function to update weather
//if we get a response from the data base, we call this function
function updateWeather(weatherData){
    
    $("#weatherForecast").show();
}

//a function to update flights
//if we get a response from the data base, we call this function
function updateSky(skyData){

}

//a function to update NYT
//if we get a response from the data base, we call this function
function updateNYT(nytData){
    $("#travelSection").show();
}

function updateYelp(yelpData){
    $("#eventSection").show();
    $("#foodSection").show();
}

//When a button is clicked, we want to grab that value and use that value to search our apis
$("#searchButton").on("click", function() {
    //we want to get the users input
    //we do that by getting the id of the input and then the val
    userInput = $("#searchInput").val();

    //next we want to set a query's
    queryWeather = "Whatever the url is"+userInput+"api key";
    querySky = "Whatever the url is"+userInput+"api key";
    queryNYT = "Whatever the url is"+userInput+"api key";
    queryYelp = "Whatever the url is"+userInput+"api key";

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
        url: queryYelp,
        method: "GET"
    }).then(updateYelp);
   
});