var express = require('express');
var router = express.Router();
const USER = require("../model/signup")

/* GET home page. */
router.post('/signup', async function(req, res, next) {
  try {
    const data = await USER.create(req.body)

    res.status(201).json({
      status : "success",
      message : "data created successfully",
      data
    })
  } catch (error) {
    res.status(404).json({
      status : "fail",
      message : error.message
    })
  }
});

module.exports = router;
