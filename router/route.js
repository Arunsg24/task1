const express = require('express');
const router  = express.Router();

const couponController = require('../controller/controller.js');


router.post('/register', couponController.register);
router.post('/login', couponController.sign_in);

module.exports = router;