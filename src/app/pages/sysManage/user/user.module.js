(function () {
  'use strict';

  angular.module('BlurAdmin.pages.sysManage.user', [])
      .config(routeConfig);


  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('dashboard.sysManage.user', {
          url: '/user',
          templateUrl: 'app/pages/sysManage/user/user.html',
          controller: 'userCtrl',
          title: '用户管理',
          sidebarMeta: {
            order: 2,
          },
        });
  }
 

})();
