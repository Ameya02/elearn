const express = require('express');
const { updateUser, deleteUser, getProfile } = require('../controllers/userControllers');
const { protect } = require('../middlewares/authMiddlewares');
const router = express.Router();
// Routes for managing user

// update password
// router.put("/update-password/", protect, updatePassword);
// update profile
router.put("/update-user/", protect, updateUser);
// delete profile
router.delete("/delete-user/", protect, deleteUser);
// // get profile
router.get("/", protect, getProfile);
// // get other profile
// router.get("/", protect, getOtherProfile);

module.exports = router;