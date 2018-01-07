/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboards')
      .directive('statisticByApp', statisticByApp);

  /** @ngInject */
  function statisticByApp() {
    return {
      restrict: 'E',
      controller: 'statisticByAppCtrl',      
      templateUrl: 'app/pages/dashboard/statisticByApp/statisticByApp.html'
    };
  }
})();