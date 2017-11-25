(function () {
  'use strict';

  angular.module('BlurAdmin.pages.objectManage.switch', [])
      .config(routeConfig);


  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('dashboard.objectManage.switch', {
          url: '/switch',
          templateUrl: 'app/pages/objectManage/switch/switch.html',
          controller: 'switchCtrl',
          title: '交换机',
          sidebarMeta: {
            order: 2,
          },
          params: {param: null,datacenter: null}
        })
  }
 
})();
