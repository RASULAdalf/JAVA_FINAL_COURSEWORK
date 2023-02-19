const express = require('express');
const itemController = require('../controller/ItemController');

const router = express.Router();
router.post('/saveItem', itemController.proceed);
module.exports = router;