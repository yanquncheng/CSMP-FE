(function () {
  'use strict';

angular.module('BlurAdmin.pages.reportManage.page', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('dashboard.reportManage.page', {
          url :"/reportPage",
          templateUrl: 'app/pages/reportManage/report/reportPage.html',
          controller: 'reportPageCtrl',
          title: '报表',
          sidebarMeta: {
            order: 2,
          },
            params: {datacenter: '', type:0}
        });
  }
})();