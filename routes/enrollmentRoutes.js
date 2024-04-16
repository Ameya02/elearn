const express = require('express');
const { enrollCourse, derollCourse, getEnrolledCourses } = require('../controllers/enrollmentControllers');
const { protect } = require('../middlewares/authMiddlewares');
const router = express.Router();

router.post("/:id", protect, enrollCourse);
router.delete("/:id", protect, derollCourse);
router.get("/", protect, getEnrolledCourses);


module.exports = router