(function () {
  'use strict';

  angular.module('BlurAdmin.theme.components')
      .controller('modyPasswdCtrl', modyPasswdCtrl);

  /** @ngInject */
  function modyPasswdCtrl($scope, $http , $localStorage , commonService,$uibModalInstance) {
		  var config = { headers: {
	          "Authorization": $localStorage.authKey
	      }}
		   
		var user = $localStorage.user;//把字符串转换成JSON对象  
		
		$scope.oldpassword = user.password;
		$scope.modyPass = {};
		  
	    $scope.modifyPasswd = function() {
	    	if(!$scope.modyPass){
	    		commonService.showMsg("error","请输入密码信息!");
	    		return;
	    	}
	    	
	    	if(!$scope.modyPass.oldPpasswd){
	    		commonService.showMsg("error","请输入原始密码!");
	    		return;
	    	}
	    	
	    	if($scope.modyPass.oldPpasswd!=$scope.oldpassword){
	    		commonService.showMsg("error","原始密码输入错误!");
	    		$scope.modyPass.oldPpasswd = "";
	    		return;
	    	}
	    	
	    	if(!$scope.modyPass.passwd1){
	    		commonService.showMsg("error","请输入新密码!");
	    		return;
	    	}
	    	if(!$scope.modyPass.passwd2){
	    		commonService.showMsg("error","请输入确认密码!");
	    		return;
	    	}
	    	
	    	if($scope.modyPass.passwd1!=$scope.modyPass.passwd2){
	    		commonService.showMsg("error","新密码和确认密码输入不一致!");
	    		$scope.modyPass.passwd2 = "";
	    		return;
	    	}
	    	var params = {
	    			"_id": user._id,
	    			"username": user.username,
	    		    "email":  user.email,
	    			"password": $scope.modyPass.passwd1
	    	};
	    	$http.post(IG.api + '/user/modifyPasswd' , params , config )
	        .success(function (response) {
	        	console.log("response:--->"+response);
	        	commonService.showMsg("success","密码修改成功!");
	        	
	        	$uibModalInstance.close();
	        }).error(function (err) {
		          console.log(err);   
		    });
	    };
  }
})();