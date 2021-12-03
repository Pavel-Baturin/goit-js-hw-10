const BASE_URL = 'https://restcountries.com/v3.1';

function fetchCountries(nameCountry) {
    return fetch(`${BASE_URL}/name/${nameCountry}?fields=name,capital,population,flags,languages`)
        .then(response => {
            if (response.status === 200) {
                return response.json();
            } return console.log("Error: " + response.status);
        });
};

export { fetchCountries };
