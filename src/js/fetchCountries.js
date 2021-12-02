const BASE_URL = 'https://restcountries.com/v3.1';

function fetchCountries(nameCountry) {
    return fetch(`${BASE_URL}/name/${nameCountry}?fields=name,capital,population,flags,languages`).then(response => response.json());
};

export { fetchCountries };
