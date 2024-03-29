/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';


  angular.module('BlurAdmin.pages.dashboards')
      .controller('DashboardPieChartCtrl', DashboardPieChartCtrl);

  /** @ngInject */
  function DashboardPieChartCtrl($scope, $timeout, baConfig, baUtil,httpService, $localStorage,$state, $interval) {
    var pieColor = baUtil.hexToRGB(baConfig.colors.defaultText, 0.2);
        var config = { headers: {
            "Authorization": $localStorage.authKey
        }};
        
        var cfg = angular.copy(config);
                $scope.charts1 = [{
                  color: pieColor,
                  description: '',
                  stats: '57,820 / 29,232',
                  icon: 'capacity',
                  percent: 90, 
                },  
                {
                  color: pieColor,
                  description: '性能',
                  stats: '5',
                  icon: 'perf-chart',
                  percent: 10
                },  
                {
                  color: pieColor,
                  description: '事件',
                  stats: '5',
                  icon: 'bell',
                  percent: 10
                }
                ];



    function getRandomArbitrary(min, max) {
      return Math.random() * (max - min) + min;
    }

    function loadPieCharts() {

 
        $('.chart').each(function () {
             var chart = $(this);
              chart.easyPieChart({
                easing: 'easeOutBounce',
                onStep: function (from, to, percent) {
                  //$(this.el).find('.percent').text(Math.round(percent)); 
                  $(this.el).find('.percent').text(Math.round(percent));
                },
                barColor: chart.attr('rel'),
                trackColor: 'rgba(0,0,0,0)',
                size: 84,
                scaleLength: 0,
                animation: 2000,
                lineWidth: 10,
                lineCap: 'round',
              });
        });

        $('.refresh-data').on('click', function () {
            updatePieCharts();
        });

        // Listener Click Event 
        var classObj = document.getElementsByClassName('pie-chart-item');
        Array.prototype.forEach.call(classObj, function(el) { 
            if ( el.id == "性能-IOPS") {
              el.addEventListener('click', function (event) {
                  // do something
                  console.log("Click on it!!!!" + el.id);
                  var param = {}; 
                  server('dashboard.dashboardsPerformance',param); 

              });
            }
        }); 


    }

    function updatePieCharts() {
      $('.pie-charts .chart').each(function(index, chart) {
        //$(chart).data('easyPieChart').update($scope.charts[index].percent);
      });
    }


    function server(url){  
      var param = {}; 
      param.backUrl = $state.current.name ; 
      $state.go(url, {param: param });
    }


/*
              httpService.get('/capacity/distributemap', null, cfg, function (response) {

                  var chartItem = {};
                  chartItem["color"] = pieColor;
                  chartItem["name"] = '剩余可用容量(TB)';
                  chartItem["stats"] = (Math.round(response.RawCapacity.ConfiguredRawCapacityGB.ConfiguredUsable.AllocateUsable.Total/1024 * 100)/100).toString();
                  chartItem["icon"] = 'capacity';
                  chartItem["percent"] = Math.round((response.RawCapacity.ConfiguredRawCapacityGB.ConfiguredUsable.AllocateUsable.Total / response.RawCapacity.ConfiguredRawCapacityGB.ConfiguredUsable.Total) * 100) ;  
                  chartItem["description"] = moment(parseInt(response.LastTS)*1000).format("YYYY-MM-DD HH:mm:ss");

                  $scope.charts.push(chartItem);

                  loadPieCharts();

              }); 

              httpService.get('/dashboard/PerfSummary', null, cfg, function (response) {

                  var chartItem = {};
                  chartItem["color"] = pieColor;
                  chartItem["name"] = '性能-IOPS';
                  chartItem["stats"] = Math.round(response.MaxIOPS.value).toString();
                  chartItem["icon"] = 'perf-chart';
                  chartItem["percent"] = Math.round((response.MaxIOPS.value / 100000) * 100) ;  
                  chartItem["description"] = moment(parseInt(response.MaxIOPS.DT)*1000).format("YYYY-MM-DD HH:mm:ss");

                  $scope.charts.push(chartItem);

                  loadPieCharts();

              });

              httpService.get('/events', null, cfg, function (response) {

                var lastTS = 0;
                for ( var i in response ) {
                    var item = response[i];
                    if ( lastTS < item.timestamp ) lastTS = item.timestamp;
                }
                
                var chartItem = {};
                chartItem["color"] = pieColor;
                chartItem["name"] = '事件';
                chartItem["stats"] = response.length;
                chartItem["icon"] = 'bell';
                chartItem["percent"] = 22;
                //chartItem["description"] = moment(parseInt(lastTS)*1000).format("YYYY-MM-DD HH:mm:ss");
                chartItem["description"] = moment().format('LTS');

                $scope.charts.push(chartItem); 
                loadPieCharts();

              });

              $timeout(function () {
                loadPieCharts();
                //updatePieCharts();
              }, 1000);            

              // Listener Click Event 
              var classObj = document.getElementsByClassName('pie-chart-item');
              Array.prototype.forEach.call(classObj, function(el) { 
                  if ( el.id == "性能-IOPS") {
                    el.addEventListener('click', function (event) {
                        // do something
                        console.log("Click on it!!!!" + el.id);
                        var param = {}; 
                        server('dashboard.dashboardsPerformance',param); 

                    });
                  }
              }); 

                          
*/

    function flushData(){   
      var charts_tmp = [];
      
      async.waterfall([
            
            function(callback) {
                httpService.get('/capacity/distributemap', null, cfg, function (response) {

                    var chartItem = {};
                    chartItem["color"] = pieColor;
                    chartItem["name"] = '剩余可用容量(TB)';
                    chartItem["stats"] = (Math.round(response.RawCapacity.ConfiguredRawCapacityGB.ConfiguredUsable.AllocateUsable.Total/1024 * 100)/100).toString();
                    chartItem["icon"] = 'capacity';
                    chartItem["percent"] = Math.round((response.RawCapacity.ConfiguredRawCapacityGB.ConfiguredUsable.AllocateUsable.Total / response.RawCapacity.ConfiguredRawCapacityGB.ConfiguredUsable.Total) * 100) ;  
                    chartItem["description"] = moment(parseInt(response.LastTS)*1000).format("YYYY-MM-DD HH:mm:ss");

                    charts_tmp.push(chartItem);

                    callback(null,"aa");

                }); 
            },
            function(arg1,callback){ 

                httpService.get('/dashboard/PerfSummary', null, cfg, function (response) {

                    var chartItem = {};
                    chartItem["color"] = pieColor;
                    chartItem["name"] = '性能-IOPS';
                    chartItem["stats"] = Math.round(response.MaxIOPS.value).toString();
                    chartItem["icon"] = 'perf-chart';
                    chartItem["percent"] = Math.round((response.MaxIOPS.value / 100000) * 100) ;  
                    //chartItem["description"] = moment(parseInt(response.MaxIOPS.DT)*1000).format("YYYY-MM-DD HH:mm:ss");
                    chartItem["description"] =  response.MaxIOPS.DT;
                    charts_tmp.push(chartItem);

                    callback(null,"aa");

                });

            },
            function(arg1,callback) {

                httpService.get('/events', null, cfg, function (response) {

                  var lastTS = 0;
                  for ( var i in response ) {
                      var item = response[i];
                      if ( lastTS < item.timestamp ) lastTS = item.timestamp;
                  }
                  
                  var chartItem = {};
                  chartItem["color"] = pieColor;
                  chartItem["name"] = '事件';
                  chartItem["stats"] = response.length;
                  chartItem["icon"] = 'bell';
                  chartItem["percent"] = 22;
                  //chartItem["description"] = moment(parseInt(lastTS)*1000).format("YYYY-MM-DD HH:mm:ss");
                  chartItem["description"] = moment().format('LTS');

                  charts_tmp.push(chartItem); 
                  callback(null,"aa");

                });


            },
            function(arg1,callback) { 
                $scope.charts = charts_tmp;
 
                $timeout(function () {
                  loadPieCharts();
                  //updatePieCharts();
                }, 1000);            


                callback(null,arg1);
            }
        ], function (err, result) { 
            
        });
     }

    flushData();

    // 10秒执行一次
     $scope.runner = $interval(flushData, 60000*60);

    $scope.$on('$destroy', function () {
      $interval.cancel($scope.runner);  
    });
    


  }
})();