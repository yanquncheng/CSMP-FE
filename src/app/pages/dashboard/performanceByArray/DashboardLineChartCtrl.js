/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboards')
      .controller('performanceByArrayChartCtrl', performanceByArrayChartCtrl);

  /** @ngInject */
  function performanceByArrayChartCtrl($scope, baConfig, layoutPaths, baUtil, httpService, $localStorage) {
        var config = { headers: {
            "Authorization": $localStorage.authKey
        }};
        
        var cfg = angular.copy(config);

        var layoutColors = baConfig.colors;
        var graphColor = baConfig.theme.blur ? '#000000' : layoutColors.primary;

        httpService.get('/dashboard/PerfSummary', null, cfg, function (response) {
            $scope.perfdetail = response.perfdetail;
            $scope.graphs = [];

            angular.forEach($scope.perfdetail, function(item, index){
                item.DT = moment(parseInt(item.DT)*1000).format("MM-DD HH:00");

                    for ( var key in item ) {
                        if ( key == 'DT' ) continue;

                        var isFind = false;
                        for ( var i in $scope.graphs ) {
                            var gItem = $scope.graphs[i];
                            if ( gItem.title == key ) {
                                isFind = true;
                                break;
                            }
                        }
                        if ( isFind == false ) {
                        var graphsItem = {};
                            graphsItem["balloonText"] = key + " <b>[[value]]</b>";
                            graphsItem["fillAlphas"] = 0.6 ;
                            graphsItem["lineAlpha"] = 0.4 ;
                            graphsItem["title"] = key;
                            graphsItem["valueField"] = key;

                            $scope.graphs.push(graphsItem);                            
                        }

     
                    } 
            });
            console.log($scope.graphs);
                    var chartStackedArea = AmCharts.makeChart("amchart", {
                        "type": "serial",
                        "theme": "dark",
                        "plotAreaBorderColor": "#FF0000",
                        "plotAreaFillAlphas": 0.21,
                        "plotAreaFillColors": "#383535",    
                        "color": "#E1DADA",
                        "marginRight":30,
                        "dataProvider": $scope.perfdetail ,
                        "graphs":  $scope.graphs,
                        "valueAxes": [{
                            "stackType": "regular",
                            "gridAlpha": 0.07,
                            "position": "left",
                            "title": "IOPS"
                        }],
 
                        "legend": {
                            "horizontalGap": 10,
                            "maxColumns": 4,
                            "position": "bottom",
                            "useGraphSettings": true,
                            "color": "#FFFFFF",
                            "markerSize": 16
                        },
                        "plotAreaBorderAlpha": 0,
                        "marginTop": 10,
                        "marginLeft": 0,
                        "marginBottom": 0, 
                        "chartCursor": {
                            "cursorAlpha": 0
                        },
                        "categoryField": "DT",
                        "export": {
                            "enabled": true
                         }
                    });




        });





  }
})();