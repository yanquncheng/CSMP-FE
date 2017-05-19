(function () {
  'use strict';

  angular.module('BlurAdmin.pages.sysManage.role', [])
      .config(routeConfig);


  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('dashboard.sysManage.role', {
          url: '/role',
          templateUrl: 'app/pages/sysManage/role/role.html',
          controller: 'roleCtrl',
          title: '角色管理',
          sidebarMeta: {
            order: 3,
          },
        });
  }
 

})();
