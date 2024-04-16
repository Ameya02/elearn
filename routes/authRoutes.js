const express = require('express');
const { register, login, logout, resetPassword } = require('../controllers/authControllers');
const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.post("/logout", logout);

router.post("/resetpassword", resetPassword);


module.exports = router;