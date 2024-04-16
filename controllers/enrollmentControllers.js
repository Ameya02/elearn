const resend = require("../config/emailConfig");
const { Enrollment,Course } = require("../models");
require("dotenv").config();
const enrollCourse = async (req, res) => {
    try {
        const CourseId = req.params.id;
        const UserId = req.user.id;
        const checkEnrollment = await Enrollment.findOne({ where: { courseId: CourseId, userId:UserId } });

        if(checkEnrollment){
            res.status(400).json({message:"You are already enrolled in this course"});
            return;
        }
        const enrollmentData = await Enrollment.create({ courseId:CourseId, userId: UserId });
        const course = await Course.findByPk(CourseId);
        const email = await resend.emails.send({
            from: process.env.EMAIL_ADDRESS,
            to: [req.user.email],
            subject: "Course Enrollmenet "+ course.name  +"!",
            text: `You have successfully enrolled in the course ${course.name}!`
          });
          console.log(email);
        res.status(200).json(enrollmentData);
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
}

const derollCourse = async (req, res) => {
    try {
        const CourseId = req.params.id;
        const UserId = req.user.id;
        const checkEnrollment = await Enrollment.findOne({ where: { courseId: CourseId, userId:UserId } });
        if(!checkEnrollment){
            res.status(400).json({message:"You are not enrolled in this course"});
            return;
        }
        const enrollmentData = await Enrollment.destroy({  where: { courseId: CourseId, userId:UserId }});
        const course = await Course.findByPk(CourseId);
        const email = await resend.emails.send({
            from: process.env.EMAIL_ADDRESS,
            to: [req.user.email],
            subject: "Course Derollment "+ course.name  +"!",
            text: `You have successfully derolled from the course ${course.name}!`
          });
          console.log(email);
        res.status(200).json(enrollmentData);
    } catch (error) {
        res.status(400).json(error);
    }
}

const getEnrolledCourses = async (req, res) => {
    try {
        const UserId = req.user.id;
        const enrolledCourses = await Enrollment.findAll({ where: { userId:UserId },
            attributes: ["id","userId","courseId"],
            include: [
                {
                    model: Course,
                    attributes: ["id","name"]
                  },
            ]
        });
        res.status(200).json(enrolledCourses);
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
}

module.exports = { enrollCourse, derollCourse, getEnrolledCourses }