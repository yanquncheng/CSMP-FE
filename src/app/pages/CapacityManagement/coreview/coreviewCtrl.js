
(function () {
  'use strict';
  
  angular.module('BlurAdmin.pages.CapacityManagement.coreview')
      .controller('coreviewCtrl', coreviewCtrlFunc);
	
  /** @ngInject */
  function coreviewCtrlFunc($scope, $filter, $http, $localStorage,toastr, $uibModal, commonService,$timeout) {
  	 console.log($localStorage.authKey);
      var config = { headers: {
          "Authorization": $localStorage.authKey
      }}
      $scope.divDetail=true;
      $scope.coreviewTablePageSize=15;
      $scope.coreview1TablePageSize=15;  //明细列表分页初始化条数
      $scope.simpleBarData = {
      labels: ['北京数据中心', '农本数据中心', '南海数据中心', '安陆数据中心', '广州数据中心', '深圳数据中心'],
      series: [
        [100, 200,400,600,800,1000]
      ]
    };

    $scope.simpleBarOptions = {
      fullWidth: true,
      height: "400px",
      stackBars: true,
      axisY: {
        labelInterpolationFnc: function (value) {
          return (value*2) + 'k';
        }
      }
    };
     $timeout(function(){
    	new Chartist.Bar('#simple-bar', $scope.simpleBarData, $scope.simpleBarOptions);
    });
    
    $scope.trDetails=function(trId){
    	$(".bbb").css("background-color","");
    	$("#"+trId).css("background-color","red");
    	$scope.divDetail=false;
    }
  }
})();
