(function () {
	'use strict';

	var app = angular.module('BlurAdmin.pages.Automation.ServiceHome');
		app.controller('ServiceHomeCtrl', ServiceHomeCtrlFunc);

	/** @ngInject */
	function ServiceHomeCtrlFunc($state, $scope, $filter, $http, $localStorage, toastr, $uibModal, commonService, httpService, $location, baConfig,$compile) {
        var config = {
                headers: {
                    "Authorization": $localStorage.authKey
                }
        }
		

        // 获取 服务目录 下拉框数据
        httpService.get("/auto/service/list","",config, function (response) {
            $scope.selectList = response;
        });
        // 查询数据
        $scope.query = {
          name: 'ALL'+""
        };
		$scope.change = function (value) {
		   var value = $('#select').find('option:selected').text().trim();
			$scope.query.name = value;			
		}

        
        // 获取 面板list数据
        $scope.queryFunc = function () {
			var catalogServises = [];
            httpService.get("/auto/service/list", $scope.query, config, function (response) {
				angular.forEach(response,function(data,index,array){
					angular.forEach(data.services,function(result,m,n){
						catalogServises.push(result);
					})
				})
            });
			$scope.catalogLists = catalogServises;
        };
		
            // 监听 查询数据 变化
        $scope.$watch('query', $scope.queryFunc, true);

        // 点击 跳转
        $scope.go = function ( path, id ) {
          $state.go('dashboard.Automation.ServiceVPLEXProvisioning', { id: 211111 });
        };
		


	}
	app.filter('trust2Html', ['$sce',function($sce) { return function(val) {  if (val) {
            val = val.replace(/\[\[/g, "<span style=\"color: #FFFFFF;\">").replace(/\]\]/g, "</span>");return $sce.trustAsHtml(val); } };}])
})();