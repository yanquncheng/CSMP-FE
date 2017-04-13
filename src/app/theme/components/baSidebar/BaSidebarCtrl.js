/**
For Dynamic Menus
*/
(function () {
'use strict';

angular.module('BlurAdmin.theme.components')
  .controller('BaSidebarCtrl', BaSidebarCtrl);

/** @ngInject */
function BaSidebarCtrl($scope, baSidebarService, $window, baConfig, AuthenticationService, printService) {
 
    $scope.menuItems = baSidebarService.getMenuItems();
    $scope.menuItemsAccess = [];
    //var jsonMenu = JSON.parse($window.sessionStorage.menus); // JSON from Service
    var jsonMenu = AuthenticationService.getMenuItems(); // JSON from Service

    printService.print("BaSidebarCtrl : username is admin ? = " + AuthenticationService.isAdmin());
    printService.print("BaSidebarCtrl : menuitems = " + JSON.stringify(AuthenticationService.getMenuItems()) );
    //printService.print("BaSidebarCtrl : all of menuitems = " + JSON.stringify($scope.menuItems) ) ;
     

    if ( ! AuthenticationService.isAdmin() ) {
        angular.forEach($scope.menuItems, function (baSideBarMenu) {
            angular.forEach(jsonMenu, function (accessMenu) {
                if (accessMenu.name === baSideBarMenu.name) {
                    $scope.menuItemsAccess.push(baSideBarMenu)
                    return;
                }
            })
        })
        $scope.menuItems = $scope.menuItemsAccess;
    }

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