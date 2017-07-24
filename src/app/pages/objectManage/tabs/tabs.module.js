(function () {
  'use strict';

  angular.module('BlurAdmin.pages.objectManage.tabs', [])
      .config(routeConfig);
  

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('dashboard.objectManage.tabs', {
          url :"/tabsCtrl",
          templateUrl: 'app/pages/objectManage/tabs/tabs.html',
          controller: 'tabsCtrl',
          title: '存储',
          sidebarMeta: {
            order: 2,
          },
          params: {datacenter: '', type:0}
        });
  }

})();
