
(function () {
  'use strict';
  
  angular.module('BlurAdmin.pages.CapacityManagement.capacity')
      .controller('detailCtrl', detailCtrlFunc);
	
  /** @ngInject */
  function detailCtrlFunc($scope, $filter, $http, $localStorage,toastr, $uibModal, commonService,baUtil,baConfig,$timeout,$element,layoutPaths,httpService,$state,$stateParams) {
  	 console.log($localStorage.authKey);
      var config = { headers: {
          "Authorization": $localStorage.authKey
      }}
      $scope.smartTablePageSize=15;
      var pool = $stateParams.pool;
      var poolName = $stateParams.poolName;
      $scope.params={};
      var layoutColors = baConfig.colors;
      $scope.poolData={};
      $scope.Component=[];
      $scope.CapacityOverview={};  //容量分布
      
      $scope.CapacityOverview_old ={};
      $scope.CapacityTrend_old =[];
      $scope.AssignTop10_old =[];
      
      $scope.initData=function(){
      	if(pool!=null && pool!=""){
      		$scope.params.pool = pool;
      	}
      	httpService.get("/capacity/PoolDetail", $scope.params, config, function (response){
      		$scope.poolData=response;
      		$scope.CapacityOverview= response.CapacityOverview;
      		$scope.CapacityOverview.Used1=parseFloat($scope.CapacityOverview.Used/$scope.CapacityOverview.Available*100).toFixed(1);//已使用
      		$scope.CapacityOverview.PhysicalFree1=parseFloat(($scope.CapacityOverview.PhysicalFree -$scope.CapacityOverview.Used)/$scope.CapacityOverview.Available * 100).toFixed(1);  //剩余物理可用
      		$scope.CapacityOverview.NoAvailable=parseFloat(($scope.CapacityOverview.Available -$scope.CapacityOverview.PhysicalFree)/$scope.CapacityOverview.Available * 100).toFixed(1);  //不可用
      		$scope.CapacityOverview.NoUsed=parseFloat(($scope.CapacityOverview.Assigned -$scope.CapacityOverview.Used)/$scope.CapacityOverview.Available * 100).toFixed(1);   //未使用
      		$scope.CapacityOverview.Available1= parseFloat(($scope.CapacityOverview.Available -$scope.CapacityOverview.Assigned)/$scope.CapacityOverview.Available * 100).toFixed(1) //剩余可用
      		$scope.CapacityOverview_old=$scope.CapacityOverview;
      		//容量分布图数据
      		combinedChart("zoomAxisChart",response.CapacityTrend);
      		$scope.CapacityTrend_old=response.CapacityTrend;
      		//容量分配TOP 前10
      		//容量分配TOP 前10
      		$scope.AssignTop10_old=response.AssignTop10;
      		$scope.AssignTop10_old.sort(function(a,b){
      			return b.Assigned-a.Assigned;
      		});
      		charts("assignTopDiv",$scope.AssignTop10_old,"AppName");
      		
      		$scope.Component=response.Component;   //列表list
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
	        
	        "valueWidth":0
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
      
      
      //柱形图
      function charts(divId,dataProvider,colomeName){
      	var chart = AmCharts.makeChart(divId, {
	      "type": "serial",
	      "theme": "none",
	      "color": "#ffffff",//layoutColors.defaultText,
	      "precision": 2,
	      "valueAxes": [{   //左y轴
	        color: "#ffffff",   //y轴颜色
	        axisColor: "#ffffff",
	        gridColor: "#000000",
	        "id": "v1",
	        "title": "容量(TB)",
	        "position": "left",
	        "autoGridCount": false,
	        "labelFunction": function(value) {
	          return Math.round(value) + "GB";
	        }
	      }],
	      "graphs": [{   //鼠标悬浮显示数据
	        "id": "g3",
	        color: "#000000",
	        "valueAxis": "v1",
	        "lineColor": "#0093FA",
	        "fillColors": "#0093FA",
	        "fillAlphas": 0.8,
	        "lineAlpha": 0.8,
	        "type": "column",
	        "title": "分配容量",
	        "valueField": "Assigned",
	        "clustered": false,
	        "columnWidth": 0.5,
	        "lineColorField" : "#ffffff",
//	        "legendValueText": "[[value]]TB",
	        "balloonText": "[[title]]<br/><b style='font-size: 130%'>[[value]]GB</b>"
	      }],
	      "chartCursor": {
	        "pan": true,
	        "cursorColor" : "#000000",
	        "valueLineEnabled": true,
	        "valueLineBalloonEnabled": true,
	        "cursorAlpha": 0,
	        "valueLineAlpha": 0.2
	      },
	      "categoryField": colomeName,
	      "categoryAxis": {   //x轴信息
	        "axisColor": "#ffffff",
	        "color": "#ffffff",
	        "gridColor": "#ffffff",
	        "parseDates": false,
	        "dashLength": 1,
	        "minorGridEnabled": false
	      },
	      "balloon": {
	        "borderThickness": 1,
	        "shadowAlpha": 0
	      },
	      "export": {
	        "enabled": true
	      },
	      "dataProvider": dataProvider,
	      pathToImages: layoutPaths.images.amChart
	    });
      }
      //行选择事件
      $scope.selectRow = function(component){
      	angular.forEach($scope.Component, function (item,i) {
				if(component.ArraySN == item.ArraySN){
					item.selected = true;
				}else{
					item.selected = false;
				}
				});      	
      	$scope.params.device=component.ArraySN;
      	httpService.get("/capacity/PoolComponentDetail", $scope.params, config, function (response){
      		$scope.CapacityOverview= response.CapacityOverview;
      		$scope.CapacityOverview.Used1=parseFloat($scope.CapacityOverview.Used/$scope.CapacityOverview.Available*100).toFixed(1);//已使用
      		$scope.CapacityOverview.PhysicalFree1=parseFloat(($scope.CapacityOverview.PhysicalFree -$scope.CapacityOverview.Used)/$scope.CapacityOverview.Available * 100).toFixed(1);  //剩余物理可用
      		$scope.CapacityOverview.NoAvailable=parseFloat(($scope.CapacityOverview.Available -$scope.CapacityOverview.PhysicalFree)/$scope.CapacityOverview.Available * 100).toFixed(1);  //不可用
      		$scope.CapacityOverview.NoUsed=parseFloat(($scope.CapacityOverview.Assigned -$scope.CapacityOverview.Used)/$scope.CapacityOverview.Available * 100).toFixed(1);   //未使用
      		$scope.CapacityOverview.Available1= parseFloat(($scope.CapacityOverview.Available -$scope.CapacityOverview.Assigned)/$scope.CapacityOverview.Available * 100).toFixed(1) //剩余可用
      		//容量分布图数据
      		combinedChart("zoomAxisChart",response.CapacityTrend);
      		//容量分配TOP 前10
      		var assignTopList = response.AssignTop10;
      		assignTopList.sort(function(a,b){
      			return b.Assigned-a.Assigned;
      		});
      		charts("assignTopDiv",assignTopList,"AppName");
      	});
      };
      
      //全部存储池点击按钮事件
      $scope.allPool = function(){
      	angular.forEach($scope.Component, function (item,i) {
					item.selected = false;
				});  
      	
      	$scope.CapacityOverview=$scope.CapacityOverview_old;
	  		//容量分布图数据
	  		combinedChart("zoomAxisChart",$scope.CapacityTrend_old);
	  		//容量分配TOP 前10
	  		charts("assignTopDiv",$scope.AssignTop10_old,"AppName");
      }
      
      //返回的方法
	 	  $scope.back = function (){
	 	  	$scope.params={};
	 	  	$scope.params.pool = poolName;
	 		  $state.go('dashboard.CapacityManagement.capacity.overview',$scope.params);
	 	  };
      $scope.initData();
  }
})();
