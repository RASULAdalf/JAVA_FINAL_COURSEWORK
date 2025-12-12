const express = require('express');
const vendorController = require('../controller/VendorController');
const router = express.Router();

router.get('/getVendor',vendorController.getVendor);

module.exports = router;