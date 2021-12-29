const bcrypt = require('bcrypt');
const Employee = require('../models/employee.js');
const saltRounds = 10;

const controller = {
    /**
     * Registers an employee
     * Does not register an employee if the username provided is already in the database
     * responds with 406(Not Acceptable) status code
     * @name post/admin/register
     * @param {express.request} req request object, must have username and passowrd in its body
     * @param {express.response} res response object
     */
    registerEmployee: async function (req, res) {
        const { username, password } = req.body;
        const hash = await bcrypt.hash(password, saltRounds);

        const isExistingEmployee = await Employee.findOne({ username });

        if (!isExistingEmployee) {
            const employee = await Employee.create({
                username,
                password: hash,
                role: 'employee',
                hasAccess: true,
            });
            res.json(employee);
        } else {
            res.status(406).json({
                msg: 'Account already exists for username: ' + username,
            });
        }
    },
    /**
     * Returns all employees registered in the database
     * @name get/admin/employee
     * @param {express.request} req
     * @param {express.response} res
     */
    getAllEmployees: async function (req, res) {
        const employees = await Employee.find({});
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
};

module.exports = controller;
