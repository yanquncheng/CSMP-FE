/**
 * 对象管理
 */
(function () {
	'use strict';
	angular.module('BlurAdmin.pages.reportManage').controller('reportPageCtrl', tabsCtrlFun);
  
	function tabsCtrlFun ($scope, fixedNumber, $localStorage, $filter, $state,$uibModal, commonService, httpService, $stateParams, $timeout) {
 		$scope.smartTablePageSize = 10;
 		$scope.editPanel = false ;
 		$scope.theads = [
            {"text": "报表名称","sort": "Name","default": false},
            {"text": "代码","sort": "ID", "default": false},
            {"text": "类型","sort": "TypeIcon", "default": false},
            {"text": "格式", "sort": "Format", "default": false},
            {"text": "执行时间", "sort": "GenerateSchedule", "default": false},
            {"text": "说明", "sort": "Description","default": false},
            {"text": "操作"}
        ];
        
     	$scope.query = function() {
			httpService.get("/reporting/list", null, null, function (response) { 
	    	     $scope.list =response ;
	      	});
      	}
     	
     	$scope.query();
     	
     	$scope.showFileList = function(reportType){
	     	$uibModal.open({
		        animation: true,
		        templateUrl: 'app/pages/reportManage/report/reportList.html',
		        controller: 'reportListCtrl',
		        size: 'lg',//md lg sm
		        resolve: {
		        	modalParam: function () {
		            	return {title:"报表列表", ReportInfoID: reportType['ID']};
		          	}
		        }
		    });
     	}
     	
     	$scope.addReport = function(reportType){
	     	var addReport = $uibModal.open({
		        animation: true,
		        templateUrl: 'app/pages/reportManage/report/addReport.html',
		        controller: 'addReportCtrl',
		        size: 'lg',//md lg sm
		        resolve: {
		        	modalParam: function () {
		            	return {title:"新增报表", ReportInfoID: reportType['ID'], ReportParamater: reportType.ReportParamater, GenerateURL: reportType.GenerateURL};
		          	}
		        }
		    });
		    addReport.result.then(function(response){
		    	$scope.query();
		    }, function(){});
     	}
    }
})();
