
(function () {
  'use strict';
  
  angular.module('BlurAdmin.pages.EventManagement.repository')
      .controller('repositoryCtrl', repositoryCtrlFunc);

  /** @ngInject */
  function repositoryCtrlFunc($scope, $filter, $http, $localStorage,toastr, $uibModal, commonService) {
  	 console.log($localStorage.authKey);
      var config = { headers: {
          "Authorization": $localStorage.authKey
      }}
      
     //tabs页
 	 $scope.tabs = [
 	                {"id":1,"name":"事件自定义等级","url":"app/pages/EventManagement/repository/customize.html",
 	                	"apiUrl":"/arrays"},
 	                {"id":2,"name":"事件知识库","url":"app/pages/EventManagement/repository/knowledge.html",
 	                	"apiUrl":"/arrays"}
 	               ];
 	 $scope.theads1 = [
 	                 {"text": "事件等级","sort": "name","default": false},
 	                 {"text": "事件等级别名","sort": "serialnb", "default": false},
 	                 {"text": "事件等级描述", "sort": "","default": false},
 	                 {"text": "事件等级Level","sort": "", "default": false},
 	                 {"text": "操作"}
 	                 ];
 	$scope.theads2 = [
  	                 {"text": "设备类型","sort": "name","default": false},
  	                 {"text": "事件描述关键字","sort": "serialnb", "default": false},
  	                 {"text": "处理类型", "sort": "","default": false},
  	                 {"text": "事件自定义等级","sort": "", "default": false},
  	                 {"text": "事件处理方法","sort": "", "default": false},
  	                 {"text": "操作"}
  	                 ];
		
			//tabs页切换
		 $scope.list = [];
	 	 $scope.swithTabs = function (tab){
	 		 if(!tab){
	 			tab = $scope.tabs[0];
	 		 }
	 		 var apiUrl = "";
	 		 if(tab.id === 1){		//事件自定义等级
	 			$scope.theadList = $scope.theads1 ;
	 			apiUrl = tab.apiUrl ;
		 		 //查询数据
		 		 query(apiUrl);
	 		 }else{					//事件知识库
	 			 $scope.theadList = $scope.theads2 
	 			 apiUrl = tab.apiUrl ;
	 			 queryKnowledge(apiUrl);
	 		 }
	 		 
	 	 };
	 	 
	 	 function query(apiUrl) {
    	  
    	 $http.get(IG.api + apiUrl , config ).success(function (response) { 
          $scope.list =response ;
          $scope.customizeTablePageSize = 15;
	      }).error(function (err) {
	          console.log(err);   
	      });
      };
      //自定义事件js开始
      $scope.editPanel=false;
      $scope.entity={};
      $scope.addCustomize = function (){
	   		$scope.editPanel = true ;
	   		$scope.panelTtile = '自定义事件新增' ;
   	  };
      //编辑弹出
      $scope.editCustomize = function (row){
      	$scope.entity=row;
	   		$scope.editPanel = true ;
	   		$scope.panelTtile = '自定义事件编辑' ;
   	  };
   	  
   	  //编辑返回
   	  $scope.panelBack = function (){
   			$scope.editPanel = false ;
   	  };
   	  //提交保存
   	  $scope.panelSave = function (){
				$scope.editPanel = false ;
//				commonService.showMsg("success","数据修改成功！");
	  	};	 
	  	$scope.delCustomize=function(row){
	  		alert("删除成功");
	  	};
	  	//自定义事件 结束
	  	
	  	function queryKnowledge(knowledgeUrl) {
    	 $http.get(IG.api + knowledgeUrl , config ).success(function (response) { 
          $scope.list =response ;
          $scope.KnowledgeTablePageSize = 15;
	      }).error(function (err) {
	          console.log(err);   
	      });
      };
	  	
	  	//事件知识库js开始
      $scope.editKpanel=false;
      $scope.entityK={};
      $scope.addKnowledge= function (){
	   		$scope.editKpanel = true ;
	   		$scope.panelKTtile = '新增事件知识库' ;
   	  };
      //编辑弹出
      $scope.editKnowledge = function (row){
      	$scope.entityK=row;
	   		$scope.editKpanel = true ;
	   		$scope.panelKTtile = '事件知识库编辑' ;
   	  };
   	  
   	  //编辑返回
   	  $scope.knowledgeBack = function (){
   			$scope.editKpanel = false ;
   	  };
   	  //提交保存
   	  $scope.knowledgeSave = function (){
				$scope.editKpanel = false ;
//				commonService.showMsg("success","数据修改成功！");
	  	};	  	
	  	$scope.delKnowledge=function(row){
	  		alert("删除成功");
	  	};
	  	//事件知识库 结束
	  	
	  	
	  	
      
	 $scope.swithTabs();
  }

})();
