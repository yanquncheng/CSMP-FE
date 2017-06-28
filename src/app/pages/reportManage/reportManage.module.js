(function () {
  'use strict';

  angular.module('BlurAdmin.pages.reportManage', [
      'BlurAdmin.pages.reportManage.page'
    ])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('dashboard.reportManage', {
          url: '/report',
          template : '<ui-view  autoscroll="true" autoscroll-body-top></ui-view>',
          abstract: true, 
          show : true,
          title: '报表管理',
          sidebarMeta: {
            icon: 'ion-grid',
            order: 12,
          },
            params: {param: null}
        });
  }
})();