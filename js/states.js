const statusRow = document.querySelector('.status-row');
const statusEl = document.querySelector('#status');
const searchBtn = document.querySelector('#search-btn');

const loaderEl = document.createElement('div');
loaderEl.classList.add('dot');

const retryBtn = document.createElement('button');
retryBtn.textContent = 'Retry';

const STATES = ['idle', 'loading', 'success', 'error'];

function setStatus(state, message = "") {
  STATES.forEach(s => statusEl.classList.remove(s));
  statusEl.classList.add(state);
  statusEl.textContent = message;

  searchBtn.disabled = state === 'loading';
  if (state === 'loading') {
    searchBtn.classList.add('busy');
    statusRow.append(loaderEl);
  } else {
    searchBtn.classList.remove('busy');
    loaderEl.remove();
  }

  if (state === 'error') {
    statusRow.append(retryBtn);
  } else {
    retryBtn.remove();
  }
}

function friendly(err) {
  if (err.message === 'not-found') {
    return 'City not found. Check the spelling and try again.';
  }
  if (err.status === 429) {
    return 'Too many requests right now. Wait a minute, then try again.';
  }
  if (err.status >= 500) {
    return 'The weather service is having problems. Try again in a moment.';
  }
  if (err.status) {
    return `The weather service returned an error (${err.message}). Try again.`;
  }
  return "Couldn't reach the server. Check your connection and try again.";
}
