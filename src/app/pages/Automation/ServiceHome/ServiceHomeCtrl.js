(function () {
	'use strict';

	angular.module('BlurAdmin.pages.Automation.ServiceHome')
		.controller('ServiceHomeCtrl', ServiceHomeCtrlFunc);

	/** @ngInject */
	function ServiceHomeCtrlFunc($scope, $filter, $http, $localStorage, toastr, $uibModal, commonService, httpService, $location) {


		var config = {
			headers: {
				"Authorization": $localStorage.authKey
			}
		}

    $scope.open = function (page, size) {
      $uibModal.open({
        animation: true,
        templateUrl: page,
        size: size,
        resolve: {
          items: function () {
            return $scope.items;
          }
        }
      });
		};
		
		$scope.go = function ( path ) {
			$location.path( path );
		};

		// $scope.smartTablePageSize = 15;
		// $scope.initData = function (params) {
		// 	httpService.get("/automation/catalog ", params, config, function (response) {
		// 		$scope.DataArrayList = response.finalTopoResult;
		// 	});
		// };
    //$scope.initData("");

	}
})();