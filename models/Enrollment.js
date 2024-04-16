// models/enrollment.js

const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/connection');

class Enrollment extends Model {}
Enrollment.init({
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'user',
            key: 'id'
        }
    },
    courseId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'course',
            key: 'id'
        }
    }
   
},{
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "enrollment",
});


module.exports = Enrollment;
