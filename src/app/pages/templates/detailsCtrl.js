/**
 * 对象管理
 */
(function () {
  'use strict';
  angular.module('BlurAdmin.pages.templatedetails')
     .controller('detailsCtrl', detailsCtrlFunc);
    
    function detailsCtrlFunc($scope, fixedNumber, httpService, $localStorage, $filter, $stateParams, $timeout, commonService,$state) {
    	 
    	 console.log($stateParams);
    	 
    	 $scope.baseInfo = {};
    	 $scope.baseInfo = $stateParams.param.storage;
    	 
	 	var config = { headers: {
	        "Authorization": $localStorage.authKey
	    }};
	    
    	$scope.tabs = $stateParams.param.tabs;
    	$scope.activetab = $scope.tabs[0].id;
    	$scope.tab = $scope.tabs[0];

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
	    

	    $scope.swithTabs = function(tab){
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
	    		case 10:
	    			$scope.initTemplate_10(tab, $scope.startDate, $scope.endDate);
	    			return ;
	    		case 11:
	    			$scope.initTemplate_11(tab);
	    			return ;
	    		case 12:
	    			$scope.initTemplate_12(tab);
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
	    
	    $scope.rowClick = function(row,thead){
	    	var cfg = angular.copy(config);
	    	cfg.params = {};
	    	
	    	var  url = thead.style.url ;
	    	var prm = {};
	 	 	prm[thead.style.param[0].postName] = row[thead.style.param[0].findName] ;
	    	
	    	//url = "/menu/ObjectManage/demos";
	    	
	   	    httpService.get(url, prm , cfg, function (response) {
	   	    	if(typeof response == 'string'){
	   	          commonService.showMsg("error", response);
	   	    	}else{
	   		    	var tabs = response;
	   		    	var id = 1;
	   		    	angular.forEach(tabs, function(item, index){
	   	    			item.id = id++;
	   		    		if(!item.hasDetail){
	   		    			item.page = "app/pages/objectManage/tabs/template_"+item.template+".html";
	   		    		}else{
	   		    			angular.forEach(item.tabDetail, function(det, idx){
	   		    				det.id = id++;
	   		    				det.page = "app/pages/objectManage/tabs/template_"+det.template+".html";
	   		    			});
	   		    		}
	   		    	});
	   	 		   
	   		     var param = {"storage": row };
	   		     param.tabs = tabs ;
	   		     param.backUrl = "dashboard.demos" ;
	   		     $state.go('dashboard.objectManage.details', {param: param});
	   	    	}
	   	    });
	   	    
	    }
	    
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
	    		$scope.device = $scope.baseInfo[item.findName];
	    	});
    		if(f>0){
    			return;
    		}
		    httpService.get(tab['url'], null, cfg, function (response) {
		    	$scope.capacity = response;
		    	$scope.startDate = response.startDate;
				$scope.endDate = response.endDate;
	    		$("#startDate").val(moment(response.startDate).format('YYYY-MM-DD'));
	    		$("#endDate").val(moment(response.endDate).format('YYYY-MM-DD')); 

				var div1=document.getElementById("left");    
				if( $scope.capacity.left === undefined) 
						div1.style.display='none'; 
		    
		    	if ( $scope.capacity.left !== undefined )
				var chart = AmCharts.makeChart("left", {
				    "type": "serial",
					"theme": "dark",
					/*
					    "legend": {
					        "horizontalGap": 10,
					        "maxColumns": 1,
					        "position": "right",
							"useGraphSettings": true,
							"markerSize": 10
					    },
					*/
				    "dataProvider": $scope.capacity.left.chartData ,
				    "valueAxes": [{
				        "stackType": "regular",
				        "axisAlpha": 0.5,
				        "gridAlpha": 0,
				        "axisColor": "#FFFFFF",
				        "titleColor": "#FFE7BA",
				        "titleFontSize": 20, 
				        "title": $scope.capacity.left.title,
				        "totalText": "[[total]]"
				    }],
				    "graphs": [{
				        "balloonText": "<span style='font-size:14px'>[[name]]: <b>[[value]]</b></span>",
				        "fillAlphas": 0.8,
				        "labelText": "[[value]]",
				        "lineAlpha": 0.3, 
				        "type": "column",
						"color": "#FFFFFF",
				        "valueField": "value"
				    }, {
				        "balloonText": "<span style='font-size:14px'>[[name2]]: <b>[[value2]]</b></span>",
				        "fillAlphas": 0.8,
				        "labelText": "[[value]]",
				        "lineAlpha": 0.3, 
				        "type": "column",
						"color": "#FFFFFF",
				        "valueField": "value2"
				    }, {
				        "balloonText": "<span style='font-size:14px'>[[name3]]: <b>[[value3]]</b></span>",
				        "fillAlphas": 0.8,
				        "labelText": "[[value]]",
				        "lineAlpha": 0.3, 
				        "type": "column",
						"color": "#FFFFFF",
				        "valueField": "value3"
				    }, {
				        "balloonText": "<span style='font-size:14px'>[[name4]]: <b>[[value4]]</b></span>",
				        "fillAlphas": 0.8,
				        "labelText": "[[value]]",
				        "lineAlpha": 0.3, 
				        "type": "column",
						"color": "#FFFFFF",
				        "valueField": "value4"
				    }, {
				        "balloonText": "<span style='font-size:14px'>[[name5]]: <b>[[value5]]</b></span>",
				        "fillAlphas": 0.8,
				        "labelText": "[[value]]",
				        "lineAlpha": 0.3,
				        "type": "column",
						"color": "#FFFFFF",
				        "valueField": "value5"
				    }, {
				        "balloonText": "<span style='font-size:14px'>[[name6]]: <b>[[value6]]</b></span>",
				        "fillAlphas": 0.8,
				        "labelText": "[[value]]",
				        "lineAlpha": 0.3,
				        "type": "column",
						"color": "#FFFFFF",
				        "valueField": "value6"
				    }],
				    "rotate": true,
				    "categoryField": "name",
				    "categoryAxis": {
				        "gridPosition": "start",
				        "axisAlpha": 0,
				        "gridAlpha": 0,
				        "color": "#FFF68F",
				        "position": "left"
				    },
				    "export": {
				    	"enabled": true
				     }
				});
		    	
				var div1=document.getElementById("right");    
				if ( $scope.capacity.right === undefined ) 
						div1.style.display='none'; 
		    				
		    	if ( $scope.capacity.right !== undefined )
				var chart = AmCharts.makeChart("right", {
				    "type": "serial",
					"theme": "dark",
					/*
					    "legend": {
					        "horizontalGap": 10,
					        "maxColumns": 1,
					        "position": "right",
							"useGraphSettings": true,
							"markerSize": 10
					    },
					*/
				    "dataProvider": $scope.capacity.right.chartData ,
				    "valueAxes": [{
				        "stackType": "regular",
				        "axisAlpha": 0.5,
				        "gridAlpha": 0,
				        "axisColor": "#FFFFFF",
				        "titleColor": "#FFE7BA",
				        "titleFontSize": 20, 
				        "title": $scope.capacity.right.title,
				        "totalText": "[[total]]"
				    }],
				    "graphs": [{
				        "balloonText": "<span style='font-size:14px'>[[name]]: <b>[[value]]</b></span>",
				        "fillAlphas": 0.8,
				        "labelText": "[[value]]",
				        "lineAlpha": 0.3, 
				        "type": "column",
						"color": "#FFFFFF",
				        "valueField": "value"
				    }, {
				        "balloonText": "<span style='font-size:14px'>[[name2]]: <b>[[value2]]</b></span>",
				        "fillAlphas": 0.8,
				        "labelText": "[[value]]",
				        "lineAlpha": 0.3, 
				        "type": "column",
						"color": "#FFFFFF",
				        "valueField": "value2"
				    }, {
				        "balloonText": "<span style='font-size:14px'>[[name3]]: <b>[[value3]]</b></span>",
				        "fillAlphas": 0.8,
				        "labelText": "[[value]]",
				        "lineAlpha": 0.3, 
				        "type": "column",
						"color": "#FFFFFF",
				        "valueField": "value3"
				    }, {
				        "balloonText": "<span style='font-size:14px'>[[name4]]: <b>[[value4]]</b></span>",
				        "fillAlphas": 0.8,
				        "labelText": "[[value]]",
				        "lineAlpha": 0.3, 
				        "type": "column",
						"color": "#FFFFFF",
				        "valueField": "value4"
				    }, {
				        "balloonText": "<span style='font-size:14px'>[[name5]]: <b>[[value5]]</b></span>",
				        "fillAlphas": 0.8,
				        "labelText": "[[value]]",
				        "lineAlpha": 0.3,
				        "type": "column",
						"color": "#FFFFFF",
				        "valueField": "value5"
				    }, {
				        "balloonText": "<span style='font-size:14px'>[[name6]]: <b>[[value6]]</b></span>",
				        "fillAlphas": 0.8,
				        "labelText": "[[value]]",
				        "lineAlpha": 0.3,
				        "type": "column",
						"color": "#FFFFFF",
				        "valueField": "value6"
				    }],
				    "rotate": true,
				    "categoryField": "name",
				    "categoryAxis": {
				        "gridPosition": "start",
				        "axisAlpha": 0,
				        "gridAlpha": 0,
				        "color": "#FFF68F",
				        "position": "left"
				    },
				    "export": {
				    	"enabled": true
				     }
				});

				var div1=document.getElementById("stackedbar");    
				if( $scope.capacity.stackedbar === undefined) 
						div1.style.display='none'; 
		    	if ( $scope.capacity.stackedbar !== undefined )
	            var  chart = AmCharts.makeChart("stackedbar", {
					  "type": "serial",
					  "theme": "chalk",
					  "rotate": true,
					  "marginBottom": 50,
					  "dataProvider": $scope.capacity.stackedbar.chartData ,
					  "startDuration": 1,
					  "graphs": [{
					    "fillAlphas": 0.8,
					    "lineAlpha": 0.2,
					    "type": "column",
					    "valueField": "leftvalue",
					    "title": "Male11",
					    "labelText": "[[value]]",
					    "clustered": false, 
					    "color": "#ffffff",
					    "labelFunction": function(item) {
					      return Math.abs(item.values.value);
					    },
					    "balloonFunction": function(item) {
					      return item.category + ": " + Math.abs(item.values.value) ;
					    }
					  }, {
					    "fillAlphas": 0.8,
					    "lineAlpha": 0.2,
					    "type": "column",
					    "valueField": "rightvalue",
					    "title": "Female22",
					    "labelText": "[[value]]",
					    "clustered": false,
					    "color": "#ffffff",
					    "labelFunction": function(item) {
					      return Math.abs(item.values.value);
					    },
					    "balloonFunction": function(item) {
					      return item.category + ": " + Math.abs(item.values.value) ;
					    }
					  }],
					  "categoryField": "catalog",
					  "categoryAxis": {
					    "gridPosition": "start",
					    "gridAlpha": 0.2,
					    "axisAlpha": 0,
					    "color": "#ffffff"
					  },
					  "valueAxes": [{
					    "gridAlpha": 0,
					    "color": "#ffffff",
					    "ignoreAxisWidth": true,
					    "labelFunction": function(value) {
					      return Math.abs(value) ;
					    },
					    "guides": [{
					      "value": 0,
					      "lineAlpha": 0.2
					    }]
					  }],
					  "balloon": {
					    "fixedPosition": true
					  },
					  "chartCursor": {
					    "valueBalloonsEnabled": false,
					    "cursorAlpha": 0.05,
					    "fullWidth": true
					  },
					  "allLabels": [{
					    "text": $scope.capacity.stackedbar.chartHeader.leftTitle,
					    "x": "28%",
					    "y": "97%",
					    "bold": true,
					    "align": "middle",
					    "color": "#ffffff"
					  }, {
					    "text": $scope.capacity.stackedbar.chartHeader.rightTitle,
					    "x": "75%",
					    "y": "97%",
					    "bold": true,
					    "align": "middle",
					    "color": "#ffffff"
					  }],
					 "export": {
					    "enabled": true
					  }

					});
				var div2=document.getElementById("DTSelect");    

				var div1=document.getElementById("stackedarea");    
				if( $scope.capacity.stackedarea === undefined)  {
					div1.style.display='none';  
					div2.style.display='none';
				} else {   
			    	$scope.startDate = $scope.capacity.startDate;
					$scope.endDate = $scope.capacity.endDate;					
 		    		angular.forEach($scope.capacity.stackedarea.chartData, function(cdata, dindex){
 		    			console.log(cdata.timestamp);
		    			cdata.timestamp = moment(parseInt(cdata.timestamp)*1000).format($scope.capacity.stackedarea.chartHeader.dataformat);
		    		});
					var chartStackedArea = AmCharts.makeChart("stackedarea", {
					    "type": "serial",
					    "theme": "dark",
						"plotAreaBorderColor": "#FF0000",
						"plotAreaFillAlphas": 0.21,
						"plotAreaFillColors": "#383535",    
						"color": "#E1DADA",
					    "marginRight":30,
					    "titles": [
							{
								"id": "Title-1",
								"size": 25,
								"text": $scope.capacity.stackedarea.chartHeader.Title
							}
						],
					    "legend": {
					        "equalWidths": false,
					        "color": "#FFFFFF", 
					        "position": "bottom",
					        "valueAlign": "left",
					        "valueWidth": 100,
					        "switchable": true
					    },
					    "dataProvider": $scope.capacity.stackedarea.chartData ,
					    "valueAxes": [{
					        "stackType": "regular",
					        "gridAlpha": 0.07,
					        "position": "left",
					        "title": $scope.capacity.stackedarea.chartHeader.YTitle
					    }],

					    "plotAreaBorderAlpha": 0,
					    "marginTop": 10,
					    "marginLeft": 0,
					    "marginBottom": 0,
					    "chartScrollbar": {},
					    "chartCursor": {
					        "cursorAlpha": 0
					    },
					    "categoryField": $scope.capacity.stackedarea.chartHeader.categoryField,
					    "export": {
					    	"enabled": true
					     }
					});
			 
					for ( var i in $scope.capacity.stackedarea.chartHeader.ValueField ) {
						var item = $scope.capacity.stackedarea.chartHeader.ValueField[i];

						var graph = new AmCharts.AmGraph();
						graph.valueField = item.field; 
						graph.balloonText = item.name + " <b>[[value]]</b>";
						graph.fillAlphas = 0.6,
			        	graph.lineAlpha = 0.4,
			        	graph.title = item.name; 
			 
						chartStackedArea.addGraph( graph );		
				  	
					}  




				}


		    	$scope.data = response.tableData; 
		    	if ( response.tableEvent !== undefined )
					$scope.data.tableEvent = response.tableEvent; 

		    });





	    };


	    $scope.click4Event = function(event, data, startDate, endDate, type, conf){
	    	// 空，重新开始
			$scope.chartList.splice(0, $scope.chartList.length); 
			if(!type || type!='update'){
				$scope.detail_4 = [];
			}
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
		    httpService.get(event['url'], null, cfg, function (response) {
				if(!type || type!='update'){
					$scope.detail_4 = response;
		    		$("#startDate").val(moment(response.startDate).format('YYYY-MM-DD'));
		    		$("#endDate").val(moment(response.endDate).format('YYYY-MM-DD')); 
				}else{
					$scope.detail_4.charts = response.charts; 
				}
		    	$scope.changeChartIn4(response.charts);
		    });
	    };

	    $scope.click4Event_DT = function(tab, device, startDate, endDate,  conf){
	    	var cfg = angular.copy(config);
	    	if(conf){
	    		cfg = conf;
	    	}
	    	if(!cfg.params){
		    	cfg.params = {};
	    	}	    	

	    	cfg.params.device = device;
	    	cfg.params.startDate = moment(startDate).format();
	    	cfg.params.endDate = moment(endDate).format(); 
    
		    httpService.get(tab['url'], null, cfg, function (response) {
		    	$scope.capacity = response;
		    	$scope.startDate = response.startDate;
				$scope.endDate = response.endDate; 
 		    	$scope.changeChartIn4_DT(response);
		    });
	    };

	    $scope.changeChartIn4_DT = function(chartsData){ 
	    	$scope.capacity = chartsData;
	    	
			    	$scope.startDate = $scope.capacity.startDate;
					$scope.endDate = $scope.capacity.endDate;					
 		    		angular.forEach($scope.capacity.stackedarea.chartData, function(cdata, dindex){
 		    			console.log(cdata.timestamp);
		    			cdata.timestamp = moment(parseInt(cdata.timestamp)*1000).format($scope.capacity.stackedarea.chartHeader.dataformat);
		    		});
					var chartStackedArea = AmCharts.makeChart("stackedarea", {
					    "type": "serial",
					    "theme": "dark",
						"plotAreaBorderColor": "#FF0000",
						"plotAreaFillAlphas": 0.21,
						"plotAreaFillColors": "#383535",    
						"color": "#E1DADA",
					    "marginRight":30,
					    "titles": [
							{
								"id": "Title-1",
								"size": 25,
								"text": $scope.capacity.stackedarea.chartHeader.Title
							}
						],
					    "legend": {
					        "equalWidths": false,
					        "color": "#FFFFFF", 
					        "position": "bottom",
					        "valueAlign": "left",
					        "valueWidth": 100,
					        "switchable": true
					    },
					    "dataProvider": $scope.capacity.stackedarea.chartData ,
					    "valueAxes": [{
					        "stackType": "regular",
					        "gridAlpha": 0.07,
					        "position": "left",
					        "title": $scope.capacity.stackedarea.chartHeader.YTitle
					    }],

					    "plotAreaBorderAlpha": 0,
					    "marginTop": 10,
					    "marginLeft": 0,
					    "marginBottom": 0,
					    "chartScrollbar": {},
					    "chartCursor": {
					        "cursorAlpha": 0
					    },
					    "categoryField": $scope.capacity.stackedarea.chartHeader.categoryField,
					    "export": {
					    	"enabled": true
					     }
					});
			 
					for ( var i in $scope.capacity.stackedarea.chartHeader.ValueField ) {
						var item = $scope.capacity.stackedarea.chartHeader.ValueField[i];

						var graph = new AmCharts.AmGraph();
						graph.valueField = item.field; 
						graph.balloonText = item.name + " <b>[[value]]</b>";
						graph.fillAlphas = 0.6,
			        	graph.lineAlpha = 0.4,
			        	graph.title = item.name; 
			 
						chartStackedArea.addGraph( graph );		
				  	
					}  



	    }
	    
	    $scope.changeChartIn4 = function(chartsData){ 
	    	angular.forEach(chartsData, function(item, index){ 
	    		angular.forEach(item.chartData, function(cdata, dindex){
	    			cdata.name = moment(parseInt(cdata.name)*1000).format("YYYY-MM-DD HH");
	    		});
	    		var graphs = []; 
	    		angular.forEach(item.chartData[0], function(value, name){
 
	    			if(name != "name"){
	    				graphs.push({
						    "balloonText": "<span style='font-size:12px;'>[[title]] in [[category]]:<br><span style='font-size:20px;'>[[value]]</span> </span>",
						    "bullet": "round",
						    "bulletSize": 1, 
						    "title": name,
						    "valueField": name
						  });
	    			}
	    		});
	    		
   				$timeout(function() { 
		    		var t = AmCharts.makeChart( "chart-"+index, {
						  "type": "serial",
						  "addClassNames": true,
						  "theme": "",
						  "autoMargins": true, 
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
						  "titles": [
						    {
						      "size": 15,
						      "text": item.category,
						      "color": "#ffffff"
						    }
						  ],
						  "startDuration": 0,
						  "graphs": graphs,
						  "categoryField": "name",
						  "categoryAxis": {
						    "gridPosition": "start",
						    "gridCount": 3,
						    "axisAlpha": 0,
						    "tickLength": 0,
						    "labelFunction": function(a, s, d){
						    	return moment(a).format('MMDD'); 
						    },
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
	    
	    $scope.search4 = function(url){
	    	$scope.click4Event($scope.data.tableEvent, $scope.selectData, $("#startDate").val(), $("#endDate").val(), "update", null);
	    };
	    $scope.search4_dt = function(device){
	    	$scope.click4Event_DT($scope.tab, device, $("#startDate").val(), $("#endDate").val(),  null);
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
				    "type": 'serial',
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
	    	}else{
	    		$scope.event_table.splice(0, $scope.event_table.length);
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
		    	$scope.tableData = response.tableData;
		    	$scope.tableEvent = response.tableEvent;
		    });
	    };
	    
	    $scope.click7Event = function( event, data){
 
	    	var cfg = angular.copy(config);

	    	if(!data.selected){
		    	if($scope.selectData){
		    		$scope.selectData.selected = false;
		    	}
		    	data.selected = true;
		    	$scope.selectData = data;
	    	}

	    	cfg.params = {};
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
	    	
    		if(f>0){
    			return;
    		}
		    httpService.get($scope.tableEvent['url'], null, cfg, function (response) { 
		    	$scope.detail_7 = response.tableData;
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
	    	// 空，重新开始
			$scope.chartList.splice(0, $scope.chartList.length); 
			if(!type || type!='update'){
				$scope.detail_8 = [];
			}
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
		    httpService.get(event['url'], null, cfg, function (response) {
				if(!type || type!='update'){
					$scope.detail_8 = response;
		    		$("#startDate").val(moment(response.startDate).format('YYYY-MM-DD'));
		    		$("#endDate").val(moment(response.endDate).format('YYYY-MM-DD'));
				}else{
					$scope.detail_8.charts = response.charts;
				}
		    	$scope.changeChartIn8(response.charts);
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
	    		angular.forEach(item.chartData, function(cdata, dindex){
	    			cdata.name = moment(parseInt(cdata.name)*1000).format("YYYY-MM-DD HH");
	    		});
	    		var graphs = [];
	    		angular.forEach(item.chartData[0], function(value, name){
	    			if(name != "name"){
	    				graphs.push({
						    "balloonText": "<span style='font-size:12px;'>[[title]] in [[category]]:<br><span style='font-size:20px;'>[[value]]</span> </span>",
						    "bullet": "round",
						    "bulletSize": 1, 
						    "title": name,
						    "valueField": name
						  });
	    			}
	    		});
	    		
   				$timeout(function() {
		    		var t = AmCharts.makeChart( "chart-"+index, {
						  "type": "serial",
						  "addClassNames": true,
						  "theme": "",
						  "autoMargins": true, 
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
						  "titles": [
						    {
						      "size": 15,
						      "text": item.category,
						      "color": "#ffffff"
						    }
						  ],
						  "startDuration": 0,
						  "graphs": graphs,
						  "categoryField": "name",
						  "categoryAxis": {
						    "gridPosition": "start",
						    "gridCount": 3,
						    "axisAlpha": 0,
						    "tickLength": 0,
						    "labelFunction": function(a, s, d){
						    	return moment(a).format('MMDD'); 
						    },
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
	    	var t = $scope.multyDetailT8;
	    	if(!$scope.multyDetailT8 || $scope.multyDetailT8.length<1){
	    		t = $scope.detail_8.tableBody;
	    	}
	    	angular.forEach($scope.detail_8.tableEvent.param, function(item, index){
	    		angular.forEach(t, function(data, i){
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
	    	var tempEvent = angular.copy($scope.data.tableEvent);
	    	tempEvent["url"]=url;
	    	$scope.click8Event(tempEvent, $scope.selectData, $("#startDate").val(), $("#endDate").val(), "update", cfg);
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
		    			if(name != "name"){
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
			    		$("#startDate").val(moment(response.startDate).format('YYYY-MM-DD'));
			    		$("#endDate").val(moment(response.endDate).format('YYYY-MM-DD'));
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
							  "startDuration": 0,
							  "graphs": graphs,
							  "categoryField": "name",
							  "categoryAxis": {
							    "gridPosition": "start",
							    "axisAlpha": 0,
							    "tickLength": 0,
							    "labelFunction": function(a, s, d){
							    	return moment(a).format('MMDD'); 
							    },
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
	    
	    $scope.initTemplate_10 = function(tab){
			$scope.detail_10 = null;
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
		    	if($scope.data.chartData){
		    		$timeout(function() {
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
	   				}, 200);
				}
		    });
	    };
	    
	    $scope.click10Event = function(event, data, startDate, endDate, type, conf){
	    	// 空，重新开始
			$scope.chartList.splice(0, $scope.chartList.length); 
			if(!type || type!='update'){
				$scope.detail_10 = [];
			}
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
		    httpService.get(event['url'], null, cfg, function (response) {
				if(!type || type!='update'){
					$scope.detail_10 = response;
		    		$("#startDate").val(moment(response.startDate).format('YYYY-MM-DD'));
		    		$("#endDate").val(moment(response.endDate).format('YYYY-MM-DD'));
				}else{
					$scope.detail_10.charts = response.charts;
				}
		    	$scope.changeChartIn10(response.charts);
		    });
	    };


	    $scope.changeChartIn10 = function(chartsData){
	    	angular.forEach(chartsData, function(item, index){ 
	    		angular.forEach(item.chartData, function(cdata, dindex){
	    			cdata.name = moment(parseInt(cdata.name)*1000).format("YYYY-MM-DD HH");
	    		});
	    		var graphs = [];
	    		angular.forEach(item.chartData[0], function(value, name){
	    			if(name != "name"){
	    				graphs.push({
						    "balloonText": "<span style='font-size:12px;'>[[title]] in [[category]]:<br><span style='font-size:20px;'>[[value]]</span> </span>",
						    "bullet": "round",
						    "bulletSize": 1,  
						    "title": name,
						    "valueField": name
						  });
	    			}
	    		});
	    		
   				$timeout(function() {
		    		var t = AmCharts.makeChart( "chart-"+index, {
						  "type": "serial",
						  "addClassNames": true,
						  "theme": "",
						  "autoMargins": true, 
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
						  "titles": [
						    {
						      "size": 15,
						      "text": item.category,
						      "color": "#ffffff"
						    }
						  ],
						  "startDuration": 0,
						  "graphs": graphs,
						  "categoryField": "name",
						  "categoryAxis": {
						    "gridPosition": "start",
						    "gridCount": 3,
						    "axisAlpha": 0,
						    "tickLength": 0,
						    "labelFunction": function(a, s, d){
						    	return moment(a).format('MMDD'); 
						    },
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
	    
	    $scope.search10 = function(url){
	    	$scope.click10Event($scope.data.tableEvent, $scope.selectData, $("#startDate").val(), $("#endDate").val(), "update", null);
	    };
	    
	    //导出cvs
	    $scope.exports = function(tabName ,tableBody ,tableHead){
	    	  var title = [];
	    	  var titleForKey = [] ;
	    	  
	    	  for (var i = 0; i<tableHead.length ; i++ ){
	    		  title.push(tableHead[i].name);
	    		  titleForKey.push(tableHead[i].value);
	    	  }

	    	  var time = moment().format("YYYYMMDDHHmmss");
	    	  commonService.exportCsv({
	        	  fileName : tabName+"_"+time,
	              title : title,
	              titleForKey : titleForKey,
	              data : tableBody
	          });
	     }
	      
	    //返回
	    $scope.back = function (){
	    	var backUrl = "dashboard.objectManage.array";
	    	if($stateParams.param.backUrl){
	    		backUrl = $stateParams.param.backUrl ;
	    	}
	    	if($stateParams.param.selectTab){
	    		$scope.baseInfo.selectTab = $stateParams.param.selectTab ;
	    	}
	    	var datacenter = null ;
	    	if($stateParams.datacenter){
	    		datacenter = $stateParams.datacenter ;
	    	}
	    	 
	 		$state.go(backUrl,{param: $scope.baseInfo,datacenter: datacenter });
	 	 };
	 	 
	    $timeout(function() {
            $(window).scrollTop(0,0);
        }, 200);

	    $scope.initTemplate_11 = function(tab){
	    	console.log("Begi ---22" + JSON.stringify(tab));
	    	console.log($scope);
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

			var height = 200
			var width = 500
			var data = [
								   { "class" : "topLeft", 
								     "top" : 10 + "px",
								     "left" : 10 + "px",
			               "backgroundColor" : "yellow" },

								   { "class" : "topRight",
								     "top" : 10 + "px",
								     "left" : 10 + width + "px",
			               "backgroundColor" : "blue" },

								   { "class" : "bottomLeft",
								     "top" : 10 + height + "px",
								     "left" : 10 + "px",
			               "backgroundColor" : "red" },

								   { "class" : "bottomRight",
								     "top" : 10 + height + "px",
								     "left" : 10 + width + "px",
			               "backgroundColor" : "green" }
								 ]
								 console.log("AAAAAAAAAAAAAAAA");
								 console.log(element[0]);


		    httpService.get(tab['url'], null, cfg, function (response) {
			    $scope.startDate = moment(response.startDate);
			    $scope.endDate = moment(response.endDate);




		    	$scope.data = response;
		    	if($scope.data.chartData){
		    		$timeout(function() {
					    var chart = AmCharts.makeChart( "disk111", {
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
	   				}, 200);
				}
		    });
	    }; 
	
      function myAlgorithmFill(isHorizontal,parent, children) {
        children.sort(function (a, b) {
          if( (a.name === null || a.name === undefined) && a.id !==null && a.id !== undefined ){
            if (a.id > b.id) {
              return 1;
            }
            if (a.id < b.id) {
              return -1;
            }
            return 0;
          }
          var a_rank = parseInt(a.name.substring(0,a.name.indexOf('_')));
          var b_rank = parseInt(b.name.substring(0,b.name.indexOf('_')));
          if (a_rank > b_rank) {
            return 1;
          }
          if (a_rank < b_rank) {
            return -1;
          }
          return 0;
        });
        var sumVal=0,
            childrenArea = [],
            pTot,
            pInterval=0,
            x = parent.x,
            y = parent.y,
            direction = isHorizontal?0:1,
            width = parent.width,
            height = parent.height,
            pX,
            pY,
            pW,
            pH;
        /*
         1. 需要能 横向或者纵向 按照所有children的节点比例均分当前parent的空间
         2. 能够在parent节点以外（上面或者下面）进行绘画，而不是在划分内部空间
         3. 按照数据声明的顺序开始绘图（验证是否对data进行了自动排序）
         */
        Highcharts.each (children,function(child){
          sumVal+=child.val;
        }); 
        if(sumVal<1){ 
        }
        Highcharts.each(children, function (child) {
          if(child.val>=1){
            pTot = (parent.width * parent.height) * (child.val / sumVal);//计算当前节点总体积
          }else{
            pTot = (parent.width * parent.height) * (child.val);//计算当前节点总体积
          }
          pX = x;
          pY = y;
          if (direction === 0) {//横向分割，即分割的是X轴
            pH = height;
            pW = pTot / pH;
            width = width - pW;
            x = x + pW;//设置下一个child的开始X座标
            if(child.val<1){
              width = width - pInterval*parent.width;
              x = x + pInterval*parent.width;
            }
          } else {//纵向分割，即分割的是y轴
            pW = width;
            pH = pTot / pW;
            height = height - pH;
            y = y + pH;//设置下一个child的开始Y座标
          }
          childrenArea.push({
            x: pX,
            y: pY,
            width: pW,
            height: pH
          });
        });
        return childrenArea;
      }
      function myEqualShare_H(parent, children) {
        return myAlgorithmFill(true, parent, children);
      }
      function myEqualShare_V(parent, children) {
        return myAlgorithmFill(false, parent, children);
      }
      $scope.initTemplate_12 = function(tab){
	      $scope.treemapLoaded = false;
	      var params = {serialNumber: $scope.baseInfo.device};
	      var begin = moment().add('weeks', -1);
	      var end = moment();
	      $scope.condition = {begin: begin, end: end};
	      
	      $timeout(function() { 
	      	$("#startDate").val(begin.format('YYYY-MM-DD'));
		  }, 200);
		  
	      $timeout(function() { 
	      	$("#endDate").val(end.format('YYYY-MM-DD'));
		  }, 200);
	      
	      $scope.initData12 = {};
	      
	      $scope.initTemplate_12_q();
		}

      $scope.initTemplate_12_q = function(){
	      var params = {device: $scope.baseInfo.device};
        if ($scope.condition.begin === '') delete $scope.condition.begin;
        if ($scope.condition.end === '') delete $scope.condition.end;

        async.parallel({
            directorList: function(callback) {
                if(_.isEmpty($scope.initData12)){ 
	    			var cfg = angular.copy(config); 
		    		httpService.get('/vmax/performance/director', params, cfg, function (response) {
                        callback(null,response);
                    });
                }else {
                    callback(null,null);
                }
            },
            diskList: function(callback) {
                if(_.isEmpty($scope.initData12)) { 
					
	    			var cfg = angular.copy(config);
		    		httpService.get('/vmax/performance/disk', params, cfg, function (response) {
                        callback(null, response);
                    });
                }else {
                    callback(null,null);
                }
            },
            allPerfDetail: function(callback){ 
    			var cfg = angular.copy(config);
    			var cdt = angular.copy($scope.condition);
    			cdt.device = params.device;
    			cdt.start = cdt.begin;
    			console.log("AAA:"+cdt);
	    		httpService.get('/vmax/performance/perfDetail/history', cdt, cfg, function (response) {
                    callback(null, response);
                });
            }
        },
        function(err, results) {
            if(!_.isEmpty(results.directorList)){
                _.set($scope.initData12,'directorList',results.directorList);
            }
            if(!_.isEmpty(results.diskList)){
                _.set($scope.initData12,'diskList',results.diskList);
            }
            transformPerformanceData(results.allPerfDetail);
        });

      }
      function transformPerformanceData(allPerfDetail){
          $scope.allPerfDetail = {};
          _.each(allPerfDetail,function(perfDetail){
              _.set($scope.allPerfDetail,perfDetail.component,perfDetail);
          });
          function formatBusy(id,key){
              if(key === undefined){
                  key = 'busy';
              }
              var busy = _.get($scope.allPerfDetail,[id,key]);
              if(busy===undefined || busy<0){
                  return -1;
              }else if(busy>100){
                  return 100;
              }else {
                  return _.chain(busy).ceil(1).value();
              }
          }
          var dataObj = {};
          var directorPath = {};
          _.each($scope.initData12.directorList,function(e,i){
              var parent;
              if(e.cache === 'FA-CACHE'){
                  parent = "Cache_E";
              }else if(e.cache === 'RA-CACHE'){
                  parent = "Cache_E";
              }else if(e.cache === 'DA-CACHE'){
                  parent = "Cache_I";
              }
              var keyArr = [e.cache];
              if(_.get(dataObj,keyArr)==undefined){
                  _.set(dataObj,e.cache,{
                      name:e.cache,
                      parent:parent,
                      value:-1,
                      slots:{}
                  });
              }
              keyArr = _.concat(keyArr,['slots',e.slot]);
              if(_.get(dataObj,keyArr)==undefined){
                  _.set(dataObj,keyArr,{
                      name:e.slot,
                      value:-1,
                      directors:{}
                  });
              }
              keyArr = _.concat(keyArr,['directors',e.id]);
              if(_.get(dataObj,keyArr)==undefined){
                  var directorObj = {
                      name:e.id,
                      value:formatBusy(e.id),
                      directorType:e.directorType,
                      ports:{}
                  };
                  if(parent === "Cache_I"){
                      _.set(directorPath,e.id,keyArr);
                      directorObj = _.extend(directorObj,{disks:{}});
                  }
                  _.set(dataObj,keyArr,directorObj);

                  var _curCache = _.get(dataObj,[e.cache]);
                  _.set(dataObj,e.cache,_.extend(_curCache,{
                      value:formatBusy(e.id,'cacheBusy')
                  }));
              }
              if(e.directorType === 'RF' && e.port === ''){
                  e.port = '0';
              }
              if(e.directorType !== 'DF'){
                  keyArr = _.concat(keyArr,['ports',e.port]);
                  if(_.get(dataObj,keyArr)===undefined){
                      _.set(dataObj,keyArr,{
                          name:e.port,
                          value:formatBusy(e.id+'-'+e.port)
                      });
                  }
              }else{
                  _.times(2,function(v){
                      var _keyArr = _.concat(keyArr,['ports',v]);
                      if(_.get(dataObj,_keyArr)===undefined){
                          _.set(dataObj,_keyArr,{
                              name:v,
                              value:formatBusy(e.id+'-'+v)
                          });
                      }
                  });
              }

          });
          _.each($scope.initData12.diskList,function(e){
              var keyArr = directorPath[e.ident];
              keyArr = _.concat(keyArr,['disks',e.spindleId]);
              if(_.get(dataObj,keyArr) === undefined){
                  _.set(dataObj,keyArr,{
                      name:e.spindleId,
                      displayName:e.displayName,
                      TipsDisplayName:e.TipsDisplayName,
                      value:formatBusy(e.ident+' '+e.spindleId)
                  });
              }
          });
          var maxDiskHightFactor = 0;
          var diskByDirector = _.groupBy($scope.initData12.diskList,_.iteratee('ident'))
          _.each(diskByDirector,function(diskArray,director){
              var keyArr = directorPath[director];
              var portsKey = _.concat(keyArr,['ports']);
              var portSize = _.size(_.get(dataObj,portsKey));
              var distSize = _.size(diskArray);
              var curDiskHightFactor = 0;
              if(portSize>0){
                  curDiskHightFactor = _.ceil(distSize/portSize);
              }
              if(curDiskHightFactor >= maxDiskHightFactor){
                  maxDiskHightFactor = curDiskHightFactor;
              }
          });
          var dataArr = [];
          var fir_level_arr = [
              { 'id' : 'Director_E', 'name' : '1_DirectorToExternal', 'value' : 90 },
              { 'id' : 'Cache_E', 'name' : '2_CacheForExternal', 'value' : 90 },
              { 'id' : 'Cache_I', 'name' : '3_CacheForInternal', 'value' : 90 },
              { 'id' : 'Director_I', 'name' : '4_DirectorToInternal', 'value' : 90 },
              { 'id' : 'Disk', 'name' : '5_Disk', 'value' : maxDiskHightFactor* 30 }
          ];
          dataArr = _.concat(dataArr,fir_level_arr);
          _.each(_.values(dataObj),function(cacheObj,cache_index){
              dataArr.push({
                  name:(cache_index+1)+"_"+cacheObj.name,
                  parent:cacheObj.parent,
                  value:1,
                  colorValue:cacheObj.value
              });
              var directorsId;
              var cntr_port;
              var cntr_director;
              var cntr_slot;
              var cntr_diskCntr_by_cache;
              var cntr_disk_by_cache;
              var cntr_directorArr = [];
              if(cacheObj.parent === 'Cache_E'){
                  directorsId = 'Director_E_'+cacheObj.name+'_'+(cache_index+1);
                  cntr_port = directorsId+'_Port';
                  cntr_director = directorsId+'_Director';
                  cntr_slot = directorsId+'_Slot';
                  cntr_directorArr = [
                      { id:directorsId, parent:'Director_E' },
                      { id:cntr_port, name:'1_cntr_port', parent:directorsId },
                      { id:cntr_director, name:'2_cntr_director', parent:directorsId },
                      { id:cntr_slot, name:'3_cntr_slot', parent:directorsId }
                  ];
              }else if(cacheObj.parent === 'Cache_I'){
                  directorsId = 'Director_I_'+cacheObj.name+'_'+(cache_index+1);
                  cntr_slot = directorsId+'_Slot';
                  cntr_director = directorsId+'_Director';
                  cntr_port = directorsId+'_Port';
                  cntr_diskCntr_by_cache = directorsId+'_Disk_Container';
                  cntr_disk_by_cache = directorsId+'_Disk';
                  cntr_directorArr = [
                      { id:directorsId, parent:'Director_I' },
                      { id:cntr_slot, name:'1_cntr_slot', parent:directorsId },
                      { id:cntr_director, name:'2_cntr_director', parent:directorsId },
                      { id: cntr_port, name: '3_cntr_port', parent: directorsId },
                      { id: cntr_diskCntr_by_cache, parent: 'Disk' },
                      { id: cntr_disk_by_cache, parent: cntr_diskCntr_by_cache }
                  ];
              }
              dataArr = _.concat(dataArr,cntr_directorArr);
              _.each(_.values(cacheObj.slots),function(slotObj,slot_index){
                  var slotId = directorsId+ '_Slot_'+(slot_index+1);
                  dataArr.push({
                      name:(slot_index+1)+'_slot_'+slotObj.name,
                      parent:cntr_slot,
                      value:1,
                      colorValue:-1
                  });
                  var cntr_director_by_slot = slotId + '_Director';
                  dataArr.push({
                      id:cntr_director_by_slot,
                      parent:cntr_director,
                      value:1
                  });
                  var cntr_port_by_slot = slotId + '_Port';
                  dataArr.push({
                      id:cntr_port_by_slot,
                      parent:cntr_port,
                      value:1
                  });
                  var cntr_disk_by_slot = slotId + '_Disk';
                  if(cacheObj.parent === 'Cache_I') {
                      dataArr.push({
                          id: cntr_disk_by_slot,
                          parent: cntr_disk_by_cache,
                          value: 1
                      });
                  }
                  _.each(_.values(slotObj.directors),function(directorObj,director_index){
                      var directorId = (director_index+1)+'_director_'+directorObj.name;
                      dataArr.push({
                          name:directorId,
                          displayname:directorObj.name,
                          parent:cntr_director_by_slot,
                          value:1,
                          unitType:directorObj.directorType,
                          unitId:directorObj.name,
                          colorValue:directorObj.value
                      });
                      var cntr_port_by_director = directorId+'_Port';
                      dataArr.push({
                          id:cntr_port_by_director,
                          parent:cntr_port_by_slot,
                          value:1
                      });
                      var cntr_port_by_director_H = cntr_port_by_director+'_H';
                      dataArr.push({
                          id:cntr_port_by_director_H,
                          parent:cntr_port_by_director,
                          value:1
                      });
                      var cntr_disk_by_director = directorId + '_Disk';
                      if(cacheObj.parent === 'Cache_I') {
                          dataArr.push({
                              id: cntr_disk_by_director,
                              parent: cntr_disk_by_slot,
                              value: 1
                          });
                      }
                      _.each(_.values(directorObj.ports),function(portObj,port_index){
                          dataArr.push({
                              name:(port_index+1)+'_port_'+portObj.name,
                              displayname:portObj.name,
                              parent:cntr_port_by_director_H,
                              value:1,
                              unitType:directorObj.directorType+'-PORT',
                              unitId:directorObj.name+'-'+portObj.name,
                              colorValue:portObj.value
                          });
                      });
                      if(directorObj.hasOwnProperty('disks')){
                          var portSize = _.size(directorObj.ports);
                          var cntr_disk_by_port;
                          _.each(_.values(directorObj.disks),function(diskObj,disk_index){
                              if(disk_index % portSize === 0){
                                  cntr_disk_by_port = cntr_disk_by_director+'_Port_'+_.ceil(disk_index/portSize);
                                  dataArr.push({
                                      id:cntr_disk_by_port,
                                      parent:cntr_disk_by_director,
                                      value:1/maxDiskHightFactor
                                  });
                              }
                              dataArr.push({
                                  name:(disk_index+1)+'_disk_'+diskObj.name,
                                  displayname:diskObj.displayName,
                                  TipsDisplayName:diskObj.TipsDisplayName,
                                  parent:cntr_disk_by_port,
                                  value:1.0/portSize,
                                  unitType:'DISK',
                                  unitId:directorObj.name+' '+diskObj.name,
                                  colorValue:diskObj.value
                              });
                          });
                      }
                  });
              });

          });
          dataArr.forEach(function(e){
              if(e.colorValue === undefined || e.colorValue === null){
                  e.colorValue = -2;
              }
              if(e.value === undefined || e.value === null){
                  e.value = 1;
              }
          });
          var chartHight = _.sumBy(fir_level_arr, function(o) { return o.value; });
          initPerformanceConfig(dataArr,chartHight);
      }
      function initPerformanceConfig(dataArr,chartHight) {
        Highcharts.seriesTypes.treemap.prototype.myEqualShare_H = myEqualShare_H;
        Highcharts.seriesTypes.treemap.prototype.myEqualShare_V = myEqualShare_V;
        var dataLabelsOpt = {
          enabled: true,
          align: 'center',
          verticalAlign: 'middle',
          style: {
            fontSize:'11px',
            fontWeight: 'bold',
            color:'#F9F9F9'
          },
          formatter:function(){   
             return this.point.displayname;

          }
        };
        var viewWidth = $('.page-content').width()*0.90;
        $scope.treemapConfig = {
          options:{
          	exporting:{
          		enabled: false
          	},
            chart: {
              type: 'treemap',
              renderTo:'chart_vmax_performance', 
              height:chartHight,
              marginTop:30
            },
            colorAxis: {
              type:'linear',
              dataClasses: [
              				{from: -2,to: -1,color:'#FFFFFF',name:''},
							{from: -1,to:  0,color:'#494D50',name:'N/A'}, 
							{from:  0,to:  5,color:'#0000FF',name:'5%'}, 
							{from:  5,to: 10,color:'#0033FF',name:'10%'}, 
							{from: 10,to: 15,color:'#0066FF',name:'15%'}, 
							{from: 15,to: 20,color:'#0099FF',name:'20%'}, 
							{from: 20,to: 25,color:'#00CCFF',name:'25%'}, 
							{from: 25,to: 30,color:'#00FFFF',name:'30%'}, 
							{from: 30,to: 35,color:'#00FFCC',name:'35%'}, 
							{from: 35,to: 40,color:'#00FF99',name:'40%'}, 
							{from: 40,to: 45,color:'#00FF66',name:'45%'}, 
							{from: 45,to: 50,color:'#00FF33',name:'50%'}, 
							{from: 50,to: 55,color:'#00FF00',name:'55%'}, 
							{from: 55,to: 60,color:'#33FF00',name:'60%'}, 
							{from: 60,to: 65,color:'#66FF00',name:'65%'}, 
							{from: 65,to: 70,color:'#99FF00',name:'70%'}, 
							{from: 70,to: 75,color:'#CCFF00',name:'75%'}, 
							{from: 75,to: 80,color:'#FFFF00',name:'80%'}, 
							{from: 80,to: 85,color:'#FFCC00',name:'85%'}, 
							{from: 85,to: 90,color:'#FF9900',name:'90%'}, 
							{from: 90,to: 95,color:'#FF6600',name:'95%'}, 
							{from: 95,to: 100,color:'#FF3300',name:'100%'}
							]
            },
            legend: {
              title: {
                text: '利用率',
			      style: {
			         color: '#E0E0E3',
			         textTransform: 'uppercase',
			         fontSize: '12px'
			      }
              }, 
		      itemStyle: {
		         color: '#E0E0E3'
		      },

              align: 'right',
              color: '#FFFFFF',
              verticalAlign: 'top',
              layout: 'vertical',
              y:45,
              x:0,
              symbolRadius: 1,
              symbolHeight:15,
              reversed:true
            },
            plotOptions: {
              series: {
                turboThreshold:5000,
                allowPointSelect:true
              }
            }
          },
          series: [{
            levels: [
	            		{level: 1, layoutAlgorithm: 'myEqualShare_V', dataLabels: {enabled:false}},
						{level: 2, layoutAlgorithm: 'myEqualShare_H', dataLabels: dataLabelsOpt},
						{level: 3, layoutAlgorithm: 'myEqualShare_V', dataLabels: dataLabelsOpt},
						{level: 4, layoutAlgorithm: 'myEqualShare_H', dataLabels: dataLabelsOpt},
						{level: 5, layoutAlgorithm: 'myEqualShare_H', dataLabels: dataLabelsOpt},
						{level: 6, layoutAlgorithm: 'myEqualShare_V', dataLabels: dataLabelsOpt},
						{level: 7, layoutAlgorithm: 'myEqualShare_H', dataLabels: dataLabelsOpt}
					],
            "data" : dataArr
          }],
          title: {
            verticalAlign:'top',
            text: '存储性能热点图',
            color: '#FFFFFF'
          },
          tooltip:{
            formatter:function(){
              if(this.point.colorValue >-2){
                var _name = this.point.name;
                _name = _name.substring(_name.indexOf('_')+1);
                if(this.point.colorValue > -1){
                    //_name = _name + ':<b>'+_.ceil(this.point.colorValue,1)+'%</b>';
                    if ( this.point.TipsDisplayName !== undefined)
                    	_name = this.point.TipsDisplayName + '<br><b>'+_.ceil(this.point.colorValue,1)+' %</b>';
                    else 
                    	_name = this.point.name + '<br><b>'+_.ceil(this.point.colorValue,1)+' %</b>';
                }
                return _name;
              }else {
                return false;
              }
            }
          }
        };

        $scope.treemapLoaded = true;
      }
      $scope.queryT_12 = function(){
        $scope.initTemplate_12_q();
      }; 




		$scope.initData = function(){ 
			console.log("Begin InitData:" + $scope.tabs[0]);
			$scope.swithTabs($scope.tabs[0]);
		};
	    
	    $scope.initData();



    }   // end of detailsCtrlFunc


})();