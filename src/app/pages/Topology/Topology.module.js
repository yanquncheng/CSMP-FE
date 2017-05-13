/**
 * @author zhibin.guo
 * created on 16.05.2017
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.Topology', [
      'BlurAdmin.pages.Topology.TopologyL1',
      'BlurAdmin.pages.Topology.TopologyTest'
    ])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('dashboard.Topology', {
          url: '/Topology',
          template : '<ui-view  autoscroll="true" autoscroll-body-top></ui-view>',
          abstract: true, 
          title: 'Topology Management',
          sidebarMeta: {
            icon: 'ion-grid',
            order: 20,
          },
        });

  }

})();
