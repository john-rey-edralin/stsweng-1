const controller = {
    getIndex: function (req, res) {
        res.render('login');
    },

    getAdminMenu: function (req, res) {
        res.render('admin');
    }
};

module.exports = controller;