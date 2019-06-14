//We need to caputre user input example: Austin, Tx
//We need to get that input and use our api's to get reuslts

var userInput;
var currentLocation;
var queryYelp;
var queryNYT;
var querySky;
var queryWeather;

//first hiding divs, when we get a result, we will show div
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
    userInput = $("#searchInput").val();
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