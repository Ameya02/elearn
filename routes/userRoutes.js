const express = require('express');
const { updateUser, deleteUser, getProfile } = require('../controllers/userControllers');
const { protect } = require('../middlewares/authMiddlewares');
const router = express.Router();
// Routes for managing user

// update profile
router.put("/update-user/", protect, updateUser);
// delete profile
router.delete("/delete-user/", protect, deleteUser);
 // get profile
router.get("/", protect, getProfile);


module.exports = router;