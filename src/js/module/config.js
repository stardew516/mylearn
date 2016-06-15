require.config({
	baseUrl: '../../js/',
	paths: {
		css: 'lib/css',
		style: '../css',
		jquery: 'lib/jquery-2.1.4',
		react: 'lib/react/react',
		reactDom: 'lib/react/react-dom',
		browser: 'lib/react/browser.min',
		mCustomScrollbar: 'lib/jquery.mousewheel',
		highcharts: 'lib/highcharts/highcharts',
		hdata: 'lib/highcharts/modules/data',
		hexport: 'lib/highcharts/modules/exporting',
		util: 'module/util',
		utils: 'module/jquery.util',
		zodiac: 'module/zodiac',
		settlement: 'module/settlement',
		react: 'module/react/react',
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
		react		: 'react',
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
