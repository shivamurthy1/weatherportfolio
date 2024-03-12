const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

search.addEventListener('click', () => {

    const APIKey = ;
    const city = document.querySelector('.search-box input').value;
    
    if (city === '')
        return;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(json => {

            if (json.cod === '404') {
                container.style.height = '400px';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                error404.style.display = 'block';
                error404.classList.add('fadeIn');
                return;
            }
            error404.style.display = 'none';
            error404.classList.remove('fadeIn');
            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'clear.jpeg';
                    break;

                case 'Rain':
                    image.src = '/Users/karthikshiva/Documents/weatherpotofolio/rain.jpeg';
                    break;

                case 'Snow':
                    image.src = '/Users/karthikshiva/Documents/weatherpotofolio/snow.jpeg';
                    break;

                case 'Clouds':
                    image.src = '/Users/karthikshiva/Documents/weatherpotofolio/clouds.png';
                    break;

                case 'Haze':
                    image.src = '/Users/karthikshiva/Documents/weatherpotofolio/mist.png';
                    break;

                default:
                    image.src = '/Users/karthikshiva/Documents/weatherpotofolio/default.avif';
            }

            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            container.style.height = '590px';


        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
});
