const bcrypt = require('bcrypt');
const Employee = require('../models/employee.js');

const controller = {
    /**
     * Authenticates the user
     * Sets session.loggedIn to true if successful
     * Sets session.isAdmin to true if the user is an admin
     * Redirects to event home page if successful
     * Otherwise redirects back to the login page
     * @name post/authenticate
     * @param {express.request} req request object, must have username and password in its body
     * @param {express.response} res response object
     */
    authenticate: async function (req, res) {
        const { username, password } = req.body;
        const user = await Employee.findOne({ username });

        const result = user
            ? await bcrypt.compare(password, user.password)
            : false;

        if (result && user.hasAccess) {
            req.session.user = user;
            req.session.loggedIn = true;
            req.session.isAdmin = user.role === 'admin';

            res.redirect('/event-tracker/home');
        } else {
            res.redirect('/login');
        }
    },

    /**
     * Renders the appropriate login html file and
     * sends it to the user
     * @name get/login
     * @param {express.request} req  request object
     * @param {express.response} res response object
     */
    getLogin: function (req, res) {
        res.render('login');
    },
};

module.exports = controller;
