var express = require('express');
var router = express.Router();
const usercontroller = require("../controller/user")

// https://sleepy-worm-garb.cyclic.app

/* GET home page. */

// user

router.post('/api/user/signup', usercontroller.usersignuppage);
router.post('/api/user/login', usercontroller.userloginpage);
router.patch('/api/user/patch', usercontroller.userauth , usercontroller.userupdate);
router.delete('/api/user/delete', usercontroller.mixauth , usercontroller.userdelete);
router.get('/api/user/find', usercontroller.userfind);

// admin

router.post('/api/admin/signup', usercontroller.adminsignuppage);
router.post('/api/admin/login', usercontroller.adminloginpage);
router.patch('/api/admin/patch', usercontroller.adminauth , usercontroller.adminupdate);
router.delete('/api/admin/delete', usercontroller.adminauth , usercontroller.admindelete);
router.get('/api/admin/find', usercontroller.adminfind);

// contact card

router.post('/api/contect/create', usercontroller.userauth , usercontroller.contactcreate);
router.get('/api/contect/find', usercontroller.userauth , usercontroller.contactfind);
router.patch('/api/contect/update', usercontroller.userauth , usercontroller.contactupdate);
router.delete('/api/contect/delete', usercontroller.mixauth , usercontroller.contactdelete);
router.get('/api/contect/findbyid', usercontroller.userauth , usercontroller.contactfindbyid);
router.get('/api/contect/findbysearch', usercontroller.userauth , usercontroller.contactfindbysearch);

module.exports = router;