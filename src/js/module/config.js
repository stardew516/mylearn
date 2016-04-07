require.config({
	baseUrl: '../../js/',
	paths: {
		css: 'lib/css',
		style: '../css',
		jquery: 'lib/jquery-2.1.4',
		mCustomScrollbar: 'lib/jquery.mousewheel',
		highcharts: 'lib/highcharts/highcharts',
		hdata: 'lib/highcharts/modules/data',
		hexport: 'lib/highcharts/modules/exporting',
		util: 'module/util',
		utils: 'module/jquery.util',
		zodiac: 'module/zodiac',
		settlement: 'module/settlement',
		tqmallSpeed: 'module/tqmallSpeed'
	},
	shim: {
		util: ['utils']
	},
	urlArgs: "v=" +  (new Date()).getTime()
});
require(['jquery'], function ($) {

	var hash = {
		util       : 'util',
		zodiac		: 'zodiac',
		settlement		: 'settlement',
		tqmallSpeed		: 'tqmallSpeed'
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
