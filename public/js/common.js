(function(){
	var sidebar = $("#sidebar");
    var links = $(sidebar).find("a");
	for(var i = 0 ; i < links.length ; i++){
		var href = $(links[i]).attr('href');
		console.log(href.split("/"));
		if(window.location.href.indexOf(href.split("/")[2]) > -1){
			$(links[i]).parent().addClass("active");
		}
	}	
})();
