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
 
             angular.forEach($scope.director_rf, function(item, index){


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
                            graphsItem["balloonText"] =  "Utilization:<b>[[value]]</b>", 
                            graphsItem["bullet"] =  "round",
                            graphsItem["bulletSize"] =  8,
                            graphsItem["lineColor"] =  "#d1655d",
                            graphsItem["lineThickness"] = 2;
                            graphsItem["negativeLineColor"] =  "#637bb6",
                            graphsItem["type"] =  "smoothedLine",
                            graphsItem["valueField"] =  key,
 
 console.log(key);
                            $scope.graphs_fa.push(graphsItem);                   
                        }

     
                    } 
            }); 

            console.log($scope.graphs_fa);
 

            var chart = AmCharts.makeChart("director_FA_chart", {
                "type": "serial",
                "theme": "black",
                "plotAreaBorderColor": "#FF0000", 
                "plotAreaFillColors": "#383535",    
                "color": "#E1DADA",  
                "marginTop":0,
                "marginRight": 0,
                "dataProvider": [{
        "year": "1966",
        "value": -0.147
    }, {
        "year": "1967",
        "value": -0.15
    }, {
        "year": "1968",
        "value": -0.16
    }, {
        "year": "1969",
        "value": -0.011
    }],
                "graphs": [{
        "id":"g1",
        "balloonText": "[[category]]<br><b><span style='font-size:14px;'>[[value]]</span></b>",
        "bullet": "round",
        "bulletSize": 8,
        "lineColor": "#d1655d",
        "lineThickness": 2,
        "negativeLineColor": "#637bb6",
        "type": "smoothedLine",
        "valueField": "value"
    }],
                "chartCursor": { 
                    "cursorAlpha": 0,
                    "valueLineEnabled":true,
                    "valueLineBalloonEnabled":true,
                    "valueLineAlpha":0.5,
                    "fullWidth":true
                }, 
                "categoryField": "year",
                "categoryAxis": { 
                    "parseDates": true,
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