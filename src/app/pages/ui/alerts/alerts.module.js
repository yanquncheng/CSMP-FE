/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.ui.alerts', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('dashboard.ui.alerts', {
          url: '/alerts',
          templateUrl: 'app/pages/ui/alerts/alerts.html',
          title: 'Alerts',
          sidebarMeta: {
            order: 500,
          },
        })
        .state('dashboard.ui.alerts-nopermission', {
          url: '/alerts-nopermission',
          templateUrl: 'app/pages/ui/alerts/alerts-nopermission.html',
          title: 'Alerts',
          sidebarMeta: {
            order: 600,
          },
        } );
  }

})();
