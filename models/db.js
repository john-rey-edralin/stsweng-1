const mongoose = require('mongoose');

const url = process.env.DB_URL;

const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
};

const database = {
    connect: async function () {
        await mongoose.connect(url, options);
        console.log('Connected!');
    },

    disconnect: async function () {
        await mongoose.disconnect();
        console.log('Disconnected!');
    },

    insertOne: function (model, doc, callback) {
        model.create(doc, function (error, result) {
            if (error) return callback(false);
            console.log('Added ' + result);
            return callback(true);
        });
    },

    insertMany: function (model, docs, callback) {
        model.insertMany(docs, function (error, result) {
            if (error) return callback(false);
            console.log('Added ' + result);
            return callback(true);
        });
    },

    findOne: function (model, query, projection, callback) {
        model.findOne(query, projection, function (error, result) {
            if (error) return callback(false);
            return callback(result);
        });
    },

    findMany: function (model, query, projection, callback) {
        model.find(query, projection, function (error, result) {
            if (error) return callback(false);
            return callback(result);
        });
    },

    updateOne: function (model, filter, update, callback) {
        model.findOneAndUpdate(filter, update, function (error, result) {
            if (error) return callback(false);
            console.log('Document modified: ' + result.nModified);
            return callback(result);
        });
    },

    updateMany: function (model, filter, update, callback) {
        model.updateMany(filter, update, function (error, result) {
            if (error) return callback(false);
            console.log('Documents modified: ' + result.nModified);
            return callback(result);
        });
    },

    deleteOne: function (model, conditions, callback) {
        model.deleteOne(conditions, function (error, result) {
            if (error) return callback(false);
            console.log('Document deleted: ' + result.deletedCount);
            return callback(true);
        });
    },

    deleteMany: function (model, conditions, callback) {
        model.deleteMany(conditions, function (error, result) {
            if (error) return callback(false);
            console.log('Document deleted: ' + result.deletedCount);
            return callback(result.deletedCount);
        });
    },

    count: function (model, query, callback) {
        model.countDocuments(query, function (error, result) {
            if (error) return callback(false);
            console.log('Documents: ' + result);
            return callback(result);
        });
    },
};

module.exports = database;
