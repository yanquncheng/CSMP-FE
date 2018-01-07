
(function () {
  'use strict';
  
  angular.module('BlurAdmin.pages.dashboardsPerformance')
      .controller('dashboardPerformanceCtrl', dashboardPerformanceCtrlFunc);
	
  /** @ngInject */
  function dashboardPerformanceCtrlFunc($scope, $stateParams, $localStorage, $state ) {
		var config = { headers: {
		  "Authorization": $localStorage.authKey
		}}


      //返回
      $scope.back = function (){
        var backUrl = "dashboard.objectManage.array"; 
        if($stateParams.param.backUrl){
          backUrl = $stateParams.param.backUrl ;
        }  
         
      	$state.go(backUrl,{  });
     };
     
      
		// 10秒执行一次
		//$scope.runner = $interval($scope.initData, 10000);

		//$scope.$on('$destroy', function () {
		//	$interval.cancel($scope.runner);  
		//});
		
  }
})();
