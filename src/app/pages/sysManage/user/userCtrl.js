
(function () {
  'use strict';
  
  angular.module('BlurAdmin.pages.sysManage.user')
      .controller('userCtrl', userCtrlFunc);

  /** @ngInject */
  function userCtrlFunc($scope, $filter, $http, $localStorage,toastr, $uibModal, commonService) {
      
	  var config = { headers: {
          "Authorization": $localStorage.authKey
      }}
	  $scope.readStatus = false ;
	  
      $scope.initData = function (){
      	
      	$http.get(IG.api + '/user/list' , config )
          .success(function (response) {
        	  
              $scope.userList = response;
              angular.forEach($scope.userList, function (item,i) {
              	 delete item._id;
              	 delete item.password;
  			  });
              $scope.smartTablePageSize = 15;

	      }).error(function (err) {
	          console.log(err);   
	          commonService.showMsg("error",err.message);
	      });
      };
      
      /**
       * 用户删除
       */
      $scope.delUser = function (user){
    	  
    		var modalInstance = commonService.confirm("确认要删除所选用户？");
        	modalInstance.result.then(function (result) {    
                //console.log(result); //result关闭是回传的值   
                //alert("ok");
        		$http.post(IG.api + '/user/del' , user , config )
                .success(function (response) {
                	 console.log("response:--->"+response);
                	commonService.showMsg("success","用户删除成功!");
                	$scope.initData();
                	
                }).error(function (err) {
      	          console.log(err);   
      	          commonService.showMsg("error",err.message);
      	      	});
                
             }, function (reason) {    
                 console.log(reason);//点击空白区域，总会输出backdrop click，点击取消，则会暑促cancel    
                 //alert("cancel");
             });  
      };
      
      $scope.roleData=[];
      
      /**
       * 用户编辑
       */
      $scope.editUser = function (user){
    	  //$scope.userEntity = user ;
    	  $scope.editPanel = true ;
   		  $scope.panelTtile = '编辑用户' ;
   		  $("#username").val(user.username);
   		  $("#password").val(user.password);
   		  $("#email").val(user.email);
   		  $("#_id").val(user._id);
   		  $scope.readStatus = true ;
   		  roleListInit(user.roleList );
      };
      
      /**
       * 用户新增
       */
      $scope.addUser = function (){
		$scope.editPanel = true ;
		$scope.panelTtile = '新增用户' ;
		$("#username").val("");
		$scope.readStatus = false ;
		$("#password").val("");
		$("#email").val("");
		$("#_id").val("");
		roleListInit();
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
 	 $scope.userSave = function (){
 		 
 		var username = $("#username").val();
 		var password = $("#password").val();
 		var email = $("#email").val();
 		var _id = $("#_id").val();
 		
 		 if(!username){
 			commonService.showMsg("error","请输入用户名称！");
 			return;
 		 }
 		if(!$scope.readStatus && !password){
 			commonService.showMsg("error","请输入登陆密码！");
 			return;
 		 }
 		
 		if(!email){
 			commonService.showMsg("error","请输入用户email！");
 			return;
 		 }
 		
 		if( $scope.checkedRows.length == 0){
 			commonService.showMsg("error","请选择用户分配的角色！");
 			return;
 		 }
 		 		
 		 var params = {
				 "username": username,
				 "password": password,
				 "email": email,
				 //"_id": _id,
				 "roleList":  $scope.checkedRows
 		 }
 		 
 		if($scope.readStatus){
 			delete params.password ;
 		 }
 		 
 		$http.post(IG.api + "/user/add" , params , config )
        .success(function (response) {
        	console.log("response:--->"+response);
        	commonService.showMsg("success","用户操作成功!");
        	
        	 $scope.panelBack();
        	 $scope.initData();
        	 
        }).error(function (err) {
	          console.log(err);
	          commonService.showMsg("error",err.message);
	      });
  	  };
  	  
  	  //角色列表初始化
  	  $scope.checkedCount = 0 ;
  	  $scope.checkedRows = [] ;
  	  function roleListInit(userRoleList ){
  		 $scope.checkedCount = 0 ;
  	  	 $scope.checkedRows = [] ;
  		  
  		$http.get(IG.api + '/role/list' , config )
        .success(function (response) {
            angular.forEach( response , function(role,index){
            	role.selected = false ;
            	if(userRoleList && userRoleList.length>0){
            		angular.forEach(userRoleList, function(roleName,i){
                      	if(roleName == role.roleName){
                      		role.selected = true ;
                      		$scope.checkedCount ++ ;
                      		$scope.checkedRows.push(roleName);
                      		return;
                         }
                  	});
                }
        	});
            $scope.roleData =  angular.copy(response);
            
            var allcheckbox=$("th :checkbox");
     		 if($scope.checkedRows.length == $scope.roleData.length){
     			allcheckbox.prop("checked", true);
     		 }else{
     			allcheckbox.prop("checked", false);
     		 }
            
	      }).error(function (err) {
	          console.log(err);
	          commonService.showMsg("error",err.message);
	      });
  	  }
  	  
  	 /**
	   * 角色列表 全选
	   */
  	  $scope.checkAll = function (e){
  		  $scope.checkedRows = [] ;
  		  var checkStatus = e.target.checked;
  		  var allcheckbox=$("th :checkbox");
          allcheckbox.prop("checked", checkStatus);
         
          var rowcheckboxs = $("input:checkbox:gt(0)");
          rowcheckboxs.prop("checked", checkStatus);
          
          angular.forEach($scope.roleData, function(item,i){
        	  item.selected = checkStatus;
          });
          
         if(checkStatus){
        	angular.forEach($scope.roleData, function(role,i){
               	$scope.checkedRows.push(role.roleName);
           	});
   		 }else{
   			 $scope.checkedRows = [] ;
   		 }
         $scope.checkedCount = $scope.checkedRows.length;
  	  };
  	  
  	 /**
	   * 角色列表 列表单个选择
	   */
  	  $scope.addCheck = function (e,row){
  		 var checkStatus = e.target.checked;
  		 if(checkStatus){
  			 $scope.checkedRows.push(row.roleName) ;
  		 }else{
  			 angular.forEach($scope.checkedRows, function(roleName,i){
  				 if(roleName == row.roleName){
  					$scope.checkedRows.splice(i,1); 
  	  			 }
  	      	 });
  		 }
  		 
  		 $scope.checkedCount = $scope.checkedRows.length;
  		
  		 var allcheckbox=$("th :checkbox");
  		 if($scope.checkedCount == 0|| $scope.checkedCount == $scope.roleData.length){
  			allcheckbox.prop("checked", checkStatus);
  		 }else{
  			allcheckbox.prop("checked", false);
  		 }
  	  };
  	  
  	  
		/***************************************/
		$scope.initData();
		
		
  }

})();