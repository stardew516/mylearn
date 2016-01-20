require.config({
	baseUrl: '../js/',
	paths: {
		css: 'lib/css',
		style: '../css',
		jquery: 'lib/jquery-2.1.4',
		mCustomScrollbar: 'lib/jquery.mousewheel',
		util: 'module/util',
		utils: 'module/jquery.util'
	},
	shim: {
		util: ['utils']
	},
	urlArgs: "v=" +  (new Date()).getTime()
});

require(['jquery'], function ($) {

	var hash = {
		util       : 'util',
		mine		: 'mine'
	};

	function init(){
		if ($("#router").val() in hash) {
			require([hash[$("#router").val()]], function (controller) {
				console.log(hash[$("#router").val()],controller);
				controller.init();
			});
		}
	}

	init();

	return {
		init: init
	}
});

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
        //下拉列表样式修改插件---开始
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
        //下拉列表样式修改插件---结束
        //图片放大插件---开始
        $.fn.imgBig = function(option){
            var defaults = {
                "width": 300
            };
            var options = $.extend(defaults, option);
            $(document).on("click",".img-bigger",function(){
                if($(this).hasClass("on")){
                    return false;
                }else {
                    var $this = $(this),
                        top = $this.position().top,
                        left = $this.position().left,
                        $w = $this.width();
                    $(".img-bigger").removeClass("on");
                    $this.addClass("on");
                    $(".plug-big-img").remove();
                    var str = '<div class="plug-big-img"><img src="' + $this.attr("src") + '"/></div>';
                    $("body").append(str);
                    $(".plug-big-img").css({
                        "top": top,
                        "left": left,
                        "width": $w
                    }).click(function () {
                        $(this).animate({
                            "top": top,
                            "left": left,
                            "width": $this.width(),
                            "margin-top": 0,
                            "margin-left": 0
                        }, 600,function(){
                            $(this).remove();
                        });
                        $this.removeClass("on");
                    }).animate({
                        "top": '50%',
                        "left": '50%',
                        "width": options.width,
                        "margin-top": -options.width / 2,
                        "margin-left": -options.width / 2
                    }, 600);
                }
            });
        };
        //图片放大插件---结束

        //商品数量加减插件---开始
        $.goodsnumbers = {
            init: function($t,option){
                var defaults = {
                    addBtnClass   :'add',
                    minusBtnClass:'minus',
                    btnDisableClass : 'gray',
                    maxValue : 999999,
                    minValue : 0,
                    initValue : 0,
                    inputerClass : null,
                    valueChangedCallback:null
                };
                var opts = $.extend({}, defaults  , option);
                //iterate and reformat each matched element
                console.log($t,typeof $t);
                return $t.each(function(){
                    $this = $(this);
                    var $minusBtn = $this.find( '.'+opts.minusBtnClass );
                    if( !$minusBtn ){
                        console.error("cannot find minus button!");
                    }
                    var $addBtn = $this.find( '.'+opts.addBtnClass );
                    if( !$addBtn ){
                        console.error("cannot find add button!");
                    }
                    var inputerSelector = 'input' + ( opts.inputerClass ? '.'+opts.inputerClass : '' );
                    $inputer = $this.find( inputerSelector );
                    if( !$inputer ){
                        console.error("cannot find inputer !");
                    }
                    if( opts.maxValue < opts.minValue ){
                        opts.minValue = opts.maxValue;
                    }
                    $this.get(0).opts = opts;
                    $.goodsnumbers.updateValue.call( $this , opts.initValue);
                    $this.addClass('goodsnumbers');

                    $this.on('click' , '.'+opts.addBtnClass , $.goodsnumbers.addminusClicked);
                    $this.on('click' , '.'+opts.minusBtnClass , $.goodsnumbers.addminusClicked);
                    $this.on('input' , inputerSelector , $.goodsnumbers.valueInputed);
                });
            },
            addminusClicked: function(e){
                var $btn = $(this);
                var nextValue = 0 ;
                var $that = $btn.closest('.goodsnumbers');
                var opts = $that.get(0).opts;
                var curValue = $.goodsnumbers.getCurrentValue.call($that);

                if($btn.hasClass( opts.addBtnClass) ){
                    nextValue = curValue + 1 ;
                    var $input = $(this).prev();
                    var $de = $input.prev();
                    $input.show();
                    $de.css('display', 'inline-block');
                    if($input.val() < 0){
                        $input.val(0);
                    }
                    if(nextValue < opts.minValue){
                        nextValue = opts.minValue;
                    }
                    if($(this).hasClass(opts.btnDisableClass)){
                        return false;
                    }
                }else if($btn.hasClass( opts.minusBtnClass) ){
                    nextValue = curValue - 1;
                    var $input = $(this).next();
                    if(nextValue < opts.minValue){
                        nextValue = opts.initValue;
                    }
                }
                $.goodsnumbers.updateValue.call($that,nextValue);
                nextValue > 0 ? $inputer.addClass("onn") : $inputer.removeClass("onn");
            },
            valueInputed: function(e){
                var $inputer = $(this);
                var value = parseInt($inputer.val());
                var $that = $inputer.closest('.goodsnumbers');
                var opts = $that.get(0).opts;
                var curValue = $.goodsnumbers.getCurrentValue.call($that);
                if( value < 0 || isNaN(value)){
                    value = 0;
                }
                if( value < opts.minValue){
                    value = curValue < value ? opts.minValue : 0;
                }
                value > 0 ? $inputer.addClass("onn") : $inputer.removeClass("onn");
                $.goodsnumbers.updateValue.call( $that , value);
            },
            getCurrentValue: function(){
                var $that = this;
                var value = $that.get(0).value ;
                return value;
            },
            updateValue: function(value){
                var $that = this;
                var opts = $that.get(0).opts;
                if( value === null ){
                    return;
                }
                if( value === $this.value ){
                    return;
                }
                var $minusBtn = $that.find( '.'+opts.minusBtnClass );
                var $addBtn = $that.find( '.'+opts.addBtnClass );
                $minusBtn.removeClass(opts.btnDisableClass);
                $addBtn.removeClass(opts.btnDisableClass);
                if( value >= opts.maxValue ){
                    value = opts.maxValue;
                    $addBtn.addClass( opts.btnDisableClass );
                }else if ( value < opts.minValue ){
                    $minusBtn.addClass( opts.btnDisableClass );
                }
                if( opts.maxValue == 0 && opts.minValue == 0){
                    $minusBtn.addClass(opts.btnDisableClass);
                    $addBtn.addClass(opts.btnDisableClass);
                }
                $that.get(0).prevValue = $that.get(0).value;
                $that.get(0).value = value;
                $inputer = $that.find( 'input' + ( opts.inputerClass ? '.'+ opts.inputerClass : '' ) );
                $inputer.val(value);
                if( $that.get(0).prevValue !== null
                    && opts.valueChangedCallback ){
                    opts.valueChangedCallback.call( $that.get(0) , value );
                }
            }
        };
        //商品数量加减插件---结束
    })(jQuery);
});

define(function(require,exports,module){
    var $ = require('jquery');
    var util = {
        init: function(){
            require(['utils'],function(utils){
                //下拉列表样式修改初始化
                $(".select").initSelect(["id"]);

                //图片放大初始化
                $(".img-bigger").imgBig({"width":500});

                //商品数量初始化---开始
                var getNumPadScope = function(min,max,remain,alreadyBuyNum){
                    var minNum = min;
                    var maxNum = Math.min( (max-alreadyBuyNum),remain );

                    if( maxNum < minNum ){
                        minNum = maxNum;
                    }
                    return {
                        minNum:min,
                        maxNum:maxNum,
                        startNum:0
                    };

                };
                var numSet = function(status, that) {
                    var $n, min, max, curn, alreadybuynum, minMaxObj;
                    if (that) {
                        var min = $(this).data('min');
                        var max = $(this).data('max');
                        var remain = $(this).data('remain');
                        if( remain === '' ){ remain = max;}
                        alreadybuynum = $(this).data('alreadybuynum') || 0;
                        minMaxObj = getNumPadScope(min,max,remain,alreadybuynum);
                    }
                    /* status:0  初始化*/
                    var valueChangedCallback = function(){
                        sum.calculationOfPrice();
                    };
                    if (status == 0) {
                        $(".plug-good-num").each(function () {
                            var min = $(this).find("input").data('min');
                            var max = $(this).find("input").data('max');
                            var remain = $(this).find("input").data('remain');
                            if( remain === "" ){ remain = max;}
                            alreadybuynum = $(this).find("input").data('alreadybuynum') || 0;
                            minMaxObj = getNumPadScope(min,max,remain,alreadybuynum);
                            $.goodsnumbers.init($(this),{
                                initValue:0,
                                maxValue: minMaxObj.maxNum,
                                minValue: minMaxObj.minNum,
                                startValue: minMaxObj.startNum,
                                valueChangedCallback:valueChangedCallback
                            });

                        });
                        return;
                    }
                };
                var sum = {};
                sum.calculationOfPrice = function () {
                    var pr1 = 0, pr2 = 0,s = 0;
                    $('.good-number').each(function () {
                        var n = parseInt($(this).val());
                        if (n > 0) {
                            pr1 += n * Number($(this).data('price'));
                            pr2 += n * Number($(this).data('listprice'));
                            s += n;
                        }
                    });

                    $('.goods-total-price').text(pr1.toFixed(2));
                    $('.goods-save-price').text((pr2-pr1).toFixed(2));
                };
                numSet(0,null);
                //商品数量初始化---结束

            });

        }
    };
    module.exports = util;
});
