define(['jquery','utils','css!style/index.min.css','css!style/settlement.css'],function($,css){
        var settlement = {
            init: function(){
                /*鼠标移入移出事件 防止多次触发*/
                function contains(parentNode, childNode) {
                    if (parentNode.contains) {
                        return parentNode != childNode && parentNode.contains(childNode);
                    } else {
                        return !!(parentNode.compareDocumentPosition(childNode) & 16);
                    }
                }
                function checkHover(e,target){
                    if (getEvent(e).type=="mouseover")  {
                        return !contains(target,getEvent(e).relatedTarget||getEvent(e).fromElement) && !((getEvent(e).relatedTarget||getEvent(e).fromElement)===target);
                    } else {
                        return !contains(target,getEvent(e).relatedTarget||getEvent(e).toElement) && !((getEvent(e).relatedTarget||getEvent(e).toElement)===target);
                    }
                }function getEvent(e){
                    return e||window.event;
                }
                /*鼠标移入移出事件 防止多次触发*/

                $(document).on("click",".settlement-show",function(){ //点击收缩栏中图标，显示内容
                    var showbox = $('.settlement-open-list').eq($(this).index('.settlement-show'));
                    if($(this).hasClass("on")){
                        if(showbox.hasClass("on")){
                            $('.settlement').animate({"right":-280},600,function(){
                                showbox.removeClass("on");
                            });
                        }else{
                            showbox.addClass("on");
                            $('.settlement').animate({"right":0},600);
                        }
                    }else{
                        $(this).addClass("on").siblings().removeClass("on");
                        showbox.addClass("on").siblings().removeClass("on")
                        $('.settlement').animate({"right":0},600);
                    }
                }).on("mouseenter",".settlement-item",function(e){ //提示tip显示
                    if(checkHover(e,this)) {
                        $(this).find(".settlement-tip").show();
                        $(this).find(".settlement-tip").animate({right: 37}, 100);
                    }
                }).on("mouseout",".settlement-item",function(e){ //提示tip隐藏
                    if(checkHover(e,this)) {
                        $(this).find(".settlement-tip").animate({right: 60}, 100);
                        $(this).find(".settlement-tip").hide();
                    }
                }).on("click",".settlement-top",function(){ //回顶部
                    $("html,body").animate({scrollTop:0},300);
                    $(this).find(".settlement-tip").hide();
                }).on("click",".close-certify",function(){ //关闭当前窗口
                    $(this).parent().hide();
                }).on("click",".clear-phone",function(){ //清除手机号
                    $(".input-phone").val('');
                }).on("click",".settlement-open-close",function(){ //结算栏收缩
                    $('.settlement').animate({"right":-280},600,function(){
                        $('.settlement-open-list').each(function(){
                            $(this).removeClass("on")
                        });
                    });
                }).on("mouseenter",".good-add",function(e){ //移入商品添加符号变色
                    if(checkHover(e,this)) {
                        $(this).addClass("on");
                    }
                }).on("mouseout",".good-add",function(e){ //移出商品添加符号还原
                    if(checkHover(e,this)) {
                        $(this).removeClass("on");
                    }
                }).on("mouseenter",".settlement-good-list",function(e){ //移入商品背景变色，删除按钮显示
                    if(checkHover(e,this)) {
                        $(this).addClass("selected");
                    }
                }).on("mouseout",".settlement-good-list",function(e){ //移出商品背景色还原，删除按钮移出
                    if(checkHover(e,this)) {
                        $(this).removeClass("selected");
                    }
                }).on("click",".ticket-category li",function(){ //优惠券筛选事件
                    if($(this).hasClass("on")){
                        return false;
                    }else{
                        $(this).addClass("on").siblings().removeClass();
                        var index = $(this).index();
                        switch(index){
                            case 0: $(".settlement-ticket").each(function(){
                                $(this).show();
                            });
                                break;
                            case 1: $(".settlement-ticket").each(function(){
                                if($(this).hasClass("used") || $(this).hasClass("dated")){
                                    $(this).hide();
                                }else{
                                    $(this).show();
                                }
                            });
                                break;
                            case 2: $(".settlement-ticket").each(function(){
                                if($(this).hasClass("used")){
                                    $(this).show();
                                }else{
                                    $(this).hide();
                                }
                            });
                                break;
                            case 3: $(".settlement-ticket").each(function(){
                                if($(this).hasClass("dated")){
                                    $(this).show();
                                }else{
                                    $(this).hide();
                                }
                            });
                                break;


                        }
                    }
                }).on("click",".submit-feedback",function(){ //提交意见反馈
                    var tel = Number($(".telephone-num").val());
                    if(tel){
                        var reg = /^0?1[3|4|5|8][0-9]\d{8}$/;
                        if (!reg.test(tel)){
                            alert("号码有误~");
                            return false;
                        }
                    }
                    var text = $(".your-opinion").val();
                    if(!text){
                        alert("意见不能为空！")
                    }else{
                        alert("意见提交成功!")
                    }
                }).on("click",".whole-checkbox",function(){ //勾选全部
                    var that = this;
                    that.checked ? $(that).attr("checked", true) : $(that).attr("checked", false);
                    var check = that.checked ? true : false;
                    $(this).closest(".settlement-goods-list").find(".whole-son-checkbox").each(function(){
                        this.checked = check;
                        $(this).attr("checked",check);
                    });
                    $(this).closest(".settlement-goods-list").find(".single-good-checkbox").each(function(){
                        this.checked = check;
                        $(this).attr("checked", check);
                        that.checked ? $(this).parent().addClass("select") : $(this).parent().removeClass("select");
                    });
                    cartprice.Price();
                }).on("click",".title-checkbox",function(){ //勾选当前活动下得全部商品
                    var that = this;
                    that.checked ? $(that).attr("checked", true) : $(that).attr("checked", false);
                    var check = that.checked ? true : false;
                    var tcheck = $(that).closest(".merchant-name").next(".settlement-good-lists");
                    tcheck.find(".single-good-checkbox").each(function(){
                        this.checked = check;
                        $(this).attr("checked",check);
                        check ? $(this).parent().addClass("select") : $(this).parent().removeClass("select");
                    });
                    var checked = false;
                    $(that).closest(".settlement-goods-list").find(".title-checkbox").each(function(){
                        checked = this.checked ? false : true;
                        if(checked){
                            $(this).closest(".settlement-goods-list").find(".whole-checkbox").each(function(){
                                this.checked = false;
                                $(this).attr("checked",false);
                                return false;
                            });
                        }else{
                            $(this).closest(".settlement-goods-list").find(".whole-checkbox").each(function(){
                                this.checked = true;
                                $(this).attr("checked",true);
                            });
                        }
                    });
                    cartprice.Price();
                }).on("click",".single-good-checkbox",function(){ //勾选当前商品
                    var that = this;
                    that.checked ? $(that).attr("checked", true) : $(that).attr("checked", false);
                    that.checked ? $(that).parent().addClass("select") : $(that).parent().removeClass("select");
                    var checked = false,check = false;
                    var thisli = $(that).closest(".settlement-goods-list");
                    var tcheck = $(that).closest(".settlement-good-lists");
                    tcheck.find(".single-good-checkbox").each(function(){
                        var $this = this;
                        check = $this.checked ? true : false;
                        var lens = tcheck.find(".single-good-checkbox").length;
                        var len = tcheck.find(".single-good-checkbox:checked").length;
                        var checked = (lens == len ? true : false);
                        tcheck.prev(".merchant-name").find(".title-checkbox").each(function(){
                            this.checked = checked;
                        });
                    });
                    thisli.find(".title-checkbox").each(function(){
                        var $that = this;
                        var lens = thisli.find(".title-checkbox").length;
                        var len = thisli.find(".title-checkbox:checked").length;
                        var checked = (lens == len ? true : false);
                        thisli.find(".whole-checkbox").each(function(){
                            this.checked = checked;
                        });
                    });
                    cartprice.Price();
                }).on("click",".settlement-delete-good",function(){ //删除当前商品
                    $(this).closest("li").remove();
                    cartprice.Price();
                });
                /* ----------------------------购物车商品数量加减 开始---------------------------- */
                /*初始化传入参数*/
                function getCartNum(min, max, remain, alreadyBuyNum) {
                    var minNum = min;
                    var maxNum = Math.min((max - alreadyBuyNum), remain);
                    if (maxNum < minNum) {
                        minNum = maxNum;
                    }
                    return {
                        minNum: min,
                        maxNum: maxNum,
                        startNum: min
                    };

                }
                /*获得传入参数*/
                function cartNumSet(status, that) {
                    var $n, min, max, curn, alreadybuynum, minMaxObj;
                    if (that) {
                        var min = $(this).data('min');
                        var max = $(this).data('max');
                        var remain = $(this).data('remain');
                        if (remain === '') {
                            remain = max;
                        }
                        alreadybuynum = $(this).data('alreadybuynum') || 0;
                        minMaxObj = getCartNum(min, max, remain, alreadybuynum);
                    }
                    /* status:0  初始化*/
                    var valueChangedCallback = function() {
                        cartprice.Price();
                    };
                    if (status == 0) {
                        $(".settlement-good-number").each(function() {
                            var min = $(this).find("input").data('min');
                            var max = $(this).find("input").data('max');
                            var remain = $(this).find("input").data('remain');
                            if (remain === "") {
                                remain = max;
                            }
                            alreadybuynum = $(this).find("input").data('alreadybuynum') || 0;
                            minMaxObj = getCartNum(min, max, remain, alreadybuynum);
                            $.goodsnumbers.init($(this),{
                                addBtnClass   :'good-add',
                                minusBtnClass:'good-minus',
                                checkbox: 1,
                                initValue:0,
                                maxValue: minMaxObj.maxNum,
                                minValue: minMaxObj.minNum,
                                startValue: minMaxObj.startNum,
                                valueChangedCallback:valueChangedCallback
                            });
                        });
                        return;
                    }
                }
                var cartprice = {};
                cartprice.Price = function () {
                    var pr1 = 0, pr2 = 0, s = 0;
                    $(".settlement-goods-list").each(function(){
                        pr1 = 0;
                        pr2 = 0;
                        s = 0;
                        var that = $(this);
                        that.find(".good-number").each(function(){
                            var $this = this;
                            var good = $($this).closest(".settlement-good-list").find(".single-good-checkbox");
                            good.each(function(){
                                if(this.checked){
                                    var n = parseInt($($this).val());
                                    if (n > 0) {
                                        pr1 += n * Number($($this).data('price'));
                                        pr2 += n * Number($($this).data('listprice'));
                                        s += n;
                                    }
                                }
                            });

                        });
                        that.find(".cart-num").html(s);
                        that.find(".cart-price").html(pr1.toFixed(2));
                        that.find(".discount").html((pr2-pr1).toFixed(2));
                    });
                };
                $(document).ready(function(){
                    cartNumSet(0,null);
                });
                /* ----------------------------购物车商品数量加减 结束---------------------------- */

            }
        };
    return settlement;
    });
