

(function () {
  'use strict';
  
  angular.module('BlurAdmin.pages.objectManage.switchboard')
      .controller('switchDetialCtrl', switchDetialCtrlFunc);

  /** @ngInject */
  function switchDetialCtrlFunc($scope, $timeout , $filter, $http, $localStorage,toastr, $state, commonService, $stateParams, httpService) {
      
	var config = { headers: {
       "Authorization": $localStorage.authKey
    }}
	  
	  //console.log($stateParams);
	  
 	//tabs页
  	$scope.switchTabs = [
                {"id":1,"name":"基本信息","url":"app/pages/objectManage/switchboard/base_info.html"},
                {"id":2,"name":"端口信息","url":"app/pages/objectManage/switchboard/port_info.html"}
	           ];
  //tabs页
  	$scope.fabricTabs = [
                {"id":3,"name":"Zone信息","url":"app/pages/objectManage/switchboard/zone_info.html"}
	           ];
  	
  	$scope.tabs = [] ;
  	
  	 $scope.parmsInfo = {};
 	 $scope.parmsInfo = $stateParams.param;
 	 $scope.datacenter=$stateParams.datacenter;
 	 
  	if(!$scope.parmsInfo){
 		$scope.back();
 	 }else{
 		if($scope.parmsInfo.type=="switch"){
 			$scope.tabs = $scope.switchTabs ;
 			$scope.parmsInfo.title = "序列号" ;
 			$scope.parmsInfo.num = $scope.parmsInfo.device ;
 			
 		}else if($scope.parmsInfo.type=="fabric"){
 			$scope.tabs = $scope.fabricTabs ;
 			$scope.parmsInfo.title = "Fabic WWN" ;
 			$scope.parmsInfo.num = $scope.parmsInfo.fabwwn ;
 			
 		}else{
 			$scope.back();
 		}
 	 }
  	
  	
  	
  //tabs页切换
	 $scope.swithTabs = function (tab){
		 if(!tab){
			tab = $scope.tabs[0];
		 }
		 if(tab.id === 1){		
			 $scope.baseData();
			
		 }else if(tab.id === 2){
			 $scope.portData();
			 
		 }else if(tab.id === 3){
			 $scope.zoneData();
		 }
	 };
  	
 	 $scope.back = function (){
 		$state.go('dashboard.objectManage.switchboard',{param: $scope.parmsInfo,datacenter:$scope.datacenter });
 	 };
 	 
 	 
 	  //基本信息
 	  $scope.baseInfo = {};
      $scope.baseData = function (){
      	
      	httpService.get('/switch?device='+$scope.parmsInfo.device , null,config ,function (response) {
  		  if(response instanceof Array){
  			$scope.baseInfo = response[0] ;
  		  }else{
  			$scope.baseInfo = response ;
  		  }
      	  //$scope.baseInfo = response ;
      	 // $scope.baseInfo.LastTS = moment($scope.baseInfo.LastTS * 1000).format("YYYY-MM-DD");
      	  //$scope.baseInfo = {"device":"DS_6520B-10000027F84A8E9A","alias":"xxx","devicesn":"AMS14520158","vendor":"Brocade","model":"Brocade 6520","ip":"172.8.188.80","devdesc":"Fibre Channel Switch","Localtion":"xxxx","LastTS":"1467373748","#TotalPort":100,"#FreePort":10,"#ConnHBAPort":20,"#ConnStoragePort":20,"#ILSPort":20,"#OtherPort":10,"#UsedPort":101,"info":{"ability":{"maxSlot":"111","maxPorts":"1000"},"assets":{"no":"asset0001","purpose":"SAP System","department":"Marketing","manager":"zhangsan"},"maintenance":{"vendor":"EMC","contact":"az@emc.com","purchaseDate":"2010/1/1","period":3}}};
      	  $scope.initChar();
      	  
	      });
      };
      
      
      //端口信息
      $scope.portList = [];
      $scope.portData = function (){
      	
      	httpService.get('/switch/ports?device='+$scope.parmsInfo.device ,null, config ,function (response) {
     	   
      	  $scope.portList = response ;
      	  angular.forEach($scope.portList, function (item) {
      		  if(item.relaZones){
      			  var relaZoneList = item.relaZones.split(",");
      			  tem.relaZoneList = relaZoneList ;
      		  }
  			});
      	  //
	      });
      };
      
      // Zone信息
      $scope.zoneList = [];
      $scope.zoneData = function (){
      	
      	httpService.get('/fabric/zone?fabwwn='+$scope.parmsInfo.fabwwn ,null, config,function (response) {
      	  
      	  angular.forEach(response, function (item,i) {
  				angular.forEach(item.zonemembers, function (zone) {
  					zone.device = item.device ;
  					zone.zsetname = item.zsetname ;
  					zone.fabricname = item.fabricname ;
  					zone.zname = item.zname ;
  					$scope.zoneList.push(zone);
      			});
  			});
	      } );
      };
      
      
      
      $scope.initChar = function (){
    	  var data = [];
    	  if($scope.baseInfo && $scope.baseInfo.info && $scope.baseInfo.info.ability){
    		  var maxSlot = $scope.baseInfo.info.ability.maxSlot ? $scope.baseInfo.info.ability.maxSlot : 0 ;
    		  var maxPorts = $scope.baseInfo.info.ability.maxPorts ? $scope.baseInfo.info.ability.maxPorts : 0 ;
    		  var UsedPort = $scope.baseInfo['#UsedPort'] ? $scope.baseInfo['#UsedPort'] : 0 ;
    		  data.push(UsedPort);
    		  data.push(maxSlot);
    		  data.push(maxPorts);
    	  }
    	  if(data.length==0){
    		  data = [0, 0, 0];
    	  }
    	  
    	  $timeout(function () {
    		  new Chartist.Bar('.ct-chart', {
        		  labels: ['使用数量', '满配Slot数量', '满配数量'],
        		  series: [ data  ]
        		}, {
        		  seriesBarDistance: 10,
        		  reverseData: true,
        		  horizontalBars: true,
        		  axisY: {
        		    offset: 70
        		  }
        		});
    	  });
    	  
      }
     
		/***************************************/
		//$scope.initData();
      $scope.swithTabs();
      
    //打开后返回顶部
      $timeout(function() {
          $(window).scrollTop(0,0);
      }, 200);
		
  }

})();
