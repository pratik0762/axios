const USER = require("../model/signup")
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const DATA = require("../model/contact")

exports.auth = async function(req, res, next) {
  try {
    const usertoken = req.hearders.usertoken

    if(!usertoken){
      throw new Error("send token first")
    }

    const checktoken = await jwt.verify(usertoken , "SURAT")
    const checkuser = await USER.findById(checktoken.id)

    if(!checkuser){
      throw new Error("user not found")
    }
  } catch (error) {
    res.status(404).json({
      status : "fail",
      message : error.message
    })
  }
}

exports.signuppage = async function(req, res, next) {
    try {
      req.body.password = await bcrypt.hash(req.body.password , 10)
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
  }

  exports.loginpage = async function(req, res, next) {
    try {
      const checkdata = await USER.findOne({username : req.body.username})
      if(!checkdata){
        throw new Error("invalid username")
      }
      const checkpassword = await bcrypt.compare(req.body.password , checkdata.password)
      if(!checkpassword){
        throw new Error("invalid password")
      }

      const usertoken = jwt.sign({ id: checkdata._id }, 'SURAT');
  
      res.status(200).json({
        status : "success",
        message : "login successfully",
        data : checkdata,
        token : usertoken
      })
    } catch (error) {
      res.status(404).json({
        status : "fail",
        message : error.message
      })
    }
  }

  exports.contactcreate = async function(req, res, next) {
    try {
      const usertoken = req.hearders.usertoken
      const checktoken = await jwt.verify(usertoken , "SURAT")
      req.body.userid = checktoken.id
      const data = await DATA.create(req.body)
  
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
  }