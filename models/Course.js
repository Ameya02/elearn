// models/course.js

const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/connection');
class Course extends Model {}
Course.init( {
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    category: {
        type: DataTypes.ENUM("Web Development", "Data Science", "Mobile Development", "Machine Learning", "Artificial Intelligence", "Cybersecurity", "Programming" ,"Game Development", "Design", "Product Management", "Other"), 
        allowNull: false
    },
    level: {
        type: DataTypes.ENUM("Beginner", "Intermediate", "Advanced"),
        allowNull: false,
    },
    popularity: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},{
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "course",
});

module.exports = Course;
