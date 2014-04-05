var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var fs = require('fs');
fs.readdir('./models',function(err,files){
	if(err){
		console.log('readdir error',err);
		return;
	}
	files.forEach(function(file){
		if(file.indexOf(".json") > -1 && file.indexOf(".swp") < 0){
			var model = file.replace(".json","");
			console.log(file);
			fs.readFile("./models/"+file,function(err,fileData){
				if(err){
					console.log('readfile error',{file:file},err.message);
					return;
				}
				exports[model] = mongoose.model(model,new Schema(JSON.parse(fileData)));
				console.log('data model',model,'loaded');
			})
		}
	})
})
