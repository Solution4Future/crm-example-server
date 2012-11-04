var express = require('express');
var MongoStore = require('connect-mongo')(express);

app.configure(function(){
    var cwd = process.cwd();
    
    app.use(express.static(cwd + '/public', {maxAge: 86400000}));
    app.set('view engine', 'ejs');
    app.set('view options', {complexNames: true});
    app.set('jsDirectory', '/javascripts/');
    app.set('cssDirectory', '/stylesheets/');
    app.use(express.bodyParser());
    app.use(express.cookieParser('secret'));
    app.use(express.session({secret: 'secret'},new MongoStore({ db: 'mongodb://heroku:1d5c275dc705b0eb1e28ae318faacfee@alex.mongohq.com:10097/app8947109' })));
    app.use(express.methodOverride());
    app.use(app.router);
});

