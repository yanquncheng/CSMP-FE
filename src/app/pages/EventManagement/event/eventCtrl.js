
(function () {
  'use strict';
  
  angular.module('BlurAdmin.pages.EventManagement.event')
      .controller('eventCtrl', eventCtrlFunc);
	
  /** @ngInject */
  function eventCtrlFunc($scope, $filter, $http, $localStorage,toastr, $uibModal, commonService) {
  	 console.log($localStorage.authKey);
      var config = { headers: {
          "Authorization": $localStorage.authKey
      }}
      $scope.smartTablePageSize = 15;
      $scope.initData = function (params){
      	config.params=params;
      	$http.get(IG.api + '/events', config )
          .success(function (response) { 
              $scope.DataArrayList = response;  
           for ( var i in response ) {
           		var item = response[i];
           		if(item.timestamp){  //格式化列表日期格式
           			item.timestamp= moment(item.timestamp*1000).format("YYYY-MM-DD HH:mm:ss");
           		}
           }
	      }).error(function (err) {
	          console.log(err);   
	      });
	      $scope.cancelPage();
      };
      //全选（取消全选
      $scope.count=0;  //已经选择的数量
      $scope.selectData = [];  //已选择的对象
      $scope.entity={};
      $scope.editPanel=false;
	    $scope.changeAll = function(all) {
	    			$("#btnEditall").attr({"disabled":"disabled"});
						$scope.count=0;
						$scope.selectData=[];
						$("input[name='check1']:checkbox").each(function(index,item){
							$(item).prop("checked",all.selectAll==true);
							if(all.selectAll){
								$scope.selectData.push(JSON.parse(item.value));
								$scope.count= $("input[name='check1']:checkbox").length;
								$("#btnEditall").removeAttr("disabled");
							}
						});
//						angular.forEach($("input[name='check1']:checkbox"), function(item) {
//							$(item).prop("checked",all.selectAll==true);//item.checked = all.selectAll;
//							if(all.selectAll){
//								$scope.selectData.push(JSON.parse(item.value));
//								$scope.count= $("input[name='check1']:checkbox").length;
//							}
//						});
	    };
         //选择单个（取消选择单个
        $scope.changeCurrent = function(current, $event) {
					//计算已选数量 true加， false减
					$scope.count += $("#"+current.id).get(0).checked ? 1 : -1;
					if($scope.count === $("input[name='check1']:checkbox").length){
						  $("#selectAll").prop("checked",true);
					}else{
						  $("#selectAll").prop("checked",false);   
					}
					//判断是否全选，选数量等于数据长度为true
//					$scope.selectAll = $scope.count === $("input[name='check1']:checkbox").length;
					//统计已选对象
					$scope.selectData = [];
					angular.forEach($("input[name='check1']:checkbox"), function(item) {
						if(item.checked) {
							$scope.selectData.push(JSON.parse(item.value));
						}
					});
					if($scope.count>0){
						$("#btnEditall").removeAttr("disabled");
					}else{
						$("#btnEditall").attr({"disabled":"disabled"});
					}
//					$event.stopPropagation();//阻止冒泡
        };
        
      //复选框查询
      $scope.options={};
      $scope.options.state1=false;
      $scope.options.state2=false;
      $scope.options.state3=false;
      $scope.options.state4=false;
      $scope.selectSearch= function(){
      	var state ="";
      	if($scope.options.state1){
      		state+="未处理,";
      	}
      	if($scope.options.state2){
      		state+="已处理,";
      	}
      	if($scope.options.state3){
      		state+="预处理,";
      	}
      	if($scope.options.state4){
      		state+="已忽略,";
      	}
      	var params ={"state":state.substr(0,state.length-1)};      
      	
      	$scope.initData(params);
      }
      
      $scope.nums="";
      $scope.eventdisplaynameDiv=true;
      $scope.edit = function (row,num){
      	$scope.eventdisplaynameDiv=true;
      	$scope.nums=num;
      	$scope.entity=row;
	   		$scope.editPanel = true ;
	   		$scope.panelTtile = '编辑' ;
   	  };
   	  //批量处理
   	  $scope.editAll=function(num){
   	  	if($scope.selectData.length<1){
					commonService.showMsg("提示","请选择要修改的数据");
				}else{
					$scope.nums=num;
	   	  	if(num==2){
	   	  		$scope.eventdisplaynameDiv=false;
	   	  		$scope.entity={};
	   	  	}
		   		$scope.editPanel = true ;
		   		$scope.panelTtile = '批量编辑' ;
				}
   	  }
   	  
   	  //编辑返回
   	  $scope.panelBack = function (){
   			$scope.editPanel = false ;
   	  };
   	  //提交保存
   	  $scope.panelSave = function (){
   	  	var params = [];
				$scope.editPanel = false ;
				if($scope.nums==1){  //单条处理
					params = [{
							 "id":$scope.entity.id,
							 "eventdisplayname":$scope.entity.eventdisplayname,
							 "severity":$scope.entity.severity,
							 "customerSeverity":$scope.entity.customerSeverity,
							 "state":$scope.entity.state,
							 "ProcessMethod":$scope.entity.ProcessMethod
			 		 }];
					$http.post(IG.api + "/events" , params , config )
		        .success(function (response) {
		        	console.log("response:--->"+response);
		        	commonService.showMsg("success","修改成功!");
		        }).error(function (err) {
			        console.log(err);
			        commonService.showMsg("error",err.message);
			      });
				}else{//批量处理数据
					if($scope.selectData.length<1){
						commonService.showMsg("提示","请选择要修改的数据");
					}else{
						angular.forEach($scope.selectData, function(item) {
							var selData={"id":item.id,
							 "eventdisplayname":item.eventdisplayname,
							 "severity":item.severity,
							 "customerSeverity":$scope.entity.customerSeverity,
							 "state":$scope.entity.state,
							 "ProcessMethod":$scope.entity.ProcessMethod};
							 params.push(selData);
						});
						$http.post(IG.api + "/events" , params , config )
		        .success(function (response) {
		        	console.log("response:--->"+response);
		        	commonService.showMsg("success","修改成功!");
		        }).error(function (err) {
			        console.log(err);
			        commonService.showMsg("error",err.message);
			      });
					}
					console.log("====="+params);
				}
//				commonService.showMsg("success","数据修改成功！");
	  	};
	  	
	  $scope.params={};
	  //日期阶段查询
	  $scope.search1=function(){
	  	var startdt = $("#startdt").val();
	  	var enddt = $("#enddt").val();
	  	var par={
	  		"startdt":startdt!=""?moment(startdt).format('X'):startdt,
	  		"enddt":enddt!=""?moment(enddt).format('X'):enddt
	  	};
//	  	par = angular.copy($scope.params);
//	  	par.startdt=moment(par.startdt).format('X');
//	  	par.enddt=moment(par.enddt).format('X');
  		var state ="";
	  	if($scope.options.state1){
	  		state+="未处理,";
	  	}
	  	if($scope.options.state2){
	  		state+="已处理,";
	  	}
	  	if($scope.options.state3){
	  		state+="预处理,";
	  	}
	  	if($scope.options.state4){
	  		state+="已忽略,";
	  	}
	  	if(state!=""){
	  		par.state=state.substr(0,state.length-1);
	  	}
	  	$scope.initData(par);	
	  	$scope.cancelPage();
	  };
	  //点击页面事件
	  $scope.cancelPage=function(){
	  	$scope.count=0;
		  	$("#selectAll").prop("checked",false);
		  	$("input[name='check1']:checkbox").each(function(index,item){
						$(item).prop("checked",false);
				});	  	
	  }
		$scope.initData("");	
		
  }
})();
