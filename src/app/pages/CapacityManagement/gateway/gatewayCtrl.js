
(function () {
  'use strict';
  
  angular.module('BlurAdmin.pages.CapacityManagement.gateway')
      .controller('gatewayCtrl', gatewayCtrlFunc);
	
  /** @ngInject */
  function gatewayCtrlFunc($scope, $filter, $http, $localStorage,toastr, $uibModal, commonService,$timeout) {
  	 console.log($localStorage.authKey);
      var config = { headers: {
          "Authorization": $localStorage.authKey
      }}
      $scope.gatewayDivDetail=true;  //虚拟网关详情列表
      $scope.divDetail=true;	//存储容量详情列表
      $scope.gatewayTablePageSize=15;
      $scope.gatewayDTablePageSize=15;  //网关明细分页默认条数
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
          return (value) + 'k';
        },
//      position:"end",
        horizontalBars:true,  //反转条形图的轴，以绘制水平条形图
        reverseData:true    //如果为真，则整个数据反转，包括标签，序列以及整个系列数据阵列
      },
      axisX:{position:"end"}
    };
     $timeout(function(){
    	new Chartist.Bar('#simple-bar', $scope.simpleBarData, $scope.simpleBarOptions);
    });
    
    $scope.trDetails=function(trId){
    	$(".bbb").css("background-color","");
    	$("#"+trId).css("background-color","red");
    	$scope.gatewayDivDetail = false;
    	$scope.divDetail=false;
    }
  }
})();
