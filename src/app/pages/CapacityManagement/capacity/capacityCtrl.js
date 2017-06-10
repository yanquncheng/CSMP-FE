
(function () {
  'use strict';
  
  angular.module('BlurAdmin.pages.CapacityManagement.capacity')
      .controller('capacityCtrl', capacityCtrlFunc);
	
  /** @ngInject */
  function capacityCtrlFunc($scope, $filter, $http, $localStorage,toastr, $uibModal, commonService,baUtil,baConfig,$timeout,$element,layoutPaths,httpService,$state) {
  	 console.log($localStorage.authKey);
      var config = { headers: {
          "Authorization": $localStorage.authKey
      }}
      
      
      
      
      
      var layoutColors = baConfig.colors;
      $scope.CapacityOverview={};  //容量分布
      $scope.DatacenterDistributed=[];  //资源池  x轴 DCName
      $scope.PoolDistributed = []; //数据中心   x轴  PoolName
      
      $scope.CapacityTrend=[];  // 数据中心容量趋势  分布图
      $scope.PoolDistributed1=[];// 数据中心 资源池容量 分布图
      
      $scope.GroupByDatacenter=[];  //数据中心  数据源信息  
      $scope.initData=function(){
      	httpService.get("/capacity/overview", null, config, function (response){
      		$scope.CapacityOverview= response.CapacityOverview;
      		$scope.CapacityOverview.Used1=parseFloat($scope.CapacityOverview.Used/$scope.CapacityOverview.Available*100).toFixed(1);//已使用
      		$scope.CapacityOverview.PhysicalFree1=parseFloat(($scope.CapacityOverview.PhysicalFree -$scope.CapacityOverview.Used)/$scope.CapacityOverview.Available * 100).toFixed(1);  //剩余物理可用
      		$scope.CapacityOverview.NoAvailable=parseFloat(($scope.CapacityOverview.Available -$scope.CapacityOverview.PhysicalFree)/$scope.CapacityOverview.Available * 100).toFixed(1);  //不可用
      		$scope.CapacityOverview.NoUsed=parseFloat(($scope.CapacityOverview.Assigned -$scope.CapacityOverview.Used)/$scope.CapacityOverview.Available * 100).toFixed(1);   //未使用
      		$scope.CapacityOverview.Available1= parseFloat(($scope.CapacityOverview.Available -$scope.CapacityOverview.Assigned)/$scope.CapacityOverview.Available * 100).toFixed(1) //剩余可用
      		
      		$scope.PoolDistributed = response.PoolDistributed;
      		$scope.DatacenterDistributed = response.DatacenterDistributed;
      		for(var i in $scope.PoolDistributed){
      			$scope.PoolDistributed[i].sales4 = $scope.PoolDistributed[i].Available-$scope.PoolDistributed[i].PhyFree-$scope.PoolDistributed[i].Used;
      		}
      		for(var j in $scope.DatacenterDistributed){
      			$scope.DatacenterDistributed[j].sales4 = $scope.DatacenterDistributed[j].Available-$scope.DatacenterDistributed[j].PhyFree-$scope.DatacenterDistributed[j].Used;
      		}
      		charts("resourcesDiv",$scope.DatacenterDistributed,"DCName");  //资源池可用容量分布
      		charts("dataDiv",$scope.PoolDistributed,"PoolName");  //数据中心可用容量分布
      		
      		//数据中心图标信息展示
      		$scope.GroupByDatacenter=response.GroupByDatacenter;  //数据中心模块  数据源
      		for(var k in $scope.GroupByDatacenter){
      			$scope.CapacityTrend=response.GroupByDatacenter[k].CapacityTrend;
      			combinedChart("zoomAxisChart"+k,$scope.CapacityTrend);   //数据中心 容量趋势
      			$scope.PoolDistributed1=response.GroupByDatacenter[k].PoolDistributed;
      			for(var l in $scope.PoolDistributed1){
      				$scope.PoolDistributed1[l].sales4=$scope.PoolDistributed1[l].Available-$scope.PoolDistributed1[l].PhyFree-$scope.PoolDistributed1[l].Used;
      			}
      			charts("dataDivs"+k,$scope.PoolDistributed1,"PoolName");  //数据中心 资源池容量
      			
      			//容量分布
      			var item = $scope.GroupByDatacenter[k];
          	var Availables = parseFloat((item.CapacityDist.Available / item.CapacityDist.TotalRaw)*100).toFixed(1);  //可用容量
          	var Useds = parseFloat((item.CapacityDist.Used / item.CapacityDist.TotalRaw)*100).toFixed(1);  //已用容量
          	$scope.GroupByDatacenter[k].CapacityDist.Availables=Availables;
          	$scope.GroupByDatacenter[k].CapacityDist.Useds=Useds;
      		}
      	});
      	
//    	charts("dataDiv1",$scope.DatacenterDistribute,"PoolName");
//      combinedChart("zoomAxisChart1","");
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
	        "align":"left",
	        "horizootalGap":5,
	        "valueWidth":80
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
	          return Math.round(value) + "TB";
	        }
	      }],
	      "graphs": [{   //鼠标悬浮显示数据
	        "id": "g3",
	        color: "#000000",
	        "valueAxis": "v1",
	        "lineColor": "gray",
	        "fillColors": "gray",
	        "fillAlphas": 0.8,
	        "lineAlpha": 0.8,
	        "type": "column",
	        "title": "不可用容量",
	        "valueField": "Available",
	        "clustered": false,
	        "columnWidth": 0.5,
	        "lineColorField" : "#ffffff",
//	        "legendValueText": "[[value]]TB",
	        "balloonText": "[[title]]<br/><b style='font-size: 130%'>[[sales4]]TB</b>"
	      }, {
	        "id": "g4",
	        "valueAxis": "v1",
	        color: "#ffffff",
	        "lineColor": "green",//layoutColors.primary,
	        "fillColors": "green",//layoutColors.primary,
	        "fillAlphas": 0.9,
	        "lineAlpha": 0.9,
	        "type": "column",
	        "title": "已分配",
	        "valueField": "PhyFree",
	        "clustered": false,
	        "columnWidth": 0.5,
//	        "legendValueText": "[[value]]TB",
	        "balloonText": "[[title]]<br/><b style='font-size: 130%'>[[value]]TB</b>"
	      }
	      , {
	        "id": "g5",
	        "valueAxis": "v1",
	        color: "#ffffff",
	        "lineColor": "red",//layoutColors.primary,
	        "fillColors": "red",//layoutColors.primary,
	        "fillAlphas": 0.9,
	        "lineAlpha": 0.9,
	        "type": "column",
	        "title": "未分配",
	        "valueField": "Used",
	        "clustered": false,
	        "columnWidth": 0.5,
//	        "legendValueText": "[[value]]TB",
	        "balloonText": "[[title]]<br/><b style='font-size: 130%'>[[value]]TB</b>"
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
      //页面跳转
      $scope.server=function(url,name){
      	var params={};
      	params.pool = name;
	 	  	$state.go(url,params);
	 	  }
      //页面返回顶部
      $timeout(function() {
            $(window).scrollTop(0,0);
        }, 200);
      $scope.initData();
  }
})();
