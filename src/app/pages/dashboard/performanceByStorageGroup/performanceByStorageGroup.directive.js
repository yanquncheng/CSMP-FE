/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboards')
      .directive('performanceByStorageGroup', performanceByStorageGroup);

  /** @ngInject */
  function performanceByStorageGroup() {
    return {
      restrict: 'E',
      controller: 'performanceByStorageGroupCtrl',
      templateUrl: 'app/pages/dashboard/performanceByStorageGroup/performanceByStorageGroup.html'
    };
  }
})();