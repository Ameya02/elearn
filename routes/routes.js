const express = require('express');
const router = express.Router();
const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const courseRoutes = require('./courseRoutes');
const enrollmentRoutes = require('./enrollmentRoutes');

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/course', courseRoutes);
router.use("/enrollment", enrollmentRoutes)
module.exports = router;