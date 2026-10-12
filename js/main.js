const form = document.querySelector('#search-form');
const input = document.querySelector('#city-input');

async function onSearch() {
  const city = input.value.trim();
  if (!city) {
    clearWeather();
    setStatus('idle', 'Please type a city name first.');
    return;
  }
  setStatus('loading', `Loading ${city}…`);
  try {
    const data = await loadWeather(city);
    renderWeather(data);
    setStatus('success', `Showing weather for ${data.name}`);
  } catch (err) {
    console.warn('Search failed:', err);
    clearWeather();
    setStatus('error', friendly(err));
  }
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  onSearch();
});

retryBtn.addEventListener('click', onSearch);

setStatus('idle', 'Search for a city');
