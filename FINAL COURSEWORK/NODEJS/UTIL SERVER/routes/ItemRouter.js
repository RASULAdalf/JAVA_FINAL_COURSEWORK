const express = require('express');
const itemController = require('../controller/ItemController');

const router = express.Router();
router.post('/saveItem', itemController.saveItem);
router.delete('/deleteItem', itemController.deleteItem);
router.put('/updateItem', itemController.updateItem);
module.exports = router;