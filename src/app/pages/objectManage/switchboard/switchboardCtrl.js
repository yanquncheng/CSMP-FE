
(function () {
  'use strict';
  
  angular.module('BlurAdmin.pages.objectManage.switchboard')
      .controller('switchboardCtrl', switchboardCtrlFunc);

  /** @ngInject */
  function switchboardCtrlFunc($scope, $filter, $timeout , $http, $localStorage,toastr, $state, commonService, $stateParams) {
      
	  var config = { headers: {
          "Authorization": $localStorage.authKey
      }}
	  
	  $scope.parmsInfo = $stateParams.param;
	 	 
	  	
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
      	
      	$http.get(IG.api + '/switchs' , config )
          .success(function (response) {
        	  
              $scope.DataList = response;
              angular.forEach($scope.DataList, function (item,i) {
            	  item.LastTS = moment(item.LastTS * 1000).format("YYYY-MM-DD HH:mm:ss");
            	  
  			  });
              
              $scope.smartTablePageSize = 15;

	      }).error(function (err) {
	          console.log(err);   
	          commonService.showMsg("error",err.message);
	      });
      };
      
      $scope.fabricTablePageSize = 5;
     //Fabric列表查询
      $scope.initFabric = function (){
	  		$scope.fabricsList = [];
	  		$http.get(IG.api + '/fabrics' , config )
	  		.success(function (response) {
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
                
	      }).error(function (err) {
	          console.log(err);   
	          commonService.showMsg("error",err.message);
	      });
      };
      
      // Zone信息
      $scope.zoneList = [];
      $scope.zoneData = function (fabwwn){
    	$scope.zoneList = [];
      	$http.get(IG.api + '/fabric/zone?fabwwn='+fabwwn.fabwwn , config )
          .success(function (response) {
        	  
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
	      }).error(function (err) {
	          console.log(err);   
	          commonService.showMsg("error",err.message);
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
        	
        	$http.get(IG.api + '/switch?device='+row.device , config )
            .success(function (response) {
          	  
	          	var baseInfo = response ;
	          	//baseInfo = {"device":"DS_6520B-10000027F84A8E9A","UnitID":"444f0915-1032-465c-b6ee-94345bbac9c1","alias":"aaaaaa","devicesn":"AMS14520158","vendor":"Brocade","model":"Brocade 6520","ip":"172.8.188.80","devdesc":"Fibre Channel Switch","Localtion":"xxxx","LastTS":"1467373748","#TotalPort":100,"#FreePort":10,"#ConnHBAPort":20,"#ConnStoragePort":20,"#ILSPort":20,"#OtherPort":10,"#UsedPort":101,"info":{"ability":{"maxSlot":"111","maxPorts":"1000"},"assets":{"no":"asset0001","purpose":"SAP System","department":"Marketing","manager":"zhangsan"},"maintenance":{"vendor":"EMC","contact":"az@emc.com","purchaseDate":"2010/1/1","period":3}}};
	          	  
	          	baseInfo.info = baseInfo.info ? baseInfo.info : {} ;
//	          	baseInfo.maintenance = baseInfo.maintenance ? baseInfo.maintenance : {} ;
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
          	  
  	      }).error(function (err) {
  	          console.log(err);   
  	          commonService.showMsg("error",err.message);
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
 		
 		$http.post(IG.api + "/switch" ,  $scope.switchs , config )
        .success(function (response) {
        	console.log("response:--->"+response);
        	commonService.showMsg("success","交换机操作成功!");
        	
        	 $scope.panelBack();
        	 $scope.swithTabs();
        	 
        }).error(function (err) {
	          console.log(err);
	          commonService.showMsg("error",err.message);
	      });
  	  };
  	  
  	  
  	  //初始化加载Datacenter列表
  	  $scope.datacenter = []; 
      $scope.initDatacenter = function (){
    	  
      	$http.get(IG.api + '/matadata/datacenter' , config )
      	.success(function (response) {
      		
      		if(!response || response.length==0){
      			$scope.treeData = [{"isDefault":true,"Name":"测试数据中心2","Type":"生产数据中心2","City":"北京","Address":"海淀区数据中心",
  					"Building":[{"Name":"楼栋201","Description":"楼栋201的说明","_id":"592255c8fc97ed701b00001d",
  					"Floor":[{"Name":"楼层1","Description":"楼层1的说明","_id":"592255c8fc97ed701b000021",
  					"Unit":[{"Name":"机房1","UnitID":"111f0915-1032-465c-b6ee-913ffbbac913",
  					"Description":"机房1的说明","_id":"592255c8fc97ed701b000023","MaxCabinet":150,"MaxPowerLoad":100},
  					{"Name":"机房2","UnitID":"222f0915-1032-465c-b6ee-943ffbbac933","Description":"机房2的说明","_id":"592255c8fc97ed701b000022","MaxCabinet":250,"MaxPowerLoad":200}]},
  					{"Name":"楼层2","Description":"楼层2的说明","_id":"592255c8fc97ed701b00001e",
  					"Unit":[{"Name":"机房1","UnitID":"333f0915-1032-465c-b6ee-943ffbbac567","Description":"机房1的说明",
  					"_id":"592255c8fc97ed701b000020","MaxCabinet":150,"MaxPowerLoad":100},
  					{"Name":"机房2","UnitID":"444f0915-1032-465c-b6ee-94345bbac9c1","Description":"机房2的说明","_id":"592255c8fc97ed701b00001f","MaxCabinet":250,"MaxPowerLoad":200}
  					]}]}]}];
      			
      			response = $scope.treeData;
      		}
      		
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
      		 
	      }).error(function (err) {
	          commonService.showMsg("error",err.message);
	      });
      };
  	  
		/***************************************/
  	  	$scope.swithTabs();
  	  	$scope.initDatacenter();
		
  }

})();
