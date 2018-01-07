/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboards', [ 
    ])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('dashboard.dashboards', {
          url: '/dashboard',
//        template : '<ui-view  autoscroll="true" autoscroll-body-top></ui-view>',
          templateUrl: 'app/pages/dashboards/dashboard.html',
//        abstract: true, 
		  controller: 'dashboardCtrl',
          title: 'Dashboards',
          sidebarMeta: {
            icon: 'ion-grid',
            order: 1,
          },
        });

  }

})();
