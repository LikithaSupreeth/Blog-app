const User = require("../models/userModel");
const { validationResult } = require("express-validator");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

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
    console.log(err);
    res.status(500).json({ error: "something went wrong" });
  }
};

userCtrl.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const body = req.body;
  try {
    const user = await User.findOne({ email: body.email });
    if (user) {
      const isAuth = await bcryptjs.compare(body.password, user.password);
      if (isAuth) {
        const tokenData = {
          id: user._id,
          username:user.username,
          email: user.email
          
        };
        const token = jwt.sign(tokenData, process.env.JWT_SECRET, {
          expiresIn: "7d",
        });
        return res.json({ token: token });
      }
      return res.status(400).json({ errors: "invalid email / password" });
    }
    res.status(404).json({ errors: "invalid email / password" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ errors: "something went wrong" });
  }
};

userCtrl.profile = async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      res.json(user);
    } catch (err) {
      res.status(500).json({ error: "something went wrong" });
    }
  };

  userCtrl.update = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    try {
        const body = req.body
        const user = await User.findByIdAndUpdate(req.user.id, body, { new: true })
        return res.json(user)
    } catch (err) {
        res.status(500).json({ errors: 'Something went wrong' })
    }
}

userCtrl.upload = async(req,res) =>{
    try{
        
          
        res.status(200).json(req.file)
    }
    catch (err){
        console.log(err)
        res.status(500).json({ errors: 'Something went wrong' })
    }
    
}

module.exports = userCtrl;
