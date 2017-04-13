/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function() {
    'use strict';

    angular.module('BlurAdmin.theme.components')
        .controller('SignOutCtrl', SignOutCtrl)
        .directive('pageTop', pageTop);

    /** @ngInject */
    function pageTop() {
        return {
            restrict: 'E',
            templateUrl: 'app/theme/components/pageTop/pageTop.html',
            controller: 'SignOutCtrl',
            controllerAs: 'vm',
        };
    }

    function SignOutCtrl($scope, AuthenticationService, printService) {
        printService.print('Logout code');

        $scope.signOut = function() {
            printService.print('Logout code : signOut');
            AuthenticationService.setLoggedIn(false);
            AuthenticationService.signOut();
        };

        $scope.username = AuthenticationService.getUser();
        printService.print('Logout code : signOut : username = ' + $scope.username );
    }

})();
