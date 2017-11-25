(function () {
  'use strict';

  angular.module('BlurAdmin.pages.objectManage.application', [])
      .config(routeConfig);


  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('dashboard.objectManage.application', {
          url: '/application',
          templateUrl: 'app/pages/objectManage/application/application.html',
          controller: 'applicationCtrl',
          title: '应用',
          sidebarMeta: {
            order: 3,
          },
          params: {datacenter: null}
        });
  }
 
})();
