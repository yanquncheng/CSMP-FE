
(function () {
  'use strict';
  
  angular.module('BlurAdmin.pages.objectManage.host')
      .controller('hostCtrl', hostCtrlFunc);

  /** @ngInject */
  function hostCtrlFunc($scope, $filter, $timeout , $http, $localStorage,toastr, $state, commonService, $stateParams,httpService) {
      
	  var config = { headers: {
          "Authorization": $localStorage.authKey
      }}
	  $scope.smartTablePageSize = 15;
	  $scope.status=[{"name":"Product"},{"name":"Test"},{"name":"Development"}];  //主机基本信息状态
	  //主机列表查询
  	$scope.initApply = function (){
  		httpService.get("/hosts", null, config, function (response){
          $scope.DataList = response;
      });
  	};
  	//点击名称 显示详情的 js方法
  	$scope.hostDetail = function(host){
//	  	var param = angular.copy(host);
//		  param.type = type ;
//		  $state.go('dashboard.objectManage.host.hostDetail', {param: param });
				httpService.get('/menu/ObjectManage/Array', {arraytype: 'VMAX100K'}, config, function (response) {
	    	if(typeof response == 'string'){
	          commonService.showMsg("error", response);
	    	}else{
		    	var tabs = response;
		    	var id = 1;
		    	angular.forEach(tabs, function(item, index){
	    			item.id = id++;
		    		if(!item.hasDetail){
		    			item.page = "app/pages/objectManage/host/template_"+item.template+".html";
		    		}else{
		    			angular.forEach(item.tabDetail, function(det, idx){
		    				det.id = id++;
		    				det.page = "app/pages/objectManage/host/template_"+det.template+".html";
		    			});
		    		}
		    	});
	 		    $state.go('dashboard.objectManage.host.hostDetail', {param: {host: host, tabs: tabs}});
	    	}
	    });
	  }     
	  
	  
	//初始化加载Datacenter列表
  $scope.datacenter = []; 
  $scope.initDatacenter = function (){
	  
	  httpService.get("/matadata/datacenter", null, config, function (response){
  		if(!response || response.length==0){
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
  			response = $scope.treeData;
  		}
  		
  		angular.forEach(response, function (item) {
			angular.forEach(item.Building, function (build) {
				angular.forEach(build.Floor, function (floor) {
					angular.forEach(floor.Unit, function (unit) {
						var obj = {};
						obj.id = unit.UnitID
						obj.name = item.Name+" - "+build.Name+" - "+floor.Name+" - "+unit.Name
  	  					$scope.datacenter.push(obj);
						
  	  				});
  	            });
            });
        });
      });
  };
  
  
  //应用系统名称
  $scope.apps = []; 
  $scope.initApps = function (){
  	httpService.get("/application", null, config, function (response){
  		$scope.apps=response;
  	});
  };
	  
	  
	  /** 主机新增*/
	 $scope.editPanel = false;
	 $scope.addHost=function(){
	 	$scope.host={};
	 	$scope.editPanel=true;
	 	$scope.panelTtile = '主机新增' ;
	 	
	 	$('#APPs').selectpicker({
		 'selectedText': 'cat'
		 });
		 $('#APPs').selectpicker('val', []);
	 };
	 /**
   * 新增/编辑返回
   */
	 $scope.panelBack = function (){
 		$scope.editPanel = false ;
 	 };
 	 
 	 $scope.host={};
 	 //新增，编辑保存的方法
 	 $scope.hostSave= function(){
 	 	//获取HBAs信息
 	 	var name = "";  
    var wwn = "";  
		var AB ="";
    var tabledata = ""; 
 	 	var table = $("#para_table");  
 	 	var tbody = table.children(); 
 	 	var trs = tbody.children();  
 	 	for(var i=1;i<trs.length;i++){  
 	 	 	var tds = trs.eq(i).children(); 
 	 	 	for(var j=0;j<tds.length;j++){  
 	 	 		if(j==0){
 	 	 			if(tds.eq(j).text()==null||tds.eq(j).text()==""){  
            return null;  
        	}  
        	name = "name\":\""+tds.eq(j).text();  
 	 	 		}
 	 	 		if(j==1){  
           if(tds.eq(j).text()==null||tds.eq(j).text()==""){  
            return null;  
        	}   
        	wwn = "wwn\":\""+tds.eq(j).text();  
        } 
        if(j==2){  
           if(tds.eq(j).text()==null||tds.eq(j).text()==""){  
            return null;  
        	}   
        	AB = "AB\":\""+tds.eq(j).text();  
        }
 	 	 	}
 	 	 	if(i==trs.length-1){  
        tabledata += "{\""+name+"\",\""+wwn+"\",\""+AB+"\"}";  
    	}else{  
        tabledata += "{\""+name+"\",\""+wwn+"\",\""+AB+"\"},";  
    	} 
 	 	}
 	 	$scope.host.HBAs=angular.fromJson("["+tabledata+"]");
        console.log("提交信息"+angular.toJson($scope.host,2));
        httpService.post('/host', $scope.host, config, function (response){
        	console.log("response:--->"+response);
        	commonService.showMsg("success","主机操作成功!");
        	$scope.panelBack();
	      });
 	 };
 	 /**
 	  * 主机编辑
 	  */
 	 $scope.editHost=function(row){
 	 	$scope.host=row;
 	 	$scope.editPanel=true;
	 	$scope.panelTtile = '主机编辑' ;
	 	$('#APPs').selectpicker({
		 'selectedText': 'cat'
		 });
		 $('#APPs').selectpicker('val', row.APPs);
 	 }
 	 
 	 
 	 
 	 //新增编辑页面 HBA端口行添加
 	 $scope.addtr=function(){
 	 	var table = $("#para_table");  
 	 	var tr= $("<tr>" +  
        "<td  onclick='tdclick(this)'>"+"</td>" +  
        "<td  onclick='tdclick(this)'>"+"</td>" +  
        "<td  onclick='tdclick1(this)'>"+"</td>" +  
        "<td>"+
        "<button type='button' onclick='deletetr(this);' class='btn btn-danger btn-with-icon editable-table-button btn-xs'>"+
        "<i class='glyphicon glyphicon-remove'></i>删除"+"</button></td></tr>");
    table.append(tr); 
 	 };
	 
  $scope.initApply();
  $scope.initDatacenter();
  $scope.initApps();
  }
})();
