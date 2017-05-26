
(function () {
  'use strict';
  
  angular.module('BlurAdmin.pages.sysManage.matadata')
      .controller('matadataCtrl', matadataCtrlFunc);

  /** @ngInject */
  function matadataCtrlFunc($scope, $filter, $http, $localStorage,toastr, $uibModal, commonService) {
      //console.log($localStorage.authKey);
      var config = { headers: {
          "Authorization": $localStorage.authKey
      }}
      
      $scope.treeData = [];
      
      $scope.menuItem = {};
      $scope.selectMenuItem = {};
      
      $scope.buttonState = true ;
      $scope.read = {"parentMenuId":true, "menuId":true ,"others":true };
      //初始化加载Datacenter列表
      $scope.initData = function (){
    	  
      	$http.get(IG.api + '/matadata/datacenter' , config )
      	.success(function (response) {
      		/*if(response){
      			angular.forEach(response, function (item,index) {
      				item.id = item.menuId;
      				item.parent = item.parentMenuId;
      				item.text = item.title;
      				
      				$scope.treeData.push(item);
                });
      		}else{
      			$scope.treeData = [{"id": "n1", "parent": "#","type": "folder","text": "Node 1","state": {"opened": true} }];
      		}*/
      		
      		$scope.treeData = [{"isDefault":true,"Name":"测试数据中心2","Type":"生产数据中心2","City":"北京","Address":"海淀区数据中心",
		      					"Building":[{"Name":"楼栋201","Description":"楼栋201的说明","_id":"592255c8fc97ed701b00001d",
		      					"Floor":[{"Name":"楼层1","Description":"楼层1的说明","_id":"592255c8fc97ed701b000021",
		      					"Unit":[{"Name":"机房1","UnitID":"111f0915-1032-465c-b6ee-913ffbbac913",
		      					"Description":"机房1的说明","_id":"592255c8fc97ed701b000023","MaxCabinet":150,"MaxPowerLoad":100},
		      					{"Name":"机房2","UnitID":"222f0915-1032-465c-b6ee-943ffbbac933","Description":"机房2的说明","_id":"592255c8fc97ed701b000022","MaxCabinet":250,"MaxPowerLoad":200}]},
		      					{"Name":"楼层2","Description":"楼层2的说明","_id":"592255c8fc97ed701b00001e",
		      					"Unit":[{"Name":"机房1","UnitID":"333f0915-1032-465c-b6ee-943ffbbac567","Description":"机房1的说明",
		      					"_id":"592255c8fc97ed701b000020","MaxCabinet":150,"MaxPowerLoad":100},
		      					{"Name":"机房2","UnitID":"444f0915-1032-465c-b6ee-94345bbac9c1","Description":"机房2的说明","_id":"592255c8fc97ed701b00001f","MaxCabinet":250,"MaxPowerLoad":200}
		      					]}]}]}];
      		
      		
      		angular.forEach($scope.treeData, function (item) {
  				item.id = item.Name;
  				item.text = item.Name;
  				item.state = {"opened":true }
  				item.children = item.Building
  				item.leval = 0 ;
  				angular.forEach(item.Building, function (build) {
  					build.id = build.Name;
  					build.text = build.Name;
  					build.children = build.Floor
  					build.leval = 1 ;
  					build.parentData =  angular.copy(item);
  					delete build.parentData.Building ;
  					delete build.parentData.children ;
  					
  					angular.forEach(build.Floor, function (floor) {
  						//floor.id = floor._id;
  						floor.id = floor.Name;
  						floor.text = floor.Name;
  						floor.children = floor.Unit
  						floor.leval = 2 ;
  						
  						floor.parentData =  angular.copy(build);
  	  					delete floor.parentData.Floor ;
  	  					delete floor.parentData.children ;
  	  				
  						angular.forEach(floor.Unit, function (unit) {
  							//unit.id = unit.UnitID;
  							unit.id = floor.Name + ":" + unit.Name;
  							unit.text = unit.Name;
  							unit.leval = 3 ;
  							unit.parentData =  angular.copy(floor);
  	  	  					delete unit.parentData.Unit ;
  	  	  	            });
  	  	            });
  	            });
            });
      		//$scope.treeData.sort(function(a,b){return a.order-b.order});
      		
      		 $('#dataTree').jstree({
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
      		
      		$("#dataTree").bind(
      		        "select_node.jstree", function(evt, data){
      		        	$scope.$apply(function() {  
      		        		$scope.cancelMenu();
      		        		$scope.menuItem = angular.copy(data.node.original);
      		        		$scope.selectMenuItem = angular.copy(data.node.original);
      		        		
      		        		
      		        		$scope.buttonState = false ;
      		        	}); 
      		        	//console.log($scope.menuItem);   
      		        }
      		);
      		 
	      }).error(function (err) {
	          //console.log(err);  
	          commonService.showMsg("error",err.message);
	      });
      };
      
      
      var vm = this;
      $scope.centerInfo = {};
      $scope.buildInfo = {};
      $scope.floorInfo = {};
      $scope.unitInfo = {};
      
      /**新增Datacenter
       */
      $scope.addItem = false ;
      $scope.addMenu = function (root){
    	  $scope.addItem = true ;
    	  var leval = $scope.selectMenuItem.leval ;
    	  
    	  
    	  if(leval==0){ //选中的是数据中心
    		  $scope.centerInfo = $scope.selectMenuItem ;
    		  
    	  }else if(leval==1){ //选中的是楼栋
    		  $scope.centerInfo = $scope.selectMenuItem.parentData ;
    		  $scope.buildInfo = $scope.selectMenuItem ;
    		  
    	  }else if(leval==2){ //选中的是楼层
    		  $scope.centerInfo = $scope.selectMenuItem.parentData.parentData ;
    		  $scope.buildInfo = $scope.selectMenuItem.parentData ;
    		  $scope.floorInfo = $scope.selectMenuItem ;
    		  
    	  }else{ //选中的是机房
    		  
    		  $scope.centerInfo = $scope.selectMenuItem.parentData.parentData.parentData ;
    		  $scope.buildInfo = $scope.selectMenuItem.parentData.parentData ;
    		  $scope.floorInfo = $scope.selectMenuItem.parentData ;
    		  $scope.unitInfo = $scope.selectMenuItem ;
    		  
    	  }
    	  
    	  if(root){//新增同级
    		  
    		  
    	  }else{//新增下级
    		  
    		 
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
    	  $scope.addItem = false;
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
    	  
    	 $http.post(IG.api + '/menu/add' ,params, config )
         .success(function (response) {
        	 console.log("response:--->"+response);
        	 commonService.showMsg("success","Datacenter保存成功！");
        	 
        	 $scope.cancelMenu();
        	 $scope.menuItem ={};
       		 $scope.selectMenuItem = {};
        	 $('#menuTree').jstree("destroy");
        	 $scope.treeData = [];
        	 $scope.initData();
        	 
         }).error(function (err) {
            //console.log(err);
            commonService.showMsg("error",err.message);
        });
      };
        
      /**
       * 删除Datacenter
       */
      $scope.deleteMenu = function (){
    	  
      };
      
      /**
       * 保存验证方法
       */
      $scope.validateMenu = function() {
    	  
    	  if(!$scope.menuItem){
    		  commonService.showMsg("error",'请点击选择要操作的Datacenter!');
    		  return false;
    	  }
    	  
    	  if(!$scope.menuItem.menuId && $scope.menuItem.menuId!=0){
    		  commonService.showMsg("error",'DatacenterID不能为空!');
    		  return false;
    		  
    	  }else if(!$scope.menuItem.title && $scope.menuItem.title!=0){
    		  commonService.showMsg("error",'Datacenter名称不能为空!');
    		  return false;
    		  
    	  }else if(!$scope.menuItem.level && $scope.menuItem.level!=0){
    		  commonService.showMsg("error",'Datacenter级别不能为空!');
    		  return false;
    		  
    	  }else if(!$scope.menuItem.order && $scope.menuItem.order!=0){
    		  commonService.showMsg("error",'Datacenter排序不能为空!');
    		  return false;
    		  
    	  }else if(!$scope.menuItem.stateRef){
    		  commonService.showMsg("error",'DatacenterURL不能为空!');
    		  return false;
    		  
    	  }else {
			  if($scope.menuItem.order==1){//二级Datacenter
				  if(!$scope.menuItem.parentMenuId){//父级DatacenterID
					  commonService.showMsg("error","父级DatacenterID不能为空!");
					  return false;
				  }
			  }
    	  }
    	  
    	  return true;
      };
      
	/***************************************/
		$scope.initData();
		
  }

})();
