const USER = require("../model/signup")
const bcrypt = require('bcrypt');

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
  
      res.status(200).json({
        status : "success",
        message : "login successfully",
        data : checkdata
      })
    } catch (error) {
      res.status(404).json({
        status : "fail",
        message : error.message
      })
    }
  }