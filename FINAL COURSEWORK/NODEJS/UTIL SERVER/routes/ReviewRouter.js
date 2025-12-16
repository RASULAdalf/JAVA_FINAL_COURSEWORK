const express = require('express');
const itemReviewController = require('../controller/ItemReviewController');

const router = express.Router();
router.post('/add', itemReviewController.addReview);
module.exports = router;