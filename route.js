const express = require('express');
const calculaDis = require('./calculaDis')
const routes = express.Router();


routes.get('/', (req, res) => {
    return res.json({enderecos});
});

routes.post('/calc_dis', calculaDis.index)

module.exports = routes