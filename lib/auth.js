exports.auth = function(req,res,next){
	console.log(req.session);
	if(!req.session || !req.session.user){
		if(req.route.path.indexOf("/admin/") > -1){
			res.redirect("/admin/login");
		}else{
			res.json({status:false,msg:"please login"});
		}
	}else{
		next();
	}
}
