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
    },
    {
      name: 'Athens',
      latitude: 33.959480,
      longitude: -83.380613
    },
    {
      name: 'Tucker',
      latitude: 33.854019,
      longitude: -84.214801
    }
];

const cityEl = document.getElementById('selectCity');
const tbody = document.querySelector('#cityTable tbody');

cities.forEach((city) => {
    const theOption = new Option(city.name, city.name);
    cityEl.appendChild(theOption);
});

cityEl.addEventListener('change', () => {
   tbody.innerHTML = '';
   if(cityEl.options[cityEl.selectedIndex].textContent == 'Select a City') {
      document.getElementById('cityTable').style.display = none;
   }
    const singleCity = cities.find(getLongAndLat);
        let long = singleCity.longitude;
        let lat = singleCity.latitude;

    const weatherAPI = fetch(`https://api.weather.gov/points/${lat},${long}`);
    weatherAPI.then((response) => response.json()).then((data) => {
      const forecastAPI = fetch(`${data.properties.forecast}`);
      forecastAPI.then((response) => response.json()).then((file) => {
        console.log(file.properties.periods);
        file.properties.periods.forEach(element => {
          const row = tbody.insertRow(-1);

          const cell1 = row.insertCell(0);
          cell1.innerHTML = element.name;
          const cell2 = row.insertCell(1);
          cell2.innerHTML = `Temperature ${element.temperature} ${element.temperatureUnit} Winds ${element.windDirection} ${element.windSpeed}`;
          const cell3 = row.insertCell(2);
          cell3.innerHTML = element.shortForecast;
        });
      });
    });
   document.getElementById('cityTable').style.display = 'table';
});

function getLongAndLat(cities) {
   return cities.name == cityEl.value;
}

