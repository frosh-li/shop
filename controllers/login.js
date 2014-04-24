var Model = require("../models");

exports.index = function(req, res){
    res.render('admin/login');
}


/*
role 为 10 以上的才是管理用户
**/
exports.doLogin = function(req, res){
    var username = req.body.username,
        password = req.body.password;
    var data = {
        msg:""
    };
    Model.user.findOne({username:username,password:password,role:{$gte:10}},function(err,user){
        if(err){
            console.log('login error',{username:username,password:password});
            res.render('admin/login');
        }
        if(!user){
            console.log('login error',{username:username,password:password});
            data.msg = '用户名或者密码错误';
            res.render('login',data);   
        }else{
            req.session.user = user;
            data = user;
            console.log('login success',user);
            res.redirect('/admin/home');
        }
    })
}

exports.logout = function(req, res){
    delete req.session.user;
    res.redirect('/admin/login');
}

exports.adminIndex = function(req, res){
    res.render('admin/index',req.session.user);
}