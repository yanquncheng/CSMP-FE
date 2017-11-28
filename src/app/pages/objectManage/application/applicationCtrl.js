
(function () {
  'use strict';
  
  angular.module('BlurAdmin.pages.objectManage.application')
      .controller('applicationCtrl', applicationCtrlFunc);

  /** @ngInject */
  function applicationCtrlFunc($scope, $filter, $timeout , $http, $localStorage,toastr, $state, commonService, httpService,$stateParams,$uibModal) {
      
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
  	  
      //批量添加弹出页面
      $scope.addAllApp=function(){
          var modalInstance = $uibModal.open({
                animation: true,
                template: "<div class='modal-content'>" +
                    "<div class='modal-header bg-primary'>" +
                    "<i class='glyphicon glyphicon-info-sign'></i><span> 批量添加应用</span>" +
                    "</div>" +
                    "<div class='modal-body text-center'><div class='row'>"+
                    "<span class='col-lg-7 col-sm-7 col-xlg-7 '><input style='margin-left:30px' id='csvInput' class='btn-default btn' type='file' accept='.csv'></span>" +
                    "<span class='col-lg-3 col-sm-3 col-xlg-3 ' style='margin-top:15px'>应用文件上传.CSV</span></div></div>" +
                    "<div class='modal-footer'>" +
                    "<button type='button' class='btn btn-primary' ng-click='$close()'>确认</button>" +
                    "<button type='button' class='btn btn-warning' ng-click='$dismiss()'>取消</button>" +
                    "</div></div>",
                size: 'md',//md lg sm 
                resolve: {items: function () {}  }
              }); 
          modalInstance.result.then(function (result) {  
            $scope.csv2arr(); 
          }, function (reason) {    
           console.log(reason);//点击空白区域，总会输出backdrop click，点击取消，则会暑促cancel    
          }); 
      }

     $scope.csv2arr = function(){
        if( typeof(FileReader) !== 'undefined' ){    //H5
          var reader = new FileReader();
          reader.readAsText( $("#csvInput")[0].files[0] );            //以文本格式读取

          reader.onload = function(evt){
              var data = evt.target.result;        //读到的数据
              var b = data.split("\r\n");
              b.shift();
        httpService.post('/application',b, config, function (response){
          console.log("response:--->"+response);
          commonService.showMsg("success","主机操作成功!");
          $scope.initApply();
        });

          }
        }else{
            alert("IE9及以下浏览器不支持，请使用Chrome或Firefox浏览器");
        } 
     }



		/***************************************/
  	  	$scope.initApply();
		
  	  	//打开后返回顶部
        $timeout(function() {
            $(window).scrollTop(0,0);
        }, 200);
  }

})();
