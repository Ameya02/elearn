const express = require('express');
const { createCourse, UpdateCourse, DeleteCourse, getCourse, getAllCourses } = require('../controllers/courseControllers');
const { protect_admin } = require('../middlewares/adminMiddlewares');
const { protect } = require('../middlewares/authMiddlewares');
const router = express.Router();

router.post('/', protect_admin,createCourse);

router.put('/:id',protect_admin,UpdateCourse);

router.delete('/:id',protect_admin, DeleteCourse);

router.get('/:id',protect, getCourse);

router.get('/', protect,getAllCourses);

module.exports = router