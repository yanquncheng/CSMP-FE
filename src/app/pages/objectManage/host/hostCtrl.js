
(function () {
  'use strict';
  
  angular.module('BlurAdmin.pages.objectManage.host')
      .controller('hostCtrl', hostCtrlFunc);

  /** @ngInject */
  function hostCtrlFunc($scope, $filter, $timeout , $http, $localStorage,toastr, $state, commonService, $stateParams,httpService,$uibModal) {
      
	  var config = { headers: {
          "Authorization": $localStorage.authKey
      }}
	  $scope.smartTablePageSize = 15;
	  $scope.status=[{"name":"Product"},{"name":"Test"},{"name":"Development"}];  //主机基本信息状态
	  $scope.baseinfoType=[{"name":"Physical"},{"name":"Virtual"}];
	  var datacenter = $stateParams.datacenter;
	  var appid = $stateParams.appid; 

	  //主机列表查询
  	$scope.initApply = function (){
  		var params ={};
  		if(datacenter!=null && datacenter!=''){
  			params.datacenter=datacenter;
  		}  
  		if ( appid != null && appid != '' ) {
  			params.appid=appid;
  			$scope.appid=appid;
  		}
  		console.log("-------------999\n"+appid);
  		httpService.get("/hosts", params, config, function (response){
          $scope.DataList = response;
      });
  	};

	//返回
	$scope.back = function (){
		var backUrl = "dashboard.objectManage.application";

		$state.go(backUrl,{datacenter: null });
	};


  	//点击名称 显示详情的 js方法
  	$scope.hostDetail = function(host){
//	  	var param = angular.copy(host);
//		  param.type = type ;
//		  $state.go('dashboard.objectManage.host.hostDetail', {param: param });


		httpService.get('/menu/ObjectManage/Host', null, config, function (response) {
		if(typeof response == 'string'){
		  commonService.showMsg("error", response);
		}else{
			var tabs = response;
			var id = 1;
			angular.forEach(tabs, function(item, index){
				item.id = id++;
				if(!item.hasDetail){
					item.page = "app/pages/templates/template_"+item.template+".html";
				}else{
					angular.forEach(item.tabDetail, function(det, idx){
						det.id = id++;
						det.page = "app/pages/templates/template_"+det.template+".html";
					});
				}
			});
			$scope.storage={};
			$scope.storage=host.baseinfo;
			$scope.storage.device=host.baseinfo.name;
			var backUrl = "dashboard.objectManage.host" ;
			$state.go('dashboard.templatedetails', {param: {"storage": $scope.storage, "tabs": tabs,"backUrl":backUrl}});
		}
	    });
	  }     
	  
	  
	//初始化加载Datacenter列表
  $scope.datacenter = []; 
  $scope.initDatacenter = function (){
	  
	  httpService.get("/matadata/datacenter", null, config, function (response){
//			response = $scope.treeData;  		
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
	  $('#APPs').selectpicker({
		  dropupAuto : false
		})
  	httpService.get("/application", null, config, function (response){
  		$scope.apps=response;
  		$timeout(function(){
  			 $('#APPs').selectpicker('refresh');
  	         $('APPs').selectpicker('render');  
  		},200);
  	   
  	});
  };
	  
	  
	  /** 主机新增*/
	 $scope.editPanel = false;
	 $scope.addHost=function(){
	 	$scope.initDatacenter();
	 	$scope.initApps();
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
 	 	if(!$scope.host.baseinfo){
 			commonService.showMsg("error","请输入主机名称！");
			return;
 		 }
 	 	if( $scope.host.baseinfo && !$scope.host.baseinfo.name){
 	 		commonService.showMsg("error","请输入主机名称！");
			return;
 	 	}
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
 	 		var td0 = "";  
 	 	 	var td1 = "";  
 			var td2 ="";
 			td0 = tds.eq(0).text();
 			td1 = tds.eq(1).text();
 			td2 = tds.eq(2).text();
 			
	 		name = "name\":\""+ td0;  
	 		wwn = "wwn\":\""+ td1;  
	        AB = "AB\":\""+ td2;  
 	 	 	
 	 	 	if(!(td2 == td1 && td1== td0 && (td2==''||td2==null))){  
	 	 		if(i==trs.length-1){  
			        tabledata += "{\""+name+"\",\""+wwn+"\",\""+AB+"\"}";  
			    }else{  
			        tabledata += "{\""+name+"\",\""+wwn+"\",\""+AB+"\"},";  
			    } 
	 	 	}
 	 	}
 	 	$scope.host.HBAs=angular.fromJson("["+tabledata+"]");
        console.log("提交信息:"+angular.toJson($scope.host,2));
        console.log("***************************");
        httpService.post('/host', $scope.host, config, function (response){
        	console.log("response:--->"+response);
        	commonService.showMsg("success","主机操作成功!");
        	$scope.panelBack();
        	$scope.initApply();
	      });
//				$http.post(IG.api + "/host" ,  $scope.host , config )
//      .success(function (response) {
//      	console.log("response:--->"+response);
//      	commonService.showMsg("success","主机操作成功!");
//      	$scope.panelBack();
//      }).error(function (err) {
//	          console.log(err);
//	          commonService.showMsg("error",err.message);
//	      });
 	 };
 	 /**
 	  * 主机编辑
 	  */
 	 $scope.editHost=function(row){
 	 	$scope.initDatacenter();
 	 	$scope.initApps();
 	 	$scope.host={};
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
 	 
 	 //删除主机的方法
 	 $scope.delHost = function(name){
 	 	var modalInstance = commonService.confirm("确认要删除该主机吗？");
	  modalInstance.result.then(function (result) {    
			httpService.delete('/host?device='+name, null, config, function (response){
	        	console.log("response:--->"+response);
	        	commonService.showMsg("success","删除主机成功!");
	        	$scope.initApply();
		      });
     }, function (reason) {    
         console.log(reason);//点击空白区域，总会输出backdrop click，点击取消，则会暑促cancel    
     });  
 	 }
 	 
 	 //批量添加主键弹出页面
   	 $scope.addAllHost=function(){
	   	 	var modalInstance = $uibModal.open({
		    animation: true,
		    template: "<div class='modal-content'>" +
		    		"<div class='modal-header bg-primary'>" +
		    		"<i class='glyphicon glyphicon-info-sign'></i><span> 批量添加主机</span>" +
		    		"</div>" +
		    		"<div class='modal-body text-center'><div class='row'>"+
		    		"<span class='col-lg-7 col-sm-7 col-xlg-7 '><input style='margin-left:30px' id='csvInput' class='btn-default btn' type='file' accept='.csv'></span>" +
		    		"<span class='col-lg-3 col-sm-3 col-xlg-3 ' style='margin-top:15px'>主机文件上传.CSV</span></div></div>" +
		    		"<div class='modal-footer'>" +
		    		"<button type='button' class='btn btn-primary' ng-click='$close()'>确认</button>" +
		    		"<button type='button' class='btn btn-warning' ng-click='$dismiss()'>取消</button>" +
		    		"</div></div>",
				size: 'md',//md lg sm
//				controller: '',
		    resolve: {items: function () {}  }
		   });
		  modalInstance.result.then(function (result) {  
		  	//$scope.csv2arr(); 
		  	$scope.csv2arr_dlbank(); 
     }, function (reason) {    
         console.log(reason);//点击空白区域，总会输出backdrop click，点击取消，则会暑促cancel    
     }); 
   	 }
   	 
   	 
   	 
   	 $scope.addAllHostData={
		    "baseinfo":{
				"id":"",
		        "name":"",
		        "sn":"",
		        "HAType":"",
		        "type":"Physical",                       
		        "catalog": "",                        
		        "status": "Test",                         
		        "management_ip": "",           
		        "service_ip": "",     
		        "UnitID": "",                      
		        "description":"" 
		    },
		    "maintenance":{
		        "vendor":"",                             
		        "contact":"",                    
		        "maintenance_department" : "",      
		        "maintenance_owner": ""  ,
		        "datacenter":"",
		        "room":""               
		    },
		    "assets": {
		      "no": "",                          
		      "purpose": "",                      
		      "department": "",                    
		      "manager": ""                      
		    },
		    "configuration" : {
		      "OS": "",                               
		      "OSVersion": "",	
		      "memory": "",   
		      "cpu" : "",                        
		      "other": ""     
				},
		    "HBAs": [
//		    	{  "name" : "",                      
//					"wwn":"", 	        
//					"AB": ""                            
//					} 
		    ],
			  "APPs": []                 
	};

   	 
   	 $scope.csv2arr = function(){
   	 	if( typeof(FileReader) !== 'undefined' ){    //H5
        var reader = new FileReader();
        reader.readAsText( $("#csvInput")[0].files[0] );            //以文本格式读取
        reader.onload = function(evt){
            var data = evt.target.result;        //读到的数据
            var b = data.split("\r\n");
            b.shift();
            for(var i in b){
            	if(b[i].length<1){
            			$scope.initApply();
            		return;
            	}
            	$scope.addAllHostData.baseinfo.name = b[i].split(",")[0];
            	$scope.addAllHostData.baseinfo.service_ip = b[i].split(",")[1];
            	var wwn = b[i].split(",")[2].split("|");
            	$scope.addAllHostData.HBAs=[];
            	for(var j in wwn){
            		var hbas={"name":"","AB":""};
            		hbas.wwn=wwn[j];
            		$scope.addAllHostData.HBAs.push(hbas);
            	}
            	 var params = angular.copy($scope.addAllHostData);
            	 httpService.post('/host',params, config, function (response){
			        	console.log("response:--->"+response);
			        	commonService.showMsg("success","主机操作成功!");
			        	if(i==b.length-1){
	            		$scope.initApply();
			        	}
				      });
//          	 console.log(angular.toJson($scope.addAllHostData,2)+"----");
            }
        }
	    }else{
	        alert("IE9及以下浏览器不支持，请使用Chrome或Firefox浏览器");
	    }
// 	 	$scope.$close('cancel');
   	 }


   	 $scope.csv2arr_dlbank = function(){
   	 	if( typeof(FileReader) !== 'undefined' ){    //H5
        var reader = new FileReader();
        reader.readAsText( $("#csvInput")[0].files[0] ,"GBK" );            //以文本格式读取
        reader.onload = function(evt){
            var data = evt.target.result;        //读到的数据
            var b = data.split("\r\n");
            b.shift();
            for(var i in b){
            	if(b[i].length<1){
            			$scope.initApply();
            		return;
				}
				
            	$scope.addAllHostData.baseinfo.id = b[i].split(",")[23];
				$scope.addAllHostData.baseinfo.name = b[i].split(",")[5];
            	$scope.addAllHostData.baseinfo.service_ip = b[i].split(",")[8];
            	$scope.addAllHostData.baseinfo.type = b[i].split(",")[3];
            	$scope.addAllHostData.baseinfo.catalog = b[i].split(",")[4];
            	$scope.addAllHostData.baseinfo.status = b[i].split(",")[6];
            	$scope.addAllHostData.baseinfo.management_ip = b[i].split(",")[7];
            	$scope.addAllHostData.baseinfo.description = b[i].split(",")[3];
            	$scope.addAllHostData.baseinfo.catalog = b[i].split(",")[20];
            	$scope.addAllHostData.baseinfo.sn = b[i].split(",")[1];
            	$scope.addAllHostData.baseinfo.HAType = b[i].split(",")[2];

            	$scope.addAllHostData.maintenance.vendor = "";
				$scope.addAllHostData.maintenance.contact = "";
				$scope.addAllHostData.maintenance.maintenance_department = b[i].split(",")[12];
				$scope.addAllHostData.maintenance.maintenance_owner = b[i].split(",")[13];
				$scope.addAllHostData.maintenance.datacenter = b[i].split(",")[10];
				$scope.addAllHostData.maintenance.room = b[i].split(",")[11];

				$scope.addAllHostData.configuration.OS = b[i].split(",")[14];
				$scope.addAllHostData.configuration.OSVersion = b[i].split(",")[15];
				$scope.addAllHostData.configuration.memory = b[i].split(",")[17];
				$scope.addAllHostData.configuration.cpu = b[i].split(",")[16];
				$scope.addAllHostData.configuration.other = b[i].split(",")[18];

            	var wwn = b[i].split(",")[21].split("#");
            	$scope.addAllHostData.HBAs=[];
            	for(var j in wwn){
            		var hbas={"name":"","AB":""};
            		hbas.wwn=wwn[j].split("@")[0];
            		$scope.addAllHostData.HBAs.push(hbas);
            	}

            	var apps = b[i].split(",")[22].split("@");
            	$scope.addAllHostData.APPs=[];
            	for(var j in apps){
            		$scope.addAllHostData.APPs.push(apps[j]);
            	}


            	 var params = angular.copy($scope.addAllHostData);
            	 httpService.post('/host',params, config, function (response){
			        	console.log("response:--->"+response);
			        	commonService.showMsg("success","主机操作成功!");
			        	if(i==b.length-1){
	            		$scope.initApply();
			        	}
				      });
	//          	 console.log(angular.toJson($scope.addAllHostData,2)+"----");
	            }
	        }
		    }else{
		        alert("IE9及以下浏览器不支持，请使用Chrome或Firefox浏览器");
		    }
	// 	 	$scope.$close('cancel');
	   	 }
 	  	 
  $scope.initApply();
  }
})();
