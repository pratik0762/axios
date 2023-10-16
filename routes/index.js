var express = require('express');
var router = express.Router();
const usercontroller = require("../controller/user")

// https://sleepy-worm-garb.cyclic.app

/* GET home page. */
router.post('/api/user/signup', usercontroller.signuppage);
router.post('/api/user/login', usercontroller.loginpage);

// contact card

 

module.exports = router;