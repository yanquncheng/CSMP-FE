(function () {
	'use strict';
	angular.module('BlurAdmin.pages.reportManage').controller('reportListCtrl', tabsCtrlFun);
  
	function tabsCtrlFun ($scope, fixedNumber, $localStorage, $filter, $state,$uibModal, commonService, httpService, $stateParams, $timeout, modalParam) {
		
		if(!modalParam.ReportInfoID){
			commonService.showMsg("error","参数丢失");
            $dismiss(); // 退出
            return ;
		}
		
		$scope.title = modalParam.title;
		$scope.ReportInfoID = modalParam.ReportInfoID;
		
 		$scope.smartTablePageSize = 10;
 		$scope.editPanel = false ;
 		$scope.theads = [
            {"text": "报表名称","sort": "Name","default": false},
            {"text": "文件名称","sort": "File", "default": false},
            {"text": "状态","sort": "Status", "default": false},
            {"text": "时间", "sort": "Date", "default": false},
            {"text": "操作"}
        ];
        
     	$scope.query = function() {
			httpService.get("/reporting/reportfiles", {ReportInfoID: $scope.ReportInfoID}, null, function (response) { 
	    	     $scope.list =response ;
	      	});
      	}
     	
     	$scope.query();
     	
     	$scope.downLoad = function(report){
			httpService.get(report.URL, {}, null, function (response) { 
	      	});
     	}
    }
})();
