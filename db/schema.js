/*
 db/schema.js contains database schema description for application models
 by default (when using jugglingdb as ORM) this file uses database connection
 described in config/database.json. But it's possible to use another database
 connections and multiple different schemas, docs available at

 http://railwayjs.com/orm.html

 Example of model definition:

 define('User', function () {
     property('email', String, { index: true });
     property('password', String);
     property('activated', Boolean, {default: false});
 });

 Example of schema configured without config/database.json (heroku redistogo addon):
 schema('redis', {url: process.env.REDISTOGO_URL}, function () {
     // model definitions here
 });

*/

var Client = describe('Client', function () {
    property('name', String);
    property('address', String);
    property('phone', String);
});
var Action = describe('Action', function () {
    property('type,', String);
    property('description,', String);
    property('done_date', Date);
});
Client.hasMany(Action,   {as: 'actions',  foreignKey: 'clientId'});


Action.belongsTo(Client, {as: 'client', foreignKey: 'clientId'});