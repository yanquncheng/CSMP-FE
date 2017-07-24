
(function () {
  'use strict';
  
  angular.module('BlurAdmin.pages.demos')
      .controller('demosCtrl', demosCtrlFunc);

  /** @ngInject */
  function demosCtrlFunc($scope, $filter, $http, $localStorage,$timeout, $uibModal, commonService, httpService, $state) {
      
	  var config = { headers: {
          "Authorization": $localStorage.authKey
      }}
	  
	  
	  $scope.dataList = [];
	  $scope.theadList = [];
	  $scope.smartTablePageSize = 15;
	  //列表初始化
      $scope.initData = function (){
    	  httpService.get('/demos' , null,config ,function (response) {
    		  $scope.dataList = response;
    		  if($scope.dataList && $scope.dataList.length>0){
    			  for(var key in $scope.dataList[0] ){
    				  var thead = {} ;
    				  thead.text = angular.copy(key) ;
    				  $scope.theadList.push(thead);
    			  }
    		  }
	      });
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
   		    			item.page = "app/pages/objectManage/tabs/template_"+item.template+".html";
   		    		}else{
   		    			angular.forEach(item.tabDetail, function(det, idx){
   		    				det.id = id++;
   		    				det.page = "app/pages/objectManage/tabs/template_"+det.template+".html";
   		    			});
   		    		}
   		    	});
   	 		   
   		    	param.tabs = tabs ;
   		    	param.backUrl = "dashboard.demos" ;
   	 		   // $state.go('dashboard.demos.demoDetail', {param: param});
   	 		    $state.go('dashboard.objectManage.details', {param: param});
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
