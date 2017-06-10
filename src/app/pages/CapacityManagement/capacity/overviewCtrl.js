
(function () {
  'use strict';
  
  angular.module('BlurAdmin.pages.CapacityManagement.capacity')
      .controller('overviewCtrl', overviewCtrlFunc);
	
  /** @ngInject */
  function overviewCtrlFunc($scope, $filter, $http, $localStorage,toastr, $uibModal, commonService,baUtil,baConfig,$timeout,$element,layoutPaths,httpService,$state,$stateParams) {
  	 console.log($localStorage.authKey);
      var config = { headers: {
          "Authorization": $localStorage.authKey
      }}
      var pool = $stateParams.pool;
      $scope.params={};
      var layoutColors = baConfig.colors;
      $scope.poolData=[];
      $scope.initData=function(){
      	if(pool!=null && pool!=""){
      		$scope.params.pool = pool;
      	}
      	httpService.get("/capacity/PoolOverview", $scope.params, config, function (response){
      		$scope.poolData=response;
      		for(var i in $scope.poolData){
      			$scope.CapacityOverview= response[i].CapacityOverview;
      			$scope.CapacityOverview.Used1=parseFloat($scope.CapacityOverview.Used/$scope.CapacityOverview.Available*100).toFixed(1);//已使用
	      		$scope.CapacityOverview.PhysicalFree1=parseFloat(($scope.CapacityOverview.PhysicalFree -$scope.CapacityOverview.Used)/$scope.CapacityOverview.Available * 100).toFixed(1);  //剩余物理可用
	      		$scope.CapacityOverview.NoAvailable=parseFloat(($scope.CapacityOverview.Available -$scope.CapacityOverview.PhysicalFree)/$scope.CapacityOverview.Available * 100).toFixed(1);  //不可用
	      		$scope.CapacityOverview.NoUsed=parseFloat(($scope.CapacityOverview.Assigned -$scope.CapacityOverview.Used)/$scope.CapacityOverview.Available * 100).toFixed(1);   //未使用
	      		$scope.CapacityOverview.Available1= parseFloat(($scope.CapacityOverview.Available -$scope.CapacityOverview.Assigned)/$scope.CapacityOverview.Available * 100).toFixed(1) //剩余可用
      			
      			$scope.CapacityTrend=response[i].CapacityTrend;
      			combinedChart("zoomAxisChart"+i,$scope.CapacityTrend);   //数据中心 容量趋势
      		}
      	});      	
      }
      //柱形图加折线图
      function combinedChart(divId,dataProvider){
      	var chart1 = AmCharts.makeChart(divId, {
	      "type": "serial",
	      "theme": "none",
	      "color": layoutColors.defaultText,
	      "dataDateFormat": "YYYY-MM",
	      "precision": 2,
	      "valueAxes": [  //x-y
		      {
		        color: layoutColors.defaultText,
		        axisColor: layoutColors.defaultText,
		        gridColor: layoutColors.defaultText,
		        "id": "v1",
		        "title": "百分比",
		        "gridAlpha": 0,
		        "position": "right",
		        "autoGridCount": true,  //控制右侧y轴 数据  true和false
		        "labelFunction": function(value) {
		          return Math.round(value) + "%";
		        }
		      }
		      ,{
		        color: layoutColors.defaultText,
		        axisColor: layoutColors.defaultText,
		        gridColor: layoutColors.defaultText,
		        "id": "v2",
		//      "title": "Sales",
		        "position": "left",
		        "autoGridCount": false,
		        "labelFunction": function(value) {
		          return Math.round(value) + "TB";
		        }
		      }],
	      "graphs": [{
	        "id": "g1",
	        color: layoutColors.defaultText,
	        "valueAxis": "v2",
	        "lineColor": layoutColors.primaryLight,
	        "fillColors": layoutColors.primaryLight,
	        "fillAlphas": 0.8,
	        "lineAlpha": 0.8,
	        "type": "column",
	        "title": "可用容量",
	        "valueField": "Available",
	        "clustered": false,
	        "columnWidth": 0.5,
	        "lineColorField" : layoutColors.defaultText,
	        "legendValueText": "[[value]]TB",
	        "balloonText": "[[title]]<br/><b style='font-size: 130%'>[[value]]TB</b>"
	      },
	      {
	        "id": "g2",
	        color: layoutColors.defaultText,
	        "valueAxis": "v2",
	        "lineColor": layoutColors.warning,
	        "fillColors": layoutColors.warning,
	        "fillAlphas": 0.8,
	        "lineAlpha": 0.8,
	        "type": "column",
	        "title": "已分配容量",
	        "valueField": "Used",
	        "clustered": false,
	        "columnWidth": 0.5,
	        "lineColorField" : layoutColors.defaultText,
	        "legendValueText": "[[value]]TB",
	        "balloonText": "[[title]]<br/><b style='font-size: 130%'>[[value]]TB</b>"
	      },{
        "id": "g3",
        "valueAxis": "v1",
        "bullet": "round",
        "bulletBorderAlpha": 1,
        "bulletColor": layoutColors.defaultText,
        color: layoutColors.defaultText,
        "bulletSize": 5,
        "hideBulletsCount": 50,
        "lineThickness": 2,
        "lineColor": layoutColors.danger,
        "type": "smoothedLine",
        "title": "增长率",
        "useLineColorForBulletBorder": true,
        "valueField": "GrowthRate",
        "balloonText": "[[title]]<br/><b style='font-size: 130%'>[[value]]%</b>"
      }],
	     "chartCursor": {
	        "pan": true,
	        "cursorColor" : layoutColors.danger,
	        "valueLineEnabled": true,
	        "valueLineBalloonEnabled": true,
	        "cursorAlpha": 0,
	        "valueLineAlpha": 0.1
	      },
	      "categoryField": "TS",
	      "categoryAxis": {
	        "axisColor": layoutColors.defaultText,
	        "color": layoutColors.defaultText,
	        "gridColor": layoutColors.defaultText,
	        "parseDates": false,
	        "dashLength": 1,
	        "minorGridEnabled": false
	      },
	      "legend": {  //顶部显示图标格式
	        "useGraphSettings": true,
	        "position": "top",
	        "color": layoutColors.defaultText,
	        "align":"center",
	        "horizootalGap":1,
	        
	        "marginLeft":0,
//	        "title":"容量趋势",
	        
	        "valueWidth":0  //当写零的时候  头上面不显示 鼠标放上去的值信息
	      },
	      "balloon": {
	        "borderThickness": 1,
	        "shadowAlpha": 0
	      },
	      "export": {
	        "enabled": true
	      },
	      "dataProvider":dataProvider ,
	      pathToImages: layoutPaths.images.amChart
	    });
      }
       //页面跳转
      $scope.server1=function(url,name){
      	var params={};
      	params.pool = name;
      	params.poolName =pool;
	 	  	$state.go(url,params);
	 	  }
      //返回的方法
	 	  $scope.back = function (){
	 		  $state.go('dashboard.CapacityManagement.capacity');
	 	  };
      $scope.initData();
  }
})();
