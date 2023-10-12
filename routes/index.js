var express = require('express');
var router = express.Router();
const usercontroller = require("../controller/user")

/* GET home page. */
router.post('/signup', usercontroller.signuppage);

router.get('/find', usercontroller.findpage);

module.exports = router;
