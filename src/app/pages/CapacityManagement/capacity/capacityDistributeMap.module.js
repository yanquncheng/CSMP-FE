(function () {
  'use strict';

  angular.module('BlurAdmin.pages.CapacityManagement.capacityDistributeMap', [])
      .config(routeConfig);


  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('dashboard.CapacityManagement.capacityDistributeMap', {
          url: '/capacityDistributeMap',
          templateUrl: 'app/pages/CapacityManagement/capacity/capacityDistributeMap.html',
          controller: 'capacityDistributeMapCtrl',
          title: '容量分布',
          sidebarMeta: {
            order: 1,
          },
        });
  }
 

})();
