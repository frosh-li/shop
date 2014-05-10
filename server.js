
/**
 * Module dependencies.
 */

var express = require('express');
var fs = require('fs');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');
var express_mongoose = require('express-mongoose');
var auth = require("./lib/auth.js").auth;
var app = express();
var mongo_url = process.env.DEV == 1 ? "mongodb://127.0.0.1:27017/shop":"mongodb://mongo.duapp.com:8908/myymPmSvdNhMQOdOOLTn/";
var mongo_url = "mongodb://127.0.0.1:27017/shop";
mongoose.connect(mongo_url,{server:{poolSize:20}});
mongoose.connection.on('error',function(err){
	console.log('mongo connection error',err);
});

var Model = require("./models");
//all routers
var login = require('./controllers/login');
var product = require('./controllers/product');
// all environments
app.set('port', process.env.PORT || 18080);
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.bodyParser({uploadDir:'./public/upload'}));
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/admin/login',login.index);
app.get('/admin/logout',login.logout);
app.post('/admin/login',login.doLogin);
app.get('/admin/home',auth,login.adminIndex);
app.get('/admin/productManage/:cpage/:perpage',auth,product.list);
app.get('/admin/productManage/new',auth,product.new);
app.post('/admin/productManage/create',auth,product.create);
app.post('/upload',function(req,res){
    console.log(req.files);
    var allfiles = req.files.files;
    var ret = {files:[]};
    allfiles.forEach(function(file){
        ret.files.push(file.path.replace("public",""));
    });
    console.log(ret);
    res.json(ret);
});
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
