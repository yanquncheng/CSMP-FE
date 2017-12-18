(function () {
  'use strict';

  angular.module('BlurAdmin.pages.objectManage.host', [])
      .config(routeConfig);


  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('dashboard.objectManage.host', {
          url: '/host',
          templateUrl: 'app/pages/objectManage/host/host.html',
          controller: 'hostCtrl',
          title: '主机管理',
          sidebarMeta: {
            order: 3,
          },
          params: {params:null,datacenter: null, appid:null}
        });
  }
 
})();
