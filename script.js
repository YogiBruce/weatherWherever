// GIVEN a weather dashboard with form inputs

// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history

// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the the wind speed

// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity

// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city

//Variables for global scope
var today = moment();
var apiKey = "fa9deced30799df9282f5573c8325b98";
var searchBar = document.querySelector("input");
var city;

function getCity(city){
    city = $("input").val()

    var queryURL = 'https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={apiKey}';
    appendHistory (city)

    //Fetch info for city entered into locator.
    fetch(queryURL)
        .then(function (response){
            return response.json();
        })
        .then(function(data){
            var lon = data.coord.lon
            var lat = data.coord.lat
            fiveDay(lat, lon)
            
            console.log(data)
        })

}

$("#currentDay").text(today.format("dddd, MMM Do, YYYY"));
$("#currentDay").append(title)