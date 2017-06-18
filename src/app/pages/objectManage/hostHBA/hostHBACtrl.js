
(function () {
  'use strict';
  
  angular.module('BlurAdmin.pages.objectManage.hostHBA')
      .controller('hostHBACtrl', hostHBACtrlFunc);

  /** @ngInject */
  function hostHBACtrlFunc($scope, $filter, $timeout , $http, $localStorage,toastr, $state, commonService, $stateParams,httpService,$uibModal) {
      
	  var config = { headers: {
          "Authorization": $localStorage.authKey
      }}
	  $scope.smartTablePageSize = 15;
	  //主机列表查询
  	$scope.initApply = function (){
  		httpService.get("/hba/nohostname", null, config, function (response){
          $scope.DataList = response;
      });
  	};
  	//主键 HBA 保存
  	$scope.saveHostHBA=function(){
			
			var tabledata="";
	  		$("#para_table").find("tr").each(function(){
	        var tdArr = $(this).children();
	        var HBAWWN = "HBAWWN\":\""+tdArr.eq(0).text();//收入类别
	        var ALIAS = "ALIAS\":\""+tdArr.eq(1).text();;//收入金额
	        var HOSTNAME = tdArr.eq(2).find('input').val();//    备注
	        if(HOSTNAME.trim()!=""){
	        	HOSTNAME="HOSTNAME\":\""+HOSTNAME;
	        	if(tabledata!=""){
	        	 tabledata += ",{\""+HBAWWN+"\",\""+ALIAS+"\",\""+HOSTNAME+"\"}";
		        }else{
		         tabledata += "{\""+HBAWWN+"\",\""+ALIAS+"\",\""+HOSTNAME+"\"}"; 
		        }
	        }
	        
	    })
	  		console.log(angular.toJson("["+tabledata+"]",2))
	  		httpService.post('/hba', angular.fromJson("["+tabledata+"]"), config, function (response){
        	console.log("response:--->"+response);
        	commonService.showMsg("success","保存成功!");
        	$scope.initApply();
	      });
  	};
  	
	  $scope.initApply();
  }
})();
