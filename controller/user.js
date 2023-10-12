const USER = require("../model/signup")

exports.signuppage = async function(req, res, next) {
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
  }

  exports.findpage = async function(req, res, next) {
    try {
      const data = await USER.find()
  
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