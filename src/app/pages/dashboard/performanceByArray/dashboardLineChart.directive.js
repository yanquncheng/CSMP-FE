/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard')
      .directive('performanceByArrayChart', performanceByArrayChart);

  /** @ngInject */
  function performanceByArrayChart() {
    return {
      restrict: 'E',
      controller: 'performanceByArrayChartCtrl',
      templateUrl: 'app/pages/dashboard/performanceByArray/dashboardLineChart.html'
    };
  }
})();