const User = require('./User');
const Course = require('./Course');
const Enrollment = require('./Enrollment');

User.hasMany(Enrollment, { foreignKey: 'userId' });

Course.hasMany(Enrollment, { foreignKey: 'courseId' });

Enrollment.belongsTo(User, { foreignKey: 'userId' });

Enrollment.belongsTo(Course, { foreignKey: 'courseId' });


module.exports = { User, Course, Enrollment };