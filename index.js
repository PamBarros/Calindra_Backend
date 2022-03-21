const express = require('express');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const routes = require('./route');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());
app.use(routes);


app.listen(port, () => {
    console.log(`Express started at http://localhost:${port}`);
});