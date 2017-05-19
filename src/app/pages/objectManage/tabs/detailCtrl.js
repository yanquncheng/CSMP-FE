/**
 * 对象管理
 */
(function () {
  'use strict';
  angular.module('BlurAdmin.pages.objectManage.tabs')
     .controller('detailCtrl', detailCtrlFunc);
    
    function detailCtrlFunc($scope, fixedNumber, $http, $localStorage, $filter, $stateParams) {
    	 
    	 console.log($stateParams);
    	 
    	 $scope.baseInfo = {};
    	 $scope.baseInfo = $stateParams.param;
    	//tabs页
     	$scope.tabs = [
     	                {"id":1,"name":"基本信息","url":"app/pages/objectManage/tabs/base_info.html",
     	                	"apiUrl":"/arrays"},
     	                {"id":2,"name":"磁盘信息","url":"app/pages/objectManage/tabs/disk.html",
     	                	"apiUrl":"/arrays"},
     	                {"id":3,"name":"LUN信息","url":"app/pages/objectManage/tabs/lun.html",
     	                	"apiUrl":"/arrays"},
     	                {"id":4,"name":"Pool信息","url":"app/pages/objectManage/tabs/pool.html",
     	                	"apiUrl":"/arrays"},
     	                {"id":5,"name":"交换机信息","url":"app/pages/objectManage/tabs/switch.html",
         	                "apiUrl":"/arrays"},
         	            {"id":6,"name":"主机信息","url":"app/pages/objectManage/tabs/host.html",
         	                "apiUrl":"/arrays"},
     	                {"id":7,"name":"应用信息","url":"app/pages/objectManage/tabs/app.html",
     	                	"apiUrl":"/arrays"},
     	                {"id":8,"name":"容量分布","url":"app/pages/objectManage/tabs/capacity.html",
     	                	"apiUrl":"/arrays"},
     	                {"id":9,"name":"容量趋势","url":"app/pages/objectManage/tabs/add.html",
     	                	"apiUrl":"/arrays"},
     	                {"id":10,"name":"历史性能","url":"app/pages/objectManage/tabs/add.html",
     	                	"apiUrl":"/arrays"},
     	                {"id":11,"name":"实时性能","url":"app/pages/objectManage/tabs/add.html",
     	                	"apiUrl":"/arrays"},
     	                {"id":12,"name":"事件信息","url":"app/pages/objectManage/tabs/add.html",
     	                	"apiUrl":"/arrays"},
     	                {"id":14,"name":"测试tab","url":"app/pages/objectManage/tabs/add.html",
     	                	"dropdown":true,
     	                	"children":[{"id":1,"name":"第一个","url":"app/pages/objectManage/tabs/add.html",
     	                	"apiUrl":"/arrays"}, 
     	                	{"id":2,"name":"第二个","url":"app/pages/objectManage/tabs/add.html",
     	                	"apiUrl":"/arrays"}
     	                	]
     	                }
 	               ];
 	    
	 	var config = { headers: {
	        "Authorization": $localStorage.authKey
	    }};
	    
	    $scope.initSummary = function(){
	    	config.params = {
	    		'device': $scope.baseInfo.device
	    	}
		    $http.get(IG.api + '/arrays', config ).success(function (response) {
		    	$scope.baseInfo = response[0];
		    });
	    };
	    
	    $scope.initData = function(){
		    $scope.initSummary();
	    };
	    
	    $scope.initData();
	    
	    $scope.swithTabs = function(tab){
	    	switch(tab.id){
	    		case 1:
	    			$scope.initSummary();
	    			return ;
	    		case 2:
	    			$scope.initDisk();
	    			return ;
	    		case 3:
	    			$scope.initLun();
	    			return ;
	    		case 4:
	    			$scope.initPool();
	    			return ;
	    		case 5:
	    			$scope.initSwitch();
	    			return ;
	    		case 6:
	    			$scope.initHost();
	    			return ;
	    		case 7:
	    			$scope.initApp();
	    			return ;
	    		case 8:
	    			$scope.initCapacity();
	    			return ;
	    		default:
	    		
	    	}
	    }
	    
    	// 以下disk
 		$scope.thead_disk = [
 	                 {"text": "编号","sort": "director","default": false},
 	                 {"text": "类型","sort": "disktype", "default": false},
 	                 {"text": "转速", "sort": "diskrpm","default": false},
 	                 {"text": "尺寸","sort": "", "default": false},
 	                 {"text": "厂商","sort": "vendor", "default": false},
 	                 {"text": "大小", "sort": "", "default": false},
 	                 {"text": "spare","sort": "","default": false},
 	                 {"text": "磁盘组", "sort": "","default": false},
 	                 {"text": "状态", "sort": "","default": false}
 	                 ];
	    
	    $scope.initDisk = function(){
	    	config.params = {
	    		'device': $scope.baseInfo.device
	    	}
		    $http.get(IG.api + '/array/disks', config).success(function (response) {
		    	$scope.disk_table_list = response;
		    });
		    var chart = AmCharts.makeChart( "disk", {
			  "type": "pie",
			  "theme": "none",
			  "dataProvider": [ {
			    "country": "a",
			    "litres": 501.9
			  }, {
			    "country": "T",
			    "litres": 50
			  } ],
			  "valueField": "litres",
			  "titleField": "country",
			   "balloon":{
			   "fixedPosition":true
			  },
			  "export": {
			    "enabled": true
			  }
			} );
	    };
	    
    	// 以下LUN
 		$scope.thead_lun = [
 	                 {"text": "设备名称","sort": "name","default": false},
 	                 {"text": "Pool名称","sort": "poolname", "default": false},
 	                 {"text": "所属SG", "sort": "speed","default": false},
 	                 {"text": "用途","sort": "", "default": false},
 	                 {"text": "容量供给类型","sort": "", "default": false},
 	                 {"text": "使用方式", "sort": "", "default": false},
 	                 {"text": "LUN类型","sort": "","default": false},
 	                 {"text": "保护方式", "sort": "","default": false},
 	                 {"text": "容量(GB)", "sort": "","default": false}
 	                 ];
	    
	    $scope.initLun = function(){
	    	config.params = {
	    		'device': $scope.baseInfo.device
	    	}
		    $http.get(IG.api + '/array/luns', config).success(function (response) {
		    	$scope.lun_table_list = response;
		    });
	    };
	    
    	// 以下POOL
 		$scope.thead_pool = [
 	                 {"text": "Pool名称","sort": "part","default": false},
 	                 {"text": "保护方式","sort": "raidtype", "default": false},
 	                 {"text": "状态", "sort": "partstat","default": false},
 	                 {"text": "RAID类型","sort": "dgraid", "default": false},
 	                 {"text": "使用方式","sort": "poolemul", "default": false},
 	                 {"text": "磁盘类型", "sort": "disktype", "default": false},
 	                 {"text": "可用容量(GB)","sort": "device","default": false},
 	                 {"text": "已用容量(GB)", "sort": "LastTS","default": false}
 	                 ];
	    
	    $scope.initPool = function(){
	    	config.params = {
	    		'device': $scope.baseInfo.device
	    	}
		    $http.get(IG.api + '/array/pools', config).success(function (response) {
		    	$scope.pool_table_list = response;
		    });
	    };
	    
    	// 以下switch
 		$scope.thead_switch = [
 	                 {"text": "名称","sort": "switch","default": false},
 	                 {"text": "序列号","sort": "raidtype", "default": false},
 	                 {"text": "类型","sort": "dgraid", "default": false},
 	                 {"text": "数据中心","sort": "poolemul", "default": false},
 	                 {"text": "机房", "sort": "disktype", "default": false}
 	                 ];
	    
	    $scope.initSwitch = function(){
	    	config.params = {
	    		'device': $scope.baseInfo.device
	    	}
		    $http.get(IG.api + '/array/switchs', config).success(function (response) {
		    	$scope.switch_table_list = response;
		    });
	    };
	    
    	// 以下host
 		$scope.thead_host = [
 	                 {"text": "主机名","sort": "switch","default": false},
 	                 {"text": "类别","sort": "raidtype", "default": false},
 	                 {"text": "应用名称","sort": "dgraid", "default": false},
 	                 {"text": "关联LUN","sort": "poolemul", "default": false},
 	                 {"text": "状态","sort": "poolemul", "default": false},
 	                 {"text": "IP地址","sort": "poolemul", "default": false},
 	                 {"text": "OS","sort": "poolemul", "default": false},
 	                 {"text": "OS版本","sort": "poolemul", "default": false},
 	                 {"text": "关联LUN数量","sort": "poolemul", "default": false},
 	                 {"text": "分配容量(GB)", "sort": "disktype", "default": false}
 	                 ];
	    
	    $scope.initHost = function(){
	    	config.params = {
	    		'device': $scope.baseInfo.device
	    	}
		    $http.get(IG.api + '/array/component/hosts', config).success(function (response) {
		    	$scope.host_table_list = response;
		    });
	    };
	    
    	// 以下app
 		$scope.thead_app = [
 	                 {"text": "应用名称","sort": "switch","default": false},
 	                 {"text": "使用部门","sort": "raidtype", "default": false},
 	                 {"text": "技术组","sort": "poolemul", "default": false},
 	                 {"text": "技术条线","sort": "poolemul", "default": false},
 	                 {"text": "负责人","sort": "poolemul", "default": false},
 	                 {"text": "应用类型","sort": "poolemul", "default": false},
 	                 {"text": "应用类别","sort": "poolemul", "default": false},
 	                 {"text": "容量类别", "sort": "disktype", "default": false}
 	                 ];
	    
	    $scope.initApp = function(){
	    	config.params = {
	    		'device': $scope.baseInfo.device
	    	}
		    $http.get(IG.api + '/array/apps', config).success(function (response) {
		    	$scope.app_table_list = response;
		    });
	    };
	    
    	// 一下capacity
 		$scope.thead_capacity = [
 	                 {"text": "应用名称","sort": "switch","default": false},
 	                 {"text": "使用部门","sort": "raidtype", "default": false},
 	                 {"text": "技术组","sort": "poolemul", "default": false},
 	                 {"text": "技术条线","sort": "poolemul", "default": false},
 	                 {"text": "负责人","sort": "poolemul", "default": false},
 	                 {"text": "应用类型","sort": "poolemul", "default": false},
 	                 {"text": "应用类别","sort": "poolemul", "default": false},
 	                 {"text": "容量类别", "sort": "disktype", "default": false}
 	                 ];
	    
	    $scope.initCapacity = function(){
	    	config.params = {
	    		'device': $scope.baseInfo.device
	    	}
		    $http.get(IG.api + '/array/capacity', config).success(function (response) {
		    	$scope.capacity = response[0];
		    
	            var chart = AmCharts.makeChart("luo", {
				    "theme": "none",
				    "type": "serial",
				    "dataProvider": [{
				        "year": "总容量（GB）",
				        "income": $scope.capacity.Raw.ConfiguredRawCapacity,
				        "color": "#123"
				        
				    }, {
				        "year": "未建立Raid（GB）",
				        "income": $scope.capacity.Raw.ConfiguredRawCapacity-$scope.capacity.Raw.RAIDOverheadCapacity,
				        "color": "#aaa"
				    }, {
				        "year": "已建立Raid（GB）",
				        "income": $scope.capacity.Raw.RAIDOverheadCapacity,
				        "color": "#fff"
				    }],
				    "valueAxes": [{
				        "title": "Income in millions, USD"
				    }],
				    "graphs": [{
				        "balloonText": "Income in [[category]]:[[value]]",
				        "fillAlphas": 1,
				        "lineAlpha": 0.2,
				        "title": "Income",
				        "fillColorsField": "color",
				        "type": "column",
				        "valueField": "income"
				    }],
	//			    "depth3D": 20,
	//			    "angle": 30,
				    "rotate": true,
				    "categoryField": "year",
				    "categoryAxis": {
				        "gridPosition": "start",
				        "fillAlpha": 0.05,
				        "position": "left"
				    },
				    "export": {
				    	"enabled": true
				     }
				});
	            var chart = AmCharts.makeChart("ke", {
				    "theme": "none",
				    "type": "serial",
				    "dataProvider": [{
				        "year": "可分配总容量（GB）",
				        "income": $scope.capacity.Raw.ConfiguredUsableCapacity,
				        "color": "#123"
				    }, {
				        "year": "Device模式容量（GB）",
				        "income": $scope.capacity.Raw.ConfiguredUsableCapacity-$scope.capacity.Raw.ConfiguredUsableCapacityDetail.PoolFreeCapacity,
				        "color": "#aaa"
				    }, {
				        "year": "Pool模式容量（GB）",
				        "income": $scope.capacity.Raw.ConfiguredUsableCapacityDetail.PoolFreeCapacity,
				        "color": "#fff"
				    }],
				    "valueAxes": [{
				        "title": "Income in millions, USD"
				    }],
				    "graphs": [{
				        "balloonText": "Income in [[category]]:[[value]]",
				        "fillAlphas": 1,
				        "lineAlpha": 0.2,
				        "title": "Income",
				        "fillColorsField": "color",
				        "type": "column",
				        "valueField": "income"
				    }],
	//			    "depth3D": 20,
	//			    "angle": 30,
				    "rotate": true,
				    "categoryField": "year",
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
    }
})();
