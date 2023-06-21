const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const body = document.querySelector('body');
const ui = document.querySelector('#header .logo');
const icon = document.querySelector('#header .logo i');
const owner = document.querySelector('#header .owner h5');

const backgroundMode = document.querySelector('#header .logo i');
const searchBox = document.querySelector('.search-box input');


//for mode
backgroundMode.addEventListener('click', changeBackgroundMode());

// for search
search.addEventListener('click', fetchWeatherData);
searchBox.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    fetchWeatherData();
  }
});

function fetchWeatherData() {

    const APIKey = 'ba4398125880514f2dc1c41a3e37ce7d';
    const city = document.querySelector('.search-box input').value;

    if (city === '')
        return;

    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {
                   
            if (json.length === 0) {
                container.style.height = '400px';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                error404.style.display = 'block';
                error404.classList.add('fadeIn');
                body.style.background = '#06283D';
                ui.style.background = '#326d8599';
                ui.style.borderColor = 'white';
                icon.style.color = 'white';
                owner.style.color = 'white';
                return;
            }

            error404.style.display = 'none';
            error404.classList.remove('fadeIn');

            tempLat = json[0].lat;
            tempLon = json[0].lon;

            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${tempLat}&lon=${tempLon}&appid=${APIKey}&units=metric`)
            .then(response => response.json())
            .then(json => {

                const image = document.querySelector('.weather-box img');
                const temperature = document.querySelector('.weather-box .temperature');
                const description = document.querySelector('.weather-box .description');
                const humidity = document.querySelector('.weather-details .humidity span');
                const wind = document.querySelector('.weather-details .wind span');

                switch (json.weather[0].main) {
                    case 'Clear':
                        image.src = 'res/clear.png';
                        body.style.background = '#ffd6079b';
                        ui.style.background = '#ffffffa7';
                        ui.style.borderColor = '#c35907';
                        icon.style.color = '#c35907';
                        owner.style.color = '#c35907';
                        break;

                    case 'Rain':
                        image.src = 'res/rain.png';
                        body.style.background = '#34879B';
                        ui.style.background = '#ffffffa7';
                        icon.style.color = '#34879B';
                        owner.style.color = 'white';
                        break;

                    case 'Snow':
                        image.src = 'res/snow.png';
                        body.style.background = '#30ccf3';
                        ui.style.background = '#ffffffa7';
                        ui.style.borderColor = 'white';
                        icon.style.color = '#30ccf3';
                        owner.style.color = 'white';
                        break;

                    case 'Clouds':
                        image.src = 'res/cloud.png';
                        body.style.background = '#427290';
                        ui.style.background = '#ffffffa7';
                        ui.style.borderColor = '#124666';
                        icon.style.color = '#124666';
                        owner.style.color = 'white';
                        break;

                    case 'Haze':
                        image.src = 'res/mist.png';
                        body.style.background = '#5b6f75';
                        ui.style.background = '#ffffffa7';
                        icon.style.color = '#5b6f75';
                        owner.style.color = 'white';
                        ui.style.borderColor = '#c35907';
                        break;
                    default:
                        image.src = '';
                }

                temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
                description.innerHTML = `${json.weather[0].description}`;
                humidity.innerHTML = `${json.main.humidity}%`;
                wind.innerHTML = `${parseInt(json.wind.speed)} Km/h`;

                weatherBox.style.display = '';
                weatherDetails.style.display = '';
                weatherBox.classList.add('fadeIn');
                weatherDetails.classList.add('fadeIn');
                container.style.height = '590px';
            })
        })
}

function changeBackgroundMode(){

}
