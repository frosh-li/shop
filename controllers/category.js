var db = require("../models");
var uuid = require("uuid");

/**
 * curl -d "name=subcat4&upid=90b930b0-0198-11e4-9d22-d747771b8e01&property.weight={'name':1,'type':'select','value':[1,2,3]}" http://127.0.0.1:8080/admin/category/add
 * @param {[type]}   name     [description]
 * @param {[type]}   options  [description]
 * @param {Function} callback [description]
 */
function addCategory(name,options,callback){
    var upid = options.upid || 0;
    console.log(name,options);
    var obj = {
        _id: uuid.v1(),
        "link":"",
        "upid":options.upid || 0,
        "categoryName":name,
        "order":options.order || 0,
        "type":options.type || "product",
        "property":options.property || {}
    };
    db.category.create(obj, function(err,cate){
        if(err){
            console.log(err);
            return callback({"status":false});
        }
        console.log(cate);
        return callback({"status":true,"catid":cate._id});
    });
}

function updateCategory(){
    var upid = options.upid || 0;
    console.log(name,options);
    var obj = {
        _id: uuid.v1(),
        "link":"",
        "upid":options.upid || 0,
        "categoryName":name,
        "order":options.order || 0,
        "type":options.type || "product",
        "property":options.property || {}
    };
    db.category.update({_id: _id}, function(err,cate){
        if(err){
            console.log(err);
            return callback({"status":false});
        }
        console.log(cate);
        return callback({"status":true,"catid":cate._id});
    });
}

function deleteCategory(catid, callback){
    db.category.remove({$or:[{_id: catid}, {upid: catid}]},function(err, deleted){
        if(err){
            console.log(err);
            return callback({"status":false});
        }
        return callback({"status":true});
    });
}

function listCategory(req, res){
    var query = {upid: "0"};
    console.log(req.params);
    if(req.params.catid){
        query.upid = req.params.catid;
    }
    db.category.find(query,function(err,cats){
        if(err){
            console.log(err);
            res.json({"status":false});
        }
        res.json({"status":true,"data":cats});
    });
}

exports.list = listCategory;
exports.del = function(req,res){
    var catid = req.body.catid;
    console.log(catid);
    if(catid){
        deleteCategory(catid, function(data){
            res.json(data);
        });
    }else{
        res.json({"status":false});
    }
}

exports.add = function(req, res){
    var name = req.body.name,
        upid = req.body.upid,
        order = req.body.order,
        type = req.body.type,
        property = {};
    for(var key in req.body){
        if(key.indexOf("property.") > -1){
            console.log(req.body[key]);
            property[key.split("property.")[1]] = req.body[key];
        }
    }
    console.log(property);
    addCategory(name, {
        upid: upid,
        order: order,
        type: type,
        property: property
    },function(data){
        res.json(data);
    });
}