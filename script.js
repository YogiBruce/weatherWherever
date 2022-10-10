//Variables for global scope
var today = moment();
var apiKey = "fa9deced30799df9282f5573c8325b98";
var searchBar = document.querySelector("input");
var city;

//Set city through API call on lon/lat of input
function getCity(city) {
    city = $("input").val()

    var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
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
        })
}

//Display previous locations

function appendHistory(city) {
    var history = $("<div>").text(city).addClass("col s12 card")
    $("#history").append(history);
}

//Generate forecasts for current city
function fiveDay(lat, lon) {
    city = $("input").val()

    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appleid=${apiKey}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var today = moment().format('dddd');
            // var day2Day = moment().add(1, 'days').format('dddd');
            // var day3Day = moment().add(2, 'days').format('dddd');
            // var day4Day = moment().add(3, 'days').format('dddd');
            // var day5Day = moment().add(4, 'days').format('dddd');

            var temp = data.list[0].main.temp
            var humidity = data.list[0].main.humidity
            var windSpeed = data.list[0].wind.speed
            var weatherIcon = data.list[0].weather[0].icon
            var iconUrl = `https://openweathermap.org/img/w/${weatherIcon}.png`

            var day1City = $("<p>").append("City: ", city);
            var day1Temp = $("<p>").append("Temp: ", temp, "°F");
            var day1Humidity = $("<p>").append("Humidity: ", humidity, "%");
            var day1Wind = $("<p>").append("Windspeed: ", windSpeed, "mph");
            var iconImage = $("<img>").attr({ src: iconUrl });

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

            var day2Temp = $("<p").append("Temp: ", temp2, "°F");
            var day2Humidity = $("<p>").append("Humidity: ", humidity2, "%");
            var day2Wind = $("<p>").append("Windspeed: ", windSpeed2, "mph");
            var iconImage2 = $("<img>").attr({ src: iconUrl2 });

            $("#day2").empty();
            $("#day2").append(day2Temp);
            $("day2").append(day2Humidity);
            $("day2").append(day2Wind);
            $("day2").append(iconImage2);

            //Day 3 forecast display
            var temp3 = data.list[2].main.temp
            var humidity3 = data.list[2].main.humidity
            var windSpeed3 = data.list[2].wind.speed
            var weatherIcon3 = data.list[2].weather[0].icon
            var iconUrl3 = `https://openweathermap.org/img/w/${weatherIcon3}.png`

            var day3Temp = $("<p").append("Temp: ", temp3, "°F");
            var day3Humidity = $("<p>").append("Humidity: ", humidity3, "%");
            var day3Wind = $("<p>").append("Windspeed: ", windSpeed3, "mph");
            var iconImage3 = $("<img>").attr({ src: iconUrl3 });

            $("#day3").empty();
            $("#day3").append(day3Temp);
            $("day3").append(day3Humidity);
            $("day3").append(day3Wind);
            $("day3").append(iconImage3);

            //Day 4 forecast display
            var temp4 = data.list[3].main.temp
            var humidity4 = data.list[3].main.humidity
            var windSpeed4 = data.list[3].wind.speed
            var weatherIcon4 = data.list[3].weather[0].icon
            var iconUrl4 = `https://openweathermap.org/img/w/${weatherIcon4}.png`

            var day4Temp = $("<p").append("Temp: ", temp4, "°F");
            var day4Humidity = $("<p>").append("Humidity: ", humidity4, "%");
            var day4Wind = $("<p>").append("Windspeed: ", windSpeed4, "mph");
            var iconImage4 = $("<img>").attr({ src: iconUrl4 });

            $("#day4").empty();
            $("#day4").append(day4Temp);
            $("day4").append(day4Humidity);
            $("day4").append(day4Wind);
            $("day4").append(iconImage4);

            //Day 5 forecast display
            var temp5 = data.list[4].main.temp
            var humidity5 = data.list[4].main.humidity
            var windSpeed5 = data.list[4].wind.speed
            var weatherIcon5 = data.list[4].weather[0].icon
            var iconUrl5 = `https://openweathermap.org/img/w/${weatherIcon5}.png`

            var day5Temp = $("<p").append("Temp: ", temp5, "°F");
            var day5Humidity = $("<p>").append("Humidity: ", humidity5, "%");
            var day5Wind = $("<p>").append("Windspeed: ", windSpeed5, "mph");
            var iconImage5 = $("<img>").attr({ src: iconUrl5 });

            $("#day5").empty();
            $("#day5").append(day5Temp);
            $("day5").append(day5Humidity);
            $("day5").append(day5Wind);
            $("day5").append(iconImage5);
        })

}

//Initiate forecast with search button
$("#searchBtn").on("click", getCity)

var title = $("<p>").text("5-day Weather Forecast")

//Display current day and time
$("#currentDay").text(today.format("dddd, MMM Do, YYYY"));
$("#currentDay").append(title)