/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.objectManage', [
      'BlurAdmin.pages.objectManage.tabs'
    ])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('dashboard.objectManage', {
          url: '/objectManage',
          template : '<ui-view  autoscroll="true" autoscroll-body-top></ui-view>',
          abstract: true, 
          show : true,
          title: '对象管理',
          sidebarMeta: {
            icon: 'ion-grid',
            order: 11,
          },
        });

  }

})();