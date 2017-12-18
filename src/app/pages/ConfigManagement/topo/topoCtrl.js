
(function () {
  'use strict';
  
  angular.module('BlurAdmin.pages.ConfigManagement.topo')
      .controller('topoCtrl', topoCtrlFunc);
	
  /** @ngInject */
  function topoCtrlFunc($scope, $filter, $http, $localStorage,toastr, $uibModal, commonService,httpService) {
 

	var config = { headers: {
	  "Authorization": $localStorage.authKey
	}}
	

	$scope.smartTablePageSize = 15;
	$scope.initData = function (params){
		httpService.get("/topologyview ", params, config, function (response){
			$scope.DataArrayList = response.finalTopoResult;   
		}); 
	};



	$scope.initData("");	
		
  }
})();
