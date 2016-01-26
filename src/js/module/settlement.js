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
