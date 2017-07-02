(function () {
	'use strict';
	angular.module('BlurAdmin.pages.reportManage').controller('addReportCtrl', tabsCtrlFun);
  
	function tabsCtrlFun ($scope, fixedNumber, $localStorage, $filter, $state, $uibModalInstance, commonService, httpService, $stateParams, $timeout, modalParam) {
		
		if(!modalParam.ReportInfoID){
			commonService.showMsg("error","参数丢失");
            $uibModalInstance.dismiss("cancel"); // 退出
            return ;
		}
		
		$scope.report = {ReportInfoID: modalParam.ReportInfoID, Name: "", GenerateTime: moment().format(), ReportParamater: []};
		$scope.title = modalParam.title;
		$scope.GenerateURL = modalParam.GenerateURL;
		$scope.ReportParamater = modalParam.ReportParamater;
		
		angular.forEach($scope.ReportParamater, function(p, pindex){
			if(p.Type==='List'){
				httpService.post(p.Data, {}, null, function (response) { 
					p.DataList = response;
		      	});
			}
		});
		
     	$scope.save = function() {
     		angular.forEach($scope.ReportParamater, function(item, index){
     			var p = {Name: item.Name, Value: item.Value};
     			if(item.Type === 'TimeStamp'){
     				p.Value = moment(p.Value).format();
     			}
     			$scope.report.ReportParamater.push(p);
     		});
     		$scope.report.GenerateTime = moment().format();
			httpService.post($scope.GenerateURL, $scope.report, null, function (response) { 
	    	     $uibModalInstance.close();
	      	});
      	}
    }
})();