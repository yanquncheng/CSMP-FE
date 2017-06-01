
(function () {
  'use strict';
  
  angular.module('BlurAdmin.pages.objectManage.host')
      .controller('hostDetailCtrl', hostDetailCtrlFunc);

  /** @ngInject */
  function hostDetailCtrlFunc($scope, $timeout , $filter, $http, $localStorage,toastr, $state, commonService, $stateParams,httpService) {
     console.log($stateParams);
	  var config = { headers: {
          "Authorization": $localStorage.authKey
      }}
	  
	  //tabs页
//	$scope.hostTabs = [
//              {"id":1,"name":"基本信息","url":"app/pages/objectManage/host/base_info.html"},
//              {"id":2,"name":"HBA","url":"app/pages/objectManage/host/hba_info.html"},
//              {"id":3,"name":"存储LUN信息","url":"app/pages/objectManage/host/lun_info.html"}
//	           ];
	           
//	  $scope.tabs = [] ;
  	
  	 $scope.parmsInfo = {};
	 	 $scope.parmsInfo = $stateParams.param.host;
	 	 $scope.tabs = $stateParams.param.tabs;
	 	 
	 	 
	 	 $scope.initTemplate_1 = function(tab){
	    	var cfg = angular.copy(config);
	    	cfg.params = {};
	    	angular.forEach(tab.param, function(item, index){
//	    		cfg.params[item.postName] = $scope.baseInfo[item.findName];
	    	});
    		
		    httpService.get(tab['url'], null, cfg, function (response) {
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
	 	 
	 	 
	 	 
	 	 
//	  if(!$scope.parmsInfo){
//	 			$scope.back();
//	 	}else{
// 			$scope.tabs = $scope.hostTabs ;
// 			$scope.parmsInfo.title = "主机名称:" ;
// 			$scope.parmsInfo.num = $scope.parmsInfo.baseinfo.name ;
//	 	}
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
//	    		cfg.params[item.postName] = $scope.baseInfo[item.findName];
	    	});
    		
		    httpService.get(tab['url'], null, cfg, function (response) {
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
//	    		cfg.params[item.postName] = $scope.baseInfo[item.findName];
	    	});
    		
		    httpService.get(tab['url'], null, cfg, function (response) {
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
//	    		cfg.params[item.postName] = $scope.baseInfo[item.findName];
	    	});
    		
		    httpService.get(tab['url'], null, cfg, function (response) {
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
//	    		cfg.params[item.postName] = $scope.baseInfo[item.findName];
	    	});
    		
		    httpService.get(tab['url'], null, cfg, function (response) {
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
		
		
		
		
		
		
		
		
		
		
		
		
		
	 	//tabs页切换
//	 $scope.hostTabs = function (tab){
//		 if(!tab){
//			tab = $scope.tabs[0];
//		 }
//		 if(tab.id === 1){		
//			 $scope.baseData();
//			
//		 }else if(tab.id === 2){
//			 $scope.hbaData();
//			 
//		 }else if(tab.id === 3){
//			 $scope.lunData();
//		 }
//	 };
	 	
	 	
	 	//返回的方法
	 	$scope.back = function (){
	 		$state.go('dashboard.objectManage.host',{param: $scope.parmsInfo});
	 	};
	 	
	 	//基本信息
 	  $scope.host = {};
	  $scope.baseData = function (){  
	  	httpService.get("/hosts",{'device':$scope.parmsInfo.baseinfo.name}, config, function (response){
	    	  $scope.host = response ;
	      });
	  };
      
    //HBA信息
  	$scope.hbaList = [];
  	$scope.hbaData = function (){  	
  	$scope.smartTablePageSize = 15;
  	httpService.get("/hosts",{'device':$scope.parmsInfo.baseinfo.name}, config, function (response){
    	  $scope.hbaList = response.HBAs ;
      });
  	};
  	
  	//存储LUN信息
  	$scope.lunList = [];
  	$scope.lunData = function (){  	
  	$scope.lunTablePageSize=15;
  	httpService.get("/array/hosts",{'device':$scope.parmsInfo.baseinfo.name}, config, function (response){
    	  $scope.lunList = response ;
      });
  	};
//	$scope.hostTabs();
  }
})();
