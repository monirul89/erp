function img_show(input,show_id) {
    if (input.files && input.files[0]) {
        var filerdr = new FileReader();
        filerdr.onload = function (e) {
            $('#'+show_id).attr('src', e.target.result);
        }
        filerdr.readAsDataURL(input.files[0]);
    }
}


$(document).ready(function( $ ) {
    $("#user_profile").click(function(){
        $("#user_profile_nav").slideToggle("3000");
    });
    $(document).mouseup(function (e){
        var list = new Array();
        list.push($('#user_profile_nav'));
        $.each(list, function(key, value) {
            if (!$(value).is(e.target) && $(value).has(e.target).length === 0){
                $(value).slideUp("slow");
            }
        });
    });
});