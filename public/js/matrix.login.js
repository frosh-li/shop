
$(document).ready(function(){
    $(".btn-success").click(function(e){
        e.preventDefault();
        $("#loginform").submit();
    })
});