/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.performance', [
      'BlurAdmin.pages.performance.logicalPerformance',
    ])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('dashboard.performance', {
          url: '/performance',
          template : '<ui-view  autoscroll="true" autoscroll-body-top></ui-view>',
//        templateUrl: 'app/pages/performance/performance.html',
          abstract: true, 
//        controller: 'performanceCtrl',
          title: '性能管理',
          sidebarMeta: {
            icon: 'ion-grid',
            order: 20,
          },
        });

  }

})();
