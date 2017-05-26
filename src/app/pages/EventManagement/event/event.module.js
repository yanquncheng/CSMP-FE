(function () {
  'use strict';

  angular.module('BlurAdmin.pages.EventManagement.event', [])
      .config(routeConfig);


  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('dashboard.EventManagement.event', {
          url: '/event',
          templateUrl: 'app/pages/EventManagement/event/event.html',
          controller: 'eventCtrl',
          title: '事件列表',
          sidebarMeta: {
            order: 1,
          },
        });
  }
 

})();
