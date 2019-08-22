(function () {
  'use strict';

  angular.module('BlurAdmin.pages.Automation.ServiceVPLEXProvisioning', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('dashboard.Automation.ServiceVPLEXProvisioning', {
        url: '/ServiceVPLEXProvisioning/:id',
        //        template : '<ui-view  autoscroll="true" autoscroll-body-top></ui-view>',
        templateUrl: 'app/pages/Automation/ServiceVPLEXProvisioning/ServiceVPLEXProvisioning.html',
        //        abstract: true, 
        controller: 'ServiceVPLEXProvisioningCtrl',
        title: '服务执行向导',
        sidebarMeta: {
          icon: 'ion-grid',
          order: 1,
        },

      });

  }

})();
