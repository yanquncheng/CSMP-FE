(function () {
  'use strict';

  angular.module('BlurAdmin.pages.sysManage.matadata', [])
      .config(routeConfig)
      .config(function(){
    	  $.jstree.defaults.core.themes.url = true;
          $.jstree.defaults.core.themes.dir = "assets/img/theme/vendor/jstree/dist/themes";
      });


  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('dashboard.sysManage.matadata', {
          url: '/matadata',
          templateUrl: 'app/pages/sysManage/matadata/matadata.html',
          controller: 'matadataCtrl',
          title: 'Matadata 管理',
          sidebarMeta: {
            order: 1,
          },
        });
  }
 

})();
