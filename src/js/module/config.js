require.config({
	baseUrl: '../js/',
	paths: {
		css: 'lib/css',
		style: '../css',
		jquery: 'lib/jquery-2.1.4',
		mCustomScrollbar: 'lib/jquery.mousewheel',
		util: 'module/util',
		utils: 'module/jquery.util',
		settlement: 'module/settlement'
	},
	shim: {
		util: ['utils']
	},
	urlArgs: "v=" +  (new Date()).getTime()
});
require(['jquery'], function ($) {

	var hash = {
		util       : 'util',
		settlement		: 'settlement'
	};
	function init(){
		if ($("#router").val() in hash) {
			require([hash[$("#router").val()]], function (controller) {
				controller.init();
			});
		}
	}

	init();

	return {
		init: init
	}
});
