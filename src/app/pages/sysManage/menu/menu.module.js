(function () {
  'use strict';

  angular.module('BlurAdmin.pages.sysManage.menu', [])
      .config(routeConfig)
      .config(function(){
    	  $.jstree.defaults.core.themes.url = true;
          $.jstree.defaults.core.themes.dir = "assets/img/theme/vendor/jstree/dist/themes";
      });


  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('dashboard.sysManage.menu', {
          url: '/menu',
          templateUrl: 'app/pages/sysManage/menu/menu.html',
          controller: 'menuCtrl',
          title: '菜单管理',
          sidebarMeta: {
            order: 1,
          },
        });
  }
 

})();
