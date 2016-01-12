require(['jquery'],function($){
    $(document).on("input",".phone",function(){
        var $thisval = $(this).val();
        var reg = /^[1]\d{10}$/;

        console.log(reg.test($thisval));
    });
});