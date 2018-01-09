/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboards')
      .controller('performanceByArrayDirectorCtrl', performanceByArrayDirectorCtrl);

  /** @ngInject */
  function performanceByArrayDirectorCtrl($scope, baConfig, toastr, layoutPaths, baUtil, httpService, $localStorage) {
        var config = { headers: {
            "Authorization": $localStorage.authKey
        }};
        
        
        var cfg = angular.copy(config);

        var layoutColors = baConfig.colors;
        var graphColor = baConfig.theme.blur ? '#000000' : layoutColors.primary;
        cfg.params = {};
        cfg.params["period"] = 86400;
        httpService.get('/vmax/performance/director/utilization', null, cfg, function (response) {
            $scope.director_fa = response.FrontEnd.CurrentUtilization;
            $scope.director_da = response.BackEnd.CurrentUtilization;
            $scope.director_rf = response.RDF.CurrentUtilization;
            $scope.graphs_fa = [];
            $scope.graphs_da = [];
            $scope.graphs_rf = [];
    
            for ( var j in $scope.director_fa ) {
                var item = $scope.director_fa[j];

                    for ( var key in item ) {
                        if ( key == 'DT' ) continue;

                        var isFind = false;
                        for ( var i in $scope.graphs_fa ) {
                            var gItem = $scope.graphs_fa[i];
                            if ( gItem.id == key ) {
                                isFind = true;
                                break;
                            }
                        }
                        if ( isFind == false ) {
                            var graphsItem = {}; 
                            graphsItem["id"] =  key;
                            graphsItem["balloonText"] =  key + "<br><b>[[value]]</b>", 
                            graphsItem["bullet"] =  "round",
                            graphsItem["bulletSize"] =  4,
                            graphsItem["lineColor"] =  "#FF4500",
                            graphsItem["lineThickness"] = 2;
                            graphsItem["negativeLineColor"] =  "#00FF00",
                            graphsItem["negativeBase"] = 30,
                            graphsItem["type"] =  "smoothedLine",
                            graphsItem["valueField"] =  key,
  
                            $scope.graphs_fa.push(graphsItem);                   
                        }
                } 
            };
 
    
            for ( var j in $scope.director_da ) {
                var item = $scope.director_da[j];

                    for ( var key in item ) {
                        if ( key == 'DT' ) continue;

                        var isFind = false;
                        for ( var i in $scope.graphs_da ) {
                            var gItem = $scope.graphs_da[i];
                            if ( gItem.id == key ) {
                                isFind = true;
                                break;
                            }
                        }
                        if ( isFind == false ) {
                            var graphsItem = {}; 
                            graphsItem["id"] =  key;
                            graphsItem["balloonText"] =  key + "<br><b>[[value]]</b>", 
                            graphsItem["bullet"] =  "round",
                            graphsItem["bulletSize"] =  4,
                            graphsItem["lineColor"] =  "#FF4500",
                            graphsItem["lineThickness"] = 2;
                            graphsItem["negativeLineColor"] =  "#00FF00",
                            graphsItem["negativeBase"] = 30,
                            graphsItem["type"] =  "smoothedLine",
                            graphsItem["valueField"] =  key,
  
                            $scope.graphs_da.push(graphsItem);                   
                        }
                } 
            };
 

            for ( var j in $scope.director_rf ) {
                var item = $scope.director_rf[j];

                    for ( var key in item ) {
                        if ( key == 'DT' ) continue;

                        var isFind = false;
                        for ( var i in $scope.graphs_rf ) {
                            var gItem = $scope.graphs_rf[i];
                            if ( gItem.id == key ) {
                                isFind = true;
                                break;
                            }
                        }
                        if ( isFind == false ) {
                            var graphsItem = {}; 
                            graphsItem["id"] =  key;
                            graphsItem["balloonText"] =  key + "<br><b>[[value]]</b>", 
                            graphsItem["bullet"] =  "round",
                            graphsItem["bulletSize"] =  4,
                            graphsItem["lineColor"] =  "#FF4500",
                            graphsItem["lineThickness"] = 2;
                            graphsItem["negativeLineColor"] =  "#00FF00",
                            graphsItem["negativeBase"] = 30,
                            graphsItem["type"] =  "smoothedLine",
                            graphsItem["valueField"] =  key,
  
                            $scope.graphs_rf.push(graphsItem);                   
                        }
                } 
            };
 
            var chart = AmCharts.makeChart("director_FA_chart", {
                "type": "serial",
                "theme": "black",
                "plotAreaBorderColor": "#FF0000", 
                "plotAreaFillColors": "#383535",    
                "color": "#E1DADA",  
                "marginTop":0,
                "marginRight": 0,
                "dataProvider": $scope.director_fa,
                "graphs": $scope.graphs_fa,
                "chartCursor": { 
                    "cursorAlpha": 0,
                    "valueLineEnabled":true,
                    "valueLineBalloonEnabled":true,
                    "valueLineAlpha":0.5,
                    "fullWidth":true
                }, 
                "categoryField": "DT",
                "categoryAxis": { 
                    "parseDates": false,
                    "minorGridAlpha": 0.1,
                    "minorGridEnabled": true
                },
                "export": {
                    "enabled": true
                }
            });

 
            var chart = AmCharts.makeChart("director_DA_chart", {
                "type": "serial",
                "theme": "black",
                "plotAreaBorderColor": "#FF0000", 
                "plotAreaFillColors": "#383535",    
                "color": "#E1DADA",  
                "marginTop":0,
                "marginRight": 0,
                "dataProvider": $scope.director_da,
                "graphs": $scope.graphs_da,
                "chartCursor": { 
                    "cursorAlpha": 0,
                    "valueLineEnabled":true,
                    "valueLineBalloonEnabled":true,
                    "valueLineAlpha":0.5,
                    "fullWidth":true
                }, 
                "categoryField": "DT",
                "categoryAxis": { 
                    "parseDates": false,
                    "minorGridAlpha": 0.1,
                    "minorGridEnabled": true
                },
                "export": {
                    "enabled": true
                }
            });

 

 
            var chart = AmCharts.makeChart("director_RF_chart", {
                "type": "serial",
                "theme": "black",
                "plotAreaBorderColor": "#FF0000", 
                "plotAreaFillColors": "#383535",    
                "color": "#E1DADA",  
                "marginTop":0,
                "marginRight": 0,
                "dataProvider": $scope.director_rf,
                "graphs": $scope.graphs_rf,
                "chartCursor": { 
                    "cursorAlpha": 0,
                    "valueLineEnabled":true,
                    "valueLineBalloonEnabled":true,
                    "valueLineAlpha":0.5,
                    "fullWidth":true
                }, 
                "categoryField": "DT",
                "categoryAxis": { 
                    "parseDates": false,
                    "minorGridAlpha": 0.1,
                    "minorGridEnabled": true
                },
                "export": {
                    "enabled": true
                }
            });

 
  

    }); 
 

  }
})();