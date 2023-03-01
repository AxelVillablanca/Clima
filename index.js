

const container = document.querySelector('.container');
const buscar = document.querySelector('.busqueda button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');


buscar.addEventListener('click',() =>{

    const APIKey = '240823e7532c2b797e58c43f7829aafa';
    const city = document.querySelector('.busqueda input').value;

    if (city === '')
    return;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {
    
    if(json.cod === '404'){
        container.style.height = '500px';
        weatherBox.style.display = 'none';
        weatherDetails.style.display = 'none';
        error404.style.display = 'block';
        error404.classList.add('fadeIn');
        console.log("NO");
        
        return;
    }

    error404.style.display = 'none';
    error404.classList.remove ('fadeIn');

    const image = document.querySelector('.weather-box img');
    const temperature  = document.querySelector('.weather-box .temperature ');
    const description =  document.querySelector('.weather-box .description');
    const humidity = document.querySelector('.weather-details .humidity span');
    const wind = document.querySelector('.weather-details .wind span');


    switch (json.weather[0].main){
        case 'Clear':
            image.src = 'https://www.svgrepo.com/show/227762/sun.svg';
            break;

        case 'Rain':
                image.src = 'https://www.svgrepo.com/show/227745/rain-sky.svg';
                break;
        
        case 'Snow':
                image.src = 'https://www.svgrepo.com/show/227749/snowing-cold.svg';
                break;

        case 'Clouds':
                image.src = 'https://www.svgrepo.com/show/227754/cloudy-cloud.svg';
                break;
            
        case 'Haze':
                image.src = 'https://www.svgrepo.com/show/227757/haze-fog.svg';
                break;

        default:
                image.src = '';
        
        }

        temperature .innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
        description.innerHTML = `${json.weather[0].description}`;
        humidity.innerHTML = `${json.main.humidity}%`;
        wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;


        weatherBox.style.display = '';
        weatherDetails.style.display = '';
        weatherBox.classList.add('fadeIn');
        weatherDetails.classList.add('fadeIn');
        container.style.height = '600px';
        console.log("SI")


    });


   
});