(function () {
  'use strict';

  angular.module('BlurAdmin.pages.Automation.ServiceCapacityProvide')
    .controller('ServiceCapacityProvideCtrl', ServiceCapacityProvideCtrl);

  /** @ngInject */
  function ServiceCapacityProvideCtrl($scope, $filter, $http, $localStorage, httpService) {
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
      var params;
      httpService.get("/auto/resource/purposes", params, config, function (response) {
        $scope.useManagement = response;
      });
 
      httpService.get("/auto/resource/pools", params, config, function (response) {
        $scope.pools = response;
      });
 
      // get datacenter and location infomation
      httpService.get("/matadata/datacenter", params, config, function (response) {
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
      });
  
       
    };

    $scope.saveData = function (dataname,value, valuetype) {
      if ( valuetype == 'json' )
        var jsonObj = JSON.parse(value);
      else 
        var jsonObj = value;


        vm.resourceInfoItem[dataname] = jsonObj; 
       

      console.log(vm.resourceInfoItem);
    }

    $scope.resourceRowAdd = function() { 
      
      var recordItem = {};
      recordItem.purpose = vm.resourceInfoItem.purpose;
      recordItem.pool = vm.resourceInfoItem.pool;
      recordItem.capacityGB = vm.resourceInfoItem.capacityGB; 
      recordItem.appCode = vm.resourceInfoItem.appCode; 
      recordItem.appName = vm.resourceInfoItem.appname; 
      
      

      $scope.resourceInfo.push( recordItem ); 
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
    }

    $scope.infoConfirm = function() {
      resultRecord["resourceInfo"] = $scope.resourceInfo; 
    }


    $scope.resourceRowRemove = function(index) {
      $scope.resourceInfo.splice(index, 1); 
    };
    $scope.hostInfoRowRemove = function(index) {
      $scope.hostInfo.hosts.splice(index, 1); 
    };
    $scope.hbaRowRemove = function(index) {
      $scope.hbas.splice(index,1); 
    }


    // --- Host Info
    $scope.addHostHBA = function() { 
      var recordItem = {}; 
      recordItem.WWN = "wwn";
      recordItem.alias = "alias";
      $scope.hbas.push(recordItem); 
    } 
    
    $scope.initData();
 

  }

})();