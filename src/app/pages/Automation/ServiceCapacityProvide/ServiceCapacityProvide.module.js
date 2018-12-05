(function () {
    'use strict';
  
    angular.module('BlurAdmin.pages.Automation.ServiceCapacityProvide', [ ])
      .config(routeConfig);
  
    /** @ngInject */
    function routeConfig($stateProvider) {
      $stateProvider
          .state('dashboard.Automation.ServiceCapacityProvide', {
            url: '/ServiceCapacityProvide',
  //        template : '<ui-view  autoscroll="true" autoscroll-body-top></ui-view>',
            templateUrl: 'app/pages/Automation/ServiceCapacityProvide/ServiceCapacityProvide.html',
  //        abstract: true, 
            controller: 'ServiceCapacityProvideCtrl',
            title: '存储自动化分配服务',
            sidebarMeta: {
              icon: 'ion-grid',
              order: 1,
            },
          });
  
    }
  
  })();
  