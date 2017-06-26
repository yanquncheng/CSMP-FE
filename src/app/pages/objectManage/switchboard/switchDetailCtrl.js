

(function () {
  'use strict';
  
  angular.module('BlurAdmin.pages.objectManage.switchboard')
      .controller('switchDetialCtrl', switchDetialCtrlFunc);

  /** @ngInject */
  function switchDetialCtrlFunc($scope, $timeout , $filter, $http, $localStorage,toastr, $state, commonService, $stateParams, httpService) {
	console.log($stateParams);
	
	var config = { headers: {
       "Authorization": $localStorage.authKey
    }}
	  
  	 $scope.tabs = [] ;
 	 $scope.baseInfo = {};
	 $scope.baseInfo = $stateParams.param.switchBoard;
	 
	 $scope.datacenter= $stateParams.param.datacenter;
 	 $scope.tabs = $stateParams.param.tabs;
 	 var selectTab = $stateParams.param.selectTab;
 	 
  	if(!$scope.baseInfo){
 		$scope.back();
 	 }else{
 		$scope.baseInfo.title = "交换机名称" ;
		$scope.baseInfo.num = $scope.baseInfo.device ;
 	 }
  	
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
			  "maxLabelWidth": 100,
			  "labelFunction": function(label){
			  	var str = label.title;
			  	while (str.indexOf("-") >= 0 || str.indexOf("_") >= 0){
                   str = str.replace("-", " ");
                   str = str.replace("_", " ");
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
    			if(data[item.findName]==undefined){
	    			f++;
	    			commonService.showMsg("error","获取不到"+item.findName+"的值");
	    			return;
    			}else{
    				cfg.params[item.postName] = data[item.findName];
    			}
    		}else{
    			cfg.params[item.postName] = $scope.baseInfo[item.findName];
    		}
    	});
		if(f>0){
			return;
		}
	    httpService.get($scope.event_table[index].tableEvent['url'], null, cfg, function (response) {
	    	$scope.data = response;
	    	$scope.event_table.push($scope.data);
	    });
    };
    
    $scope.initTemplate_8 = function(tab){

		$scope.detail_8 = null;
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
		    $scope.startDate = moment(response.startDate);
		    $scope.endDate = moment(response.endDate);

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
			  "maxLabelWidth": 100,
			  "labelFunction": function(label){
			  	var str = label.title;
			  	while (str.indexOf("-") >= 0 || str.indexOf("_") >= 0){
                   str = str.replace("-", " ");
                   str = str.replace("_", " ");
                }
			  	return str;
			  },
			  "color": '#fff'
			});
	    });
    };
    
    $scope.click8Event = function(event, data, startDate, endDate, type, conf){
    	if(!data.selected){
	    	if($scope.selectData){
	    		$scope.selectData.selected = false;
	    	}
	    	data.selected = true;
	    	$scope.selectData = data;
    	}
    	var cfg = angular.copy(config);
    	if(conf){
    		cfg = conf;
    	}
    	if(!cfg.params){
	    	cfg.params = {};
    	}
    	var f=0;
    	angular.forEach(event.param, function(item, index){
    		if($scope.baseInfo[item.findName]==undefined){
    			if(data[item.findName]==undefined){
	    			f++;
	    			commonService.showMsg("error","获取不到"+item.findName+"的值");
	    			return;
    			}else{
    				cfg.params[item.postName] = data[item.findName];
    			}
    		}else{
    			cfg.params[item.postName] = $scope.baseInfo[item.findName];
    		}
    	});
    	
    	cfg.params.startDate = moment(startDate).format();
    	cfg.params.endDate = moment(endDate).format();
    	
		if(f>0){
			return;
		}
    	// 空，重新开始
		$scope.chartList = [];
	    httpService.get(event['url'], null, cfg, function (response) {
			if(!type || type!='update'){
				$scope.detail_8 = response;
			}
	    	$scope.changeChartIn8($scope.detail_8.charts);
	    });
    };
    
    $scope.click8MultyDetail = function(disk){
    	disk.selected = !disk.selected;
    	var flag = false;
    	if(disk.selected){
    		angular.forEach($scope.multyDetailT8, function(item, index){
    			if(item==disk){
    				flag = true;
    				return false;
    			}
    		});
    		if(!flag){
    			$scope.multyDetailT8.push(disk);
    		}
    	}else{
    		angular.forEach($scope.multyDetailT8, function(item, index){
    			if(item==disk){
    				$scope.multyDetailT8.splice(index, 1);
    				return false;
    			}
    		});
    	}
    }
    
    $scope.changeChartIn8 = function(chartsData){
    	angular.forEach(chartsData, function(item, index){
    		var graphs = [];
    		angular.forEach(item.chartData[0], function(value, name){
    			if(name != item.category){
    				graphs.push({
					    "balloonText": "<span style='font-size:12px;'>[[title]] in [[category]]:<br><span style='font-size:20px;'>[[value]]</span> [[additional]]</span>",
					    "bullet": "round",
					    "lineThickness": 3,
					    "bulletSize": 7,
					    "bulletBorderAlpha": 1,
					    "bulletColor": "#FFFFFF",
					    "useLineColorForBulletBorder": true,
					    "bulletBorderThickness": 3,
					    "fillAlphas": 0,
					    "lineAlpha": 1,
					    "title": name,
					    "valueField": name,
					    "dashLengthField": "dashLengthLine"
					  });
    			}
    		});
    		
				$timeout(function() {
	    		var t = AmCharts.makeChart( "chart-"+index, {
					  "type": "serial",
					  "addClassNames": true,
					  "theme": "light",
					  "autoMargins": false,
					  "marginLeft": 30,
					  "marginRight": 8,
					  "marginTop": 10,
					  "marginBottom": 26,
					  "balloon": {
					    "adjustBorderColor": false,
					    "horizontalPadding": 10,
					    "verticalPadding": 8,
					    "color": "#ffffff"
					  },
					
					  "dataProvider": item.chartData,
					  "valueAxes": [ {
					    "axisAlpha": 0,
					    "position": "left",
					    "color": "#ffffff"
					  } ],
					  "startDuration": 1,
					  "graphs": graphs,
					  "categoryField": item.category,
					  "categoryAxis": {
					    "gridPosition": "start",
					    "axisAlpha": 0,
					    "tickLength": 0,
					    "color": "#ffffff"
					  },
					  "export": {
					    "enabled": true
					  },
					  "legend": {
					    "useGraphSettings": true,
					    "color": "#fff"
					  },
					  
				    "chartScrollbar": {
				        "oppositeAxis":false,
				        "offset":30,
				        "scrollbarHeight": 10,
				        "backgroundAlpha": 0,
				        "selectedBackgroundAlpha": 0.1,
				        "selectedBackgroundColor": "#888888",
				        "graphFillAlpha": 0,
				        "graphLineAlpha": 0.5,
				        "selectedGraphFillAlpha": 0,
				        "selectedGraphLineAlpha": 1,
				        "autoGridCount":true,
				        "color":"#AAAAAA"
				    }
				});
				t.addListener("zoomed", function(event){
					console.log("zoomed");
					
					angular.forEach($scope.chartList, function(item, index){
						if(event.chart.div.id != item.div.id){
							item.zoomToCategoryValues(event.startValue, event.endValue);
						}
					})
				})
				$scope.chartList.push(t);
				}, 200);
		});
    }
    
    $scope.search8 = function(url){
    	var cfg = angular.copy(config);
    	if(!cfg.params){
	    	cfg.params = {};
    	}
    	if($scope.multyDetailT8 && $scope.multyDetailT8.length>0){
	    	angular.forEach($scope.detail_8.tableEvent.param, function(item, index){
	    		angular.forEach($scope.multyDetailT8, function(data, i){
		    		if(data[item.findName]==undefined){
		    			commonService.showMsg("error","获取不到"+item.findName+"的值");
		    		}else{
		    			if(!cfg.params[item.postName]){
		    				cfg.params[item.postName] = [];
		    			}
		    			cfg.params[item.postName].push(data[item.findName]);
		    		}
	    		});
	    	});
    	}
    	$scope.data.tableEvent["url"]=url;
    	$scope.click8Event($scope.data.tableEvent, $scope.selectData, $("#startDate").val(), $("#endDate").val(), "update", cfg);
    };
    
    $scope.initTemplate_9 = function(tab, startDate, endDate){
    	// 空，重新开始
		$scope.chartList = [];
		
    	var cfg = angular.copy(config);
    	cfg.params = {};
    	if(startDate){
    		cfg.params.startDate = moment(startDate).format();
    	}
    	if(endDate){
    		cfg.params.endDate = moment(endDate).format();
    	}
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
    		$scope.startDate = moment(response.startDate);
    		$scope.endDate = moment(response.endDate);
	    	
	    	$scope.data = response;
	    	
	    	angular.forEach($scope.data.charts, function(item, index){
	    		var graphs = [];
	    		angular.forEach(item.chartData[0], function(value, name){
	    			if(name != item.category){
	    				graphs.push({
						    "balloonText": "<span style='font-size:12px;'>[[title]] in [[category]]:<br><span style='font-size:20px;'>[[value]]</span> [[additional]]</span>",
						    "bullet": "round",
						    "lineThickness": 3,
						    "bulletSize": 7,
						    "bulletBorderAlpha": 1,
						    "bulletColor": "#FFFFFF",
						    "useLineColorForBulletBorder": true,
						    "bulletBorderThickness": 3,
						    "fillAlphas": 0,
						    "lineAlpha": 1,
						    "title": name,
						    "valueField": name,
						    "dashLengthField": "dashLengthLine"
						  });
	    			}
	    		});
	    		
   				$timeout(function() {
		    		var t = AmCharts.makeChart( "chart-"+index, {
						  "type": "serial",
						  "addClassNames": true,
						  "theme": "light",
						  "autoMargins": false,
						  "marginLeft": 30,
						  "marginRight": 8,
						  "marginTop": 10,
						  "marginBottom": 26,
						  "balloon": {
						    "adjustBorderColor": false,
						    "horizontalPadding": 10,
						    "verticalPadding": 8,
						    "color": "#ffffff"
						  },
						
						  "dataProvider": item.chartData,
						  "valueAxes": [ {
						    "axisAlpha": 0,
						    "position": "left",
						    "color": "#ffffff"
						  } ],
						  "startDuration": 1,
						  "graphs": graphs,
						  "categoryField": item.category,
						  "categoryAxis": {
						    "gridPosition": "start",
						    "axisAlpha": 0,
						    "tickLength": 0,
						    "color": "#ffffff"
						  },
						  "export": {
						    "enabled": true
						  },
						  "legend": {
						    "useGraphSettings": true,
						    "color": "#fff"
						  },
						  
					    "chartScrollbar": {
					        "oppositeAxis":false,
					        "offset":30,
					        "scrollbarHeight": 10,
					        "backgroundAlpha": 0,
					        "selectedBackgroundAlpha": 0.1,
					        "selectedBackgroundColor": "#888888",
					        "graphFillAlpha": 0,
					        "graphLineAlpha": 0.5,
					        "selectedGraphFillAlpha": 0,
					        "selectedGraphLineAlpha": 1,
					        "autoGridCount":true,
					        "color":"#AAAAAA"
					    }
					});
					t.addListener("zoomed", function(event){
						console.log("zoomed");
						
						angular.forEach($scope.chartList, function(item, index){
							if(event.chart.div.id != item.div.id){
								item.zoomToCategoryValues(event.startValue, event.endValue);
							}
						})
					})
					$scope.chartList.push(t);
   				}, 200);
	    	});
	    });
    };
    
    $scope.search9 = function(){
    	$scope.initTemplate_9($scope.tab, $("#startDate").val(), $("#endDate").val());
    };
    
  	
  //tabs页切换
	 $scope.swithTabs = function (tab){
		 if(!tab){
			tab = $scope.tabs[0];
		 }
    	$scope.activetab = tab.id;
    	$scope.tab = tab;
    	$scope.data = null;
    	$scope.chartList = [];
    	$scope.selectData = null;
    	$scope.multyDetailT8 = [];
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
    		case 8:
    			$scope.initTemplate_8(tab);
    			return ;
    		case 9:
    			$scope.initTemplate_9(tab, $scope.startDate, $scope.endDate);
    			return ;
    		default:
    	}
	 };
  	
	 
 	 $scope.back = function (){
 		$scope.baseInfo.selectTab = selectTab
 		$state.go('dashboard.objectManage.switchboard',{param: $scope.baseInfo,datacenter:$scope.datacenter });
 	 };
     
	 /***************************************/
      $scope.swithTabs();
      
    //打开后返回顶部
      $timeout(function() {
          $(window).scrollTop(0,0);
      }, 200);
		
  }

})();