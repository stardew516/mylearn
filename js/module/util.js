define(function(require,exports,module){
    var $ = require('jquery');
    var util = {
        init: function(){
            require(['utils'],function(utils){
                console.log(utils);
                $(".select").initSelect(["id"]);
                $(".img-bigger").imgBig({"width":500});
            });

        }
    };
    module.exports = util;
});
