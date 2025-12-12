const express = require('express');
var cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();
const admin = require('firebase-admin');

const port = process.env.SERVER_PORT;
var corsMiddleware = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', 'localhost'); //replace localhost with actual host
    res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, PUT, PATCH, POST, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With, Authorization');

    next();
}
const firebaseBot = require('./credentials/firebasebot.json');

admin.initializeApp({
    credential: admin.credential.cert(firebaseBot),
    storageBucket: 'angshop-cb664.firebasestorage.app',
    databaseURL: 'https://angshop-cb664-default-rtdb.firebaseio.com'
});
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.sendFile('H:\\JAVA_COURSE\\WEB\\CLASS_WORKS\\95\\FINAL COURSEWORK\\NODEJS\\UTIL SERVER\\test.html');
})
const itemRoute = require('./routes/ItemRouter');
const vendorRoute = require('./routes/VendorRouter');

app.use('/api/v1/item', itemRoute);
app.use('/api/v1/vendor', vendorRoute);

app.listen(port, () => {
    console.log(`Server is up on the port ${port}`);
})

