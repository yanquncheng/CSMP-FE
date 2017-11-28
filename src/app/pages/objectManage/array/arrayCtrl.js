
/**
 * 对象管理
 */
(function () {
  'use strict';
  angular.module('BlurAdmin.pages.objectManage.array')
     .controller('arrayCtrl', tabsCtrlFun);
  
  function tabsCtrlFun ($scope, fixedNumber, $localStorage, $filter, $state,$uibModal, commonService, httpService, $stateParams, $timeout) {
 	 
 	 var config = { headers: {
      },
 	 params:{
 	 	
 	 }}
 	 
 	 $scope.smartTablePageSize = 10;
 	
 	 $scope.editPanel = false ;
 	 
 	 //tabs页
 	 $scope.tabs = [
 	                {"id":1,"name":"SAN存储","url":"app/pages/objectManage/array/storage.html",
 	                	"apiUrl":"/arrays", 'detailUrl': '/menu/ObjectManage/Array'},
 	                {"id":2,"name":"虚拟存储","url":"app/pages/objectManage/array/virtual_storage.html",
 	                	"apiUrl":"/virtualarrays", 'detailUrl': '/menu/ObjectManage/VirtualArray'}
	               ];
	$scope.selectTab = $scope.tabs[0];
	$scope.selectTabId = 0;
	if($stateParams.datacenter){
		$scope.prm = $stateParams;
		$scope.selectTab = $scope.tabs[$stateParams.type-1];
		config.params.datacenter = $scope.prm.datacenter;
		$scope.selectTabId = $scope.selectTab.id - 1;
	}
    	 
 	$scope.theads = [
 	                 {"text": "存储别名","sort": "name","default": false},
 	                 {"text": "序列号","sort": "serialnb", "default": false},
 	                 {"text": "类型","sort": "", "default": false},
 	                 {"text": "型号", "sort": "", "default": false},
 	                 {"text": "微码版本", "sort": "", "default": false},
 	//                 {"text": "端口数量","sort": "","default": false},
 	                 {"text": "磁盘数量", "sort": "","default": false},
 	                 {"text": "LUN数量","sort": "","default": false},
 	                 {"text": "Cache(MB)","sort": "","default": false},
 	                 {"text": "可用容量(TB)","sort": "","default": false}, 	                 
 	                 {"text": "分配容量占比(%)","sort": "","default": false},
 	                 {"text": "位置信息", "sort": "","default": false},
 	                 {"text": "操作"}
 	                 ];
 	$scope.theads_fictitious = [
  	                 {"text": "虚拟存储别名","sort": "name","default": false},
  	                 {"text": "序列号","sort": "serialnb", "default": false},
  	                 {"text": "类型","sort": "", "default": false},
 	                 {"text": "型号", "sort": "", "default": false},
  	                 {"text": "Cluster名称", "sort": "", "default": false},
  	                 {"text": "微码版本","sort": "","default": false},
  	                 {"text": "位置", "sort": "","default": false},
  	                 {"text": "数据采集时间","sort": "","default": false},
  	                 {"text": "操作"}
  	                 ];
 	 
     $scope.list = [];
 	 
 	 //tabs页切换
 	 $scope.swithTabs = function (tab){
 	 	if(tab){
	 	 	$scope.selectTab = tab;
 	 	}
 		 
 		 var apiUrl = "";
 		 apiUrl = $scope.selectTab.apiUrl ;
 		 //查询数据
 		 query(apiUrl);
 	 };
     
     $scope.qwe = function(){
     	if($scope.prm){
     		$scope.selectTab = $scope.tabs[$scope.prm.type-1];
     			
			$scope.selectTabId = $scope.selectTab.id - 1;
     	}
     }
 	 
 	 /**
       * 存储列表
       */
      function query(apiUrl) {
      	if($scope.selectTab.id == 2){
	    	 httpService.get(apiUrl, null, config, function (response) { 
	    	     for ( var i in response ) {
	           		var item = response[i];
	           		if(item.LastTS){  //格式化列表日期格式
	           			item.LastTS= moment(item.LastTS*1000).format("YYYY-MM-DD HH:mm:ss");
	           		}
           		}
	    	     $scope.list_fictitious =response ;
	      	});
      	}else{
      		
    	 httpService.get(apiUrl, null, config, function (response) { 
          $scope.list =response ;
//        $scope.smartTablePageSize = 15;

	      });
      	}
      };
      
    //点击查看详情
 	 $scope.storageDetail = function (storage, type){
 	 	var prm = {};
 	 	prm.arraytype = storage.model;
 	 	if(type && type==='vplex'){
 	 		prm.arraytype = storage.vstgtype;
 	 		prm.device = storage.device;
 	 	}
	    httpService.get($scope.selectTab.detailUrl, prm, config, function (response) {
	    	if(typeof response == 'string'){
	          commonService.showMsg("error", response);
	    	}else{
		    	var tabs = response;
		    	var id = 1;
		    	angular.forEach(tabs, function(item, index){
	    			item.id = id++;
		    		if(!item.hasDetail){
		    			item.page = "app/pages/templates/template_"+item.template+".html";
//		    			if(index == 1){
//		    				item.template = 9;
//		    				item.url = '/arrays';
//		    				item.page = "app/pages/objectManage/tabs/template_"+item.template+".html";
//		    			}
		    		}else{
		    			angular.forEach(item.tabDetail, function(det, idx){
		    				det.id = id++;
		    				det.page = "app/pages/templates/template_"+det.template+".html";
		    			});
		    		}
		    	});
	 		    $state.go('dashboard.templatedetails', {param: {storage: storage, tabs: tabs}});
	    	}
	    });
 	 };
 	 
 	 //新增
 	 $scope.add = function () {
     	 $uibModal.open({
	        animation: true,
	        templateUrl: 'app/pages/objectManage/array/add.html',
	        controller: 'addCtrl',
	        size: 'lg',//md lg sm
	        resolve: {
	        	modalParam: function () {
	            return {"title":"SAN存储新增"};
	          }
	        }
	     });
      };
      
      $scope.panelAdd = function (storage){
      	$scope.entity = {};
      	$scope.entity.basicInfo = {},
		$scope.entity.maintenance = {},
		$scope.entity.assets = {},
		$scope.entity.ability = {};
      	
   		$scope.editPanel = true ;
   		$scope.panelTtile = '新增设备' ;
   		if(storage){
   			$scope.panelTtile = '修改设备' ;
   			if(storage.info && storage.info.length>0){
   				$scope.entity = storage.info;
   			}else{
   				
   				$scope.entity.basicInfo = {
	 		        "device": storage.device,　　　　　　　　　　
	 		        "alias": storage.alias,
	 		        "UnitID": storage.UnitID
	 		     }
   			 	 httpService.get('/arrays?device='+storage.device , null , config ,function (response) {
   					var baseInfo = response ;
   					if(baseInfo[0].info.basicInfo){
   						$scope.entity=baseInfo[0].info;
   						baseInfo[0].info.maintenance.purchaseDate = baseInfo.info.maintenance.purchaseDate ?baseInfo.info.maintenance.purchaseDate : "";
			          	$("#purchaseDate").val(baseInfo.info.maintenance.purchaseDate);
   					}
   			  	});
   			}
   			
   		}else{
   			$scope.entity = {};
			$scope.entity.basicInfo = {},
			$scope.entity.maintenance = {},
			$scope.entity.assets = {},
			$scope.entity.ability = {};
   		}
   		if(!$scope.deviceLevels){
   			$scope.deviceLevels = [{name: 'high'}, {name: 'middle'}, {name: 'low'}];
   			$scope.equipmentTypes = [{name: 'Array Block'}, {name: 'Array File'}, {name: 'Array Unity'}, {name: 'Array Object'}, {name: 'Array ServerSAN'}, {name: 'Switch Core'}, {name: 'Switch Edge'}];
   			//初始化加载Datacenter列表
		  	  $scope.UnitIDs = []; 
		    	  
		      	httpService.get('/matadata/datacenter', null, config, function (response) {
		      		
		      		angular.forEach(response, function (item) {
		  				angular.forEach(item.Building, function (build) {
		  					angular.forEach(build.Floor, function (floor) {
		  						angular.forEach(floor.Unit, function (unit) {
		  							var obj = {};
		  							obj.id = unit.UnitID
		  							obj.name = item.Name+" - "+build.Name+" - "+floor.Name+" - "+unit.Name
		  	  	  					$scope.UnitIDs.push(obj);
		  							
		  	  	  				});
		  	  	            });
		  	            });
		            });
		      		 
			      });
   		}
   	  };
   	  
   	  $scope.panelBack = function (){
   		$scope.editPanel = false ;
   		
   	  };
   	  
   	 $scope.panelSave = function (){
		var basicInfo = {},
		maintenance = {},
		assets = {},
		ability = {};
		
		basicInfo.device = $scope.entity.basicInfo.device;
		basicInfo.alias = $scope.entity.basicInfo.alias;
		basicInfo.UnitID = $scope.entity.basicInfo.UnitID;
		basicInfo.deviceLevel = $scope.entity.basicInfo.deviceLevel;
		basicInfo.equipmentType = $scope.entity.basicInfo.equipmentType;
		if(!basicInfo.device){
	          commonService.showMsg("error","请填写设备序列号");
	          return false;
		}else if(!basicInfo.alias){
	          commonService.showMsg("error","请填写设备别名");
	          return false;
		}else if(!basicInfo.deviceLevel){
	          commonService.showMsg("error","请填写设备级别");
	          return false;
		}else if(!basicInfo.equipmentType){
	          commonService.showMsg("error","请填写设备类型");
	          return false;
		}
		
		// 初始值,防止undefind
		if(!$scope.entity.assets){
			$scope.entity.assets = {};
		}
		if(!$scope.entity.ability){
			$scope.entity.ability = {};
		}
		
		
		maintenance.vendor = $scope.entity.maintenance.vendor;
		maintenance.contact = $scope.entity.maintenance.contact;
		var purchaseDate = $("#purchaseDate").val();
 		if($scope.entity.maintenance){
 			$scope.entity.maintenance.purchaseDate = purchaseDate ;
 		}
		maintenance.purchaseDate = $scope.entity.maintenance.purchaseDate;
		maintenance.period = $scope.entity.maintenance.period;
		
		assets.no = $scope.entity.assets.no;
		assets.purpose = $scope.entity.assets.purpose;
		assets.department = $scope.entity.assets.department;
		assets.manager = $scope.entity.assets.manager;
		
		ability.maxMemory = $scope.entity.ability.maxMemory;
		ability.maxDisks = $scope.entity.ability.maxDisks;
		ability.maxFEs = $scope.entity.ability.maxFEs;
		ability.maxCabinets = $scope.entity.ability.maxCabinets;
		
		httpService.post('/arrays', {'basicInfo': basicInfo, 'maintenance': maintenance, 'assets': assets, 'ability': ability}, config, function (response) {
			$scope.editPanel = false ;
			$scope.swithTabs($scope.selectTab);
		});
	  };
 	 
      $scope.swithTabs();
	    
	    $timeout(function() {
            $(window).scrollTop(0,0);
        }, 200);
    }
})();
