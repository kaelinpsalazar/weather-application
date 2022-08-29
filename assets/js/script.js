var apiKey = "91034a7bafa54b46b4fe9d1516acb321";
var cityInput = document.querySelector("#search-input");
var searchBtn= document.querySelector("#city-search button");
var tempEl= document.getElementById("temp");
var windEl= document.getElementById("wind");
var humidityEl= document.getElementById("humidity");
var uvEl= document.getElementById("UV");
var forcastTemp = document.getElementById('card-temp');
var forcastWind = document.getElementById('card-wind');
var forcastHumidity = document.getElementById('card-humidity');
var cardTitle = document.getElementById("card-title");
var weatherDashboard = document.getElementById('cityname');
var card1 = document.getElementById('card-1');
var card2 = document.getElementById('card-2');
var card3 = document.getElementById('card-3');
var card4 = document.getElementById('card-4');
var card5 = document.getElementById('card-5');
let date = new Date().toUTCString().slice(5, 16);
var forcastDays = [0,1,2,3,4,5]

function weatherFunction(city){
    var apiParams = new URLSearchParams({
        key:apiKey,
        city,
        units:"I"
    })
    var currentweatherAPI = 
    "https://api.weatherbit.io/v2.0/current?"+apiParams;

        fetch(currentweatherAPI)
        .then(function (response) {
            console.log(response);
            return response.json();
        })
        .then(function (data) {
            currentWeather(data)
            console.log(data);

        });

        var currentWeather = function(current){
            var cityName = document.createElement('h1');
            cityName.textContent=current.data[0].city_name + " " + date;
            weatherDashboard.append(cityName);


            
            tempEl.textContent = current.data[0].temp + '°F';
            windEl.textContent = current.data[0].wind_spd + 'MPH';
            humidityEl.textContent=current.data[0].rh + '%';
            uvEl.textContent=current.data[0].uv + "+";

        }


    // create header in dashboard with the city input and todays date


    // create text content for each value of temp, wind, humidity, UV in the dashboard

    // dynamically create cards with a header of the next days date date and temp wind humidity










    var forcastweatherAPI = 
    "https://api.weatherbit.io/v2.0/forecast/daily?"+apiParams;

    fetch(forcastweatherAPI)
    .then(function (response) {
        console.log(response);
        return response.json();
    })
    .then(function (data) {
        forcastWeather(data)
        console.log(data);
    });

    var forcastWeather = function(forcast){
        for (let i = 0; i < forcastDays.length; i++) {
            








        // cardTitle.textContent="Forcast: " + forcast.data[1].valid_date;
            forcastTemp.textContent="Temperature: " + forcast.data[i].temp + '°F';
            forcastWind.textContent="Wind: " + forcast.data[i].wind_spd + "MPH";
            forcastHumidity.textContent="Humidity: " +forcast.data[i].rh + "%";


        }
    }


}
searchBtn.addEventListener('click', function(){
    var city = cityInput.value;
    weatherFunction(city);

})
