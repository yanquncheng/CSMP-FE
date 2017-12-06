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
                var filename = report.ReportFile;
			httpService.get("/reporting/downloadfiles",{reportInstance: report }, {responseType: 'blob'}, function (response) { 
                saveAs(response, filename);
	      	});
     	}

     	$scope.download1 = function (report) {
     			console.log("AAAAAAAAAAA");
			    $http({

			        method: 'GET',

			        url: '/reporting/downloadfiles',

			        params: { reportInstance: report },

			        responseType: 'arraybuffer'

			    }).success(function (data, status, headers) {

			        headers = headers();

			 

			        var filename = headers['x-filename'];

			        var contentType = headers['content-type'];

			 

			        var linkElement = document.createElement('a');

			        try {

			            var blob = new Blob([data], { type: contentType });

			            var url = window.URL.createObjectURL(blob);

			 

			            linkElement.setAttribute('href', url);

			            linkElement.setAttribute("download", filename);

			 

			            var clickEvent = new MouseEvent("click", {

			                "view": window,

			                "bubbles": true,

			                "cancelable": false

			            });

			            linkElement.dispatchEvent(clickEvent);

			        } catch (ex) {

			            console.log(ex);

			        }

			    }).error(function (data) {

			        console.log(data);

			    });

			};
    }
})();
