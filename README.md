# Angularjs-md-select-multiple-checkbox
Angular Js material design md-select dropdown with search, multiple checkbox and infinite scroll

![md-select-multi-checkbox](https://raw.githubusercontent.com/AnandanSelvaganesan/Angularjs-md-select-multiple-checkbox/master/img/md-select-multi-checkbox.png)

![md-select-multi-checkbox-dropdown-open](https://raw.githubusercontent.com/AnandanSelvaganesan/Angularjs-md-select-multiple-checkbox/master/img/md-select-multi-checkbox-dropdown-open.png)


To test in your local mechine required Node Js and find the below Node Js static server code.

//$ npm install connect serve-static

var connect = require('connect');
var serveStatic = require('serve-static');
connect().use(serveStatic(__dirname)).listen(5001, function(){
    console.log('Server running on 5001...');
});

//$ node server.js
