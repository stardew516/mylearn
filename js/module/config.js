require.config({
	baseUrl: '../js/',
	paths: {
		jquery: 'lib/jquery-2.1.4',
		mCustomScrollbar: 'lib/jquery.mousewheel',
		util: 'module/util',
		utils: 'module/jquery.util'
	},
	shim: {

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
