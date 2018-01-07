/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboards')
      .controller('performanceByStorageGroupCtrl', performanceByStorageGroupCtrl);

  /** @ngInject */
  function performanceByStorageGroupCtrl($scope, baConfig, toastr, layoutPaths, baUtil, httpService, $localStorage) {
        var config = { headers: {
            "Authorization": $localStorage.authKey
        }};
        
        var cfg = angular.copy(config);

        var layoutColors = baConfig.colors;
        var graphColor = baConfig.theme.blur ? '#000000' : layoutColors.primary;
        cfg.params = {};
        cfg.params["period"] = 86400;
        httpService.get('/vmax/performance/storagegroup/bubblechart', null, cfg, function (response) {
            $scope.perfdetail = response;
            $scope.graphs = [];
 
            var graphsItem = {}; 
            graphsItem["balloonText"] =  "[[DT]]<br>[[device]]<br>[[sgname]]<br>ResponseTime:<b>[[ResponseTime]]</b><br>IOPS:<b>[[Requests]]</b><br>KBPS:<b>[[Throughput]]</b>",
            graphsItem["labelPosition"] =  "left",
            graphsItem["bullet"] =  "circle",
            graphsItem["bulletBorderAlpha"] =  0.2,
            graphsItem["bulletAlpha"] =  0.8,
            graphsItem["colorField"] = "Color";
            graphsItem["lineAlpha"] =  0,
            graphsItem["fillAlphas"] =  0,
            graphsItem["valueField"] =  "Throughput",
            graphsItem["xField"] =  "ResponseTime",
            graphsItem["yField"] =  "Requests",
            graphsItem["maxBulletSize"] =  100
            $scope.graphs.push(graphsItem);

            console.log($scope.graphs);
 

            var chart = AmCharts.makeChart( "chartdiv", {
              "type": "xy",
              "theme": "chalk",
                "plotAreaBorderColor": "#FF0000", 
                "plotAreaFillColors": "#383535",    
                "color": "#E1DADA",  
               "balloon":{
               "fixedPosition":true,
              },
              "colors":     ["#00FFFF", "#FCD202", "#B0DE09", "#FF6600", "#0D8ECF", "#2A0CD0", "#CD0D74", "#CC0000", "#00CC00", "#0000CC", "#DDDDDD", "#999999", "#333333", "#990000"],
              "dataProvider": $scope.perfdetail ,
                "titles": [
                    {
                        "text": "存储 Storage Group 关键性能指标",
                        "size": 20,
                        "color":"#FFFF00"
                    }
                ],
              "valueAxes": [ {
                "position": "bottom",
                "color": "#FFFF00",
                "axisAlpha": 0,
                "title" : "ResponseTime(ms)",
                "titleFontSize": 18,
                "titleColor": "#FFFF00",
                "fontSize": 15
              }, {
                "minMaxMultiplier": 1.2,
                "axisAlpha": 0,
                "color": "#FFFF00",
                "position": "left",
                "title": "IOPS",
                "titleColor": "#FFFF00",
                "titleFontSize": 18,
                "fontSize": 15
              } ],
              "startDuration": 1.5,
              "graphs": $scope.graphs,　
              "marginLeft": 46,
              "marginBottom": 35,
              "export": {
                "enabled": true
              },
              "listeners": [{
                "event": "clickGraphItem",
                "method": function(event ) {
                    event.item.dataContext[event.graph.colorField] = "#cc0000";
                    event.chart.validateData();

                    toastr.error('Type your message here<br>' + event.item.dataContext.device +"<br>" +  event.item.dataContext.sgname ,
                      'Some title here', {
                      "autoDismiss": false,
                      "positionClass": "toast-top-right",
                      "type": "error",
                      "timeOut": "5000",
                      "extendedTimeOut": "2000",
                      "allowHtml": false,
                      "closeButton": false,
                      "tapToDismiss": true,
                      "progressBar": false,
                      "newestOnTop": true,
                      "maxOpened": 0,
                      "preventDuplicates": false,
                      "preventOpenDuplicates": false
                    })          ;      
                } 
              }]
            } );

    }); 
 

  }
})();