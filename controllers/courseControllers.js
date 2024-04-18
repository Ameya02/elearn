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
        const { category, level, popularity, limit, page } = req.query;
        const offset = (page - 1) * limit;
        const courseData = await Course.findAll({
            where: {
                category: category,
                level: level,
                popularity: popularity,
               
            },
            limit: parseInt(limit),
            offset: parseInt(offset)
            });
        res.status(200).json(courseData);
    } catch (error) {
        res.status(400).json(error);
    }
}

module.exports = { createCourse, UpdateCourse, DeleteCourse, getCourse, getAllCourses}