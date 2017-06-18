
(function () {
  'use strict';
  
  angular.module('BlurAdmin.pages.objectManage.switchboard')
      .controller('switchboardCtrl', switchboardCtrlFunc);

  /** @ngInject */
  function switchboardCtrlFunc($scope, $filter, $timeout , $http, $localStorage,toastr, $state, commonService, $stateParams, httpService) {
      
	  var config = { headers: {
          "Authorization": $localStorage.authKey
      }}
	  
	  $scope.parmsInfo = $stateParams.param;
	  var datacenter1 = $stateParams.datacenter;
	 	 
	  	
	 $scope.readStatus = false ;
 	 //tabs页
 	 $scope.tabs = [
 	                {"id":1,"name":"交换机列表","url":"app/pages/objectManage/switchboard/switchs.html"},
 	                {"id":2,"name":"Fabric列表","url":"app/pages/objectManage/switchboard/fabric.html"}
 	               ];
 	 
 	 //tabs页切换
 	 $scope.selectTab = 0 ;
 	 $scope.swithTabs = function (tab){
 		 $timeout(function () {
 			if(!tab){
 	 			if($scope.parmsInfo && $scope.parmsInfo.selectTab){
 	 				 angular.forEach($scope.tabs, function (item,i) {
 	 	            	  if(item.id == $scope.parmsInfo.selectTab){
 	 	            		 tab = item ;
 	 	            		 return ;
 	 	            	  }
 	 	  			  });
 	 	 		 }else{
 	 	 			tab = $scope.tabs[0];
 	 	 		 }
 	 		 }
 	 		
 	 		 $scope.selectTab = tab.id ;
 	 		 
 	 		 if(tab.id === 1){	//交换机列表
 	 			$scope.initSwitchs() ;
 	 			
 	 		 }if(tab.id === 2){//Fabric列表
 	 			$scope.initFabric();
 	 		 }
 			 
 		 });
 		
 	 };
	 
	  //交换机列表查询
 	  $scope.smartTablePageSize = 15;
      $scope.initSwitchs = function (){
      	var params ={};
	  		if(datacenter1!=null && datacenter1!=''){
	  			params.datacenter=datacenter1;
	  		}
      	httpService.get('/switchs' , params,config ,function (response) {
      	  
            $scope.DataList = response;
            angular.forEach($scope.DataList, function (item,i) {
          	  item.LastTS = moment(item.LastTS * 1000).format("YYYY-MM-DD HH:mm:ss");
          	  
			  });
            
            $scope.smartTablePageSize = 15;

	      });
      };
      
      $scope.fabricTablePageSize = 5;
     //Fabric列表查询
      $scope.initFabric = function (){
	  		$scope.fabricsList = [];
	  		httpService.get('/fabrics' ,null, config ,function (response) {
	        	  var row_id = 1 ;
	      			angular.forEach(response, function (item,i) {
	      				angular.forEach(item.switchs, function (switchs) {
	      					switchs.fabwwn = item.fabwwn ;
	      					switchs.psname = item.psname ;
	      					switchs.row_id = row_id ;
	      					$scope.fabricsList.push(switchs);
	      					row_id ++ ;
	          			});
	      			});
	      			
	      			$scope.zoneData ($scope.fabricsList[0]);
	      			$scope.fabricsList[0].selected = true ;
	      			$scope.fabricTablePageSize = 5;
	                
		      });
      };
      
      // Zone信息
      $scope.zoneList = [];
      $scope.zoneTablePageSize = 15;
      $scope.zoneData = function (fabwwn){
    	$scope.zoneList = [];
      	httpService.get('/fabric/zone?fabwwn='+fabwwn.fabwwn ,null, config ,function (response) {
      	  
      	  angular.forEach(response, function (item,i) {
  				angular.forEach(item.zonemembers, function (zone) {
  					zone.device = item.device ;
  					zone.zsetname = item.zsetname ;
  					zone.fabricname = item.fabricname ;
  					zone.zname = item.zname ;
  					$scope.zoneList.push(zone);
      			});
  			});
      	  $scope.zoneTablePageSize = 15;
	      });
      };
      
      /**
       * 点击Fabric列表
       */
      $scope.selectData = {};
      $scope.selectRow = function (row){
	      	$scope.selectData = row;
	      	angular.forEach($scope.fabricsList, function (item,i) {
					if(row.row_id == item.row_id){
						item.selected = true;
					}else{
						item.selected = false;
					}
	      	});
	      	$scope.zoneData (row);
      };
      
      //点击查看详情
  	 $scope.switchDetail = function (switchBoard , type ){
  		  var param = angular.copy(switchBoard);
  		  param.type = type ;
  		  param.selectTab = $scope.selectTab ;
  		
  		  $state.go('dashboard.objectManage.switchboard.switchDetial', {param: param });
  	 };
  	 
      

     $scope.open = open;
     $scope.opened = false;
     $scope.format = "yyyy/MM/dd";
     $scope.options = {
         showWeeks: false
     };
     function open() {
         $scope.opened = true;
     }
     
     /**
      * 交换机编辑
      */
  	  $scope.switchs = {};
      $scope.editSwitch = function (row){
        	
    	  httpService.get('/switch?device='+row.device , null , config ,function (response) {
          	  
    		  var baseInfo = {} ;
    		  if(response instanceof Array){
    			  baseInfo = response[0] ;
    		  }else{
    			  baseInfo = response ;
    		  }
	          	//baseInfo = {"device":"DS_6520B-10000027F84A8E9A","UnitID":"444f0915-1032-465c-b6ee-94345bbac9c1","alias":"aaaaaa","devicesn":"AMS14520158","vendor":"Brocade","model":"Brocade 6520","ip":"172.8.188.80","devdesc":"Fibre Channel Switch","Localtion":"xxxx","LastTS":"1467373748","#TotalPort":100,"#FreePort":10,"#ConnHBAPort":20,"#ConnStoragePort":20,"#ILSPort":20,"#OtherPort":10,"#UsedPort":101,"info":{"ability":{"maxSlot":"111","maxPorts":"1000"},"assets":{"no":"asset0001","purpose":"SAP System","department":"Marketing","manager":"zhangsan"},"maintenance":{"vendor":"EMC","contact":"az@emc.com","purchaseDate":"2010/1/1","period":3}}};
	          	  
	          	baseInfo.info = baseInfo.info ? baseInfo.info : {} ;
	          	baseInfo.info.basicInfo = baseInfo.info.basicInfo ? baseInfo.info.basicInfo : {} ;
	          	baseInfo.info.assets = baseInfo.info.assets ? baseInfo.info.assets : {} ;
	          	baseInfo.info.ability = baseInfo.info.ability ? baseInfo.info.ability : {} ;
	          	baseInfo.info.maintenance = baseInfo.info.maintenance ? baseInfo.info.maintenance : {} ;
	          	baseInfo.info.ability.maxSlot = baseInfo.info.ability.maxSlot ? baseInfo.info.ability.maxSlot : 0 ;
	          	baseInfo.info.ability.maxPorts = baseInfo.info.ability.maxPorts ? baseInfo.info.ability.maxPorts : 0 ;
	          	baseInfo.info.maintenance.period = baseInfo.info.maintenance.period ? parseInt(baseInfo.info.maintenance.period) : 0 ;
	          	
	          	baseInfo.info.maintenance.purchaseDate = baseInfo.info.maintenance.purchaseDate ?baseInfo.info.maintenance.purchaseDate : "";
	          	$("#purchaseDate").val(baseInfo.info.maintenance.purchaseDate);
	          	
	          	  $scope.switchs =  {
	        		    "basicInfo":{
	        		        "device": baseInfo.device,　　　　　　　　　　
	        		        "alias": baseInfo.info.basicInfo.alias,
	        		        "UnitID": baseInfo.info.basicInfo.UnitID
	        		     },
	        		    "maintenance": baseInfo.info.maintenance ,
	        		    "assets": baseInfo.info.assets ,
	        		    "ability" :{
	        		    	"maxSlot":parseInt(baseInfo.info.ability.maxSlot),
	        		    	"maxPorts":parseInt(baseInfo.info.ability.maxPorts),
	        		    }  
	        		} ;
	          	  
	          	 $scope.editPanel = true ;
	      		 $scope.panelTtile = '交换机编辑' ;
          	  
  	      });
      };
      
      /**
       * 交换机新增
       */
      $scope.addSwitch = function (){
    	$scope.switchs = {};
		$scope.editPanel = true ;
		$scope.panelTtile = '交换机新增' ;
		$scope.readStatus = false ;
      };
      
      /**
       * 新增/编辑返回
       */
 	  $scope.panelBack = function (){
 		$scope.editPanel = false ;
 	  };
 	  
 	 /**
       * 新增/编辑 保存
       */
 	 $scope.switchSave = function (){
 		 var purchaseDate = $("#purchaseDate").val();
 		 
 		 if($scope.switchs.maintenance){
 			$scope.switchs.maintenance.purchaseDate = purchaseDate ;
 		 }
 		
 		httpService.post("/switch" ,  $scope.switchs , config ,function (response) {
        	console.log("response:--->"+response);
        	commonService.showMsg("success","交换机操作成功!");
        	
        	 $scope.panelBack();
        	 $scope.swithTabs();
        	 
        });
  	  };
  	  
  	  
  	  //初始化加载Datacenter列表
  	  $scope.datacenter = []; 
      $scope.initDatacenter = function (){
    	  
      	httpService.get('/matadata/datacenter' ,null, config ,function (response) {
      		angular.forEach(response, function (item) {
  				angular.forEach(item.Building, function (build) {
  					angular.forEach(build.Floor, function (floor) {
  						angular.forEach(floor.Unit, function (unit) {
  							var obj = {};
  							obj.id = unit.UnitID
  							obj.name = item.Name+" - "+build.Name+" - "+floor.Name+" - "+unit.Name
  	  	  					$scope.datacenter.push(obj);
  							
  	  	  				});
  	  	            });
  	            });
            });
      		 
	      });
      };
  	  
		/***************************************/
  	  	$scope.swithTabs();
  	  	$scope.initDatacenter();
  	  	
  	  	//打开后返回顶部
        $timeout(function() {
            $(window).scrollTop(0,0);
        }, 200);
		
  }

})();
