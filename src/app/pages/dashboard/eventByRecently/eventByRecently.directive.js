/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboards')
      .directive('eventByRecently', eventByRecently);

  /** @ngInject */
  function eventByRecently() {
    return {
      restrict: 'E',
      controller: 'eventByRecentlyCtrl',
      templateUrl: 'app/pages/dashboard/eventByRecently/eventByRecently.html'
    };
  }
})();