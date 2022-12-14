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
            var weatherIcon = document.createElement("img");
		    weatherIcon.src = "./assets/images/icons/" + current.data[0].weather.icon + ".png";

            var cityName = document.getElementById('cityname');
            cityName.textContent=current.data[0].city_name + " " + date;
            


            
            tempEl.textContent = current.data[0].temp + '°F';
            windEl.textContent = current.data[0].wind_spd + 'MPH';
            humidityEl.textContent=current.data[0].rh + '%';
            uvEl.textContent=current.data[0].uv + "+";
            cityName.appendChild(weatherIcon)

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

            // var cardIcon = document.createElement("img");
            // cardIcon.src = "./assets/images/icons/" + forcast.data[i].weather.icon + ".png";

            var icon = document.getElementById("icon"+[i]);
            var cardTitle = document.getElementById("date"+[i]);
            var forcastTemp=document.getElementById("temp"+[i]);
            var forcastWind= document.getElementById("wind" + [i]);
            var forcastHumidity = document.getElementById("humidity" + [i]);

            
            // cardIcon.src="./assets/images/icons/" + forcast.data[i].weather.icon + ".png";

            cardTitle.textContent="Forcast: " + forcast.data[i].valid_date;
                    
            forcastTemp.textContent="Temperature: " + forcast.data[i].temp + '°F';
                    
            forcastWind.textContent="Wind: " + forcast.data[i].wind_spd + "MPH";
                    
            forcastHumidity.textContent="Humidity: " +forcast.data[i].rh + "%";

            // icon.appendChild(cardIcon);
                    
        }
        
    }
}
searchBtn.addEventListener('click', function(){
    var city = cityInput.value;
    weatherFunction(city);
    
    var saveSection=document.getElementById('saved-cities');
    var liEL = document.createElement('li');
    var searchSaveBtn= document.createElement('button');

    saveSection.append(liEL);
    liEL.append(searchSaveBtn);

    searchSaveBtn.textContent=cityInput.value;
    searchSaveBtn.addEventListener('click', function(){
        weatherFunction(city);
        
    })

})

