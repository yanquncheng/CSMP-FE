(function () {
  'use strict';

  angular.module('BlurAdmin.pages.objectManage.hostHBA', [])
      .config(routeConfig);


  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('dashboard.objectManage.hostHBA', {
          url: '/hostHBA',
          templateUrl: 'app/pages/objectManage/hostHBA/hostHBA.html',
          controller: 'hostHBACtrl',
          title: '主机HBA',
          sidebarMeta: {
            order: 4,
          }
        });
  }
 
})();
