(function () {
  'use strict';

  angular.module('BlurAdmin.pages.sysManage.report', [])
      .config(routeConfig);


  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('dashboard.sysManage.report', {
          url: '/report',
          templateUrl: 'app/pages/sysManage/report/report.html',
          controller: 'reportCtrl',
          title: '报表管理',
          sidebarMeta: {
            order: 3,
          },
          params: {params:null}
        });
  }
 
})();
