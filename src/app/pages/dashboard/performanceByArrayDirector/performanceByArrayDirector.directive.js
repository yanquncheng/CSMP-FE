/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboards')
      .directive('performanceByArrayDirector', performanceByArrayDirector);

  /** @ngInject */
  function performanceByArrayDirector() {
    return {
      restrict: 'E',
      controller: 'performanceByArrayDirectorCtrl',
      templateUrl: 'app/pages/dashboard/performanceByArrayDirector/performanceByArrayDirector.html'
    };
  }
})();