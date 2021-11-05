const controller = {
    getIndex: function (req, res) {
        req.session.username = 'mamo';
        res.render('home');
    },
};

module.exports = controller;
