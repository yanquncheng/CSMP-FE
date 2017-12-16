(function () {
  'use strict';

  angular.module('BlurAdmin.pages.objectManage.array', [])
      .config(routeConfig);
  

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('dashboard.objectManage.array', {
          url: "/arrayCtrl",
          templateUrl: 'app/pages/objectManage/array/array.html',
          controller: 'arrayCtrl',
          title: '存储',
          sidebarMeta: {
            order: 2,
          },
          params: {datacenter: '', type:0}
        });
  }

})();
