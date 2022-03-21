const axios = require('axios');

const apiGeocode = axios.create({
    baseURL: 'https://maps.googleapis.com/maps/api/geocode'
});

module.exports = apiGeocode;