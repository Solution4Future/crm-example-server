require('../test_helper.js').controller('clients', module.exports);

var sinon  = require('sinon');

function ValidAttributes () {
    return {
        name: '',
        address: '',
        phone: ''
    };
}

exports['clients controller'] = {

    'GET new': function (test) {
        test.get('/clients/new', function () {
            test.success();
            test.render('new');
            test.render('form.' + app.set('view engine'));
            test.done();
        });
    },

    'GET index': function (test) {
        test.get('/clients', function () {
            test.success();
            test.render('index');
            test.done();
        });
    },

    'GET edit': function (test) {
        var find = Client.find;
        Client.find = sinon.spy(function (id, callback) {
            callback(null, new Client);
        });
        test.get('/clients/42/edit', function () {
            test.ok(Client.find.calledWith('42'));
            Client.find = find;
            test.success();
            test.render('edit');
            test.done();
        });
    },

    'GET show': function (test) {
        var find = Client.find;
        Client.find = sinon.spy(function (id, callback) {
            callback(null, new Client);
        });
        test.get('/clients/42', function (req, res) {
            test.ok(Client.find.calledWith('42'));
            Client.find = find;
            test.success();
            test.render('show');
            test.done();
        });
    },

    'POST create': function (test) {
        var client = new ValidAttributes;
        var create = Client.create;
        Client.create = sinon.spy(function (data, callback) {
            test.strictEqual(data, client);
            callback(null, client);
        });
        test.post('/clients', {Client: client}, function () {
            test.redirect('/clients');
            test.flash('info');
            test.done();
        });
    },

    'POST create fail': function (test) {
        var client = new ValidAttributes;
        var create = Client.create;
        Client.create = sinon.spy(function (data, callback) {
            test.strictEqual(data, client);
            callback(new Error, client);
        });
        test.post('/clients', {Client: client}, function () {
            test.success();
            test.render('new');
            test.flash('error');
            test.done();
        });
    },

    'PUT update': function (test) {
        Client.find = sinon.spy(function (id, callback) {
            test.equal(id, 1);
            callback(null, {id: 1, updateAttributes: function (data, cb) { cb(null); }});
        });
        test.put('/clients/1', new ValidAttributes, function () {
            test.redirect('/clients/1');
            test.flash('info');
            test.done();
        });
    },

    'PUT update fail': function (test) {
        Client.find = sinon.spy(function (id, callback) {
            test.equal(id, 1);
            callback(null, {id: 1, updateAttributes: function (data, cb) { cb(new Error); }});
        });
        test.put('/clients/1', new ValidAttributes, function () {
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

