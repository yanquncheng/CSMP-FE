
(function () {
  'use strict';
  
  angular.module('BlurAdmin.pages.sysManage.matadata')
      .controller('matadataCtrl', matadataCtrlFunc);

  /** @ngInject */
  function matadataCtrlFunc($scope, $filter, $http, $localStorage,$timeout, $uibModal, commonService, httpService) {
      //console.log($localStorage.authKey);
      var config = { headers: {
          "Authorization": $localStorage.authKey
      }}
      
      $scope.treeData = [];
      $scope.treeDataCopy = [];
      
      $scope.menuItem = {};
      $scope.selectMenuItem = {};
      
      $scope.buttonState = {"update":true ,"delete":true,"add":true };
      $scope.read = {"menuId":true ,"others":true };
      
      
      //初始化加载Datacenter列表
      $scope.initData = function (){
    	  
      	httpService.get('/matadata/datacenter' ,null, config,function (response) {
      		$scope.treeData = [];
      		$scope.treeDataCopy = [];
      		
      		$scope.treeData = response ;
      		$scope.treeDataCopy = angular.copy($scope.treeData);
      		
      		angular.forEach($scope.treeData, function (item) {
  				item.id = item.Name;
  				item.text = item.Name;
  				item.state = {"opened":true }
  				item.children = item.Building
  				item.leval = 0 ;
  				item.childSize = item.Building.length ;
  				angular.forEach(item.Building, function (build) {
  					build.id = build._id;
  					build.text = build.Name;
  					build.children = build.Floor
  					build.leval = 1 ;
  					build.childSize = build.Floor.length ;
  					build.parentData =  angular.copy(item);
  					delete build.parentData.Building ;
  					delete build.parentData.children ;
  					
  					angular.forEach(build.Floor, function (floor) {
  						//floor.id = floor._id;
  						floor.id = floor._id;
  						floor.text = floor.Name;
  						floor.children = floor.Unit
  						floor.leval = 2 ;
  						floor.childSize = floor.Unit.length ;
  						
  						floor.parentData =  angular.copy(build);
  	  					delete floor.parentData.Floor ;
  	  					delete floor.parentData.children ;
  	  				
  						angular.forEach(floor.Unit, function (unit) {
  							//unit.id = unit.UnitID;
  							unit.id = unit._id;
  							unit.text = unit.Name;
  							unit.leval = 3 ;
  							unit.parentData =  angular.copy(floor);
  	  	  					delete unit.parentData.Unit ;
  	  	  	            });
  	  	            });
  	            });
            });
      		
      		//$scope.treeData.sort(function(a,b){return a.charCodeAt(1)-b.charCodeAt(1)});
      		
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
      		        		
      		        		$scope.buttonState = {"update":false ,"delete":false,"add":false };
	  		        		var leval = $scope.selectMenuItem.leval ;
	      		         	if(leval!=0 ){
	      		         		if($scope.selectMenuItem.parentData.childSize > 1){ //可以删除
	      		         			$scope.buttonState.delete = false ;
		      		         	}else{//不可以删除，至少有一个
		      		         		$scope.buttonState.delete = true ;
		      		         	}
	      		         	}
      		        		//$scope.buttonState = false ;
      		        	}); 
      		        	//console.log($scope.menuItem);   
      		        }
      		 );
	      });
      };
      
      $scope.centerInfo = {};
      $scope.buildInfo = {};
      $scope.floorInfo = {};
      $scope.unitInfo = {};
      
      /**新增Datacenter
       */
      $scope.addItem = false ;
      $scope.root = false ;
      $scope.addMenu = function (root){
    	  $scope.centerInfo = {};
          $scope.buildInfo = {};
          $scope.floorInfo = {};
          $scope.unitInfo = {};
    	  $scope.root = root ;
    	  var leval = $scope.selectMenuItem.leval ;
    	  if(leval==0){ //选中的是数据中心
    		  $scope.centerInfo = $scope.selectMenuItem ;
    		  if(root){//新增同级
    			  $scope.centerInfo.read = false ;
    			  ///整个数据中心新增
        	  }else{//新增下级
        		  $scope.centerInfo.read = true ;
        	  }
    		  
    	  }else if(leval==1){ //选中的是楼栋
    		  $scope.centerInfo = $scope.selectMenuItem.parentData ;
    		  $scope.buildInfo = $scope.selectMenuItem ;
    		  
    		  if(root){//新增同级
    			  $scope.centerInfo.read = true ;
    			  $scope.buildInfo.read = false ;
    	    	  $scope.floorInfo.read = false ;
    	    	  
        	  }else{//新增下级
        		  $scope.centerInfo.read = true ;
        		  $scope.buildInfo.read = true ;
        		  $scope.floorInfo.read = false ;
        	  }
    	  }else if(leval==2){ //选中的是楼层
    		  $scope.centerInfo = $scope.selectMenuItem.parentData.parentData ;
    		  $scope.buildInfo = $scope.selectMenuItem.parentData ;
    		  $scope.floorInfo = $scope.selectMenuItem ;
    		  if(root){//新增同级
    			  $scope.centerInfo.read = true ;
        		  $scope.buildInfo.read = true ;
        		  $scope.floorInfo.read = false ;
        	  }else{//新增下级
        		  $scope.centerInfo.read = true ;
        		  $scope.buildInfo.read = true ;
        		  $scope.floorInfo.read = true ;
        	  }
    	  }else if(leval==3){ //选中的是机房
    		  $scope.centerInfo = $scope.selectMenuItem.parentData.parentData.parentData ;
    		  $scope.buildInfo = $scope.selectMenuItem.parentData.parentData ;
    		  $scope.floorInfo = $scope.selectMenuItem.parentData ;
    		  $scope.unitInfo = $scope.selectMenuItem ;
    		  
    		  $scope.centerInfo.read = true ;
    		  $scope.buildInfo.read = true ;
    		  $scope.floorInfo.read = true ;
    		  
    	  }else{
    		 // $scope.centerInfo = $scope.selectMenuItem ;
    		  if(root){//新增同级
    			  $scope.centerInfo.read = false ;
    			  ///整个数据中心新增
        	  }else{//新增下级
        		  //$scope.centerInfo.read = true ;
        		  commonService.showMsg("error","请先选择要操作的数据!");
        		  return;
        	  }
    		  
    	  }
    	  
    	  $scope.addItem = true ;
    	  $scope.showSave = true;
    	  $scope.read = { "menuId":true ,"others":false };
      };
      
      /**修改
       */
      $scope.modyMenu = function (){

    	  $scope.centerInfo = {};
          $scope.buildInfo = {};
          $scope.floorInfo = {};
          $scope.unitInfo = {};
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
    	  }else if(leval==3){ //选中的是机房
    		  $scope.centerInfo = $scope.selectMenuItem.parentData.parentData.parentData ;
    		  $scope.buildInfo = $scope.selectMenuItem.parentData.parentData ;
    		  $scope.floorInfo = $scope.selectMenuItem.parentData ;
    		  $scope.unitInfo = $scope.selectMenuItem ;
    	  }else{
    		  commonService.showMsg("error","请先选择要操作的数据!");
    		  return;
    	  }
    	  
    	  $scope.showSave = true;
    	  $scope.read = { "menuId":false ,"others":false };
      };
      
      /**新增修改 取消
       */
      $scope.cancelMenu = function (){
    	  $scope.showSave = false;
    	  $scope.addItem = false;
    	  $scope.root = false ;
    	  $scope.read = { "menuId":true ,"others":true };
    	  $scope.buttonState = {"update":false ,"delete":true };
    	  $scope.menuItem = angular.copy($scope.selectMenuItem);
    	  
      };
      
      //新增修改保存
      $scope.saveMenu = function (){
    	   if(!$scope.validateMenu()){
    		  return ;
    	   };
    	   
    	   //修改
    	   if(!$scope.addItem){
    		   $scope.updateMenu();
    		   return;
    	   }
    	   
    	   var leval = $scope.selectMenuItem.leval ;
    	   var center = {} ;
    	   var build = {} ;
    	   var floor = {} ;
    	   var unit = {} ;
			unit = {
	              "Name": $scope.unitInfo.Name,
	              "UnitID": "unit"+guid(),
	              "Description": $scope.unitInfo.Description,
	              "MaxPowerLoad": $scope.unitInfo.MaxPowerLoad,
	              "MaxCabinet": $scope.unitInfo.MaxCabinet
            };
			floor = {
	              	"Name": $scope.floorInfo.Name,
	              	"Description": $scope.floorInfo.Description,
	              	"Unit": [unit]
			};
			build = {
	                "Name": $scope.buildInfo.Name,
	                "Description": $scope.buildInfo.Description,
	                "Floor": [floor]
			};
			center = {
					"isDefault": false,
		  		    "Name": $scope.centerInfo.Name,
		  		    "Type": $scope.centerInfo.Type,
		  		    "City": $scope.centerInfo.City,
		  		    "Address": $scope.centerInfo.Address,
		  		    "Building": [build]
			};
			
			var params = {};
			
			if(leval==0 && $scope.root){ //新增数据中心
				
				params = center ;
				
			}else if ( (leval==0 && !$scope.root) || (leval==1 && $scope.root) ){//新增楼栋
				
				angular.forEach($scope.treeDataCopy, function (item) {
		  	    	if(item.Name == $scope.centerInfo.Name){
		  	    		item.Building.push(build);
		  	    		params = angular.copy(item);
		  	    		return;
		  	    	}
		  	     });
				
			}else if ( (leval==2 && $scope.root) || (leval==1 && !$scope.root) ){//新增楼层
				
				angular.forEach($scope.treeDataCopy, function (item) {
		  	    	if(item.Name == $scope.centerInfo.Name){
		  	    		angular.forEach(item.Building, function (build) {
		  	    			if(build._id == $scope.buildInfo._id){
		  	    				build.Floor.push(floor);
				  	    		params = angular.copy(item);
				  	    		return;
		  	    			}
		  	    		});
		  	    	}
		  	     });
				
			}else if ( (leval==2 && !$scope.root) || (leval==3 ) ){//新增机房
				
		       		angular.forEach($scope.treeDataCopy, function (item) {
			  	    	if(item.Name == $scope.centerInfo.Name){
			  	    		angular.forEach(item.Building, function (build) {
			  	    			if(build._id == $scope.buildInfo._id){
			  	    				angular.forEach(build.Floor, function (floor) {
					  	    			if(floor._id == $scope.floorInfo._id){
					  	    				floor.Unit.push(unit);
							  	    		params = angular.copy(item);
							  	    		return;
					  	    			}
					  	    		});
			  	    			}
			  	    		});
			  	    	}
			  	     });
		       		
			}else{
				if($scope.root){//新增同级
					params = center ; //整个数据中心新增
	    			 
	        	  }else{//新增下级
	        		  commonService.showMsg("error","数据格式错误，请重试!");
	  				return;
	        	  }
			}
			
    	 httpService.post('/matadata/datacenter' ,params, config , function (response) {
        	 console.log("response:--->"+response);
        	 commonService.showMsg("success","Datacenter保存成功！");
        	 
        	 $scope.cancelMenu();
        	 $scope.menuItem ={};
       		 $scope.selectMenuItem = {};
        	 
       		 $('#dataTree').jstree("destroy");
        	 $scope.treeData = [];
        	 $scope.treeDataCopy = [];
        	 $scope.initData();
        	 
         });
      };
        
      /**
       * 修改方法
       */
      $scope.updateMenu = function() {
	   	    var leval = $scope.selectMenuItem.leval ;
			var params = {};
			if(leval==0 ){ //修改数据中心
				
				angular.forEach($scope.treeDataCopy, function (item) {
		  	    	if(item.Name == $scope.menuItem.Name){
		  	    		item.isDefault = $scope.menuItem.isDefault,
		  	    		item.Name = $scope.menuItem.Name ;
		  	    		item.Type = $scope.menuItem.Type ;
		  	    		item.City = $scope.menuItem.City ;
		  	    		item.Address = $scope.menuItem.Address ;
		  	    		params = angular.copy(item);
		  	    		return;
		  	    	}
		  	     });
				
			}else if ( leval==1 ){//修改楼栋
				
				angular.forEach($scope.treeDataCopy, function (item) {
		  	    	if(item.Name == $scope.centerInfo.Name){
		  	    		angular.forEach(item.Building, function (build) {
		  	    			if(build._id == $scope.buildInfo._id){
		  	    				build.Name = $scope.menuItem.Name ;
		  	    				build.Description = $scope.menuItem.Description;
				  	    		params = angular.copy(item);
				  	    		return;
		  	    			}
		  	    		});
		  	    	}
		  	     });
				
			}else if (leval==2 ){//修改楼层
				
				angular.forEach($scope.treeDataCopy, function (item) {
		  	    	if(item.Name == $scope.centerInfo.Name){
		  	    		angular.forEach(item.Building, function (build) {
		  	    			if(build._id == $scope.buildInfo._id){
		  	    				angular.forEach(build.Floor, function (floor) {
				  	    			if(floor._id == $scope.floorInfo._id){
				  	    				floor.Name = $scope.menuItem.Name ;
				  	    				floor.Description = $scope.menuItem.Description;
						  	    		params = angular.copy(item);
						  	    		return;
				  	    			}
				  	    		});
		  	    			}
		  	    		});
		  	    	}
		  	     });
				
			}else if ( leval==3 ){//修改机房
				
		       		angular.forEach($scope.treeDataCopy, function (item) {
			  	    	if(item.Name == $scope.centerInfo.Name){
			  	    		angular.forEach(item.Building, function (build) {
			  	    			if(build._id == $scope.buildInfo._id){
			  	    				angular.forEach(build.Floor, function (floor) {
					  	    			if(floor._id == $scope.floorInfo._id){
					  	    				angular.forEach(floor.Unit, function (unit) {
							  	    			if(unit._id == $scope.unitInfo._id){
							  	    				unit.Name = $scope.menuItem.Name ;
							  	    				unit.UnitID = $scope.menuItem.UnitID ;
							  	    				unit.Description = $scope.menuItem.Description ;
							  	    				unit.MaxPowerLoad =  $scope.menuItem.MaxPowerLoad ;
							  	    				unit.MaxCabinet = $scope.menuItem.MaxCabinet ;
									  	    		params = angular.copy(item);
									  	    		return;
							  	    			}
							  	    		});
					  	    			}
					  	    		});
			  	    			}
			  	    		});
			  	    	}
			  	     });
		       		
			}else{
				commonService.showMsg("error","数据格式错误，请重试!");
				return;
			}
			
			httpService.post('/matadata/datacenter' ,params, config ,function (response) {
		       	 console.log("response:--->"+response);
		       	 commonService.showMsg("success","Datacenter保存成功！");
		       	 
		       	 $scope.cancelMenu();
		       	 $scope.menuItem ={};
		       	 $scope.selectMenuItem = {};
		       	 
		       	 $('#dataTree').jstree("destroy");
		       	 $scope.treeData = [];
		       	 $scope.treeDataCopy = [];
		       	 $scope.initData();
	       	 
	        });
      };
      
      /**
       * 保存验证方法
       */
      $scope.validateMenu = function() {
    	 var flag = true ;
    	 //新增
  	   	if($scope.addItem){
		  	   	var inputs = $("#centerInfoForm").find("input");
			   	 $(inputs).each(function(){
			   		 if($(this).attr("error")==="true"){
			   			 flag = false ;
			   			 return false;
			   		 }
			   	 });
			   	 
			   	 var inputs = $("#buildInfoForm").find("input");
			   	 $(inputs).each(function(){
			   		 if($(this).attr("error")==="true"){
			   			 flag = false ;
			   			 return false;
			   		 }
			   	 });
			   	 
			   	 var inputs = $("#floorInfoForm").find("input");
			   	 $(inputs).each(function(){
			   		 if($(this).attr("error")==="true"){
			   			 flag = false ;
			   			 return false;
			   		 }
			   	 });
			   	 
			   	 var inputs = $("#unitInfoForm").find("input");
			   	 $(inputs).each(function(){
			   		 if($(this).attr("error")==="true"){
			   			 flag = false ;
			   			 return false;
			   		 }
			   	 });
			   	 
	  	   	}else{ //修改
	  	   		 var leval = $scope.selectMenuItem.leval ;
	  	   		 if(!$scope.menuItem.Name){
	  	   			 flag = false ;
	  	   			 return flag;
	  	   		 }
	  	   		
		  	   	  if(leval==0){ //选中的是数据中心
			  	   	 if(!$scope.menuItem.Type){
		  	   			 flag = false ;
		  	   			 return flag;
		  	   		 }
			  	   	 if(!$scope.menuItem.City){
		  	   			 flag = false ;
		  	   			 return flag;
		  	   		 }
			  	   	 if(!$scope.menuItem.Address){
		  	   			 flag = false ;
		  	   			 return flag;
		  	   		 }
		    	  }else if(leval==1){ //选中的是楼栋
		    		  if(!$scope.menuItem.Description){
			  	   			 flag = false ;
			  	   			 return flag;
			  	   		}
		    		  
		    	  }else if(leval==2){ //选中的是楼层
		    		  if(!$scope.menuItem.Description){
			  	   			 flag = false ;
			  	   			 return flag;
			  	   		}
		    		  
		    	  }else{ //选中的是机房
		    		  	if(!$scope.menuItem.Description){
			  	   			 flag = false ;
			  	   			 return flag;
			  	   		 }
				  	   	 if(!$scope.menuItem.MaxPowerLoad){
			  	   			 flag = false ;
			  	   			 return flag;
			  	   		 }
				  	   	 if(!$scope.menuItem.MaxCabinet){
			  	   			 flag = false ;
			  	   			 return flag;
			  	   		 }
		    	  }
	  	   	}
  	   	
    	 return flag;
      };
      
      //删除
      $scope.deleteMenu = function (){

    	  $scope.centerInfo = {};
          $scope.buildInfo = {};
          $scope.floorInfo = {};
          $scope.unitInfo = {};
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
    	  }else if(leval==3){ //选中的是机房
    		  $scope.centerInfo = $scope.selectMenuItem.parentData.parentData.parentData ;
    		  $scope.buildInfo = $scope.selectMenuItem.parentData.parentData ;
    		  $scope.floorInfo = $scope.selectMenuItem.parentData ;
    		  $scope.unitInfo = $scope.selectMenuItem ;
    	  }else{
    		  commonService.showMsg("error","请先选择要操作的数据!");
    		  return;
    	  }
    	  
			var params = {};
			if(leval==0 ){ //删除数据中心
				
				angular.forEach($scope.treeDataCopy, function (item) {
		  	    	if(item.Name == $scope.menuItem.Name){
		  	    		params = angular.copy(item);
		  	    		return false;
		  	    	}
		  	     });
				
				httpService.delete('/matadata/deldatacenter' ,params, config ,function (response) {
			       	 console.log("response:--->"+response);
			       	 commonService.showMsg("success","Datacenter操作成功！");
			       	 
			       	 $scope.cancelMenu();
			       	 $scope.menuItem ={};
			       	 $scope.selectMenuItem = {};
			       	 
			       	 $('#dataTree').jstree("destroy");
			       	 $scope.treeData = [];
			       	 $scope.treeDataCopy = [];
			       	 $scope.initData();
		       	 
		        });
				
				return;
			}else if ( leval==1 ){//删除楼栋
				
				angular.forEach($scope.treeDataCopy, function (item) {
		  	    	if(item.Name == $scope.centerInfo.Name){
		  	    		angular.forEach(item.Building, function (build,index) {
		  	    			if(build._id == $scope.buildInfo._id){
		  	    				item.Building.splice(index,1)
				  	    		params = angular.copy(item);
		  	    				return false;
		  	    			}
		  	    		});
		  	    	}
		  	     });
				
			}else if (leval==2 ){//删除楼层
				
				angular.forEach($scope.treeDataCopy, function (item) {
		  	    	if(item.Name == $scope.centerInfo.Name){
		  	    		angular.forEach(item.Building, function (build) {
		  	    			if(build._id == $scope.buildInfo._id){
		  	    				angular.forEach(build.Floor, function (floor,index) {
				  	    			if(floor._id == $scope.floorInfo._id){
				  	    				build.Floor.splice(index,1)
						  	    		params = angular.copy(item);
				  	    				return false;
				  	    			}
				  	    		});
		  	    			}
		  	    		});
		  	    	}
		  	     });
				
			}else if ( leval==3 ){//删除机房
				
		       		angular.forEach($scope.treeDataCopy, function (item) {
			  	    	if(item.Name == $scope.centerInfo.Name){
			  	    		angular.forEach(item.Building, function (build) {
			  	    			if(build._id == $scope.buildInfo._id){
			  	    				angular.forEach(build.Floor, function (floor) {
					  	    			if(floor._id == $scope.floorInfo._id){
					  	    				angular.forEach(floor.Unit, function (unit,index) {
							  	    			if(unit._id == $scope.unitInfo._id){
							  	    				floor.Unit.splice(index,1)
									  	    		params = angular.copy(item);
							  	    				return false;
							  	    			}
							  	    		});
					  	    			}
					  	    		});
			  	    			}
			  	    		});
			  	    	}
			  	     });
		       		
			}else{
				commonService.showMsg("error","数据格式错误，请重试!");
				return;
			}
			
			var modalInstance = commonService.confirm("确认要删除所选Datacenter数据？");
        	modalInstance.result.then(function (result) {
        		httpService.post('/matadata/datacenter' ,params, config ,function (response) {
	   		       	 console.log("response:--->"+response);
	   		       	 commonService.showMsg("success","Datacenter删除成功！");
	   		       	 
	   		       	 $scope.cancelMenu();
	   		       	 $scope.menuItem ={};
	   		       	 $scope.selectMenuItem = {};
	   		       	 
	   		       	 $('#dataTree').jstree("destroy");
	   		       	 $scope.treeData = [];
	   		       	 $scope.treeDataCopy = [];
	   		       	 $scope.initData();
        		});
        	}, function (reason) {    
                 console.log(reason);//点击空白区域，总会输出backdrop click，点击取消，则会暑促cancel    
                 //alert("cancel");
             });  
      }
      
      
      //用于生成uuid
      function S4() {
          return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
      }
      function guid() {
          return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
      }
      
	/***************************************/
		$scope.initData();
		
		
		//打开后返回顶部
        $timeout(function() {
            $(window).scrollTop(0,0);
        }, 200);
  }

})();
