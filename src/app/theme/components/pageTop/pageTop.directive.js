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

    function SignOutCtrl($scope, AuthenticationService, printService,$uibModal,$state) {
        printService.print('Logout code');

        $scope.signOut = function() {
            printService.print('Logout code : signOut');
            AuthenticationService.setLoggedIn(false);
            AuthenticationService.signOut();
        };
        
        //修改密码
        $scope.modifyPasswd = function() {

        	var modalInstance = $uibModal.open({
   	        animation: true,
   	        templateUrl: 'app/theme/components/pageTop/modyPasswd.html',
   	        controller: 'modyPasswdCtrl',
   	        size: 'md',//md lg sm
   	        resolve: {
   	        		modalParam: function () {
   	        			return {};
   	        		}
   	        	}
   	     	});
        	
        	modalInstance.result.then(function (result) {    
        		//alert("$close")
                //console.log(result); //result关闭是回传的值   
                //alert("ok");
        		$scope.signOut();
        		$state.go('signin');
        		
             }, function (reason) {    
            	 //alert("cancel")
                 console.log(reason);//点击空白区域，总会输出backdrop click，点击取消，则会暑促cancel    
                 //alert("cancel");
             });  
         
        };

        $scope.username = AuthenticationService.getUser();
        printService.print('Logout code : signOut : username = ' + $scope.username );
    }

})();
