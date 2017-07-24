(function () {
  'use strict';

  angular.module('BlurAdmin.pages.objectManage.details', [])
      .config(routeConfig);
  

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('dashboard.objectManage.details', {
            url :"/details",
            templateUrl: 'app/pages/objectManage/tabs/details.html',
            controller: 'detailsCtrl',
            title: '存储',
            params: {param: null}
          });
  }

})();
