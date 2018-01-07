/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboardsPerformance', [
    ])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('dashboard.dashboardsPerformance', {
          url: '/performance', 
          templateUrl: 'app/pages/dashboards/performance/dashboardPerformance.html', 
		      controller: 'dashboardPerformanceCtrl',
          title: 'Dashboards - Performance' ,
          params: {param: null}
        });

  }

})();
