
(function () {
  'use strict';
  
  angular.module('BlurAdmin.pages.sysManage.report')
      .controller('reportCtrl', hostCtrlFunc);

  /** @ngInject */
  function hostCtrlFunc($scope, $filter, $timeout , $http, $localStorage,toastr, $state, commonService, $stateParams,httpService,$uibModal) {
      
	  var config = { headers: {
          "Authorization": $localStorage.authKey
      }}
	  $scope.smartTablePageSize = 15;
	  $scope.Format=[{"name":"docx"},{"name":"pdf"},{"name":"xsl"},{"name":"csv"},{"name":"ppt"}];  //主机基本信息状态
	  var datacenter = $stateParams.datacenter;
	  //报表列表查询
  	$scope.initApply = function (){
  		var params ={};
  		if(datacenter!=null && datacenter!=''){
  			params.datacenter=datacenter;
  		}
  		httpService.get("/reporting/info", params, config, function (response){
          $scope.DataList = response;
      });
  	};
  	//获取报表类型的方法
  	$scope.types=[];
  	$scope.getReportType=function(){
  		httpService.get("/reporting/types", null, config, function (response){
          $scope.types = response;
      });
  	}
	  
	  
  
	  /** 主机新增*/
	 $scope.editPanel = false;
	 $scope.addReport=function(){
		 	$scope.getReportType();   //查询报表类型的方法
		 	$scope.report={};
		 	$scope.report.Type = $scope.types[0].Type;
		 	$scope.report.Format=$scope.Format[0].name;
		 	$scope.editPanel=true;
		 	$scope.panelTtile = '报表新增' ;
	 };
	 /**
   * 新增/编辑返回
   */
	 $scope.panelBack = function (){
 		$scope.editPanel = false ;
 	 };
 	 
 	 $scope.report={};
 	 //新增，编辑保存的方法
 	 $scope.reportSave= function(){
 	 	if(!$scope.report.ID){
 			commonService.showMsg("error","请输入报表ID！");
			return;
 		 }
 	 	if(!$scope.report.Name){
 			commonService.showMsg("error","请输入报表名称！");
			return;
 		 }
 	 	if(!$scope.report.GenerateURL){
 			commonService.showMsg("error","请输入报表生成API！");
			return;
 		 }
 	 	if(!$scope.report.TemplatePath){
 			commonService.showMsg("error","请输入报表模板资源路径！");
			return;
 		 }
 	 	if(!$scope.report.GenerateOutputPath){
 			commonService.showMsg("error","请输入文件输出路径！");
			return;
 		 }
 	 	var TypeIcon="";
 	 	for(var i in $scope.types){
 	 		if($scope.types[i].Type==$scope.report.Type){
 	 			TypeIcon=$scope.types[i].TypeIcon;
 	 			break;
 	 		}
 	 	}
 	 	//获取ReportParamater信息
 	 	var Name = "";  
    var DisplayName = "";  
		var Description ="";
    var tabledata = ""; 
    var Type="";
    var Data="";
 	 	var table = $("#para_table");  
 	 	var tbody = table.children(); 
 	 	var trs = tbody.children();  
 	 	for(var i=1;i<trs.length;i++){  
 	 	 	var tds = trs.eq(i).children(); 
 	 	 	Data="";
 	 	 	for(var j=0;j<tds.length;j++){  
 	 	 		if(j==0){
 	 	 			if(tds.eq(j).text()==null||tds.eq(j).text()==""){  
            return null;  
        	}  
        	Name = "Name\":\""+tds.eq(j).text();  
 	 	 		}
 	 	 		if(j==1){  
           if(tds.eq(j).text()==null||tds.eq(j).text()==""){  
            return null;  
        	}   
        	DisplayName = "DisplayName\":\""+tds.eq(j).text();  
        } 
        if(j==2){  
           if(tds.eq(j).text()==null||tds.eq(j).text()==""){  
            return null;  
        	}   
        	Description = "Description\":\""+tds.eq(j).text();  
        }
        if(j==3){  
           if(tds.eq(j).text()==null||tds.eq(j).text()==""){  
            return null;  
        	}   
        	Type = "Type\":\""+tds.eq(j).text();  
        }
        if(j==4 && tds.eq(3).text()=="List"){  
           if(tds.eq(3).text()=="List" && tds.eq(j).text()==null||tds.eq(j).text()==""){  
           	commonService.showMsg("error","当类型为List, 必须输入数据API列!");
            return null;  
        	}
        	Data = "Data\":\""+tds.eq(j).text();  
        }
 	 	 	}
 	 	 	if(i==trs.length-1){  
 	 	 		if(Data!=""){
 	 	 			tabledata += "{\""+Name+"\",\""+DisplayName+"\",\""+Description+"\",\""+Type+"\",\""+Data+"\"}";  
 	 	 		}else{
 	 	 			tabledata += "{\""+Name+"\",\""+DisplayName+"\",\""+Description+"\",\""+Type+"\"}"; 
 	 	 		}
    	}else{  
    		if(Data!=""){
    			 tabledata += "{\""+Name+"\",\""+DisplayName+"\",\""+Description+"\",\""+Type+"\",\""+Data+"\"},"; 
    		}else{
    			 tabledata += "{\""+Name+"\",\""+DisplayName+"\",\""+Description+"\",\""+Type+"\"},"; 
    		}
        
    	} 
 	 	}
 	 	$scope.report.ReportParamater=angular.fromJson("["+tabledata+"]");
 	 	$scope.report.TypeIcon=TypeIcon;
 	 	if($scope.report.Generate){
 	 		$scope.report.Generate="disable";
 	 	}else{
 	 		$scope.report.Generate="enable";
 	 	}
        console.log("提交信息"+angular.toJson($scope.report,2));
        httpService.post('/reporting/info', $scope.report, config, function (response){
        	console.log("response:--->"+response);
        	commonService.showMsg("success","报表操作成功!");
        	$scope.panelBack();
        	$scope.initApply();
	      });
 	 };
 	 /**
 	  * 主机编辑
 	  */
 	 $scope.editReport=function(row){
 	 	$scope.getReportType();   //查询报表类型的方法
 	 	$scope.report={};
 	 	$scope.report=row;
 	 	$scope.editPanel=true;
	 	$scope.panelTtile = '报表编辑' ;
 	 }
 	 
 	 
 	 
 	 //新增编辑页面 ReportParamater 行添加
 	 $scope.addtr=function(){
 	 	var table = $("#para_table");  
 	 	var tr= $("<tr>" +  
        "<td  onclick='tdclick(this)'>"+"</td>" +  
        "<td  onclick='tdclick(this)'>"+"</td>" +  
        "<td  onclick='tdclick(this)'>"+"</td>" +  
        "<td  onclick='tdclick1(this)'>"+"</td>" +  
        "<td  onclick='tdclick(this)'>"+"</td>" +  
        "<td>"+
        "<button type='button' onclick='deletetr(this);' class='btn btn-danger btn-with-icon editable-table-button btn-xs'>"+
        "<i class='glyphicon glyphicon-remove'></i>删除"+"</button></td></tr>");
    table.append(tr); 
 	 };
 	 
 	 //删除主机的方法
 	 $scope.delReport = function(id){
 	 	var modalInstance = commonService.confirm("确认要删除该报表吗？");
	  modalInstance.result.then(function (result) {    
			httpService.delete('/reporting/info?ID='+id, null, config, function (response){
	        	console.log("response:--->"+response);
	        	commonService.showMsg("success","删除报表成功!");
	        	$scope.initApply();
		      });
     }, function (reason) {    
         console.log(reason);//点击空白区域，总会输出backdrop click，点击取消，则会暑促cancel    
     });  
 	 }
   	 
  $scope.initApply();
  }
})();
