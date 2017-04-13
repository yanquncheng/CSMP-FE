/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.EquipmentManagement', [
      'BlurAdmin.pages.EquipmentManagement.Array'
    ])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('dashboard.EquipmentManagement', {
          url: '/EquipmentManagement',
          template : '<ui-view  autoscroll="true" autoscroll-body-top></ui-view>',
          abstract: true, 
          title: '设备管理',
          sidebarMeta: {
            icon: 'ion-grid',
            order: 10,
          },
        });

  }

})();
