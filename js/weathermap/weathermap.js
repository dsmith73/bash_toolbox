window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDegree = document.querySelector('.temperature-degree');
    let temperatureDescription = document.querySelector('.temperature-description');
    let locationTimezone = document.querySelector('.location-timezone');
    let windDegree = document.querySelector('.wind-degree');
    let windSpeed = document.querySelector('.wind-speed');
    let weatherIcon = document.querySelector('.weather-icon');
    let locationName = document.querySelector('.location-name');
    let temperatureSection = document.querySelector('.temperature');
    const temperatureSpan = document.querySelector('.temperature span');
    // let pctCloudiness = document.querySelector('percent-clouds');
    // let visibilityDistance = document.querySelector('visibility');


    const apiKey = "213a331f9d36420fe6398c4adede818a";
    const tzDBKey = "L3YVFWYLVD36";
    // imperial : fahrenheit, metric : centegrade, default = kelvin
    var units = "imperial";
    // https://openweathermap.org/current#multi  
    var language = "en";

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            console.log(position);  // validate position capture  
            long = position.coords.longitude;
            lat = position.coords.latitude;
            
            // implement proxy, just in case you can't reach this from localhost  
            const proxy = "https://cors-anywhere.herokuapp.com/";
            // https://api.openweathermap.org/data/2.5/weather?lat=$lat&lon=$long&appid=$apiKey  
            const api = `${proxy}https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=${units}&lang=${language}`;

            fetch(api)
            .then(response => {
                return response.json();
            })
            .then(data => {
                // console.log(data);
                const {temp, max_temp, min_temp, feels_like, humidity} = data.main;
                const {sunrise, sunset} = data.sys;     // unix time in GMT (need to adjust for locale)
                const {name, visibility} = data;    // location name  
                const {deg, speed} = data.wind;
                //const {all} = data.clouds;  // clouds %
                // icon gives us: http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png
                const {description, icon, main} = data.weather[0];
                // wind direction  
                if (deg => 340 || deg < 20) {
                    windDegree.textContent = "N";
                } else if (deg < 340 || deg >= 290) {
                    windDegree.textContent = "NW";
                } else if (deg < 290 || deg >= 250) {
                    windDegree.textContent = "W";
                } else if (deg < 250 || deg >= 200) {
                    windDegree.textContent = "SW";
                } else if (deg < 200 || deg > 159) {
                    windDegree.textContent = "S";
                } else if (deg < 160 || deg > 110) {
                    windDegree.textContent = "SE";
                } else if (deg < 111 || deg >= 70) {
                    windDegree.textContent = "E";
                } else {
                    windDegree.textContent = "NE";
                }

                // set DOM elements from API  
                temperatureDegree.textContent = temp;
                temperatureDescription.textContent = description;
                windSpeed.textContent = speed;
                locationName.textContent = name;
                //visibilityDistance.textContent = visibility;
                //pctCloudiness.textContent = data.clouds;
                weatherIcon.setAttribute("src", "http://openweathermap.org/img/wn/" + icon + "@2x.png");
                // formulate Celcius  
                let celcius = (temp - 32) * (5 / 9);
                // change temp from fahrenheit to celcius on click  
                temperatureSection.addEventListener("click", () => {
                    if (temperatureSpan.textContent === "°F") {
                        temperatureSpan.textContent = "°C";
                        temperatureDegree.textContent = Math.floor(celcius);
                    } else {
                        temperatureSpan.textContent = "°F";
                        temperatureDegree.textContent = temp;
                    }
                });
                
            });

            // http://api.timezonedb.com/v2.1/get-time-zone?key=${tzDBKey}&format=json&by=position&lat=${lat}&lng=${long}
            const tzDB = `${proxy}http://api.timezonedb.com/v2.1/get-time-zone?key=${tzDBKey}&format=json&by=position&lat=${lat}&lng=${long}`

            fetch(tzDB)
            .then(tzresponse => {
                return tzresponse.json();
            })
            .then(tzdata => {
                console.log(tzdata);
                const {zoneName} = tzdata;
                // set DOM elements from API  
                locationTimezone.textContent = zoneName;
            });

        });


    } else {
        h1.textContent = "This isn't working because you didn't allow geo-location"
    }
});













// Dark-Mode  
var checkbox = document.querySelector('input[name=theme]');

checkbox.addEventListener('change', function() {
    if (this.checked) {
        trans()
        document.documentElement.setAttribute('data-theme', 'light')
    } else {
        trans()
        document.documentElement.setAttribute('data-theme', 'dark')
    }
})

let trans = () => {
    document.documentElement.classList.add('transition');
    window.setTimeout(() => {
        document.documentElement.classList.remove('transition')
    }, 1000)
}
