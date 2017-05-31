/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.CapacityManagement', [
      'BlurAdmin.pages.CapacityManagement.coreview',
      'BlurAdmin.pages.CapacityManagement.gateway'
    ])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('dashboard.CapacityManagement', {
          url: '/CapacityManagement',
          template : '<ui-view  autoscroll="true" autoscroll-body-top></ui-view>',
          abstract: true, 
          title: '容量管理',
          sidebarMeta: {
            icon: 'ion-grid',
            order: 10,
          },
        });

  }

})();
