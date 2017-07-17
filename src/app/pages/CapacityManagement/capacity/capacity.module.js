(function () {
  'use strict';

  angular.module('BlurAdmin.pages.CapacityManagement.capacity', [])
      .config(routeConfig);


  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('dashboard.CapacityManagement.capacity', {
          url: '/capacity',
          templateUrl: 'app/pages/CapacityManagement/capacity/capacity.html',
          controller: 'capacityCtrl',
          title: '容量管理首页',
          sidebarMeta: {
            order: 1,
          },
        }).state('dashboard.CapacityManagement.capacity.overview', {
        		url: '',
            templateUrl: 'app/pages/CapacityManagement/capacity/overview.html',
            controller: 'overviewCtrl',
            title: '资源池容量概览',
            params: {pool: null,poolName:null}
          }).state('dashboard.CapacityManagement.capacity.detail', {
        		url: '',
            templateUrl: 'app/pages/CapacityManagement/capacity/detail.html',
            controller: 'detailCtrl',
            title: '资源池容量概览信息详情',
            params: {pool: null,poolName:null}
          });
  }
 

})();
