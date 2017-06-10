/**
 * 对象管理
 */
(function () {
  'use strict';
  angular.module('BlurAdmin.pages.objectManage.tabs')
     .controller('tabsCtrl', tabsCtrlFun);
  
  function tabsCtrlFun ($scope, fixedNumber, $localStorage, $filter, $state,$uibModal, commonService, httpService) {
 	 
 	 var config = { headers: {
      },
 	 params:{
 	 	
 	 }}
 	
 	 $scope.editPanel = false ;
 	 
 	 //tabs页
 	 $scope.tabs = [
 	                {"id":1,"name":"SAN存储","url":"app/pages/objectManage/tabs/storage.html",
 	                	"apiUrl":"/arrays", 'detailUrl': '/menu/ObjectManage/Array'},
 	                {"id":2,"name":"虚拟存储","url":"app/pages/objectManage/tabs/storage_fictitious.html",
 	                	"apiUrl":"/virtualarrays", 'detailUrl': '/menu/ObjectManage/VirtualArray'}
 	               ];
	$scope.selectTab = $scope.tabs[0];
    	 
 	$scope.theads = [
 	                 {"text": "存储别名","sort": "name","default": false},
 	                 {"text": "序列号","sort": "serialnb", "default": false},
 	                 {"text": "类型","sort": "", "default": false},
 	                 {"text": "型号", "sort": "", "default": false},
 	                 {"text": "端口数量","sort": "","default": false},
 	                 {"text": "磁盘数量", "sort": "","default": false},
 	                 {"text": "LUN数量","sort": "","default": false},
 	                 {"text": "Cache(MB)","sort": "","default": false},
 	                 {"text": "已使用容量(百分比)","sort": "","default": false},
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
 		 if(!tab){
 			tab = $scope.tabs[0];
 		 }
 		 
 		 var apiUrl = "";
 		 apiUrl = tab.apiUrl ;
 		 //查询数据
 		 query(apiUrl);
 	 };
     
     $scope.qwe = function(){
		$scope.selectTab = $scope.tabs[0];
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
	      	return;
      	}
    	 httpService.get(apiUrl, null, config, function (response) { 
          $scope.list =response ;
//        $scope.smartTablePageSize = 15;

	      });
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
		    			item.page = "app/pages/objectManage/tabs/template_"+item.template+".html";
//		    			if(index == 4){
//		    				item.template = 7;
//		    				item.url = '/arrays';
//		    				item.page = "app/pages/objectManage/tabs/template_"+item.template+".html";
//		    			}
		    		}else{
		    			angular.forEach(item.tabDetail, function(det, idx){
		    				det.id = id++;
		    				det.page = "app/pages/objectManage/tabs/template_"+det.template+".html";
		    			});
		    		}
		    	});
	 		    $state.go('dashboard.objectManage.tabs.details', {param: {storage: storage, tabs: tabs}});
	    	}
	    });
 	 };
 	 
 	 //新增
 	 $scope.add = function () {
     	 $uibModal.open({
	        animation: true,
	        templateUrl: 'app/pages/objectManage/tabs/add.html',
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
 	 
 	 $scope.key = "";
      $scope.getArrayCapacityPercent = function (originalUseCapacity, originalAllocateCapacity, originalCapacity) {
        var numerator = originalUseCapacity;
        if (!numerator) numerator = originalAllocateCapacity;
        var denominator = originalCapacity;
        return fixedNumber(numerator / denominator, 2) * 100;
      };
      
      $scope.getResourcePoolClass = function (resourcePool) {
        if (resourcePool == "高端") return "label-danger";
        if (resourcePool == "中端") return "label-warning";
        if (resourcePool == "文件") return "label-purple";
        return "label-info";
      };


      $scope.getType = function (storage) {
        switch (storage.type) {
          case "vnx_nas":
            return "vnx";
          case "netapp-7mode":
            return "netapp";
          case "netapp-cmode":
            return "netapp/cluster_mode";
          default :
            return storage.type;
        }
      };

      $scope.submit = function () {
        var key = $scope.key;
        if (key == "") {
          $scope.storages = $scope.sourceList;
          return;
        }
        var result = [];
        var find = false;
        for (var i = 0; i < $scope.sourceList.length; i++) {
          var storage = $scope.sourceList[i];
          find = false;
          for (var p in storage) {
            if (storage[p] && storage[p].toString().indexOf(key) > -1) {
              find = true;
              break;
            }
          }
          if (find) result.push(storage);
        }
        $scope.storages = result;
      };

      $scope.enter = function (ev) {
        if (ev.keyCode !== 13) return;
        $scope.submit();
      };

      
      var dataCenterLoaded = false;
      var machineRoomLoaded = false;
      var resourcePoolLoaded = false;
      var eltNodeLoaded = false;
      var scheduleLoaded = false;

      $scope.getRoomsAndPools = function (dataCenterId) {
         /* MachineRoom.getListBySn({dataCenterId: dataCenterId}, function (result) {
              $scope.machineRooms = result;
              $scope.entity.machineRoomId = $scope.machineRooms[0].id;
              machineRoomLoaded = true;
          });
          ResourcePool.getListBySn({dataCenterId: dataCenterId}, function (result) {
              $scope.resourcePools = result;
              $scope.entity.resourcePoolId = $scope.resourcePools[0].id;
              resourcePoolLoaded = true;
          });*/
      };


      function openDialog(entity) {
        /*if (!dataCenterLoaded || !eltNodeLoaded || !scheduleLoaded) return;
        $scope.entity = entity;
        $scope.entity.schedule = $scope.schedule;
        if (!$scope.entity.dataCenterId) $scope.entity.dataCenterId = $scope.dataCenters[0].id;
        if (!$scope.entity.machineRoomId) $scope.entity.machineRoomId = $scope.machineRooms[0].id;
        if (!$scope.entity.resourcePoolId) $scope.entity.resourcePoolId = $scope.resourcePools[0].id;
        if (!$scope.entity.storageType) $scope.entity.storageType = "SAN";
        if (!$scope.entity.schedule.deviceType) $scope.entity.schedule.deviceType = "vnx";
        if (!$scope.entity.schedule.nodeName) $scope.entity.schedule.nodeName = $scope.etlNodes[0].name;
       	ngDialog.openConfirm({
          template: "edit",
          className: 'ngdialog-theme-default ngdialog-theme-custom',
          scope: $scope
        });
        dataCenterLoaded = false;
        machineRoomLoaded = false;
        resourcePoolLoaded = false;
        eltNodeLoaded = false;
        scheduleLoaded = false;*/
      }

      $scope.save = function () {
       /* var entity = getSchedule();
        if (!entity.id) {
          Array.create(entity, function (date) {
              query();
              //ngDialog.close();
            },
            function (error) {
              if (error) alert(error.data.message);
            });
          return;
        }
        Array.update(entity, function (date) {
            query();
            //ngDialog.close();
          },
          function (error) {
            if (error) alert(error.data.message);
          });*/
      };

      function getSchedule() {
        if ($scope.entity.schedule.deviceType == "vnx" || $scope.entity.schedule.deviceType == "vnx_nas") return getVnxSchedule();
        if ($scope.entity.schedule.deviceType == "vmax") return getVmaxSchedule();
        if ($scope.entity.schedule.deviceType == "dmx") return getVmaxSchedule();
        if ($scope.entity.schedule.deviceType == "ds8000") return getDs8000Schedule();
        return getNetappSchedule()
      }

      function getVnxSchedule() {
        var entity = {
          id: $scope.entity.id,
          dataCenterId: $scope.entity.dataCenterId,
          machineRoomId: $scope.entity.machineRoomId,
          name: $scope.entity.name,
          resourcePoolId: $scope.entity.resourcePoolId,
          serialNumber: $scope.entity.serialNumber,
          storageType: $scope.entity.storageType,
          deviceType: $scope.entity.schedule.deviceType,
          maxCache: $scope.entity.maxCache,
          maxDiskCount: $scope.entity.maxDiskCount,
          maxPortCount: $scope.entity.maxPortCount,
          maxCabinetCount: $scope.entity.maxCabinetCount,
          assetId: $scope.entity.assetId,
          purpose: $scope.entity.purpose,
          departmentOfUser: $scope.entity.departmentOfUser,
          owner: $scope.entity.owner,
          supplier: $scope.entity.supplier,
          supplierContact: $scope.entity.supplierContact,
          purchaseTime: $scope.entity.purchaseTime,
          maintainBeginDate: $scope.entity.maintainBeginDate,
          maintainEndDate: $scope.entity.maintainEndDate,
          maintainDuration: $scope.entity.maintainDuration
        };
        var schedule = {
          deviceIp: $scope.entity.schedule.deviceIp,
          devicePassword: $scope.entity.schedule.devicePassword,
          deviceType: $scope.entity.schedule.deviceType,
          deviceUser: $scope.entity.schedule.deviceUser,
          nodeName: $scope.entity.schedule.nodeName,
          serialNumber: $scope.entity.serialNumber
        };
        var deviceLogonExtend = {
          spa: {
            ip: $scope.entity.schedule.deviceLogonExtend.spa.ip,
            user: $scope.entity.schedule.deviceLogonExtend.spa.user,
            password: $scope.entity.schedule.deviceLogonExtend.spa.password
          },
          spb: {
            ip: $scope.entity.schedule.deviceLogonExtend.spb.ip,
            user: $scope.entity.schedule.deviceLogonExtend.spa.user,
            password: $scope.entity.schedule.deviceLogonExtend.spa.password
          }
        };
        var deviceLogonExtendJson = JSON.stringify(deviceLogonExtend);
        schedule.deviceLogonExtend = deviceLogonExtendJson;
        entity.schedule = schedule;

        return entity;
      }

      function getNetappSchedule() {
        var entity = {
          id: $scope.entity.id,
          dataCenterId: $scope.entity.dataCenterId,
          machineRoomId: $scope.entity.machineRoomId,
          name: $scope.entity.name,
          resourcePoolId: $scope.entity.resourcePoolId,
          serialNumber: $scope.entity.serialNumber,
          storageType: $scope.entity.storageType,
          deviceType: $scope.entity.schedule.deviceType
        };
        var schedule = {
          deviceIp: $scope.entity.schedule.deviceIp,
          devicePassword: $scope.entity.schedule.devicePassword,
          deviceType: $scope.entity.schedule.deviceType,
          deviceUser: $scope.entity.schedule.deviceUser,
          nodeName: $scope.entity.schedule.nodeName,
          serialNumber: $scope.entity.serialNumber
        };
        entity.schedule = schedule;

        return entity;
      }

      function getVmaxSchedule() {
        var entity = {
          id: $scope.entity.id,
          dataCenterId: $scope.entity.dataCenterId,
          machineRoomId: $scope.entity.machineRoomId,
          name: $scope.entity.name,
          resourcePoolId: $scope.entity.resourcePoolId,
          serialNumber: $scope.entity.serialNumber,
          storageType: $scope.entity.storageType,
          deviceType: $scope.entity.schedule.deviceType,
          maxCache: $scope.entity.maxCache,
          maxDiskCount: $scope.entity.maxDiskCount,
          maxPortCount: $scope.entity.maxPortCount,
          maxCabinetCount: $scope.entity.maxCabinetCount,
          assetId: $scope.entity.assetId,
          purpose: $scope.entity.purpose,
          departmentOfUser: $scope.entity.departmentOfUser,
          owner: $scope.entity.owner,
          supplier: $scope.entity.supplier,
          supplierContact: $scope.entity.supplierContact,
          purchaseTime: $scope.entity.purchaseTime,
          maintainBeginDate: $scope.entity.maintainBeginDate,
          maintainEndDate: $scope.entity.maintainEndDate,
          maintainDuration: $scope.entity.maintainDuration
        };
        var schedule = {
          deviceIp: $scope.entity.schedule.deviceLogonExtend.solutionEnableIP,
          devicePassword: $scope.entity.schedule.devicePassword,
          deviceType: $scope.entity.schedule.deviceType,
          deviceUser: $scope.entity.schedule.deviceUser,
          nodeName: $scope.entity.schedule.nodeName,
          serialNumber: $scope.entity.serialNumber
        };
        var deviceLogonExtend = {
          symmetrix: $scope.entity.schedule.deviceLogonExtend.symmetrix,
          solutionEnableHost: $scope.entity.schedule.deviceLogonExtend.solutionEnableHost,
          solutionEnableIP: $scope.entity.schedule.deviceLogonExtend.solutionEnableIP,
          unisphereHost: $scope.entity.schedule.deviceLogonExtend.unisphereHost,
          unisphereIP: $scope.entity.schedule.deviceLogonExtend.unisphereIP
        };
        var deviceLogonExtendJson = JSON.stringify(deviceLogonExtend);
        schedule.deviceLogonExtend = deviceLogonExtendJson;
        entity.schedule = schedule;

        return entity;
      }

      function getDs8000Schedule() {
        var entity = {
          id: $scope.entity.id,
          dataCenterId: $scope.entity.dataCenterId,
          machineRoomId: $scope.entity.machineRoomId,
          name: $scope.entity.name,
          resourcePoolId: $scope.entity.resourcePoolId,
          serialNumber: $scope.entity.serialNumber,
          storageType: $scope.entity.storageType,
          deviceType: $scope.entity.schedule.deviceType,
          maxCache: $scope.entity.maxCache,
          maxDiskCount: $scope.entity.maxDiskCount,
          maxPortCount: $scope.entity.maxPortCount,
          maxCabinetCount: $scope.entity.maxCabinetCount,
          assetId: $scope.entity.assetId,
          purpose: $scope.entity.purpose,
          departmentOfUser: $scope.entity.departmentOfUser,
          owner: $scope.entity.owner,
          supplier: $scope.entity.supplier,
          supplierContact: $scope.entity.supplierContact,
          purchaseTime: $scope.entity.purchaseTime,
          maintainBeginDate: $scope.entity.maintainBeginDate,
          maintainEndDate: $scope.entity.maintainEndDate,
          maintainDuration: $scope.entity.maintainDuration
        };
        var schedule = {
          deviceIp:$scope.entity.schedule.deviceIp,
          devicePassword: $scope.entity.schedule.devicePassword,
          deviceType: $scope.entity.schedule.deviceType,
          deviceUser: $scope.entity.schedule.deviceUser,
          nodeName: $scope.entity.schedule.nodeName,
          serialNumber: $scope.entity.serialNumber
        };
        var deviceLogonExtend = {
          devicePassword: $scope.entity.schedule.devicePassword,
          deviceUser: $scope.entity.schedule.deviceUser,
        };
        var deviceLogonExtendJson = JSON.stringify(deviceLogonExtend);
        schedule.deviceLogonExtend = deviceLogonExtendJson;
        entity.schedule = schedule;

        return entity;
      }
      
      
      /****************************************************************************/
      $scope.swithTabs();
      
    }
  
})();
