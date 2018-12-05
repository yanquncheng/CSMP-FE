/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.Automation', [
      'BlurAdmin.pages.Automation.ServiceHome'
    ])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('dashboard.Automation', {
          url: '/Automation',
          template : '<ui-view  autoscroll="true" autoscroll-body-top></ui-view>',
          abstract: true, 
          title: '自动化服务',
          sidebarMeta: {
            icon: 'ion-grid',
            order: 101,
          },
        });

  }

})();
