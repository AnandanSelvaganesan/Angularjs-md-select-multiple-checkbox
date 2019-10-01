//$ npm install connect serve-static

var connect = require('connect');
var serveStatic = require('serve-static');
connect().use(serveStatic(__dirname)).listen(5001, function(){
    console.log('Server running on 5001...');
});

//$ node server.js
