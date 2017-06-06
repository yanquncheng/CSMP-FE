/**
For Dynamic Menus
*/
(function () {
'use strict';

angular.module('BlurAdmin.theme.components')
  .controller('BaSidebarCtrl', BaSidebarCtrl);

/** @ngInject */
function BaSidebarCtrl($scope, httpService, baSidebarService, $window, baConfig, AuthenticationService, printService, $localStorage) {
 
	var jsonMenu = AuthenticationService.getMenuItems(); // JSON from Service
	 //$scope.menuItems = [];
	 var config = { headers: {
         "Authorization": $localStorage.authKey
     }}
	 
	 
	 var menuMap = {};
	 var userMenu = [];
	 
	 if (jsonMenu != null && jsonMenu.length > 0) {

    	 // menuTree
      	httpService.get('/menu/list' ,null, config ,function (response) {

			 var menuList = []
	         var menuList = response;
			 if (menuList != null && menuList.length > 0) {
					// 循环菜单列表
					for (var i in jsonMenu) {
						var menu = jsonMenu[i];
						if(menu.parentMenuId == "#" ){
							menu.parentMenuId = menu.menuId ;
							menuMap[menu.parentMenuId] = null;
							continue;
						}

						// 判断菜单map 是否存在 key 为 parentMenuId 的 list
						if (menuMap[menu.parentMenuId] != null && menuMap[menu.parentMenuId] != null) {
							// 如果存在 往list 放入 menu 信息
							var list = menuMap[menu.parentMenuId] ;
							list.push(menu);
							menuMap[menu.parentMenuId] = list;
						} else {
							// 如果不存在 往list 放入 menu 信息
							var list = [] ;
							list.push(menu);
							menuMap[menu.parentMenuId] = list;
						}
					}
					
					for(var key in menuMap){
					    //console.log("属性：" + key + ",值："+ menuMap[key]);
						 angular.forEach( menuList , function (menu) {
							if(key == menu.menuId ){
								var tempMenu = angular.copy(menu);
								tempMenu.subMenu = [];
								tempMenu.subMenu = menuMap[key] ;
								userMenu.push(tempMenu);
							}
					     });
					}  
					
					$scope.menuItems = userMenu ;
					//排序
					$scope.menuItems.sort(function(a,b){return a.order-b.order});
				   if ( $scope.menuItems.length > 0  )
				        $scope.defaultSidebarState = $scope.menuItems[0].stateRef;
			 }
      	});
	 }

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