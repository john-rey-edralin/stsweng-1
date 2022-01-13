const controller = {
    getIndex: function (req, res) {
        res.redirect('/event-tracker/home');
    }
};

module.exports = controller;