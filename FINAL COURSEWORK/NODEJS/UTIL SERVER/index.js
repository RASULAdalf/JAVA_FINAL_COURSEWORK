const express = require('express');
var cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();
const port = process.env.SERVER_PORT;
var corsMiddleware = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', 'localhost'); //replace localhost with actual host
    res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, PUT, PATCH, POST, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With, Authorization');

    next();
}


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());
app.get('/', (req, res) => {
    res.sendFile('H:\\JAVA_COURSE\\WEB\\CLASS_WORKS\\95\\FINAL COURSEWORK\\NODEJS\\UTIL SERVER\\test.html');
})
const itemRoute = require('./routes/ItemRouter');

app.use('/api/v1/Item', itemRoute);

app.listen(port, () => {
    console.log(`Server is up on the port ${port}`);
})

