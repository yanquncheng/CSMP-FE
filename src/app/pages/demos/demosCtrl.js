
(function () {
  'use strict';
  
  angular.module('BlurAdmin.pages.demos')
      .controller('demosCtrl', demosCtrlFunc);

  /** @ngInject */
  function demosCtrlFunc($scope, $stateParams, $filter, $http, $localStorage,$timeout, $uibModal, commonService, httpService, $state) {
      
	  var config = { headers: {
          "Authorization": $localStorage.authKey
      }}
	  
    console.log("DEMO-stateParams="+ JSON.stringify($stateParams));
	  
	  $scope.dataList = [];
	  $scope.theadList = [];
	  $scope.smartTablePageSize = 15;
	  //列表初始化
      $scope.initData = function (){
    	  httpService.get('/demos' , null,config ,function (response) {
    		  var dataMap = {};
    		  var dataMap = response;
    		  if(dataMap){
    			  $scope.dataList = dataMap.tableBody ;
    			  $scope.theadList = dataMap.tableHead ;
    		  }
	      });
      };

      //返回
      $scope.back = function (){
        var backUrl = "dashboard.objectManage.array";
        console.log($stateParams);
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
     
      
  	  
      //点击查看
   	 $scope.detail = function ( row ){
   		if(!row.device){
   			row.device = row.host_name ;
   		}
   		var param = {"storage": row };
   	    httpService.get('/menu/ObjectManage/demos', {}, config, function (response) {
   	    	if(typeof response == 'string'){
   	          commonService.showMsg("error", response);
   	    	}else{
   		    	var tabs = response;
   		    	var id = 1;
   		    	angular.forEach(tabs, function(item, index){
   	    			item.id = id++;
   		    		if(!item.hasDetail){
   		    			item.page = "app/pages/templates/template_"+item.template+".html";
   		    		}else{
   		    			angular.forEach(item.tabDetail, function(det, idx){
   		    				det.id = id++;
   		    				det.page = "app/pages/templates/template_"+det.template+".html";
   		    			});
   		    		}
   		    	});
   	 		   
   		    	param.tabs = tabs ;
   		    	param.backUrl = "dashboard.demos" ;
   	 		   // $state.go('dashboard.demos.demoDetail', {param: param});
   	 		    $state.go('dashboard.templatedetails', {param: param});
   	    	}
   	    });
   	 };
  	  
		/***************************************/
		$scope.initData();
		
		
		//打开后返回顶部
        $timeout(function() {
            $(window).scrollTop(0,0);
        }, 200);
		
  }

})();
