const bcrypt = require('bcrypt');
const Employee = require('../models/employee.js');
const Activity = require('../models/activity.js');
const {
    isValidPassword,
    isOldPasswordSameAsPassword,
} = require('../helpers/newPasswordValidator.js');
const saltRounds = 10;

const controller = {
    getAdminHome: async function (req, res) {
        const employees = await Employee.find({ role: 'employee' });

        const formattedEmployees = employees.map((employee) => ({
            ...employee._doc,
            dateRegistered: employee.dateRegistered.toLocaleDateString(
                'en-US',
                { year: 'numeric', month: 'long', day: 'numeric' }
            ),
        }));

        const data = {
            employees: formattedEmployees,
        };

        res.render('admin-home', data);
    },

    getRegisterEmployee: function (req, res) {
        res.render('admin-employee-form');
    },

    /**
     * Registers an employee
     * Does not register an employee if the username provided is already in the database
     * responds with 406(Not Acceptable) status code
     * @name post/admin/register
     * @param {express.request} req request object, must have username and password in its body
     * @param {express.response} res response object
     */
    postRegisterEmployee: async function (req, res) {
        const {
            username,
            password,
            name,
            contactNum,
            emergencyContactName,
            emergencyContactNum,
        } = req.body;
        
        const hash = await bcrypt.hash(password, saltRounds);
        const isExistingEmployee = await Employee.findOne({ username });

        if (!isExistingEmployee) {
            const employee = await Employee.create({
                username,
                password: hash,
                role: 'employee',
                hasAccess: true,
                name,
                contactNum,
                emergencyContactName,
                emergencyContactNum,
                dateRegistered: new Date(),
            });
            res.redirect('/admin');
        } else {
            res.status(406).json({
                msg: 'Account already exists for username: ' + username,
            });
        }
    },

    /**
     * Returns all employees registered in the database
     * Only includes 'employee' role
     * @name get/admin/employee
     * @param {express.request} req
     * @param {express.response} res
     */
    getAllEmployees: async function (req, res) {
        const employees = await Employee.find({ role: 'employee' });
        res.json(employees);
    },

    /**
     * Returns all current employees registered in the database
     * Only includes 'employee' role
     * @name get/admin/employee/current
     * @param {express.request} req
     * @param {express.response} res
     */
    getAllCurrentEmployees: async function (req, res) {
        const employees = await Employee.find({
            role: 'employee',
            hasAccess: true,
        });
        res.json(employees);
    },

    /**
     * Returns all former employees registered in the database
     * Only includes 'employee' role
     * @name get/admin/employee/former
     * @param {express.request} req
     * @param {express.response} res
     */
    getAllFormerEmployees: async function (req, res) {
        const employees = await Employee.find({
            role: 'employee',
            hasAccess: false,
        });
        res.json(employees);
    },

    /**
     * Returns the information of the employee
     * associated with the id in the url
     * @name get/admin/employee/:username
     * @param {express.request} req request object, must have id in its params
     * @param {express.response} res response object
     */
    getEmployee: async function (req, res) {
        const { username } = req.params;
        const employee = await Employee.findOne({ username });
        const status = employee ? 200 : 404;
        res.status(status).json(employee);
    },

    putEmployeeInfo: async function (req, res) {
        const { username } = req.params;
        const {
            contactNum,
            emergencyContactName,
            emergencyContactNum,
            newPassword,
            reenteredPassword,
        } = req.body;

        if (newPassword != '') {
            var isValidNewPassword = await isValidPassword(
                newPassword,
                username
            );

            if (reenteredPassword != newPassword) {
                res.status(406).json({
                    message:
                        'New password and re-entered password do not match',
                });
                return;
            }

            var hash = await bcrypt.hash(newPassword, saltRounds);
        }

        const result = await Employee.findOneAndUpdate(
            { username },
            {
                contactNum,
                emergencyContactName,
                emergencyContactNum,
                password: hash,
            },
            { new: true }
        );
        res.json(result);
    },

    getEmployeeActivity: async function (req, res) {
        const { username } = req.params;
        const activity = await Activity.find({ username });
        res.json(activity);
    },
    
    putGiveEmployeeAccess: async function (req, res) {
        const username = req.body.username;
        console.log(username)
        const doc = await Employee.findOneAndUpdate(
            { username: username },
            { hasAccess: true },
            { returnDocument: 'after' }
        );

        res.json(doc);
    },

    putRemoveEmployeeAccess: async function (req, res) {
        const username = req.body.username;
        console.log(username)
        const doc = await Employee.findOneAndUpdate(
            { username: username },
            { hasAccess: false },
            { returnDocument: 'after' }
        );

        res.json(doc);
    }
};

module.exports = controller;
