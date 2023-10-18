const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const USER = require("../model/user");
const DATA = require("../model/contact");
const ADMIN = require("../model/admin");

exports.userauth = async function (req, res, next) {
  try {
    const usertoken = req.headers.usertoken;

    if (!usertoken) {
      throw new Error("send token first");
    }

    const checkusertoken = await jwt.verify(usertoken, "SURAT");
    const checkuser = await USER.findById(checkusertoken.id);

    if (!checkuser) {
      throw new Error("user not found");
    }
    next();
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.adminauth = async function (req, res, next) {
  try {
    const admintoken = req.headers.admintoken;

    if (!admintoken) {
      throw new Error("send token first");
    }

    const checkadmintoken = await jwt.verify(admintoken, "SURAT");
    const checkadmin = await ADMIN.findById(checkadmintoken.id);

    if (!checkadmin) {
      throw new Error("user not found");
    }
    next();
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.mixauth = async function (req, res, next) {
  try {
    const admintoken = req.headers.admintoken;
    const usertoken = req.headers.usertoken;

    if (!admintoken || !usertoken) {
      throw new Error("send token first");
    }

    if (admintoken) {
      const checkadmintoken = jwt.verify(admintoken, "SURAT");
      var checkadmin = await ADMIN.findById(checkadmintoken.id);
    } else {
      const checkusertoken = jwt.verify(usertoken, "SURAT");
      var checkuser = await USER.findById(checkusertoken.id);
    }

    if (!checkadmin || !checkuser) {
      throw new Error("user not found");
    }

    next();
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
};

// user

exports.usersignuppage = async function (req, res, next) {
  try {
    if(!req.body.firstname || !req.body.lastname || !req.body.email || !req.body.contact || !req.body.username || !req.body.password){
      throw new Error("fill all data")
    }
    req.body.password = await bcrypt.hash(req.body.password, 10);
    const data = await USER.create(req.body);

    res.status(201).json({
      status: "success",
      message: "data created successfully",
      data,
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.userloginpage = async function (req, res, next) {
  try {
    const checkdata = await USER.findOne({ username: req.body.username });
    if (!checkdata) {
      throw new Error("invalid username");
    }
    const checkpassword = await bcrypt.compare(
      req.body.password,
      checkdata.password
    );
    if (!checkpassword) {
      throw new Error("invalid password");
    }

    const usertoken = jwt.sign({ id: checkdata._id }, "SURAT");

    res.status(200).json({
      status: "success",
      message: "login successfully",
      data: checkdata,
      token: usertoken,
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.userupdate = async function (req, res, next) {
  try {
    const usertoken = req.headers.usertoken;
    const checktoken = await jwt.verify(usertoken, "SURAT");
    req.body.password = await bcrypt.hash(req.body.password, 10);
    await USER.findByIdAndUpdate(checktoken.id, req.body);

    res.status(200).json({
      status: "success",
      message: "data updated successfully",
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.userdelete = async function (req, res, next) {
  try {
    const usertoken = req.headers.usertoken;
    const checktoken = await jwt.verify(usertoken, "SURAT");
    await DATA.deleteMany({ userid: checktoken.id });
    await USER.findByIdAndDelete(checktoken.id);

    res.status(200).json({
      status: "success",
      message: "data deleted successfully",
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.userfind = async function (req, res, next) {
  try {
    const data = await USER.find();

    res.status(200).json({
      status: "success",
      message: "data find successfully",
      data,
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
};

// admin

exports.adminsignuppage = async function (req, res, next) {
  try {
    if(!req.body.firstname || !req.body.lastname || !req.body.email || !req.body.contact || !req.body.username || !req.body.password){
      throw new Error("fill all data")
    }
    req.body.password = await bcrypt.hash(req.body.password, 10);
    const data = await ADMIN.create(req.body);

    res.status(201).json({
      status: "success",
      message: "data created successfully",
      data,
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.adminloginpage = async function (req, res, next) {
  try {
    const checkdata = await ADMIN.findOne({ username: req.body.username });
    if (!checkdata) {
      throw new Error("invalid username");
    }
    const checkpassword = await bcrypt.compare(
      req.body.password,
      checkdata.password
    );
    if (!checkpassword) {
      throw new Error("invalid password");
    }

    const admintoken = jwt.sign({ id: checkdata._id }, "SURAT");

    res.status(200).json({
      status: "success",
      message: "login successfully",
      data: checkdata,
      token: admintoken,
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.adminupdate = async function (req, res, next) {
  try {
    const admintoken = req.headers.admintoken;
    const checkadmintoken = await jwt.verify(admintoken, "SURAT");
    req.body.password = await bcrypt.hash(req.body.password, 10);
    await ADMIN.findByIdAndUpdate(checkadmintoken.id, req.body);

    res.status(200).json({
      status: "success",
      message: "data updated successfully",
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.admindelete = async function (req, res, next) {
  try {
    const admintoken = req.headers.admintoken;
    const checkadmintoken = await jwt.verify(admintoken, "SURAT");
    await DATA.deleteMany({ userid: checkadmintoken.id });
    await ADMIN.findByIdAndDelete(checkadmintoken.id);

    res.status(200).json({
      status: "success",
      message: "data deleted successfully",
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.adminfind = async function (req, res, next) {
  try {
    const data = await ADMIN.find();

    res.status(200).json({
      status: "success",
      message: "data find successfully",
      data,
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
};

// contact

exports.contactcreate = async function (req, res, next) {
  try {
    if(!req.body.firstname || !req.body.lastname || !req.body.contact || !req.body.state || !req.body.district){
      throw new Error("fill all data")
    }

    const usertoken = req.headers.usertoken;
    const checktoken = await jwt.verify(usertoken, "SURAT");
    req.body.userid = checktoken.id;
    const data = await DATA.create(req.body);

    res.status(201).json({
      status: "success",
      message: "data created successfully",
      data,
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.contactfind = async function (req, res, next) {
  try {
    const data = await DATA.find();

    res.status(200).json({
      status: "success",
      message: "data found successfully",
      data,
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.contactupdate = async function (req, res, next) {
  try {
    await DATA.findByIdAndUpdate(req.query.id, req.body);

    res.status(200).json({
      status: "success",
      message: "data updated successfully",
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.contactdelete = async function (req, res, next) {
  try {
    await DATA.findByIdAndDelete(req.query.id);
    res.status(200).json({
      status: "success",
      message: "data deleted successfully",
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.contactfindbyid = async function (req, res, next) {
  try {
    const usertoken = req.headers.usertoken;
    const checktoken = jwt.verify(usertoken, "SURAT");
    const data = await DATA.find({ userid: checktoken.id });
    res.status(200).json({
      status: "success",
      message: "data found successfully",
      data,
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.contactfindbysearch = async function (req, res, next) {
  try {
    const usertoken = req.headers.usertoken;
    const checktoken = jwt.verify(usertoken, "SURAT");
    // const data = await DATA.find({ userid: checktoken.id });

    const data = await DATA.find({$and: [{userid: checktoken.id} , {$or:[{firstname : {$regex: req.query.search}} , {lastname : {$regex: req.query.search}} , {contact : {$regex: req.query.search}} , {state : {$regex: req.query.search}} , {district : {$regex: req.query.search}}]}]})

    res.status(200).json({
      status: "success",
      message: "data found successfully",
      data,
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
};
