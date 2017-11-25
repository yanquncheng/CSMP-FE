(function () {
  'use strict';

  angular.module('BlurAdmin.pages.demos', [])
      .config(routeConfig);


  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('dashboard.demos', {
          url: '/demos',
          templateUrl: 'app/pages/demos/demos.html',
          controller: 'demosCtrl',
          title: '测试功能',
          sidebarMeta: {
            order: 1,
          },
        }).state('dashboard.demos.demoDetail', {
        	url: '',
            templateUrl: 'app/pages/templdates/details.html',
            controller: 'detailsCtrl',
            title: '测试功能',
            params: {param: null,datacenter: null}
          });
  }
 

})();
