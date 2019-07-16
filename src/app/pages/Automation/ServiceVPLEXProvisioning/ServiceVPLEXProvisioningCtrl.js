(function () {
  'use strict';

  var app=angular.module('BlurAdmin.pages.Automation.ServiceCapacityProvide',['ngWebSocket']);
  
  app.factory('MyData', function ($websocket) {
                // Open a WebSocket connection
                var dataStream = $websocket('ws://123.56.114.249:9000');
 
                var collection = [];
 
                dataStream.onMessage(function (message) {
						console.log(message+"******message");
                    collection.push(message);
                });
 
                var methods = {
                    collection: collection,
                    get: function () {
                        dataStream.send(JSON.stringify({action: 'get'}));
                    }
                };
                
                return methods;
            })
  app.controller('ServiceVPLEXProvisioningCtrl', ServiceVPLEXProvisioningCtrl);
  var showDrSameCitySwitch=false;
  var showDrDiffCitySwitch = false;
  var showDrBackupSwitch = false;
  var showAppVerificationSameCitySwitch = false;
  var showAppVerificationDiffCitySwitch = false;
  var showAppVerificationLocalCdp = false;
  var success = false;
  var check = false;

  /** @ngInject */
  function ServiceVPLEXProvisioningCtrl($scope,$filter, $http, $localStorage, httpService, $stateParams,$interval,$rootScope, MyData) {		
	$rootScope.MyData = MyData;
	console.log(MyData.collection+"*********MyData")
    $scope.id=$stateParams.id;
    console.log($scope.id+"$scope.id")
	
    $scope.bValue = '所有';
    $scope.aValue = '';
    $scope.change = function() {
      var value = $('#select').find('option:selected').text();
      $scope.bValue = value
      $("#input").val(value)
    };
    $scope.ccc = function() {

      console.log('123123123123')
    };
    var vm = this;

    // automation paramater from page
    $scope.resourceInfo = []; 
    $scope.hostInfo = {};
 
    var resultRecord = {};
    
    vm.resourceInfoItem = {};


    $scope.hosthbas = [];  // for display in the page.
    $scope.hbas = []; 

    console.log($localStorage.authKey);
    var config = {
      headers: {
        "Authorization": $localStorage.authKey
      }
    }
    $scope.smartTablePageSize = 15;

    $scope.initData = function () {
      //    	config.params=params;
	  httpService.get("/auto/service/block/provisioning/getinfo", "", config, function (response) {
			$scope.ApplicationList = response.Application;
			$scope.AppNames = response.StorageResourcePool;
			angular.forEach(response.ProtectLevel,function(data,index,array){
				if(data.name=="DR_SameCity"){
					if(data.value=="true"){
						$scope.showDrSameCity = true;	
					}else if(data.value=="false"){
						$scope.showDrSameCity = true;
						showDrSameCitySwitch=true;					
					}else if(data.value="disable"){
						$scope.disableSameCity = true;
					}			
				}else if(data.name=="DR_DiffCity"){
					if(data.value=="true"){
						$scope.showDrDiffCity = true;					
					}else if(data.value=="false"){
						$scope.showDrDiffCity = true;
						showDrDiffCitySwitch = true;					
					}else if(data.value="disable"){
						$scope.disableDrDiffCity = true;
					}				
				}else if(data.name=="Backup"){
					if(data.value=="true"){
						$scope.showDrBackup = true;	
					}else if(data.value=="false"){
						$scope.showDrBackup = true;
						showDrBackupSwitch = true;				
					}else if(data.value="disable"){
						$scope.disableDrBackup = true;
					}			
				}else if(data.name=="AppVerification_SameCity"){
					if(data.value=="true"){
						$scope.showAppVerificationSameCity = true;
						
					}else if(data.value=="false"){
						$scope.showAppVerificationSameCity = true;
						showAppVerificationSameCitySwitch = true;
						
					
					}else if(data.value="disable"){
						$scope.disableAppVerificationSameCity = true;
					}
				
				}else if(data.name=="AppVerification_DiffCity"){
					if(data.value=="true"){
						$scope.showAppVerificationDiffCity = true;
						
					}else if(data.value=="false"){
						$scope.showAppVerificationDiffCity = true;
						showAppVerificationDiffCitySwitch = true;
						
					
					}else if(data.value="disable"){
						$scope.disableAppVerificationDiffCity = true;
					}
				
				}else if(data.name=="AppVerification_LocalCdp"){
					if(data.value=="true"){
						$scope.showLocalCdp = true;
						
					}else if(data.value=="false"){
						$scope.showLocalCdp = true;
						showAppVerificationLocalCdp = true;
						
					
					}else if(data.value="disable"){
						$scope.disableLocalCdp = true;
					}
				
				}
			})
		check = true;
      });

	  
      var params;
     // httpService.get("/auto/resource/vplex/appnames", params, config, function (response) {
        //$scope.AppNames = response;
      //});
 
     // httpService.get("/auto/resource/pools", params, config, function (response) {
       // $scope.pools = response;
      //});
 
      // get datacenter and location infomation
      /**httpService.get("/matadata/datacenter", params, config, function (response) {
        $scope.locationInfos = [];
        for ( var i in response ) {
          var locationItem = response[i];

          var dcName = locationItem.Name;
          for ( var j in locationItem.Building ) {
            var buildingItem = locationItem.Building[j];
            var buildingName = buildingItem.Name;
            for ( var z in buildingItem.Floor ) {
              var floorItem = buildingItem.Floor[z];
              var floorName = floorItem.Name;
              for ( var x in floorItem.Unit ) {
                var unitItem = floorItem.Unit[x];
                var unitName = unitItem.Name;
                var unitID = unitItem.unitID;
                
                var locationInfoItem = {};
                locationInfoItem["name"] = dcName + ' - ' + buildingName + ' - ' + floorName + ' - ' + unitName;
                locationInfoItem["desc"] = unitItem.Description;
                locationInfoItem["UnitID"] = unitItem.UnitID; 
                $scope.locationInfos.push(locationInfoItem);
              }

            }
          } 
        } 
      });**/
  

      // Initiator some of variable.
      $scope.DR_SameCity = true;
      $scope.DR_DiffCity = true;
      $scope.Backup = true;
      $scope.AppVerification_SameCity = false;
      $scope.AppVerification_DiffCity = false;
	  $scope.AppVerification_LocalCdp = false;
       
    };

    $scope.saveData = function (dataname,value, valuetype) {
      if ( valuetype == 'json' )
        var jsonObj = JSON.parse(value);
      else 
        var jsonObj = value;
      vm.resourceInfoItem[dataname] = jsonObj; 
      console.log(vm.resourceInfoItem+"00000");

    }
    $scope.resourceRowAdd = function() {
	  
      var recordItem = {};
      //recordItem.purpose = vm.resourceInfoItem.purpose;
      //recordItem.pool = vm.resourceInfoItem.pool;
      //recordItem.capacityGB = vm.resourceInfoItem.capacityGB; 
      //recordItem.appCode = vm.resourceInfoItem.appCode; 
      //recordItem.appName = vm.resourceInfoItem.appname; 
	  if(JSON.stringify(vm.resourceInfoItem)=="{}"){
	      alert("请选择资源池！");
	  }else{
		  recordItem.pool = vm.resourceInfoItem.appname.name;
		  recordItem.capacityGB = $('#capacityGb').val(); 
		  recordItem.name = vm.resourceInfoItem.appname.name;
		  recordItem.resourceLevel = vm.resourceInfoItem.appname.resourceLevel;
		  recordItem.resourceType = vm.resourceInfoItem.appname.resourceType;
		  recordItem.TotalCapacity = vm.resourceInfoItem.appname.TotalCapacity;
		  recordItem.UsedCapacity = vm.resourceInfoItem.appname.UsedCapacity;
		  if($scope.showDrSameCity){
				recordItem.showDrSameCityTable = ($('#DR_SameCitySwitch .bootstrap-switch .bootstrap-switch-container')[0].style['margin-left']=='0px');
			}else{
				recordItem.showDrSameCityTable = false;
			}
			if($scope.showDrDiffCity){
				recordItem.showDrDiffCityTable = ($('#DR_DiffCitySwitch .bootstrap-switch .bootstrap-switch-container')[0].style['margin-left']=='0px');
			}else{
				recordItem.showDrDiffCityTable = false;
			}
			if($scope.showDrBackup){
				recordItem.showDrBackupTable  = ($('#DR_BackupSwitch .bootstrap-switch .bootstrap-switch-container')[0].style['margin-left']=='0px');
			}else{
				recordItem.showDrBackupTable  = false;
			}
			if($scope.showAppVerificationSameCity){
				recordItem.showAppVerificationSameCityTable = ($('#AppVerification_SameCitySwitch .bootstrap-switch .bootstrap-switch-container')[0].style['margin-left']=='0px');
			}else{
				recordItem.showAppVerificationSameCityTable = false;
			}
			if($scope.showAppVerificationDiffCity){
				recordItem.showAppVerificationDiffCityTable =($('#AppVerification_DiffCitySwitch .bootstrap-switch .bootstrap-switch-container')[0].style['margin-left']=='0px');
			}else{
				recordItem.showAppVerificationDiffCityTable = false;
			}
			if($scope.showLocalCdp){
				recordItem.showAppVerificationLocalCdpTable =($('#AppVerification_DiffCitySwitch .bootstrap-switch .bootstrap-switch-container')[0].style['margin-left']=='0px');
			}else{
				recordItem.showAppVerificationLocalCdpTable = false;
			}
		  //$scope.showDrSameCityTable  = $scope.showDrSameCity;
		  //$scope.showDrDiffCityTable  = $scope.showDrDiffCity;
		  //$scope.showDrBackupTable  = $scope.showDrBackup;
		  //$scope.showAppVerificationSameCityTable  = $scope.showAppVerificationSameCity;
		  //$scope.showAppVerificationDiffCityTable  = $scope.showAppVerificationDiffCity;
		  $scope.resourceInfo.push(recordItem);
		  $scope.SpecificationOptionList=$scope.resourceInfo; 
	  }
    }

    
    $scope.hostRowAdd = function() {        
      for ( var i in $scope.hbas ) {
        var recordItem = {};
        recordItem.clusterName = vm.resourceInfoItem.clusterName;
        recordItem.location = vm.resourceInfoItem.location;
        recordItem.hostName = vm.resourceInfoItem.hostName;
        recordItem.osType = vm.resourceInfoItem.osType; 
        recordItem.WWN = $scope.hbas[i].WWN;
        recordItem.alias = $scope.hbas[i].alias;
        $scope.hosthbas.push( recordItem ); 
      }
      $scope.hostInfo.clusterName = vm.resourceInfoItem.clusterName;
      $scope.hostInfo.location = vm.resourceInfoItem.location;
      if ( $scope.hostInfo.hosts === undefined ) 
        $scope.hostInfo.hosts = [];

      var recordItem = {}; 
      recordItem.hostName = vm.resourceInfoItem.hostName;
      recordItem.osType = vm.resourceInfoItem.osType; 
      
      var hbas = [];
      for ( var i in $scope.hbas ) {
        var item = $scope.hbas[i];
        var hbaItem = {};
        hbaItem.WWN = item.WWN;
        hbaItem.alias = item.alias;
        hbas.push(hbaItem);
      }
      recordItem.hbas = hbas;
 
      $scope.hostInfo.hosts.push( recordItem ); 

      console.log(JSON.stringify($scope.hostInfo));
    }

    $scope.resourceRowReset = function() {   
      $scope.selecedItemPurpose = [];
      $scope.selecedItemPool = "";
      $scope.capacity = "";
      $scope.appCode = "";
      $scope.appName = "";
	  $('#capacityGb').val("") ;	  
	  $scope.resourceInfo.splice(0,$scope.resourceInfo.length);  
	  
    }

    $scope.infoConfirm = function() {
      resultRecord["resourceInfo"] = $scope.resourceInfo; 
    }


    $scope.resourceRowRemove = function(e) {
	  console.log(e.$index);
      $scope.resourceInfo.splice(e.$index, 1); 
    };
    $scope.hostInfoRowRemove = function(index) {
      $scope.hostInfo.hosts.splice(index, 1); 
    };
    $scope.hbaRowRemove = function(index) {
      $scope.hbas.splice(index,1); 
    }
	//$scope.$baWizardController.nextTab = function(){
	//	console.log("vm.tabNum");
	
	//}
	$scope.CallParentMethod = function(){
	   console.log("indexTab");
	}
	$scope.childmethod = function(){
	   console.log("indexTab");
	}

    // --- Host Info
    $scope.addHostHBA = function() { 
      var recordItem = {}; 
      recordItem.WWN = "wwn";
      recordItem.alias = "alias";
      $scope.hbas.push(recordItem); 
    } 
	var json = {};
	var requests = [];
	
	
    var tabIndex = false;
    $scope.$on('ToBrotherController', function(event, msg) {
			//json.appname = $scope.bValue; 
			json.appname = $('#input').val(); 
			json.opsType = "";
			
			requests = [];
			angular.forEach($scope.resourceInfo,function(data,index,array){
				    var request = {};
					request.usedfor = "";
					request.capacity = data.capacityGB;
					var storageResourcePool = {};
					var protectLevel = {};
					storageResourcePool.name = data.name;
					storageResourcePool.resourceLevel = data.resourceLevel;
					storageResourcePool.resourceType = data.resourceType;
					storageResourcePool.TotalCapacity = data.TotalCapacity;
					storageResourcePool.UsedCapacity = data.UsedCapacity;
					request.StorageResourcePool = storageResourcePool;
					//protectLevel.DR_SameCity = $scope.showDrSameCityTable;
					//protectLevel.DR_DiffCity = $scope.showDrDiffCityTable;
					//protectLevel.Backup = $scope.showDrBackupTable;
					//protectLevel.AppVerification_SameCity = $scope.showAppVerificationSameCityTable;
					//protectLevel.AppVerification_DiffCity = $scope.showAppVerificationDiffCityTable;
					if($scope.showDrSameCity){
						protectLevel.DR_SameCity = data.showDrSameCityTable;
					}else{
						protectLevel.DR_SameCity = "disable";
					}
					if($scope.showDrDiffCity){
						protectLevel.DR_DiffCity = data.showDrDiffCityTable;
					}else{
						protectLevel.DR_DiffCity = "disable";
					}
					if($scope.showDrBackup){
						protectLevel.Backup = data.showDrBackupTable;
					}else{
						protectLevel.Backup = "disable";
					}
					if($scope.showAppVerificationSameCity){
						protectLevel.AppVerification_SameCity = data.showAppVerificationSameCityTable;
					}else{
						protectLevel.AppVerification_SameCity = "disable";
					}
					if($scope.showAppVerificationDiffCity){
						protectLevel.AppVerification_DiffCity = data.showAppVerificationDiffCityTable;
					}else{
						protectLevel.AppVerification_DiffCity = "disable";
					}
					if($scope.showLocalCdp){
						json.AppVerification_LocalCdp = data.showAppVerificationLocalCdpTable;
					}else{
						json.AppVerification_LocalCdp = "disable";
					}	
					request.ProtectLevel = protectLevel;
					if(requests.includes(request)==false){
						requests.push(request);	
					}
			})
			json.requests = requests;
			httpService.post("/auto/service/block/provisioning",json,config, function (response) {
			   $scope.actionList = response.AutoInfo.ActionParamaters;
			   $scope.resultList = response.AutoInfo.ActionParamaters;
			   tabIndex = true;
			   json = {};
			   requests =[];
			   //request ={};
			   //storageResourcePool = {};
			   //protectLevel = {};	
			   if(response.resMsg.code!='200'){ 
			      //$("#nextButton").attr("disabled",true);
			   }
			})
    });
	var successIndex = 0;
	var successArray = [];
	/**$scope.timer = $interval(function() {
		  if(tabIndex==true){ 
			   httpService.post("/auto/service/block/provisioning",json,config, function (response) {
				   $scope.actionList = response.AutoInfo.ActionParamaters;
				   $scope.resultList = response.AutoInfo.ActionParamaters;
				   successArray = response.AutoInfo.ActionParamaters;
				   json = {};
				   requests =[];
				   request ={};
				   storageResourcePool = {};
				   protectLevel = {};
				   angular.forEach(response.AutoInfo.ActionParamaters,function(data,index,array){
					  if(data.show=="true"){
						  successIndex = parseInt(successIndex)+1;  
					  }
				   })
				})
				console.log(successIndex);
				console.log(successArray.length);
				if(successIndex!=0){
					if(successIndex == successArray.length){
							$interval.cancel($scope.timer)
					}
				}
			}
	}, 6000);*/
	$scope.clearNoNum = function(){
        
		//先把非数字的都替换掉，除了数字和.
		var result = $('#capacityGb').val();
		result = result.replace(/[^\d.]/g,"");
		//必须保证第一个为数字而不是.
		result = result.replace(/^\./g,"");
		//保证只有出现一个.而没有多个.
		result = result.replace(/\.{2,}/g,"");
		//保证.只出现一次，而不能出现两次以上
		result = result.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
        if(result==""){
			$('#capacityGb').val("1");
		}else{
			$('#capacityGb').val(result);
		}
		

		}

    $scope.initData();

	success =true;
	$interval(function() {
	if(success==true){
	  if($scope.showDrSameCity){
		  if(showDrSameCitySwitch==true){
			$('#DR_SameCitySwitch .bootstrap-switch-small')[0].classList.add('bootstrap-switch-off');
			$('#DR_SameCitySwitch .bootstrap-switch-small')[0].classList.remove('bootstrap-switch-on');
			$('#DR_SameCitySwitch .bootstrap-switch .bootstrap-switch-container')[0].style['margin-left']='-42px';
		  }else{
			$('#DR_SameCitySwitch .bootstrap-switch-small')[0].classList.add('bootstrap-switch-on');
			$('#DR_SameCitySwitch .bootstrap-switch-small')[0].classList.remove('bootstrap-switch-off');
			$('#DR_SameCitySwitch .bootstrap-switch .bootstrap-switch-container')[0].style['margin-left']='0px';
		  }
	  }
	  if($scope.showDrDiffCity){
		  if(showDrDiffCitySwitch==true){
			$('#DR_DiffCitySwitch .bootstrap-switch-small')[0].classList.add('bootstrap-switch-off');
			$('#DR_DiffCitySwitch .bootstrap-switch-small')[0].classList.remove('bootstrap-switch-on');
			$('#DR_DiffCitySwitch .bootstrap-switch .bootstrap-switch-container')[0].style['margin-left']='-42px';
		  }else{
			$('#DR_DiffCitySwitch .bootstrap-switch-small')[0].classList.add('bootstrap-switch-on');
			$('#DR_DiffCitySwitch .bootstrap-switch-small')[0].classList.remove('bootstrap-switch-off');
			$('#DR_DiffCitySwitch .bootstrap-switch .bootstrap-switch-container')[0].style['margin-left']='0px';
		  }
	  }
	  if($scope.showDrBackup){
		  if(showDrBackupSwitch==true){
			$('#DR_BackupSwitch .bootstrap-switch-small')[0].classList.add('bootstrap-switch-off');
			$('#DR_BackupSwitch .bootstrap-switch-small')[0].classList.remove('bootstrap-switch-on');
			$('#DR_BackupSwitch .bootstrap-switch .bootstrap-switch-container')[0].style['margin-left']='-42px';
		  }else{
			$('#DR_BackupSwitch .bootstrap-switch-small')[0].classList.add('bootstrap-switch-on');
			$('#DR_BackupSwitch .bootstrap-switch-small')[0].classList.remove('bootstrap-switch-off');
			$('#DR_BackupSwitch .bootstrap-switch .bootstrap-switch-container')[0].style['margin-left']='0px';
		  }
	  }
	  if($scope.showAppVerificationSameCity){
		  if(showAppVerificationSameCitySwitch==true){
			$('#AppVerification_SameCitySwitch .bootstrap-switch-small')[0].classList.add('bootstrap-switch-off');
			$('#AppVerification_SameCitySwitch .bootstrap-switch-small')[0].classList.remove('bootstrap-switch-on');
			$('#AppVerification_SameCitySwitch .bootstrap-switch .bootstrap-switch-container')[0].style['margin-left']='-42px';
		  
		  }else{
			$("#AppVerification_SameCitySwitch .bootstrap-switch-small")[0].classList.add('bootstrap-switch-on');
			$("#AppVerification_SameCitySwitch .bootstrap-switch-small")[0].classList.remove('bootstrap-switch-off');
			$('#AppVerification_SameCitySwitch .bootstrap-switch .bootstrap-switch-container')[0].style['margin-left']='0px';
		  }
	  }
	  if($scope.showAppVerificationDiffCity){
		  if(showAppVerificationDiffCitySwitch==true){
			$("#AppVerification_DiffCitySwitch .bootstrap-switch-small")[0].classList.add('bootstrap-switch-off');
			$("#AppVerification_DiffCitySwitch .bootstrap-switch-small")[0].classList.remove('bootstrap-switch-on');
			$('#AppVerification_DiffCitySwitch .bootstrap-switch .bootstrap-switch-container')[0].style['margin-left']='-42px';
		  }else{
			$("#AppVerification_DiffCitySwitch .bootstrap-switch-small")[0].classList.add('bootstrap-switch-on');
			$("#AppVerification_DiffCitySwitch .bootstrap-switch-small")[0].classList.remove('bootstrap-switch-off');
			$('#AppVerification_DiffCitySwitch .bootstrap-switch .bootstrap-switch-container')[0].style['margin-left']='0px';
		  }
	  }
	   if($scope.showAppVerificationLocalCdp){
		  if(showAppVerificationLocalCdpSwitch==true){
			$("#AppVerification_LocalCdpSwitch .bootstrap-switch-small")[0].classList.add('bootstrap-switch-off');
			$("#AppVerification_LocalCdpSwitch .bootstrap-switch-small")[0].classList.remove('bootstrap-switch-on');
			$('#AppVerification_LocalCdpSwitch .bootstrap-switch .bootstrap-switch-container')[0].style['margin-left']='-42px';
		  }else{
			$("#AppVerification_LocalCdpSwitch .bootstrap-switch-small")[0].classList.add('bootstrap-switch-on');
			$("#AppVerification_LocalCdpSwitch .bootstrap-switch-small")[0].classList.remove('bootstrap-switch-off');
			$('#AppVerification_LocalCdpSwitch .bootstrap-switch .bootstrap-switch-container')[0].style['margin-left']='0px';
		  }
	  }
   }
   success = false;
   if(success==false&&check==true){
		$interval.cancel($scope.timer)
   }
   }, 300);

  }
  
})();