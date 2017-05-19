/**
For Dynamic Menus
*/
(function () {
'use strict';

angular.module('BlurAdmin.theme.components')
  .controller('BaSidebarCtrl', BaSidebarCtrl);

/** @ngInject */
function BaSidebarCtrl($scope, $http, baSidebarService, $window, baConfig, AuthenticationService, printService, $localStorage) {
 
    //$scope.menuItems = baSidebarService.getMenuItems();
    //$scope.menuItemsAccess = [];
	//从缓存读取菜单
    //var jsonMenu = JSON.parse($window.sessionStorage.menus); // JSON from Service
	
	var jsonMenu = AuthenticationService.getMenuItems(); // JSON from Service
	//排序
	jsonMenu.sort(function(a,b){return a.order-b.order});
	
	 var parentMenu = [];
	 angular.forEach(jsonMenu, function (menu) {
         if (menu.parentMenuId =="#"||null==menu.parentMenuId ||menu.parentMenuId =="") {
        	 angular.forEach(jsonMenu, function (child) {
                 if (child.parentMenuId == menu.menuId) {
                	 if (!menu.subMenu) {
                		 menu.subMenu = [];
                	 }
                	 menu.subMenu.push(child)
                 }
             });
        	 parentMenu.push(menu)
         }
     });
	 
    $scope.menuItems = parentMenu ;
     
    // printService.print("999999menuItems---->" + JSON.stringify($scope.menuItems) );  
    // printService.print("999999parentMenu---->" + JSON.stringify(parentMenu) );  
     

   if ( $scope.menuItems.length > 0  )
        $scope.defaultSidebarState = $scope.menuItems[0].stateRef;

    $scope.hoverItem = function ($event) {
        $scope.showHoverElem = true;
        $scope.hoverElemHeight = $event.currentTarget.clientHeight;
        var menuTopValue = 60;
        $scope.hoverElemTop = $event.currentTarget.getBoundingClientRect().top - menuTopValue;
    };

    $scope.$on('$stateChangeSuccess', function () {
        if (baSidebarService.canSidebarBeHidden()) {
            baSidebarService.setMenuCollapsed(true);
        }
    });
}
})();