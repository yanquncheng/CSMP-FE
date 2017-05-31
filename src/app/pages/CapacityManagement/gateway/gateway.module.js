(function () {
  'use strict';

  angular.module('BlurAdmin.pages.CapacityManagement.gateway', [])
      .config(routeConfig);


  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('dashboard.CapacityManagement.gateway', {
          url: '/gateway',
          templateUrl: 'app/pages/CapacityManagement/gateway/gateway.html',
          controller: 'gatewayCtrl',
          title: '虚拟网关容量视图',
          sidebarMeta: {
            order: 2,
          },
        });
  }
 

})();
