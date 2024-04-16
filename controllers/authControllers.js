
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const generateToken = require("../config/generateToken");

const { User } = require("../models");
const resend = require("../config/emailConfig");

// CREATE new user
const register = async (req, res) => {
    try {
      let user = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      });
      let token = await generateToken(user.id);
      const email = await resend.emails.send({
        from: process.env.EMAIL_ADDRESS,
        to: [req.body.email],
        subject: "Welcome to eLearn!",
        text: `Welcome to eLearn, ${req.body.username}! You are now a registered user.`
      });
        res.json({ message: "You are now logged in!", token: token });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // LOG IN for users/ verify users
  const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ msg: "Not all fields have been entered." });
    try {
      let user = await User.findOne({
        where: {
          email: email,
        },
      });
      if (!user) {
        res.status(400).json({ message: "No user with that email address!" });
        return;
      }
      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        res.status(400).json({ message: "Incorrect password!" });
        return;
      }
      let token = await generateToken(user.id);
      res.json({ message: "You are now logged in!", token: token });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // LOG OUT
  const logout = async (req, res) => {
    req.user = null;
  res.json({message:"Logged out successfully"});
  res.status(404).end();
  return;
  
  };

  const resetPassword = async (req, res) => {
    if (!req.param.token) {
    const {email} = req.body;
    if (!email) {
      res.status(400).json({ message: "Email is required" });
      return;
    }
    try {
      let user = await User.findOne({
        where: {
          email: email,
        },
      });
      if (!user) {
        res.status(400).json({ message: "No user with that email address!" });
        return;
      }
      let token = await generateToken(user.id);
      const email = await resend.emails.send({
        from: process.env.EMAIL_ADDRESS,
        to: [req.body.email],
        subject: "Reset Password",
        text: `Click on the link to reset your password: http://localhost:3001/auth/resetpassword/${token}`
      });
      res.json({ message: "Email sent to reset password!" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  else {
    const { token } = req.params;
    if (!token) {
      res.status(400).json({ message: "Token is required" });
      return;
    }
    try {
      const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);
      let user = await User.findByPk(decoded.id);
      if (!user) {
        res.status(400).json({ message: "No user with that token!" });
        return;
      }
      const password = req.body.password;
      if (!password) {
        res.status(400).json({ message: "Password is required" });
        return;
      }
      await User.update(
        { password },
        {
          where: {
            id: decoded.id,
          },
        }
      );
      res.status(200).json({ message: "Password reset successfully" });

    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }}

  module.exports = { register, login, logout, resetPassword};