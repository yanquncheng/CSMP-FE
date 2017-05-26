(function () {
  'use strict';

  angular.module('BlurAdmin.pages.objectManage.apply', [])
      .config(routeConfig);


  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('dashboard.objectManage.apply', {
          url: '/apply',
          templateUrl: 'app/pages/objectManage/apply/apply.html',
          controller: 'applyCtrl',
          title: '应用对象',
          sidebarMeta: {
            order: 3,
          },
        });
  }
 
})();
