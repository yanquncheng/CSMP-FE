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
        }).state('dashboard.objectManage.tabs.detail', {
            url :"",
            templateUrl: 'app/pages/objectManage/tabs/detail.html',
            controller: 'detailCtrl',
            title: '存储',
            params: {param: null}
          }).state('dashboard.objectManage.tabs.details', {
            url :"",
            templateUrl: 'app/pages/objectManage/tabs/details.html',
            controller: 'detailsCtrl',
            title: '存储',
            params: {param: null}
          });
  }

})();
