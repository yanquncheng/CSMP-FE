(function () {
    'use strict';
  
    angular.module('BlurAdmin.pages.Automation.ServiceVPLEXProvisioning', [ ])
      .config(routeConfig);
  
    /** @ngInject */
    function routeConfig($stateProvider) {
      $stateProvider
          .state('dashboard.Automation.ServiceVPLEXProvisioning', {
            url: '/ServiceVPLEXProvisioning',
  //        template : '<ui-view  autoscroll="true" autoscroll-body-top></ui-view>',
            templateUrl: 'app/pages/Automation/ServiceVPLEXProvisioning/ServiceVPLEXProvisioning.html',
  //        abstract: true, 
            controller: 'ServiceVPLEXProvisioningCtrl',
            title: 'VPLEX容量扩容服务',
            sidebarMeta: {
              icon: 'ion-grid',
              order: 1,
            },

          });
  
    }
  
  })();
  