(function () {
  'use strict';

  angular.module('BlurAdmin.pages.EventManagement.repository', [])
      .config(routeConfig);


  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('dashboard.EventManagement.repository', {
          url: '/repository',
          templateUrl: 'app/pages/EventManagement/repository/repository.html',
          controller: 'repositoryCtrl',
          title: '事件知识库',
          sidebarMeta: {
            order: 2,
          },
        });
  }
 

})();
