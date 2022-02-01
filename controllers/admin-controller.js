const bcrypt = require('bcrypt');
const Employee = require('../models/employee.js');
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
            ['employee-name']: name,
            ['employee-mobile-number']: contactNum,
            ['emergency-contact-name']: emergencyContactName,
            ['emergency-contact-mobile-number']: emergencyContactNum,
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
     * Returns the information of the employee
     * associated with the id in the url
     * @name get/admin/employee/:id
     * @param {express.request} req request object, must have id in its params
     * @param {express.response} res response object
     */
    getEmployee: async function (req, res) {
        const { id } = req.params;
        const employee = await Employee.findById(id);
        const status = employee ? 200 : 404;
        res.status(status).json(employee);
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
};

module.exports = controller;
