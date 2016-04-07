define(['jquery','highcharts'],function($,Highcharts){
        var tqmallSpeed = {
            init: function(){
                require(['hexport','hdata'],function(){
                    $.getJSON('speedData1.json', function (result) {
                        var totalTime = [],city = [],resolutionTime = [],connectTime = [],loadTime = [];
                        for(var i in result.data){
                            totalTime.push(result.data[i].totalTime);
                            city.push(result.data[i].city);
                            resolutionTime.push(result.data[i].resolutionTime);
                            connectTime.push(result.data[i].connectTime);
                            loadTime.push(result.data[i].loadTime);
                        }
                        $('#container').highcharts({
                            title: {
                                text: 'tqmall visit speed test',
                                x: -20 //center
                            },
                            subtitle: {
                                text: 'Source: ce.cloud.360.cn',
                                x: -20
                            },
                            xAxis: {
                                categories: city
                            },
                            yAxis: {
                                title: {
                                    text: 'time'
                                },
                                plotLines: [{
                                    value: 0,
                                    width: 1,
                                    color: '#808080'
                                }]
                            },
                            tooltip: {
                                valueSuffix: 'ms',
                                shared: true,
                                crosshairs: true
                            },
                            legend: {
                                layout: 'vertical',
                                align: 'right',
                                verticalAlign: 'middle',
                                borderWidth: 0
                            },
                            series: [{
                                marker: {
                                    radius: 2
                                },
                                name: 'totalTime',
                                data: totalTime
                            },{
                                marker: {
                                    radius: 2
                                },
                                name: 'resolutionTime',
                                data: resolutionTime
                            },{
                                marker: {
                                    radius: 2
                                },
                                name: 'connectTime',
                                data: connectTime
                            },{
                                marker: {
                                    radius: 2
                                },
                                name: 'loadTime',
                                data: loadTime
                            }]
                        });
                    });
                });
            }
        };
    return tqmallSpeed;
});
