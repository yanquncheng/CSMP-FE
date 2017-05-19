(function () {
  'use strict';

  angular.module('BlurAdmin.pages.EquipmentManagement.Array', [])
      .config(routeConfig);


  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('dashboard.EquipmentManagement.Array', {
          url: '/Array',
          templateUrl: 'app/pages/EquipmentManagement/array/array.html',
          controller: 'ArrayCtrl',
          title: '存储',
          sidebarMeta: {
            order: 10,
          },
        });
  }
 

})();
