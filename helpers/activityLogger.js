const ActivityModel = require('../models/activity.js');

module.exports = function activityLogger(activityName) {
    return (req, res, next) => {
        ActivityModel.create({
            name: req.session.username,
            timestamp: new Date(),
            activityName: activityName,
        });
        next();
    };
};
