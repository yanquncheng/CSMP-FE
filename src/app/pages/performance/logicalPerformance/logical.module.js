(function () {
  'use strict';

  angular.module('BlurAdmin.pages.performance.logicalPerformance', [])
      .config(routeConfig);


  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('dashboard.performance.logicalPerformance', {
          url: '/logical',
          templateUrl: 'app/pages/performance/logicalPerformance/logical.html',
          controller: 'logicalCtrl',
          title: '逻辑卷性能',
          sidebarMeta: {
            order: 1,
          },
        });
  }
 

})();
