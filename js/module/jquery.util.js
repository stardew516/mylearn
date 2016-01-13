define(['jquery','css!style/util.css'],function($,css){
    //背景变色
    var gray = '#fcf4f4';
    var bg = function($this,color) {
        $this.css({"background-color": color,"border": "1px solid #d7d7d7"});
    };
    //弹框
    var dialog = {
        alert: function(msg){
            alert(msg);
        }
    };

    $(document).on("blur",".phone",function(){
        //手机号校验
        var $thisval = $(this).val();
        if($thisval){
            var reg = /^[1]\d{10}$/;
            if(!reg.test($thisval)){
                bg($(this),gray);
                dialog.alert('请输入正确的手机号码');
            }else{
                bg($(this),'white');
            }
        }
    }).on("input",".int",function(){
        //整数校验
        var $thisval = $(this).val();
        if($thisval) {
            var reg = /^\d*$/;
            if (!reg.test($thisval)) {
                $(this).val($(this).data('int'));
            } else {
                $(this).data('int', $thisval);
            }
        }
    }).on("input",".number",function(){
        //数字校验
        var $thisval = $(this).val();
        if($thisval) {
            var reg = /^\d+[.]?\d*$/;
            if (!reg.test($thisval)) {
                if(!$(this).data('num')){
                    $(this).val('');
                }else{
                    $(this).val($(this).data('num'));
                }
            } else {
                $(this).data('num', $thisval);
            }
        }
    }).on("blur",".email",function(){
        //邮箱校验
        var $thisval = $(this).val();
        if($thisval) {
            var reg = /^\w+[~!#$%^&*()_+]*@\w+.\w+$/;
            if (!reg.test($thisval)) {
                bg($(this), gray);
                dialog.alert('请输入有效的邮箱');
            } else {
                bg($(this), 'white');
            }
        }
    });
    //渲染
    $.fn.render = function(option){
        var defaults = {
            fill : '~',
            content: ''
        };
        var options = $.extend(defaults, option);

    };

    //触发select事件
    var open = function (elem) {
        if (document.createEvent) {
            var e = document.createEvent("MouseEvents");
            e.initMouseEvent("mousedown");
            elem[0].dispatchEvent(e);
        } else if (elem.fireEvent) {
            elem[0].fireEvent("onmousedown");
        }
    }

    ;(function($){
        //下拉列表样式修改插件
        $.fn.initSelect = function(option){
            $.each($(this), function (i) {
                var defaults = [];
                //var options = $.extend(defaults, option);
                var options = $.merge(defaults, option);
                var $this = $(this),
                    $w = $this.width(),
                    $h = $this.height(),
                    $initval = $this.find("option:selected").html();
                $this.before('<div class="plug-select-outer clearfix"></div>');
                $this.prev(".plug-select-outer").html($this);
                var str = '<div class="plug-in-select-outer">' + $initval + '</div>';
                $this.after(str);
                $this.next(".plug-in-select-outer").css({
                    "width": $w - 10,
                    "height": $h,
                    "line-height": $h + 'px'
                }).click(function () {
                    open($this);
                });
                $this.on("change", function () {
                    $this.next(".plug-in-select-outer").data("value", $this.val());
                    $.each(options, function (i) {
                        $this.next(".plug-in-select-outer").data(options[i], $this.find("option:selected").data(options[i]));
                    });
                    $this.next(".plug-in-select-outer").html($this.find("option:selected").html());
                });
            });
        };

        //图片放大插件
        $.fn.imgBig = function(option){
            var defaults = {
                "width": 300
            };
            var options = $.extend(defaults, option);
            $(document).on("click",".img-bigger",function(){
                var $this = $(this),
                    top = $this.position().top,
                    left = $this.position().left;
                var str = '<div class="plug-big-img"><img src="' + $this.attr("src") + '"width = "' + options.width + '"/></div>';
                $("body").append(str);
                $(".plug-big-img").css({
                    "top": top,
                    "left": left
                }).click(function(){
                    $(this).remove();
                });
            }).on("mousemove",".img-bigger",function(){

            }).on("mouseout",".plug-big-img",function(){
                //$(this).remove();
            });
        };

    })(jQuery);

});