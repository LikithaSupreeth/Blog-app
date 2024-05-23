const User = require("../models/userModel");
const { validationResult } = require("express-validator");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userCtrl = {};

userCtrl.register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const body = req.body;
  try {
    const salt = await bcryptjs.genSalt();
    const hashPassword = await bcryptjs.hash(body.password, salt);
    const user = new User(body);
    user.password = hashPassword;
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: "something went wrong" });
  }
};

userCtrl.login = async(req,res) =>{
    const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const body = req.body
  try{
    

  }
  catch (err){

  }

}

module.exports = userCtrl;
