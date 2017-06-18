
(function () {
  'use strict';
  
  angular.module('BlurAdmin.pages.sysManage.menu')
      .controller('menuCtrl', menuCtrlFunc);

  /** @ngInject */
  function menuCtrlFunc($scope, $filter, $http, $localStorage,$timeout, $uibModal, commonService, httpService) {
      //console.log($localStorage.authKey);
      var config = { headers: {
          "Authorization": $localStorage.authKey
      }}
      
      $scope.treeData = [];
      //$scope.levelList = [{"value": 0 , text:"一级菜单"},{"value": 1 , text:"二级菜单"}];
      //$scope.menuItem.level = $scope.levelList[0];
      
      $scope.menuItem = {};
      $scope.selectMenuItem = {};
      
      $scope.buttonState = {"add":true, "del":true ,"update":true };
      $scope.read = {"parentMenuId":true, "menuId":true ,"others":true };
      //初始化加载菜单列表
      $scope.initData = function (){
    	 // menuTree
      	httpService.get('/menu/list' ,null, config ,function (response) {
      		$scope.buttonState = {"add":true, "del":true ,"update":true };
      		if(response){
      			angular.forEach(response, function (menu,index) {
      				menu.id = menu.menuId;
      				menu.parent = menu.parentMenuId;
      				menu.text = menu.title;
      				menu.state = {"opened":true }
      				$scope.treeData.push(menu);
                });
      		}
      		
      		$scope.treeData.sort(function(a,b){return a.order-b.order});
      		
      		 $('#menuTree').jstree({
      			'core' : {
	      			"multiple": true ,
	     		    'data' : $scope.treeData 
      		 		},
      	        'types': {
	      	          'folder': {
	      	            'icon': 'ion-ios-folder'
	      	          },
	      	          'default': {
	      	            'icon': 'ion-document-text'
	      	          }
      	        	},
      	        'plugins': ['types'],
      	        'version': 1
      		 });
      		 
      		$("#menuTree").bind(
      		        "select_node.jstree", function(evt, data){
      		        	$scope.$apply(function() {  
      		        		$scope.cancelMenu();
      		        		$scope.menuItem = angular.copy(data.node.original);
      		        		$scope.selectMenuItem = angular.copy(data.node.original);
      		        		//$scope.selectMenuItem.level = $scope.levelList[data.node.original.level]
      		        		//$scope.menuItem.level =  $scope.levelList[data.node.original.level]
      		        		//$("#level").val($scope.menuItem.level);
      		        		$scope.buttonState = {"add":false, "del":false ,"update":false };
      		        		if($scope.menuItem.level == 1){
      		        			$scope.buttonState.add = true ;
      		        		}
      		        	}); 
      		        	//console.log($scope.menuItem);   
      		        }
      		);
      		
	      });
      };
      
      /**新增菜单
       */
      $scope.addMenu = function (root){
    	  if(root){//新增一级
    		  $scope.menuItem.parentMenuId = "#";
    		  $scope.menuItem.level =  0 ;
    	  }else{
    		  if(!$scope.selectMenuItem || !$scope.selectMenuItem.menuId){
    			  commonService.showMsg("error","请选择新增子菜单的菜单！");
    			  return;
    		  }
    		  $scope.menuItem.parentMenuId = $scope.selectMenuItem.menuId;
    		  $scope.menuItem.level =  1 ;
    	  }
    	  $scope.showSave = true;
    	  $scope.read = {"menuId":false ,"others":false };
      };
      
      /**修改
       */
      $scope.modyMenu = function (){
    	  $scope.showSave = true;
    	  $scope.read = { "menuId":true ,"others":false };
      };
      
      /**新增修改 取消
       */
      $scope.cancelMenu = function (){
    	  $scope.showSave = false;
    	  $scope.read = { "menuId":true ,"others":true };
    	  $scope.menuItem = angular.copy($scope.selectMenuItem);
      };
      
      //新增修改保存
      $scope.saveMenu = function (){
    	  
    	 if(!$scope.validateMenu()){
    		return ;
    	 };
    	 var params =  {
    			 	"menuId" : $scope.menuItem.menuId ,
    			    "parentMenuId": $scope.menuItem.parentMenuId,
    			    "title": $scope.menuItem.title,
    			    "level": $scope.menuItem.level,
    			    "order": $scope.menuItem.order,
    			    "icon": $scope.menuItem.icon,
    			    "stateRef": $scope.menuItem.stateRef
    			  }
    	  
    	 httpService.post('/menu/add' ,params, config ,function (response) {
        	 console.log("response:--->"+response);
        	 commonService.showMsg("success","菜单保存成功！");
        	 
        	 $scope.cancelMenu();
        	 $scope.menuItem ={};
       		 $scope.selectMenuItem = {};
        	 $('#menuTree').jstree("destroy");
        	 $scope.treeData = [];
        	 $scope.initData();
        	 
         });
      };
        
      /**
       * 删除菜单
       */
      $scope.deleteMenu = function (){
    	  if(!$scope.menuItem){
    		  if(!$scope.menuItem.menuId){
        		  commonService.showMsg("error",'请选择要删除的菜单!');
        		  return;
        	  }
    		  commonService.showMsg("error",'请选择要删除的菜单!');
    		  return;
    	  }
    	  
    	  var modalInstance = commonService.confirm("确认要删除所选菜单？");
          modalInstance.result.then(function (result) {    
              //console.log(result); //result关闭是回传的值   
              //alert("ok");
              httpService.post('/menu/del' , $scope.menuItem , config, function (response) {
            	 console.log("response:--->"+response);
            	 $scope.menuItem ={};
           		 $scope.selectMenuItem = {};
     	       	 $('#menuTree').jstree("destroy");
     	       	 $scope.treeData = [];
     	       	 $scope.initData();
              	 commonService.showMsg("success","菜单删除成功！");
              });
              
           }, function (reason) {    
               console.log(reason);//点击空白区域，总会输出backdrop click，点击取消，则会暑促cancel    
               //alert("cancel");
           });  
      	
      };
      
      /**
       * 保存验证方法
       */
      $scope.validateMenu = function() {
    	  
    	  if(!$scope.menuItem){
    		  commonService.showMsg("error",'请点击选择要操作的菜单!');
    		  return false;
    	  }
    	  
    	  if(!$scope.menuItem.menuId && $scope.menuItem.menuId!=0){
    		  commonService.showMsg("error",'菜单ID不能为空!');
    		  return false;
    		  
    	  }else if(!$scope.menuItem.title && $scope.menuItem.title!=0){
    		  commonService.showMsg("error",'菜单名称不能为空!');
    		  return false;
    		  
    	  }else if(!$scope.menuItem.level && $scope.menuItem.level!=0){
    		  commonService.showMsg("error",'菜单级别不能为空!');
    		  return false;
    		  
    	  }else if(!$scope.menuItem.order && $scope.menuItem.order!=0){
    		  commonService.showMsg("error",'菜单排序不能为空!');
    		  return false;
    		  
    	  }else if(!$scope.menuItem.stateRef){
    		  commonService.showMsg("error",'菜单URL不能为空!');
    		  return false;
    		  
    	  }else {
			  if($scope.menuItem.order==1){//二级菜单
				  if(!$scope.menuItem.parentMenuId){//父级菜单ID
					  commonService.showMsg("error","父级菜单ID不能为空!");
					  return false;
				  }
			  }
    	  }
    	  
    	  return true;
      };
      
	/***************************************/
		$scope.initData();
		
		
		//打开后返回顶部
        $timeout(function() {
            $(window).scrollTop(0,0);
        }, 200);
		
  }

})();
