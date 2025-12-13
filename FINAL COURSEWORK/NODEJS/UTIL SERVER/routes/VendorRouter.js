const express = require('express');
const vendorController = require('../controller/VendorController');
const router = express.Router();

router.get('/getClients', vendorController.getClients);

module.exports = router;