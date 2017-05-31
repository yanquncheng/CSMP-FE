(function () {
  'use strict';

  angular.module('BlurAdmin.pages.CapacityManagement.coreview', [])
      .config(routeConfig);


  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('dashboard.CapacityManagement.coreview', {
          url: '/coreview',
          templateUrl: 'app/pages/CapacityManagement/coreview/coreview.html',
          controller: 'coreviewCtrl',
          title: '数据中心容量视图',
          sidebarMeta: {
            order: 1,
          },
        });
  }
 

})();
