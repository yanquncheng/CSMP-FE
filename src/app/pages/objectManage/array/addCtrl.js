/**
 * 对象管理
 */
(function () {
  'use strict';
  angular.module('BlurAdmin.pages.objectManage.array')
     .controller('addCtrl', addCtrlFunc);
    
    function addCtrlFunc($scope, $http, $localStorage, $filter,$stateParams,$uibModal,modalParam) {
    	 
    	 console.log(modalParam);
    	 $scope.title = modalParam.title;
    	 
    	 
    	 
    	//Modal demo 
     	 $scope.add = function () {
     		 
         	 $uibModal.open({
    	        animation: true,
    	        templateUrl: 'app/pages/objectManage/tabs/add.html',
    	        controller: 'addCtrl',
    	        size: 'lg',//md lg sm
    	        resolve: {
    	        	modalParam: function () {
    	            return {"title":"SAN存储新增"};
    	          }
    	        }
    	     });
         	 
         	 
          };
    	 
    	 
     }
    
})();
