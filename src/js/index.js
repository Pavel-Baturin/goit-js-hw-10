import '../css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';
import contryCard from '../templates/contry-card.hbs';
import contryItem from '../templates/contry-item.hbs';

const DEBOUNCE_DELAY = 300;

const inputRef = document.querySelector('#search-box');
const countryListRef = document.querySelector('.country-list');
const countryInfoRef = document.querySelector('.country-info');

inputRef.addEventListener('input', debounce(onFormInput, DEBOUNCE_DELAY));

function onFormInput() {
    const searchQuery = inputRef.value.trim();
    if (!searchQuery) {
        removeMarkup();
        return
    }
    fetchCountries(searchQuery).then(renderCountryCard).catch(onFetchError);
}

function renderCountryCard(country) {
   
    if (country.length <= 1) {
        countryListRef.innerHTML = "";
        let markup = contryCard(country);
        countryInfoRef.innerHTML = markup;
    } else if (country.length <= 10) {
        countryInfoRef.innerHTML = "";
        let markup = contryItem(country);
        countryListRef.innerHTML = markup;
    } else if (country.length > 10) {
        countryListRef.innerHTML = "";
        Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
    } else {
        return;
    }
}

function onFetchError(error) {
    removeMarkup();
    console.log(error);
    Notiflix.Notify.failure("Oops, there is no country with that name");
}

function removeMarkup() {
    countryInfoRef.innerHTML = "";
    countryListRef.innerHTML = "";
}