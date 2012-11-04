var express = require('express');
RedisStore = require('connect-redis')(express);

var redisOpts;
if (process.env['REDISTOGO_URL']) {
    var url = require('url').parse(process.env['REDISTOGO_URL']);
    var redisOpts = {
        port: url.port,
        host: url.hostname,
        pass: url.auth.split(':')[1]
    };
} else {
    redisOpts = {};
}


app.configure(function(){
    var cwd = process.cwd();
    
    app.use(express.static(cwd + '/public', {maxAge: 86400000}));
    app.set('view engine', 'ejs');
    app.set('view options', {complexNames: true});
    app.set('jsDirectory', '/javascripts/');
    app.set('cssDirectory', '/stylesheets/');
    app.use(express.bodyParser());
    app.use(express.cookieParser('secret'));
    app.use(express.session({secret: 'secret', store: new RedisStore(redisOpts)}));    
    app.use(express.methodOverride());
    app.use(app.router);
});

