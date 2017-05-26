/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.EventManagement', [
      'BlurAdmin.pages.EventManagement.event',
      'BlurAdmin.pages.EventManagement.repository'
    ])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('dashboard.EventManagement', {
          url: '/EventManagement',
          template : '<ui-view  autoscroll="true" autoscroll-body-top></ui-view>',
          abstract: true, 
          title: '事件管理',
          sidebarMeta: {
            icon: 'ion-grid',
            order: 20,
          },
        });

  }

})();
