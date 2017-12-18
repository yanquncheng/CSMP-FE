/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.ConfigManagement', [
      'BlurAdmin.pages.ConfigManagement.topo' 
      
    ])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('dashboard.ConfigManagement', {
          url: '/ConfigManagement',
          template : '<ui-view  autoscroll="true" autoscroll-body-top></ui-view>',
          abstract: true, 
          title: '配置管理',
          sidebarMeta: {
            icon: 'ion-grid',
            order: 22,
          },
        });

  }

})();
