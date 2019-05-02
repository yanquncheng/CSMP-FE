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
 


  }
})();