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

function getCity(city) {
    city = $("input").val()

    var queryURL = `https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={apiKey}`;
    appendHistory(city)

    //Fetch info for city entered into locator.
    fetch(queryURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var lon = data.coord.lon
            var lat = data.coord.lat
            fiveDay(lat, lon)

            console.log(data)
        })
}

//Display previous locations

function appendHistory(city) {
    var history = $("<div>").text(city).addClass("card")
    $("#history").append(history);
}

function fiveDay(lat, lon) {
    city = $("input").val()

    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appleid=${apiKey}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var today = moment().format('dddd');
            var day2Day = moment().add(1, 'days').format('dddd');
            var day3Day = moment().add(2, 'days').format('dddd');
            var day4Day = moment().add(3, 'days').format('dddd');
            var day5Day = moment().add(4, 'days').format('dddd');

            var temp = data.list[0].main.temp
            var humidity = data.list[0].main.humidity
            var windSpeed = data.list[0].wind.speed
            var weatherIcon = data.list[0].weather[0].icon
            var iconUrl = `https://openweathermap.org/img/w/${weatherIcon}.png`

            var day1City = $("<p>").append("City: ", city);
            var day1Temp = $("<p>").append("Temp: ", temp, "°F");
            var day1Humidity = $("<p>").append("Humidity: ", humidity,"%");
            var day1Wind = $("<p>").append("Windspeed: ", windSpeed, "mph");
            var iconImage = $("<img>").attr({src: iconUrl});

            //Current day display
            $("#day1main").empty();
            $("#day1main").append(day1Temp);
            $("#day1main").append(day1Humidity);
            $("#day1main").append(day1Wind);
            $("#day1main").append(today);
            $("#day1main").append(iconImage);
            $("#day1main").append(day1City);

            //Current day forecast display
            $("#day1").empty();
            $("#day1").append(day1Temp);
            $("#day1").append(day1Humidity);
            $("#day1").append(day1Wind);
            $("#day1").append(today);
            $("#day1").append(iconImage);

            //Day 2 forecast display
            var temp2 = data.list[1].main.temp
            var humidity2 = data.list[1].main.humidity
            var windSpeed2 = data.list[1].wind.speed
            var weatherIcon2 = data.list[1].weather[0].icon
            var iconUrl2 = `https://openweathermap.org/img/w/${weatherIcon2}.png`

            var day2Temp = $("<p").append("Temp: ", temp2, "°F" );
            var day2Humidity = $("<p>").append("Humidity: ", humidity2, "%");
            var day2Wind = $("<p>").append("Windspeed: ", windSpeed2, "mph");
            var iconImage2 = $("<img>").attr({src: iconUrl2});

            $("#day2").empty();
            $("#day2").append(day2Temp);
            $("day2").append(day2Humidity);
            $("day2").append(day2Wind);
            $("day2").append(iconImage2);
        })

}

$("#searchBtn").on("click", getCity)

var title = $("<p>").text("5-day Weather Forecast")

$("#currentDay").text(today.format("dddd, MMM Do, YYYY"));
$("#currentDay").append(title)