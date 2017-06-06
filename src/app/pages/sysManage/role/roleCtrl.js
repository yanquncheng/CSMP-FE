
(function () {
  'use strict';
  
  angular.module('BlurAdmin.pages.sysManage.role')
      .controller('roleCtrl', roleCtrlFunc);

  /** @ngInject */
  function roleCtrlFunc($scope, $filter, $http, $localStorage,toastr, $uibModal , commonService, httpService) {
      //console.log($localStorage.authKey);
      var config = { headers: {
          "Authorization": $localStorage.authKey
      }}
      
      $scope.editPanel = false ;
      
      $scope.readOnly = true ;
      $scope.editStatu = false ;
      $scope.title = "菜单信息" ;
      
      
      $scope.initData = function (){
        	httpService.get('/role/list' ,null, config ,function (response) { 
                $scope.roleList = response;
                angular.forEach($scope.roleList, function (item,i) {
                	delete item._id;
    			});
                $scope.smartTablePageSize = 15;

  	      });
        };
        
        /**
         * 角色删除
         */
        $scope.delRole = function (role){
        	var modalInstance = commonService.confirm("确认要删除所选角色？");
        	modalInstance.result.then(function (result) {    
                //console.log(result); //result关闭是回传的值   
                //alert("ok");
        		httpService.post('/role/del' , role , config , function (response) {
               	 	console.log("response:--->"+response);
               	 	commonService.showMsg("success","角色删除成功!");
        		});
                
             }, function (reason) {    
                 console.log(reason);//点击空白区域，总会输出backdrop click，点击取消，则会暑促cancel    
                 //alert("cancel");
             });  
        };
        
        /**
         * 点击角色
         */
        $scope.selectData = {};
        $scope.selectRow = function (row){
        	
        	$scope.selectData = row;
        	angular.forEach($scope.roleList, function (item,i) {
				if(row.roleName == item.roleName){
					item.selected = true;
				}else{
					item.selected = false;
				}
			});
        	
 		  $("#roleName").val(row.roleName);
 		  $('#menuTree').jstree("destroy");
    	  $scope.treeData = [];
    	  $scope.editStatu = false ;
    	  
 		  httpService.get('/role/menulist?rolename='+row.roleName ,null, config ,function (response) {
        	 var roleMenu = [];
         	 if(response && response.length>0){
         		roleMenu = response;
         	 }
         	 $scope.initTreeData(roleMenu);
        	  
          });
        };
        
        
        /**
         * 角色编辑
         */
        $scope.editRole = function (){
        	if(!$scope.selectData.roleName){
	    		commonService.showMsg("error","请选择要修改的角色！");
	  			return;
	    	 }
	    	 $scope.readOnly = true ;
	         $scope.editStatu = true ;
	         $scope.title = "角色编辑" ;
	         $("#roleName").val($scope.selectData.roleName);
        };
        
    /**
     * 角色新增
     */
    $scope.addRole = function (){
    	$scope.readOnly = false ;
        $scope.editStatu = true ;
        $scope.title = "角色新增" ;
        $("#roleName").val("");
        $scope.initTreeData();
        //$("#menuTree").jstree("uncheck_all");//清空
    };
        
    /**
     * 新增/编辑返回
     */
   	  $scope.panelBack = function (){
   		$scope.title = "菜单信息" ;
   		$("#roleName").val("");  
   		$scope.selectData = {};
   		$scope.readOnly = true ;
        $scope.editStatu = false ;
    	angular.forEach($scope.roleList, function (item,i) {
    		item.selected = false;
    	});
    	$scope.treeData = [];
    	$('#menuTree').jstree("destroy");
   	  };
   	  
   	/**
     * 新增/编辑 保存
     */
   	 $scope.roleSave = function (){
   		//获取选中的节点
        var nodes=$("#menuTree").jstree("get_checked");
   		 
   		var roleName = $("#roleName").val();
   		var _id = $("#_id").val();
   		
   		 if(!roleName){
   			commonService.showMsg("error","请输入角色名称！");
   			return;
   		 }
   		 
   		if( nodes.length == 0){
 			commonService.showMsg("error","请选择角色分配的菜单！");
 			return;
 		 }
   		
   		 var params = {
  				 "roleName": roleName,
  				 "menuList": nodes
   		 }
   		 
   		httpService.post("/role/add" , params , config ,function (response) {
        	  
          	console.log("response:--->"+response);
          	commonService.showMsg("success","角色操作成功!");
          	
          	//返回 -重新加载数据
          	$scope.panelBack();
          	$scope.initData();
          	
          });
       };
       
       
       //初始化加载菜单列表
       $scope.treeData = [];
       $scope.initTreeData = function (roleMenu){
    	    $scope.treeData = [];
    	    $('#menuTree').jstree("destroy");
	     	 // menuTree
	       	httpService.get('/menu/list' , null,config ,function (response) {
	       		if(response){
	       			angular.forEach(response, function (menu,index) {
	       				menu.id = menu.menuId;
	       				menu.parent = menu.parentMenuId;
	       				menu.text = menu.title;
	       				menu.state = { "selected":false,"opened":true  }
	       				
	       				if(roleMenu && roleMenu.length>0){
	       					angular.forEach(roleMenu, function (menuId,i) {
	       						if(menuId == menu.menuId){
	       							menu.state = { "selected":true,"opened":true }
	       							return false;
	       						}
	       					});
	       				}
	       				
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
	       	        "checkbox" : {  
	       	             "keep_selected_style" : true,  
	       	             "real_checkboxes" : true  
	       	         },  
	       	        'plugins': ['types', 'checkbox'],
	       	        'version': 1
	       		 });
	       		
	       		
	 	      });
       };
        
		/***************************************/
		$scope.initData();
		
		
  }

})();
