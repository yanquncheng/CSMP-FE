(function () {
  'use strict';

  angular.module('BlurAdmin.pages.templatedetails', [])
      .config(routeConfig);
  

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('dashboard.templatedetails', {
            url :"/details",
            templateUrl: 'app/pages/templates/details.html',
            controller: 'detailsCtrl',
            title: '存储',
            params: {param: null}
          });
  }

})();
