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

//a function to update weather
//if we get a response from the data base, we call this function
function updateWeather(weatherData){
    var weatherTemp = ((weatherData.main.temp-273.15)* 1.80 + 32);
    var weatherSky = weatherData.weather[0].main;
    var weatherIcon = weatherData.weather[0].icon;
    console.log(weatherSky);
    $("#weatherHeader").text("Weather Forecast for " +userInput);
    $("#tempText").text(Math.round(weatherTemp)+ " ºF ");
    $("#tempText").append("<img src=https://openweathermap.org/img/w/"+weatherIcon+".png>");
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

    }

    $("#travelSection").show();
}

function updateYelp(yelpData){
    $("#eventsSection").show();
    $("#foodSection").show();


}

//When a button is clicked, we want to grab that value and use that value to search our apis
$("button").on("click", function() {
    console.log("in button click");
    //we want to get the users input
    //we do that by getting the id of the input and then the val
    userInput = $("#searchInput").val().trim();
    console.log(userInput);

    //next we want to set a query's
    queryWeather = "https://api.openweathermap.org/data/2.5/weather?q="+userInput+",US&appid=e921e4ee26a025090f4ff9b62f27ad89";
    // querySky = "Whatever the url is"+userInput+"api key";
    queryNYT = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q="+userInput+"&fq=headline:(36 hours "+userInput+")&fq=section_name:(Travel)&api-key=vMdLSfd0YAZw8KWXtnoXqszuA5lKGB1T";
    // queryYelp = "Whatever the url is"+userInput+"api key";

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