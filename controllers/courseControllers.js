const { Course } = require("../models");

const createCourse = async (req, res) => {
    try {
        const courseData = await Course.create(req.body);
        res.status(200).json(courseData);
        
    } catch (error) {
        res.status(400).json(error);
    }
}

const UpdateCourse = async (req, res) => {
    try {
        const courseData = await Course.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(courseData);
    } catch (error) {
        res.status(400).json(error);
    }
}

const DeleteCourse = async (req, res) => {
    try {
        const courseData = await Course.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(courseData);
    } catch (error) {
        res.status(400).json(error);
    }
}

const getCourse = async (req, res) => {
    try {
        const courseData = await Course.findByPk(req.params.id);
        res.status(200).json(courseData);
    } catch (error) {
        res.status(400).json(error);
    }

}

const getAllCourses = async (req, res) => {
    try {
        const courseData = await Course.findAll();
        res.status(200).json(courseData);
    } catch (error) {
        res.status(400).json(error);
    }
}

module.exports = { createCourse, UpdateCourse, DeleteCourse, getCourse, getAllCourses}