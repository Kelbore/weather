'use strict';

let cities = [
    {
       name: 'Clarkston',
       latitude: 33.809910,
       longitude: -84.240995
    },
    {
       name: 'Decatur',
       latitude: 33.774613,
       longitude: -84.297083  
    },
    {
       name: 'Snellville',
       latitude: 33.858390,
       longitude: -84.019973 
    }
];

const cityEl = document.getElementById('selectCity');
const tbody = document.querySelector('#cityTable tbody');

cities.forEach((city) => {
    const theOption = new Option(city.name, city.name);
    cityEl.appendChild(theOption);
});

cityEl.addEventListener('change', () => {
    const singleCity = cities.find(getLongAndLat);
        let long = singleCity.longitude;
        let lat = singleCity.latitude;

    const weatherAPI = fetch(`https://api.weather.gov/points/${lat},${long}`);
    weatherAPI.then((response) => response.json()).then((data) => {
      const forecastAPI = fetch(`${data.properties.forecast}`);
      forecastAPI.then((response) => response.json()).then((file) => {
        console.log(file);
      });
    });
   
});

function getLongAndLat(cities) {
   return cities.name == cityEl.value;
}

