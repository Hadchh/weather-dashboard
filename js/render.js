const mainEl = document.querySelector('main');
const weatherEl = document.querySelector('#weather');
const nameEl = document.querySelector('#city-name');
const iconEl = document.querySelector('#icon');
const tempEl = document.querySelector('#temp');
const conditionsEl = document.querySelector('#conditions');
const feelsEl = document.querySelector('#feels');
const humidityEl = document.querySelector('#humidity');
const windEl = document.querySelector('#wind');
const forecastEl = document.querySelector('#forecast');

weatherEl.remove();

function renderWeather(data) {
  const { current, daily } = data;
  const now = describe(current.weather_code);

  nameEl.textContent = data.country ? `${data.name}, ${data.country}` : data.name;

  iconEl.textContent = now.icon;
  tempEl.textContent = `${Math.round(current.temperature_2m)}°C`;
  conditionsEl.textContent = now.text;

  feelsEl.textContent = `${Math.round(current.apparent_temperature)}°C`;
  humidityEl.textContent = `${current.relative_humidity_2m}%`;
  windEl.textContent = `${current.wind_speed_10m} km/h`;

  forecastEl.replaceChildren(
    ...daily.time.map((day, i) => {
      const info = describe(daily.weather_code[i]);
      const card = document.createElement('div');
      card.classList.add('day');

      const icon = document.createElement('p');
      icon.classList.add('day-icon');
      icon.textContent = info.icon;

      const date = document.createElement('p');
      date.textContent = day;

      const temps = document.createElement('p');
      temps.textContent =
        `${Math.round(daily.temperature_2m_max[i])}° / ${Math.round(daily.temperature_2m_min[i])}°`;

      const text = document.createElement('p');
      text.textContent = info.text;

      card.append(icon);
      card.append(date);
      card.append(temps);
      card.append(text);
      return card;
    })
  );

  mainEl.append(weatherEl);
}

function clearWeather() {
  weatherEl.remove();
}
