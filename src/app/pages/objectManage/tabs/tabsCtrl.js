/**
 * 对象管理
 */
(function () {
  'use strict';
  angular.module('BlurAdmin.pages.objectManage.tabs')
     .controller('tabsCtrl', tabsCtrlFun);
  
  function tabsCtrlFun ($scope, fixedNumber, $http, $localStorage, $filter, $state,$uibModal) {
 	 
 	 var config = { headers: {
          "Authorization": $localStorage.authKey
      }}
 	
 	 $scope.editPanel = false ;
 	 
 	 //tabs页
 	 $scope.tabs = [
 	                {"id":1,"name":"SAN存储","url":"app/pages/objectManage/tabs/storage.html",
 	                	"apiUrl":"/arrays"},
 	                {"id":2,"name":"NAS存储","url":"app/pages/objectManage/tabs/storage.html",
 	                	"apiUrl":"/arrays"},
 	                {"id":3,"name":"对象存储","url":"app/pages/objectManage/tabs/storage.html",
 	                	"apiUrl":"/arrays"},
 	                {"id":4,"name":"虚拟存储","url":"app/pages/objectManage/tabs/storage.html",
 	                	"apiUrl":"/arrays"}
 	               ];
    	 
 	$scope.theads1 = [
 	                 {"text": "存储别名","sort": "name","default": false},
 	                 {"text": "序列号","sort": "serialnb", "default": false},
 	                 {"text": "数据中心", "sort": "","default": false},
 	                 {"text": "资源池","sort": "", "default": false},
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
 	$scope.theads2 = [
  	                 {"text": "2存储别名","sort": "name","default": false},
  	                 {"text": "序列号","sort": "serialnb", "default": false},
  	                 {"text": "数据中心", "sort": "","default": false},
  	                 {"text": "资源池","sort": "", "default": false},
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
 	$scope.theads3 = [
  	                 {"text": "3存储别名","sort": "name","default": false},
  	                 {"text": "序列号","sort": "serialnb", "default": false},
  	                 {"text": "数据中心", "sort": "","default": false},
  	                 {"text": "资源池","sort": "", "default": false},
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
 	$scope.theads4 = [
  	                 {"text": "4存储别名","sort": "name","default": false},
  	                 {"text": "序列号","sort": "serialnb", "default": false},
  	                 {"text": "数据中心", "sort": "","default": false},
  	                 {"text": "资源池","sort": "", "default": false},
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
 	 
 	 /*
 	 $scope.theadList = [];
 	 $scope.sourceList = [];
     $scope.filterList = [];*/
     $scope.list = [];
 	 
 	 //tabs页切换
 	 $scope.swithTabs = function (tab){
 		 if(!tab){
 			tab = $scope.tabs[0];
 		 }
 		 
 		 if(tab.id === 1){		//SAN存储
 			$scope.theadList = $scope.theads1 ;
 			
 		 }else if(tab.id === 2){//NAS存储
 			 $scope.theadList = $scope.theads2 ;
 			 
 		 }else if(tab.id === 3){//对象存储
 			 $scope.theadList = $scope.theads3 ;
 			 
 		 }else{					//虚拟存储
 			 $scope.theadList = $scope.theads4 ;
 		 }
 		 var apiUrl = "";
 		 apiUrl = tab.apiUrl ;
 		 //查询数据
 		 query(apiUrl);
 	 };
 	 
 	 /**
       * 存储列表
       */
      function query(apiUrl) {
    	  
    	 $http.get(IG.api + apiUrl , config ).success(function (response) { 
    		  
          //$scope.sourceList = response;
          //$scope.filterList = $scope.sourceList;
          $scope.list =response ;
          
          for ( var i in response ) {
         	var item = response[i];
         	item.usedCapacityPercent = 0 ;
         	var usedCapacity =  item.ConfiguredRawCapacity -  item.UnconfiguredCapacity;
         	item.usedCapacity = usedCapacity ;
         	if(item.ConfiguredRawCapacity==0 || !item.ConfiguredRawCapacity){
         		item.usedCapacityPercent = 0 ;
         	}else{
         		item.usedCapacityPercent = fixedNumber(item.usedCapacity / item.ConfiguredRawCapacity, 2) * 100;
         	}
         		 
            var perfItems = item.perf;
            for ( var j in perfItems ) {
              var perfItem = perfItems[j];
              if ( perfItem.properties.name == 'WriteRequests') {
                item['perfDisplay'] = perfItem.points;
                //console.log(perfItem.points);
                break;
              }
            }
          }
          
          $scope.smartTablePageSize = 15;

	      }).error(function (err) {
	          console.log(err);   
	      });
      };
      
    //点击查看详情
 	 $scope.storageDetail = function (storage){
 		    $state.go('dashboard.objectManage.tabs.detail', {param: storage});
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
      
      $scope.panelAdd = function (){
   		$scope.editPanel = true ;
   		$scope.panelTtile = '新增设备' ;
   		
   	  };
   	  
   	  $scope.panelBack = function (){
   		$scope.editPanel = false ;
   		
   	  };
   	  
   	 $scope.panelSave = function (){
		$scope.editPanel = false ;
		
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

      

      $scope.edit = function (item) {
        loadAndOpen(item);
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