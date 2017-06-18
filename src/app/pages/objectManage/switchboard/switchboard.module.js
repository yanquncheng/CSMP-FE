(function () {
  'use strict';

  angular.module('BlurAdmin.pages.objectManage.switchboard', [])
      .config(routeConfig);


  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('dashboard.objectManage.switchboard', {
          url: '/switchboard',
          templateUrl: 'app/pages/objectManage/switchboard/switchboard.html',
          controller: 'switchboardCtrl',
          title: '交换机',
          sidebarMeta: {
            order: 2,
          },
          params: {param: null,datacenter: null}
        }).state('dashboard.objectManage.switchboard.switchDetial', {
        	url: '',
            templateUrl: 'app/pages/objectManage/switchboard/switchDetail.html',
            controller: 'switchDetialCtrl',
            title: '交换机',
            params: {param: null,datacenter: null}
          });
  }
 
})();
