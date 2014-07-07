/**
产品
*/
var Model = require("../models");
var uuid = require("uuid");
/**
 * 创建一个新的产品
 * curl -d "productName=keyboard&price=100&order=1&hot=1&recommend=1&categoryId=90b930b0-0198-11e4-9d22-d747771b8e01&categoryName=subcat4&categoryType=product&mainThumb=a.jpg&photos=['1.jpg','2.jpg','3.jpg']&property.weight={'name':'weight','value':3333}" http://127.0.0.1:8080/admin/productManage/create
 * @return {[type]} [description]
 */
function create(req, res){
    var obj = {
        _id: uuid.v1(),
        productName: req.body.productName,
        price: +req.body.price || 0,
        order: +req.body.order || 0,
        hot: +req.body.hot || 0,
        recommend: +req.body.recommend || 0,
        created: new Date(),
        categoryId: req.body.categoryId,
        categoryName: req.body.categoryName,
        categoryType: req.body.categoryType,
        mainThumb: req.body.mainThumb,
        photos: req.body.photos
    };
    var properties = {};
    for(var key in req.body){
        if(key.indexOf("property.") > -1){
            properties[key.split("property.")[1]] = req.body[key];
        }
    }
    obj.property = properties;
    console.log(obj);
    Model.product.create(obj,function(err, created){
        if(err){
            console.log(err);
            res.json({'status':false});
        }
        res.json({'status':true,'pid':created._id});
    });
    //return;
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
列出所有的产品
*/
function listjson(req, res){
    var cpage = +req.params.cpage || 1;
    var perpage = +req.params.perpage || 15;
    console.log('params',{
        cpage:cpage,
        perpage:perpage
    });

    var catid = +req.params.catid || 0;
    console.log('分类ID',catid);
    var query = {};
    if(catid){
        query = {categoryId: catid};
    }
    console.log('query string',query);
    Model.product.find(query,null,{limit:perpage,skip:(cpage-1)*perpage},function(err, products){
        if(err){
            console.log('list product error',err);
            return res.json({'status':false});
        }
        var data = {
            cpage : cpage,
            perpage : perpage,
            products : products
        }
        res.json({'status':true,'data':data});
    })
}
/**
*/
function createPage(req, res){
    res.render('admin/product/createPage');
}

function update(){

}

function remove(req, res){
    var pid = req.body.pid;
    if(!pid){
        return res.json({'status':false});
    }
    Model.product.remove({_id: pid},function(err, removed){
        if(err){
            console.log(err);
            return res.json({'status':false});
        }
        res.json({'status':true});
    });
}

exports.list = list;
exports.new = createPage;
exports.create = create;
exports.listjson = listjson;
exports.remove = remove;
