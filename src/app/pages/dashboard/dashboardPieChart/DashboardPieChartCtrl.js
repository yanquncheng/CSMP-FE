/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';


  angular.module('BlurAdmin.pages.dashboard')
      .controller('DashboardPieChartCtrl', DashboardPieChartCtrl);

  /** @ngInject */
  function DashboardPieChartCtrl($scope, $timeout, baConfig, baUtil) {
    var pieColor = baUtil.hexToRGB(baConfig.colors.defaultText, 0.2);
    $scope.charts = [{
      color: pieColor,
      description: '可用 / 剩余可用',
      stats: '57,820 / 29,232',
      icon: 'capacity',
      percent: 90, 
    }, {
      color: pieColor,
      description: '性能',
      stats: '$ 89,745',
      icon: 'perf-chart',
      percent: 36
    }, 
    {
      color: pieColor,
      description: '事件',
      stats: '5',
      icon: 'bell',
      percent: 10
    }
    ];
 

    $scope.charts1 = [{
      color: pieColor,
      description: '可用 / 剩余可用',
      stats: '57,820 / 29,232',
      icon: 'capacity',
      percent: 90, 
    }, {
      color: pieColor,
      description: '性能',
      stats: '$ 89,745',
      icon: 'perf-chart',
      percent: 36
    }, 
    {
      color: pieColor,
      description: '事件',
      stats: '5',
      icon: 'bell',
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
    }

    function updatePieCharts() {
      $('.pie-charts .chart').each(function(index, chart) {
        $(chart).data('easyPieChart').update(getRandomArbitrary(89, 90));
      });
    }

    $timeout(function () {
      loadPieCharts();
      //updatePieCharts();
    }, 1000);
  }
})();