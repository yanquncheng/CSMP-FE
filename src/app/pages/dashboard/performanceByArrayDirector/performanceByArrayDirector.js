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
        var chart1, chart2, chart3;

        $scope.setPeriod = function(period) { 
            $scope.periodtype = period;

            var b_day = document.getElementById('button-day');
            var b_week = document.getElementById('button-week');
            var b_month = document.getElementById('button-month');

                                                          
            switch (period) {
                case '1d' :
                    b_day.disabled=true;
                    b_week.disabled=false;
                    b_month.disabled=false;
                    b_day.setAttribute("class", "btn btn-info");
                    b_week.setAttribute("class", "btn btn-default");
                    b_month.setAttribute("class", "btn btn-default");
                    

                    break;
                case '1w' :
                    b_day.disabled=false;
                    b_week.disabled=true;
                    b_month.disabled=false;
                    b_day.setAttribute("class", "btn btn-default");
                    b_week.setAttribute("class", "btn btn-info");
                    b_month.setAttribute("class", "btn btn-default"); 

                    break;
                 case '1m' :
                    b_day.disabled=false;
                    b_week.disabled=false;
                    b_month.disabled=true;
                    b_day.setAttribute("class", "btn btn-default");
                    b_week.setAttribute("class", "btn btn-default");
                    b_month.setAttribute("class", "btn btn-info"); 

                    break;                
            }
            $scope.setValueType('max');

            flushData();
        }

        $scope.setValueType = function(valuetype) { 
            $scope.valuetype = valuetype;

            var b_max = document.getElementById('button-max');
            var b_avg = document.getElementById('button-avg');

            if ( $scope.periodtype == '1d' ) {
                    b_max.disabled=true;
                    b_avg.disabled=true; 
                    b_max.setAttribute("class", "btn btn-default btn-with-icon");
                    b_avg.setAttribute("class", "btn btn-default btn-with-icon"); 
            } else { 
                                         
                switch (valuetype) {
                    case 'max' :
                        b_max.disabled=true;
                        b_avg.disabled=false; 
                        b_max.setAttribute("class", "btn btn-warning btn-with-icon");
                        b_avg.setAttribute("class", "btn btn-default btn-with-icon"); 

                        break;
                    case 'average' :
                        b_max.disabled=false;
                        b_avg.disabled=true; 
                        b_max.setAttribute("class", "btn btn-default btn-with-icon");
                        b_avg.setAttribute("class", "btn btn-warning btn-with-icon"); 
                        break;             
                }
            }

            flushData();
        }



        function flushData() {
            directorData(function(result1) {

                  // remove datapoint from the beginning
                  //chart1.dataProvider.shift();  
                  chart1.dataProvider = result1.FA;
                  chart1.validateData();

                  //chart2.dataProvider.shift();  
                  chart2.dataProvider = result1.DA;
                  chart2.validateData();

                  //chart3.dataProvider.shift();  
                  chart3.dataProvider = result1.RF;
                  chart3.validateData();

            });        
        }

        function directorData(callback1) {    
                var finalResult = {};
                cfg.params = {};
                cfg.params["period"] = ( $scope.periodtype === undefined ? '1d' : $scope.periodtype ) ; 
                cfg.params["valuetype"] = ( $scope.valuetype === undefined ? 'max' : $scope.valuetype ) ;

                   async.waterfall([
                        
                        function(callback) {               
                            httpService.get('/vmax/performance/director/utilization', null, cfg, function (response) {
                                var  director_fa = response.FrontEnd.CurrentUtilization;
                                var  director_da = response.BackEnd.CurrentUtilization;
                                var director_rf = response.RDF.CurrentUtilization;
                                var graphs_fa = [];
                                var graphs_da = [];
                                var graphs_rf = [];
                        
                                for ( var j in director_fa ) {
                                    var item = director_fa[j];

                                        for ( var key in item ) {
                                            if ( key == 'DT' ) continue;

                                            var isFind = false;
                                            for ( var i in graphs_fa ) {
                                                var gItem = graphs_fa[i];
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
                                                graphsItem["negativeBase"] = 45,
                                                graphsItem["type"] =  "smoothedLine",
                                                graphsItem["valueField"] =  key,
                      
                                                graphs_fa.push(graphsItem);                   
                                            }
                                    } 
                                };
                     
                        
                                for ( var j in director_da ) {
                                    var item = director_da[j];

                                        for ( var key in item ) {
                                            if ( key == 'DT' ) continue;

                                            var isFind = false;
                                            for ( var i in graphs_da ) {
                                                var gItem = graphs_da[i];
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
                                                graphsItem["negativeBase"] = 45,
                                                graphsItem["type"] =  "smoothedLine",
                                                graphsItem["valueField"] =  key,
                      
                                                graphs_da.push(graphsItem);                   
                                            }
                                    } 
                                };
                 

                                for ( var j in director_rf ) {
                                    var item = director_rf[j];

                                        for ( var key in item ) {
                                            if ( key == 'DT' ) continue;

                                            var isFind = false;
                                            for ( var i in graphs_rf ) {
                                                var gItem = graphs_rf[i];
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
                                                graphsItem["negativeBase"] = 45,
                                                graphsItem["type"] =  "smoothedLine",
                                                graphsItem["valueField"] =  key,
                      
                                                graphs_rf.push(graphsItem);                   
                                            }
                                    } 
                                };


                                 finalResult["graphsFA"] = graphs_fa;
                                finalResult["graphsDA"] = graphs_da;
                                finalResult["graphsRF"] = graphs_rf;

                                finalResult["FA"] = director_fa;
                                finalResult["DA"] = director_da;
                                finalResult["RF"] = director_rf;
             
                                callback(null,finalResult);

                            });

                        }
                    ], function (err, result) { 
                        callback1(result);
                    });


            };


            directorData(function(result) {  

                chart1 = AmCharts.makeChart("director_FA_chart", {
                "type": "serial",
                "theme": "black",
                "plotAreaBorderColor": "#FF0000", 
                "plotAreaFillColors": "#383535",    
                "color": "#E1DADA",  
                "marginTop":0,
                "marginRight": 0,
                "dataProvider": result.FA,
                "graphs": result.graphsFA,
                "chartCursor": { 
                    "oneBalloonOnly": true
                }, 
                "categoryField": "DT",
                "categoryAxis": { 
                    "parseDates": false,
                    "minorGridAlpha": 0.1,
                    "minorGridEnabled": true
                },
                "valueAxis": {
                    "maximum": 100
                },
                "export": {
                    "enabled": true
                }
                });


                chart2 = AmCharts.makeChart("director_DA_chart", {
                "type": "serial",
                "theme": "black",
                "plotAreaBorderColor": "#FF0000", 
                "plotAreaFillColors": "#383535",    
                "color": "#E1DADA",  
                "marginTop":0,
                "marginRight": 0,
                "dataProvider": result.DA,
                "graphs": result.graphsDA,
                "chartCursor": { 
                    "oneBalloonOnly": true
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




                chart3 = AmCharts.makeChart("director_RF_chart", {
                "type": "serial",
                "theme": "black",
                "plotAreaBorderColor": "#FF0000", 
                "plotAreaFillColors": "#383535",    
                "color": "#E1DADA",  
                "marginTop":0,
                "marginRight": 0,
                "dataProvider": result.RF,
                "graphs": result.graphsRF,
                "chartCursor": {  
                    "oneBalloonOnly": true
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


                // set up the chart to update every 5 mins
                setInterval( function() {

                    directorData(function(result1) {

                          // remove datapoint from the beginning
                          //chart1.dataProvider.shift();  
                          chart1.dataProvider = result1.FA;
                          chart1.validateData();

                          //chart2.dataProvider.shift();  
                          chart2.dataProvider = result1.DA;
                          chart2.validateData();

                          //chart3.dataProvider.shift();  
                          chart3.dataProvider = result1.RF;
                          chart3.validateData();

                    });
                }, 60000 * 30 );  

             });


  }
})();