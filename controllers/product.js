/**
产品
*/
var Model = require("../models");

function create(){

}

/**
列出所有的产品
*/
function list(req, res){
    var cpage = req.param.cpage || 1;
    var perpage = req.param.perpage || 15;
    console.log('params',{
        cpage:cpage,
        perpage:perpage
    })
    Model.product.find({},function(err, products){
        if(err){
            console.log('list product error',err);
            return;
        }
        var data = {
            cpage : cpage,
            perpage : perpage,
            products : products
        }
        res.render('admin/product/list',data);
    })
}

/**
*/
function createPage(req, res){
    res.render('admin/product/createPage');
}

function update(){

}

function remove(){
    
}

exports.list = list;
exports.new = createPage;
exports.create = create;
