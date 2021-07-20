const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt) {
  if (evt.keyCode == 13) {
    getResults(searchbox.value);
  }
}

function getResults(query) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=1e38bf781676590e26b4c48741a7db60`)
    .then(function (resp) {
      return resp.json()
    }).then((data) => {
      displayResults(data)
    }).catch(err => displayError(err.message))
}

function displayError() {
  let city = document.querySelector('.location .city');
  city.innerText = `Такого города нет`;

  let date = document.querySelector('.location .date');
  date.innerText = "";

  let temp = document.querySelector('.current .temp');
  temp.innerHTML = ``;

  let weather_el = document.querySelector('.current .weather');
  weather_el.innerText = "";

  let hilow = document.querySelector('.hi-low');
  hilow.innerText = ``;
}

function displayResults(weather) {
  let city = document.querySelector('.location .city');
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector('.location .date');
  date.innerText = dateBuilder(now);

  let temp = document.querySelector('.current .temp');
  temp.innerHTML = `${Math.round(weather.main.temp - 273)}<span>°c</span>`;

  let weather_el = document.querySelector('.current .weather');
  weather_el.innerText = weather.weather[0].description;

  let hilow = document.querySelector('.hi-low');
  hilow.innerText = `min ${Math.round(weather.main.temp_min - 273)}°c / max ${Math.round(weather.main.temp_max - 273)}°c`;
}

function dateBuilder(d) {
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}


