require('../test_helper.js').controller('actions', module.exports);

var sinon  = require('sinon');

function ValidAttributes () {
    return {
        type,: '',
        description,: '',
        done_date: ''
    };
}

exports['actions controller'] = {

    'GET new': function (test) {
        test.get('/actions/new', function () {
            test.success();
            test.render('new');
            test.render('form.' + app.set('view engine'));
            test.done();
        });
    },

    'GET index': function (test) {
        test.get('/actions', function () {
            test.success();
            test.render('index');
            test.done();
        });
    },

    'GET edit': function (test) {
        var find = Action.find;
        Action.find = sinon.spy(function (id, callback) {
            callback(null, new Action);
        });
        test.get('/actions/42/edit', function () {
            test.ok(Action.find.calledWith('42'));
            Action.find = find;
            test.success();
            test.render('edit');
            test.done();
        });
    },

    'GET show': function (test) {
        var find = Action.find;
        Action.find = sinon.spy(function (id, callback) {
            callback(null, new Action);
        });
        test.get('/actions/42', function (req, res) {
            test.ok(Action.find.calledWith('42'));
            Action.find = find;
            test.success();
            test.render('show');
            test.done();
        });
    },

    'POST create': function (test) {
        var action = new ValidAttributes;
        var create = Action.create;
        Action.create = sinon.spy(function (data, callback) {
            test.strictEqual(data, action);
            callback(null, action);
        });
        test.post('/actions', {Action: action}, function () {
            test.redirect('/actions');
            test.flash('info');
            test.done();
        });
    },

    'POST create fail': function (test) {
        var action = new ValidAttributes;
        var create = Action.create;
        Action.create = sinon.spy(function (data, callback) {
            test.strictEqual(data, action);
            callback(new Error, action);
        });
        test.post('/actions', {Action: action}, function () {
            test.success();
            test.render('new');
            test.flash('error');
            test.done();
        });
    },

    'PUT update': function (test) {
        Action.find = sinon.spy(function (id, callback) {
            test.equal(id, 1);
            callback(null, {id: 1, updateAttributes: function (data, cb) { cb(null); }});
        });
        test.put('/actions/1', new ValidAttributes, function () {
            test.redirect('/actions/1');
            test.flash('info');
            test.done();
        });
    },

    'PUT update fail': function (test) {
        Action.find = sinon.spy(function (id, callback) {
            test.equal(id, 1);
            callback(null, {id: 1, updateAttributes: function (data, cb) { cb(new Error); }});
        });
        test.put('/actions/1', new ValidAttributes, function () {
            test.success();
            test.render('edit');
            test.flash('error');
            test.done();
        });
    },

    'DELETE destroy': function (test) {
        test.done();
    },

    'DELETE destroy fail': function (test) {
        test.done();
    }
};

