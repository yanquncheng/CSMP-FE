/**
 * 对象管理
 */
(function () {
  'use strict';
  angular.module('BlurAdmin.pages.objectManage.tabs')
     .controller('detailsCtrl', detailsCtrlFunc);
    
    function detailsCtrlFunc($scope, fixedNumber, $http, $localStorage, $filter, $stateParams) {
    	 
    	 console.log($stateParams);
    	 
    	 $scope.baseInfo = {};
    	 $scope.baseInfo = $stateParams.param.storage;
    	 
	 	var config = { headers: {
	        "Authorization": $localStorage.authKey
	    }};
	    
    	$scope.tabs = $stateParams.param.tabs;
	    
	    $scope.initTemplate_1 = function(tab){
	    	var cfg = angular.copy(config);
	    	cfg.params = {};
	    	angular.forEach(tab.param, function(item, index){
	    		cfg.params[item.postName] = $scope.baseInfo[item.findName];
	    	});
    		
		    $http.get(IG.api + tab['url'], cfg).success(function (response) {
		    	$scope.summary = response;
				$scope.infos = [];
				angular.forEach($scope.summary, function(item, index){
					if($scope.infos.length<1 || $scope.infos[$scope.infos.length-1].length>1){
						var row = [];
						row.push(item);
						$scope.infos.push(row);
					}else{
						$scope.infos[$scope.infos.length-1].push(item);
					}
				});
				console.log($scope.infos);
		    });
	    };
	    
	    $scope.initData = function(){
		    $scope.initTemplate_1($scope.tabs[0]);
	    };
	    
	    $scope.initData();
	    
	    $scope.swithTabs = function(tab){
	    	switch(tab.template){
	    		case 1:
	    			$scope.initTemplate_1(tab);
	    			return ;
	    		case 2:
	    			$scope.initTemplate_2(tab);
	    			return ;
	    		case 3:
	    			$scope.initTemplate_3(tab);
	    			return ;
	    		case 4:
	    			$scope.initTemplate_4(tab);
	    			return ;
	    		case 5:
	    			$scope.initTemplate_5(tab);
	    			return ;
	    		default:
	    	}
	    }
	    
	    $scope.initTemplate_2 = function(tab){
	    	var cfg = angular.copy(config);
	    	cfg.params = {};
	    	angular.forEach(tab.param, function(item, index){
	    		cfg.params[item.postName] = $scope.baseInfo[item.findName];
	    	});
    		
		    $http.get(IG.api + tab['url'], cfg).success(function (response) {
		    	$scope.data = response;
		    	var t = {
								"chartType":"pie",
							    "chartData": [
							        {
							            "name": "a",	
							            "value": 505.9
							        },
							        {
							            "name": "T",
							            "value": 50
							        },
							        {
							            "name": "T",
							            "value": 50
							        }
							    ],
							    "tableBody": [
							        {
							            "number": "000296800706",
							            "type": "block"
							        },
							        {
							            "number": "000296800707",
							            "type": "vmax"
							        }
							    ],
							    "tableHead": [
							        {
							            "name": "编号",
							            "value": "number",
							            "sort": "true"				// 是否可排序
							        },
							        {
							            "name": "类型",
							            "value": "type",
							            "sort": "false"
							        }
							    ]
							};
		    	
			    var chart = AmCharts.makeChart( "disk", {
				  "type": $scope.data.chartType,
				  "theme": "none",
				  "dataProvider": $scope.data.chartData,
				  "valueField": "value",
				  "titleField": "name",
				   "balloon":{
				   	"fixedPosition":true
				  },
				  "pullOutRadius": 10,
				  "labelRadius": 5,
				  "labelText": "[[name]]",
				  "percentPrecision": 1
				});
		    });
	    };
	    
	    $scope.initTemplate_3 = function(tab){
	    	var cfg = angular.copy(config);
	    	cfg.params = {};
	    	angular.forEach(tab.param, function(item, index){
	    		cfg.params[item.postName] = $scope.baseInfo[item.findName];
	    	});
    		
		    $http.get(IG.api + tab['url'], cfg).success(function (response) {
		    	$scope.data = response;
		    	var t = {
							    "tableBody": [
							        {
							            "number": "000296800706",
							            "type": "block"
							        },
							        {
							            "number": "000296800707",
							            "type": "vmax"
							        },
							        {
							            "number": "000296800707",
							            "type": "vmax"
							        },
							        {
							            "number": "000296800707",
							            "type": "vmax"
							        },
							        {
							            "number": "000296800707",
							            "type": "vmax"
							        },
							        {
							            "number": "000296800707",
							            "type": "vmax"
							        },
							        {
							            "number": "000296800707",
							            "type": "vmax"
							        },
							        {
							            "number": "000296800707",
							            "type": "vmax"
							        },
							        {
							            "number": "000296800707",
							            "type": "vmax"
							        },
							        {
							            "number": "000296800707",
							            "type": "vmax"
							        },
							        {
							            "number": "000296800707",
							            "type": "vmax"
							        },
							        {
							            "number": "000296800707",
							            "type": "vmax"
							        },
							        {
							            "number": "000296800707",
							            "type": "vmax"
							        },
							        {
							            "number": "000296800707",
							            "type": "vmax"
							        },
							        {
							            "number": "000296800707",
							            "type": "vmax"
							        },
							        {
							            "number": "000296800707",
							            "type": "vmax"
							        },
							        {
							            "number": "000296800707",
							            "type": "vmax"
							        },
							        {
							            "number": "000296800707",
							            "type": "vmax"
							        },
							        {
							            "number": "000296800707",
							            "type": "vmax"
							        }
							    ],
							    "tableHead": [
							        {
							            "name": "编号",
							            "sort": "true",
							            "value": "number"
							        },
							        {
							            "name": "类型",
							            "sort": "false",
							            "value": "type"
							        }
							    ]
							};
		    });
	    };
	    
	    $scope.initTemplate_4 = function(tab){
	    	var cfg = angular.copy(config);
	    	cfg.params = {};
	    	angular.forEach(tab.param, function(item, index){
	    		cfg.params[item.postName] = $scope.baseInfo[item.findName];
	    	});
    		
		    $http.get(IG.api + tab['url'], cfg).success(function (response) {
		    	$scope.capacity = response;
		    	var t = {
								    "left": {
								        "chartData": [
								            {
								                "color": "#80B3E8",
								                "name": "总容量（GB）",
								                "value": 100
								            },
								            {
								                "color": "#444348",
								                "name": "未建立Raid（GB）",
								                "value": 200
								            },
								            {
								                "color": "#91EC7E",
								                "name": "已建立Raid（GB）",
								                "value": 300
								            }
								        ],
								        "chartType": "serial",
								        "tableBody": [
								            {
								                "number": "000296800706",
								                "type": "block"
								            },
								            {
								                "number": "000296800707",
								                "type": "vmax"
								            }
								        ],
								        "tableHead": [
								            {
								                "name": "编号",
								                "sort": "false",
								                "value": "number"
								            },
								            {
								                "name": "类型",
								                "sort": "false",
								                "value": "type"
								            }
								        ]
								    },
								    "right": {
								        "chartData": [
								            {
								                "color": "#80B3E8",
								                "name": "总容量（GB）",
								                "value": 100
								            },
								            {
								                "color": "#444348",
								                "name": "未建立Raid（GB）",
								                "value": 200
								            },
								            {
								                "color": "#91EC7E",
								                "name": "已建立Raid（GB）",
								                "value": 300
								            }
								        ],
								        "chartType": "serial",
								        "tableBody": [
								            {
								                "number": "000296800706",
								                "type": "block"
								            },
								            {
								                "number": "000296800707",
								                "type": "vmax"
								            }
								        ],
								        "tableHead": [
								            {
								                "name": "编号",
								                "sort": "false",
								                "value": "number"
								            },
								            {
								                "name": "类型",
								                "sort": "false",
								                "value": "type"
								            }
								        ]
								    }
								};
		    
	            var chart = AmCharts.makeChart("luo", {
				    "theme": "none",
				    "type": $scope.capacity.left.chartType,
				    "dataProvider": $scope.capacity.left.chartData,
				    "valueAxes": [{
				        "title": "容量（GB）"
				    }],
				    "graphs": [{
				        "balloonText": "容量 [[category]]:[[value]]",
				        "fillAlphas": 1,
				        "lineAlpha": 0.2,
				        "title": "name",
				        "fillColorsField": "color",
				        "type": "column",
				        "valueField": "value"
				    }],
	//			    "depth3D": 20,
	//			    "angle": 30,
				    "rotate": true,
				    "categoryField": "name",
				    "categoryAxis": {
				        "gridPosition": "start",
				        "fillAlpha": 0.05,
				        "position": "left"
				    },
				    "export": {
				    	"enabled": true
				     }
				});
				
	            chart = AmCharts.makeChart("ke", {
				    "theme": "none",
				    "type": $scope.capacity.right.chartType,
				    "dataProvider": $scope.capacity.right.chartData,
				    "valueAxes": [{
				        "title": "容量（GB）"
				    }],
				    "graphs": [{
				        "balloonText": "容量 [[category]]:[[value]]",
				        "fillAlphas": 1,
				        "lineAlpha": 0.2,
				        "title": "name",
				        "fillColorsField": "color",
				        "type": "column",
				        "valueField": "value"
				    }],
	//			    "depth3D": 20,
	//			    "angle": 30,
				    "rotate": true,
				    "categoryField": "name",
				    "categoryAxis": {
				        "gridPosition": "start",
				        "fillAlpha": 0.05,
				        "position": "left"
				    },
				    "export": {
				    	"enabled": true
				     }
				});
		    });
	    };
	    
	    $scope.initTemplate_5 = function(tab){
	    	var cfg = angular.copy(config);
	    	cfg.params = {};
	    	angular.forEach(tab.param, function(item, index){
	    		cfg.params[item.postName] = $scope.baseInfo[item.findName];
	    	});
    		
		    $http.get(IG.api + tab['url'], cfg).success(function (response) {
		    	$scope.data = response;
		    	var t = {
						    "left": {
						        "chartData": [
							        {
							            "name": "a",	
							            "value": 505.9
							        },
							        {
							            "name": "T",
							            "value": 50
							        },
							        {
							            "name": "T",
							            "value": 50
							        }
						        ],
						        "chartType": "pie"
						    },
						    "right": {
						        "chartData": [
						            {
						                "color": "#80B3E8",
						                "name": "总容量（GB）",
						                "value": 100
						            },
						            {
						                "color": "#444348",
						                "name": "未建立Raid（GB）",
						                "value": 200
						            },
						            {
						                "color": "#91EC7E",
						                "name": "已建立Raid（GB）",
						                "value": 300
						            }
						        ],
						        "chartType": "serial"
						    }
						};
						
				var chart = AmCharts.makeChart("right", {
				    "theme": "none",
				    "type": $scope.data.right.chartType,
				    "dataProvider": $scope.data.right.chartData,
				    "valueAxes": [{
				        "title": "容量（GB）"
				    }],
				    "graphs": [{
				        "balloonText": "容量 [[category]]:[[value]]",
				        "fillAlphas": 1,
				        "lineAlpha": 0.2,
				        "title": "name",
				        "fillColorsField": "color",
				        "type": "column",
				        "valueField": "value"
				    }],
	//			    "depth3D": 20,
	//			    "angle": 30,
				    "rotate": true,
				    "categoryField": "name",
				    "categoryAxis": {
				        "gridPosition": "start",
				        "fillAlpha": 0.05,
				        "position": "left"
				    },
				    "export": {
				    	"enabled": true
				     }
				});
		    	
			    chart = AmCharts.makeChart( "left", {
				  "type": $scope.data.left.chartType,
				  "theme": "none",
				  "dataProvider": $scope.data.left.chartData,
				  "valueField": "value",
				  "titleField": "name",
				   "balloon":{
				   	"fixedPosition":true
				  },
				  "export": {
				    "enabled": true
				  }
				});
		    });
	    };
    }
})();