define(function(require,exports,module){
    var $ = require('jquery');
    var util = {
        init: function(){
            require('utils');
            console.log('hello seajs');
            this.outPut();
        },
        outPut: function(){
            console.log('outPut hello seajs');
        }
    };
    module.exports = util;
});
