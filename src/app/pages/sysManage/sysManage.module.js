/**
 * @author cyq
 * 系统管理 
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.sysManage', [
      'BlurAdmin.pages.sysManage.user',
      'BlurAdmin.pages.sysManage.menu','BlurAdmin.pages.sysManage.role'
    ]).config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('dashboard.sysManage', {
          url: '/sysManage',
          template : '<ui-view  autoscroll="true" autoscroll-body-top></ui-view>',
          abstract: true, 
          title: '系统管理',
          sidebarMeta: {
            icon: 'ion-grid',
            order: 1,
          },
        });

  }

})();
