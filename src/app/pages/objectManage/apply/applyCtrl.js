
(function () {
  'use strict';
  
  angular.module('BlurAdmin.pages.objectManage.apply')
      .controller('applyCtrl', applyCtrlFunc);

  /** @ngInject */
  function applyCtrlFunc($scope, $filter, $timeout , $http, $localStorage,toastr, $state, commonService, httpService,$stateParams) {
      
	  var config = { headers: {
          "Authorization": $localStorage.authKey
      }}
	  
	  $scope.statusList = [{"id":"Product","name":"Product"},{"id":"Test","name":"Test"},{"id":"Development","name":"Development"}];
  	  $scope.smartTablePageSize = 15;
  	  $scope.readStatus = false ;
  	  var datacenter = $stateParams.datacenter;
	  //应用列表查询
      $scope.initApply = function (){
      	var params ={};
	  		if(datacenter!=null && datacenter!=''){
	  			params.datacenter=datacenter;
	  		}
      	httpService.get('/application' , params,config ,function (response) {
            $scope.DataList = response;
           // angular.forEach($scope.DataList, function (item,i) {
          	//  item.LastTS = moment(item.LastTS * 1000).format("YYYY-MM-DD");
          	  
			 // });
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
 		 
 		httpService.post("/application" ,  $scope.apply , config ,function (response) {
        	console.log("response:--->"+response);
        	commonService.showMsg("success","应用操作成功!");
        	
        	 $scope.panelBack();
        	 $scope.initApply();
        	 
        });
  	  };
  	  
  	  
  	 /**
       * 应用删除
       */
      $scope.delApply = function (apply){
    	  
    		var modalInstance = commonService.confirm("确认要删除所选应用？");
        	modalInstance.result.then(function (result) {
                //console.log(result); //result关闭是回传的值   
                //alert("ok");
        		/*$http.delete(IG.api +'/application?device='+apply.name , config )
        		.success(function (response) {
        			commonService.showMsg("success","应用删除成功!");
    				$scope.initApply();
                     
                }, 1000).error(function (err) {
                	
               });*/
        		httpService.delete("/application?device="+apply.name , null , config ,function (response) {
                	console.log("response:--->"+response);
                	commonService.showMsg("success","应用删除成功!");
                	$scope.initApply();
                });
        		
             }, function (reason) {    
                 console.log(reason);//点击空白区域，总会输出backdrop click，点击取消，则会暑促cancel    
                 //alert("cancel");
             });  
      };
  	  
  	  
		/***************************************/
  	  	$scope.initApply();
		
  	  	//打开后返回顶部
        $timeout(function() {
            $(window).scrollTop(0,0);
        }, 200);
  }

})();
