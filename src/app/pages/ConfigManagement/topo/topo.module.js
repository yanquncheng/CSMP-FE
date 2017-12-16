(function () {
  'use strict';

  angular.module('BlurAdmin.pages.ConfigManagement.topo', [])
      .config(routeConfig);


  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('dashboard.ConfigManagement.topo', {
          url: '/topo',
          templateUrl: 'app/pages/ConfigManagement/topo/topo.html',
          controller: 'topoCtrl',
          title: '拓扑视图1',
          sidebarMeta: {
            order: 3,
          },
        });
  }
 

})();
