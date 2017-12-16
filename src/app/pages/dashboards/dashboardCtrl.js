
(function () {
  'use strict';
  
  angular.module('BlurAdmin.pages.dashboards')
      .controller('dashboardCtrl', dashboardCtrlFunc);
	
  /** @ngInject */
  function dashboardCtrlFunc($scope, $filter, $http, $localStorage,toastr, $uibModal, commonService,baUtil,baConfig,$timeout,$element,layoutPaths,httpService,$state) {
      var config = { headers: {
          "Authorization": $localStorage.authKey
      }}
			function trendCharts(id,dataProvider){
				var layoutColors = baConfig.colors;
		    var chart = AmCharts.makeChart("zoomAxisChart"+id, {
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
	        "autoGridCount": false,
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
	      "graphs": [ 
	//    {   //鼠标悬浮上显示信息
	//      "id": "g4",
	//      "valueAxis": "v1",
	//      color: layoutColors.defaultText,
	//      "lineColor": layoutColors.primary,
	//      "fillColors": layoutColors.primary,
	//      "fillAlphas": 0.9,
	//      "lineAlpha": 0.9,
	//      "type": "column",
	//      "title": "增长率",
	//      "valueField": "sales1",
	//      "clustered": false,
	//      "columnWidth": 0.2,
	//      "legendValueText": "[[value]]%",
	//      "balloonText": "[[title]]<br/><b style='font-size: 130%'>[[value]]%</b>"
	//    }, 
			{
	        "id": "g4",
	        "valueAxis": "v1",
	        "bullet": "round",
	        "bulletBorderAlpha": 1,
	        "bulletColor": layoutColors.defaultText,
	        color: layoutColors.defaultText,
	        "bulletSize": 5,
	        "hideBulletsCount": 50,
	        "lineThickness": 2,
	        "lineColor": layoutColors.red,
	        "type": "smoothedLine",
	        "title": "增长率",
	        "useLineColorForBulletBorder": true,
	        "valueField": "GrowthRate",
	        "balloonText": "[[title]]<br/><b style='font-size: 130%'>[[value]]%</b>"
	      },
	      {
	        "id": "g1",
	        "valueAxis": "v2",
	        "bullet": "round",
	        "bulletBorderAlpha": 1,
	        "bulletColor": layoutColors.defaultText,
	        color: layoutColors.defaultText,
	        "bulletSize": 5,
	        "hideBulletsCount": 50,
	        "lineThickness": 2,
	        "lineColor": layoutColors.danger,
	        "type": "smoothedLine",
	        "title": "可用容量",
	        "useLineColorForBulletBorder": true,
	        "valueField": "Available",
	        "balloonText": "[[title]]<br/><b style='font-size: 130%'>[[value]]TB</b>"
	      }, {
	        "id": "g2",
	        "valueAxis": "v2",
	        "bullet": "round",
	        "bulletBorderAlpha": 1,
	        "bulletColor": layoutColors.defaultText,
	         color: layoutColors.defaultText,
	        "bulletSize": 5,
	        "hideBulletsCount": 50,
	        "lineThickness": 2,
	        "lineColor": layoutColors.warning,
	        "type": "smoothedLine",
	        "dashLength": 5,
	        "title": "已用容量",
	        "useLineColorForBulletBorder": true,
	        "valueField": "Used",
	        "balloonText": "[[title]]<br/><b style='font-size: 130%'>[[value]]TB</b>"
	      }],
	//    "chartScrollbar": {
	//      "graph": "g1",
	//      "oppositeAxis": false,
	//      "offset": 30,
	//      gridAlpha: 0,
	//      color: layoutColors.defaultText,
	//      scrollbarHeight: 50,
	//      backgroundAlpha: 0,
	//      selectedBackgroundAlpha: 0.05,
	//      selectedBackgroundColor: layoutColors.defaultText,
	//      graphFillAlpha: 0,
	//      autoGridCount: true,
	//      selectedGraphFillAlpha: 0,
	//      graphLineAlpha: 0.2,
	//      selectedGraphLineColor: layoutColors.defaultText,
	//      selectedGraphLineAlpha: 1
	//    },
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
	      "dataProvider": dataProvider,   //数据源
	      pathToImages: layoutPaths.images.amChart
	    });
			}
			

      
			$scope.dataList =[] ;  //初始化数据源
			$scope.tabs1=[];  // 数据中心信息
			$scope.charts =[];  //资源池数据信息
			$scope.tabsValue=[]; //默认数据中心查询值

			
			$scope.initData = function (params){ 
				httpService.get("/dashboard/EquipmentSummary", params, config, function (response){ 
					$scope.dataList = response.Datacenter;  
					$scope.tabs1 = $scope.dataList;
					$scope.tabsValue = $scope.tabs1[0].ResourcePool; 
					for(var i in $scope.tabsValue){
						var item = $scope.tabsValue[i];
						var Availables = parseFloat((item.CapacityDist.Available / item.CapacityDist.TotalRaw)*100).toFixed(1);  //可用容量
						var Useds = parseFloat((item.CapacityDist.Used / item.CapacityDist.TotalRaw)*100).toFixed(1);  //已用容量
						$scope.tabsValue[i].CapacityDist.Availables=Availables;
						$scope.tabsValue[i].CapacityDist.Useds=Useds;
						trendCharts(item.Name,item.CapacityTrend);
					} 
				});
			};
    
 	               
 	  //数据中心 tab点击事件
 	  $scope.swithTabs = function(tab){   
 	  	$scope.tabsValue = tab.ResourcePool;
 	  	 for(var i in $scope.tabsValue){
      	var item = $scope.tabsValue[i];
      	trendCharts(item.Name,item.CapacityTrend);
      }
 	  }
 	  
 	  $scope.server=function(url,datacenter,type){
 	  	var params = {};
 	  	params.datacenter = datacenter;
 	  	params.type = type;
 	  	$state.go(url,params);
 	  }
 	  $scope.initData();
  }
})();
