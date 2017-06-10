/**
 * 对象管理
 */
(function () {
  'use strict';
  angular.module('BlurAdmin.pages.objectManage.tabs')
     .controller('detailsCtrl', detailsCtrlFunc);
    
    function detailsCtrlFunc($scope, fixedNumber, httpService, $localStorage, $filter, $stateParams) {
    	 
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
	    	var f=0;
	    	angular.forEach(tab.param, function(item, index){
	    		if($scope.baseInfo[item.findName]==undefined){
	    			f++;
	    			commonService.showMsg("error","获取不到"+item.findName+"的值");
	    			return;
	    		}
	    		cfg.params[item.postName] = $scope.baseInfo[item.findName];
	    	});
    		if(f>0){
    			return;
    		}
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
	    		case 6:
	    			$scope.initTemplate_6(tab);
	    			return ;
	    		case 7:
	    			$scope.initTemplate_7(tab);
	    			return ;
	    		default:
	    	}
	    }
	    
	    $scope.initTemplate_2 = function(tab){
	    	var cfg = angular.copy(config);
	    	cfg.params = {};
	    	var f=0;
	    	angular.forEach(tab.param, function(item, index){
	    		if($scope.baseInfo[item.findName]==undefined){
	    			f++;
	    			commonService.showMsg("error","获取不到"+item.findName+"的值");
	    			return;
	    		}
	    		cfg.params[item.postName] = $scope.baseInfo[item.findName];
	    	});
    		if(f>0){
    			return;
    		}
		    httpService.get(tab['url'], null, cfg, function (response) {
		    	$scope.data = response;
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
				  "labelRadius": 30,
				  "labelText": "[[name]]",
				  "percentPrecision": 1,
				  "maxLabelWidth": 10,
				  "labelFunction": function(label){
				  	var str = label.title;
				  	while (str.indexOf("-") >= 0){
                       str = str.replace("-", " ");
                    }
				  	return str;
				  },
				  "color": '#fff'
				});
		    });
	    };
	    
	    $scope.initTemplate_3 = function(tab){
	    	var cfg = angular.copy(config);
	    	cfg.params = {};
	    	var f=0;
	    	angular.forEach(tab.param, function(item, index){
	    		if($scope.baseInfo[item.findName]==undefined){
	    			f++;
	    			commonService.showMsg("error","获取不到"+item.findName+"的值");
	    			return;
	    		}
	    		cfg.params[item.postName] = $scope.baseInfo[item.findName];
	    	});
    		if(f>0){
    			return;
    		}
		    httpService.get(tab['url'], null, cfg, function (response) {
		    	$scope.data = response;
		    });
	    };
	    
	    $scope.initTemplate_4 = function(tab){
	    	var cfg = angular.copy(config);
	    	cfg.params = {};
	    	var f=0;
	    	angular.forEach(tab.param, function(item, index){
	    		if($scope.baseInfo[item.findName]==undefined){
	    			f++;
	    			commonService.showMsg("error","获取不到"+item.findName+"的值");
	    			return;
	    		}
	    		cfg.params[item.postName] = $scope.baseInfo[item.findName];
	    	});
    		if(f>0){
    			return;
    		}
		    httpService.get(tab['url'], null, cfg, function (response) {
		    	$scope.capacity = response;
		    
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
	    	var f=0;
	    	angular.forEach(tab.param, function(item, index){
	    		if($scope.baseInfo[item.findName]==undefined){
	    			f++;
	    			commonService.showMsg("error","获取不到"+item.findName+"的值");
	    			return;
	    		}
	    		cfg.params[item.postName] = $scope.baseInfo[item.findName];
	    	});
    		if(f>0){
    			return;
    		}
		    httpService.get(tab['url'], null, cfg, function (response) {
		    	$scope.data = response;
						
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
	    
	    $scope.initTemplate_6 = function(tab){
	    	var cfg = angular.copy(config);
	    	cfg.params = {};
	    	var f=0;
	    	angular.forEach(tab.param, function(item, index){
	    		if($scope.baseInfo[item.findName]==undefined){
	    			f++;
	    			commonService.showMsg("error","获取不到"+item.findName+"的值");
	    			return;
	    		}
	    		cfg.params[item.postName] = $scope.baseInfo[item.findName];
	    	});
    		if(f>0){
    			return;
    		}
		    httpService.get(tab['url'], null, cfg, function (response) {
				$scope.infos = response;
		    });
	    };
	    
	    $scope.initTemplate_7 = function(tab){
	    	if(!$scope.event_table){
	    		$scope.event_table = [];
	    	}
	    	
	    	var cfg = angular.copy(config);
	    	cfg.params = {};
	    	var f=0;
	    	angular.forEach(tab.param, function(item, index){
	    		if($scope.baseInfo[item.findName]==undefined){
	    			f++;
	    			commonService.showMsg("error","获取不到"+item.findName+"的值");
	    			return;
	    		}
	    		cfg.params[item.postName] = $scope.baseInfo[item.findName];
	    	});
    		if(f>0){
    			return;
    		}
		    httpService.get(tab['url'], null, cfg, function (response) {
		    	$scope.data = response;
		    	$scope.event_table.push($scope.data);
		    });
	    };
	    
	    $scope.click7Event = function(index, data){
	    	if($scope.event_table.length-1>index){
	    		$scope.event_table.splice(index+1, $scope.event_table.length-1-index);
	    	}
	    	var cfg = angular.copy(config);
	    	cfg.params = {};
	    	var f=0;
	    	angular.forEach($scope.event_table[index].tableEvent.param, function(item, index){
	    		if($scope.baseInfo[item.findName]==undefined){
	    			f++;
	    			commonService.showMsg("error","获取不到"+item.findName+"的值");
	    			return;
	    		}
	    		cfg.params[item.postName] = $scope.baseInfo[item.findName];
	    	});
    		if(f>0){
    			return;
    		}
		    httpService.get($scope.event_table[index].tableEvent['url'], null, cfg, function (response) {
		    	$scope.data = response;
		    	$scope.event_table.push($scope.data);
		    });
	    }
    }
})();