/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard')
      .directive('capacityByAppChart', capacityByAppChart);

  /** @ngInject */
  function capacityByAppChart() {
    return {
      restrict: 'E',
      controller: 'capacityByAppChartCtrl',
      templateUrl: 'app/pages/dashboard/capacityByApp/capacityByAppChart.html'
    };
  }
})();