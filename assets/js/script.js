var apiKey = "91034a7bafa54b46b4fe9d1516acb321";
var cityInput = document.querySelector("#search-input");
var searchBtn= document.querySelector("#city-search button");
var tempEl= document.getElementById("temp");
var windEl= document.getElementById("wind");
var humidityEl= document.getElementById("humidity");
var uvEl= document.getElementById("UV");
var forcastDiv = document.getElementById("forcast");
var weatherDashboard = document.getElementById('cityname');
var date = new Date().toUTCString().slice(5, 16);


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
        for (let i = 1; i < 6; i++) {


            var cardTitle = document.getElementById("date-"+[i]);
            var forcastTemp=document.getElementById("temp-"+[i]);
            var forcastWind= document.getElementById("wind-" + [i]);
            var forcastHumidity = document.getElementById("humidity-" + [i]);
                    
            cardTitle.textContent="Forcast: " + forcast.data[i].valid_date;
                    
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
