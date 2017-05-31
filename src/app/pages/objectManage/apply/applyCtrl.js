
(function () {
  'use strict';
  
  angular.module('BlurAdmin.pages.objectManage.apply')
      .controller('applyCtrl', applyCtrlFunc);

  /** @ngInject */
  function applyCtrlFunc($scope, $filter, $timeout , $http, $localStorage,toastr, $state, commonService) {
      
	  var config = { headers: {
          "Authorization": $localStorage.authKey
      }}
	  
	  $scope.statusList = [{"id":"Product","name":"Product"},{"id":"Test","name":"Test"},{"id":"Development","name":"Development"}];
  	$scope.smartTablePageSize = 15;
  	$scope.readStatus = false ;
	  //应用列表查询
      $scope.initApply = function (){
      	
      	$http.get(IG.api + '/application' , config )
          .success(function (response) {
        	  
              $scope.DataList = response;
             // angular.forEach($scope.DataList, function (item,i) {
            	//  item.LastTS = moment(item.LastTS * 1000).format("YYYY-MM-DD");
            	  
  			 // });
              

	      }).error(function (err) {
	          console.log(err);   
	          commonService.showMsg("error",err.message);
	          $scope.DataList = err ;
	      });
      };
      

     /**
      * 应用编辑
      */
  	  $scope.apply = {};
      $scope.editApply = function (apply){
    	  $scope.apply = {};
    	  $scope.apply = angular.copy(apply);
    	  $scope.editPanel = true ;
   		  $scope.panelTtile = '应用编辑' ;
				$scope.readStatus = true ;
   		  
      };
      
      /**
       * 应用新增
       */
      $scope.addApply = function (){
    		$scope.apply = {};
    		$scope.apply.status = $scope.statusList[0].id;
				$scope.editPanel = true ;
				$scope.panelTtile = '应用新增' ;
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
 	 $scope.panelSave = function (){
 	 	
 		if(!$scope.apply.name){
 			commonService.showMsg("error","请输入应用名称！");
 			return;
 		 }
 		 
 		$http.post(IG.api + "/application" ,  $scope.apply , config )
        .success(function (response) {
        	console.log("response:--->"+response);
        	commonService.showMsg("success","应用操作成功!");
        	
        	 $scope.panelBack();
        	 $scope.initApply();
        	 
        }).error(function (err) {
	          console.log(err);
	          commonService.showMsg("error",err.message);
	      });
  	  };
  	  
  	  
		/***************************************/
  	  	$scope.initApply();
		
		
  }

})();
