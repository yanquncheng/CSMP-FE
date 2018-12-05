(function () {
  'use strict';

  angular.module('BlurAdmin.pages.Automation.ServiceHome', [
    'BlurAdmin.pages.Automation.ServiceCapacityProvide',
    'BlurAdmin.pages.Automation.ServiceVPLEXProvisioning',
    
  ])
      .config(routeConfig);


  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('dashboard.Automation.ServiceHome', {
          url: '/ServiceHome',
          templateUrl: 'app/pages/Automation/ServiceHome/ServiceHome.html', 
          controller: 'ServiceHomeCtrl',
          title: '服务目录',
          sidebarMeta: {
            order: 1,
          },
        });
  }
 

})();
