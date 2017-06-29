
(function () {
  'use strict';
  
  angular.module('BlurAdmin.pages.performance.logicalPerformance')
      .controller('logicalCtrl', logicalCtrl);

  /** @ngInject */
  function logicalCtrl($scope, $filter, $http, $localStorage,toastr, $uibModal,httpService) {
  	var config = { headers: {
          "Authorization": $localStorage.authKey
      }}
  	$scope.logicalTablePageSize = 15;
  	var count = 19;
    var perHeight = 19;
    $scope.colors1=[];
  	var colors = ['#0000FF', '#0033FF', '#0066FF', '#0099FF', '#00CCFF', '#00FFFF', '#00FFCC', '#00FF99', '#00FF66', '#00FF33', '#00FF00', '#33FF00', '#66FF00', '#99FF00', '#FFFF00', '#FFCC00', '#FF9900', '#FF6600', '#FF3300', '#FF0000'];
  	//TODO 调用be项目里面的 performance配置的路径方法
  	$scope.query=function() {
        //调用后台请求下拉列表数据
//      $http.get(IG.api + '/arrays' , config )
//        .success(function (response) { 
//            $scope.serialNumbers = response;  
//            $scope.filter.selectValue=$scope.serialNumbers[0].device;
//            $scope.selectChange();
//            
//            for (var index = 19; index >= 0; index--) {
//				        var color = colors[index];
//				        $scope.colors1.push(angular.copy(color));
//				      }              
//	      }).error(function (err) {
//	          console.log(err);   
//	      });
	      
	      httpService.get("/arrays", null, config, function (response){
      	 	$scope.serialNumbers = response;  
          $scope.filter.selectValue=$scope.serialNumbers[0].device;
          $scope.selectChange();
          
          for (var index = 19; index >= 0; index--) {
		        var color = colors[index];
		        $scope.colors1.push(angular.copy(color));
		      }   
      	});
      }
		$scope.filter={};
		$scope.isSuccess = false;
  	$scope.selectChange=function() {
  		$scope.isSuccess = false;
//		alert($scope.filter.selectValue);
  		//选择select的时候查询列表数据
  		$scope.LogicalDataArrayList={};
  		httpService.get("/array/luns", {'device':$scope.filter.selectValue}, config, function (response){
//		 $http.get(IG.api + '/array/luns?device='+$scope.filter.selectValue, config )
//        .success(function (response) { 
              
              for ( var i in response ) {  //循环计算
//            	response[i].Capacity=parseFloat(parseFloat(response[i].Capacity).toFixed(2));
//            	response[i].UsedCapacity=parseFloat(parseFloat(response[i].UsedCapacity).toFixed(2));
           			var item = response[i].perf;
//         			for(var j in item){
									//ReadRequests的最大值
									var readMax=0;
									if(item!=null &&item.length>0 && item[0].ReadRequests!=null && item[0].ReadRequests!=undefined && item[0].ReadRequests!=""){
										var read = item[0].ReadRequests;
	           				var readMax = read[0][1];
	           				var readlen = read.length;
	           				for(var r = 1; r < readlen; r++){   
	           					if(read[r][r+1]>readMax){
	           						readMax= read[r][r+1]
	           					}
	           				}
									}
           				//WriteRequests的最大值
           				var writeMax=0;
           				if(item!=null &&item.length>1 && item[1].WriteRequests!=null && item[1].WriteRequests!=undefined && item[1].WriteRequests!=""){
	       						var write= item[1].WriteRequests;
	       					  var writeMax = write[0][1];
	           				var writeLen = write.length;
	           				for(var w = 1; w < writeLen; w++){   
	           					if(write[w][w+1]>writeMax){
	           						writeMax= write[w][w+1]
	           					}
	           				}
           				}
           				response[i].iops=parseFloat((parseFloat(readMax)+parseFloat(writeMax)).toFixed(2));  //IOPS 最大值
           				//ReadThroughput最大值
           				var readThroughputMax=0;
           				if(item!=null &&item.length>2 && item[2].ReadThroughput!=null && item[2].ReadThroughput!=undefined && item[2].ReadThroughput!=""){
           					var readThroughput= item[2].ReadThroughput;
		       					var readThroughputMax = readThroughput[0][1];
		           			var readThroughputLen = readThroughput.length;
	           				for(var readTh = 1; readTh < readThroughputLen; readTh++){   
	           					if(readThroughput[readTh][readTh+1]>readThroughputMax){
	           						readThroughputMax= readThroughput[readTh][readTh+1]
	           					}
	           				}
           				}
           				//WriteThroughput最大值
           				var writeThroughputMax=0;
           				if(item!=null &&item.length>3 && item[3].WriteThroughput!=null && item[3].WriteThroughput!=undefined && item[3].WriteThroughput!=""){
           					var writeThroughput= item[3].WriteThroughput;
		       					var writeThroughputMax = writeThroughput[0][1];
		           			var writeThroughputLen = writeThroughput.length;
	           				for(var writeTh = 1; writeTh < writeThroughputLen; writeTh++){   
	           					if(writeThroughput[writeTh][writeTh+1]>writeThroughputMax){
	           						writeThroughputMax= writeThroughput[writeTh][writeTh+1]
	           					}
	           				}
           				}
           				response[i].Throughput=parseFloat((parseFloat(readThroughputMax)+parseFloat(writeThroughputMax)).toFixed(2));  //Throughput最大值
           				
           				//ReadResponseTime最大值
           				var readResponseTimeMax=0;
           				if(item!=null &&item.length>4 && item[4].ReadResponseTime!=null && item[4].ReadResponseTime!=undefined && item[4].ReadResponseTime!=""){
           					var readResponseTime= item[4].ReadResponseTime;
		       					var readResponseTimeMax = readResponseTime[0][1];
		           			var readResponseTimeLen = readResponseTime.length;
	           				for(var readPt = 1; readPt < readResponseTimeLen; readPt++){   
	           					if(readResponseTime[readPt][readPt+1]>readResponseTimeMax){
	           						readResponseTimeMax= readResponseTime[readPt][readPt+1]
	           					}
	           				}
           				}
           				//WriteResponseTime最大值
           				var writeResponseTimeMax=0;
           				if(item!=null &&item.length>5 && item[5].WriteResponseTime!=null && item[5].WriteResponseTime!=undefined && item[5].WriteResponseTime!=""){
           					var writeResponseTime= item[5].WriteResponseTime;
		       					var writeResponseTimeMax = writeResponseTime[0][1];
		           			var writeResponseTimeLen = writeResponseTime.length;
	           				for(var writePt = 1; writePt < writeResponseTimeLen; writePt++){   
	           					if(writeResponseTime[writePt][writePt+1]>writeResponseTimeMax){
	           						writeResponseTimeMax= writeResponseTime[writePt][writePt+1]
	           					}
	           				}
           				}
           				response[i].ResponseTime=parseFloat((parseFloat(readResponseTimeMax)+parseFloat(writeResponseTimeMax)).toFixed(2));  //TResponseTime最大值
//         			}
           		}
              $scope.LogicalDataArrayList = response;
          });
//	      }).error(function (err) {
//	          console.log(err);   
//	      });
	      //图形数据查询
	      httpService.get("/array/hosts", {'device':$scope.filter.selectValue}, config, function (response){
//	      $http.get(IG.api + '/array/hosts?device='+$scope.filter.selectValue, config )
//        .success(function (response) { 
              $scope.hosts = response;
              for (var i = 0; i < response.length; i++) {
		            var host = response[i];
		            host.height = getHeight(host.Devices.length, count, perHeight);
		            for (var j = 0; j < host.Devices.length; j++) {
		              var lun = host.Devices[j];
		              lun.color = getColor(colors, lun.Availability);
		              lun.displayPart =lun.part;// parseInt(lun.part).toFixed(1);
		              host.Devices[j] = lun;
//		              calculate(array, lun);
//		              obj[lun.host] = lun.host;
		            }
		          }
              $scope.isSuccess = true;
           });
  	};
  	
    function getHeight(totalCount, count, perHeight) {
	    var times = parseInt(totalCount / count);
	    if (totalCount % count)times++;
	    return times * perHeight;
	  }
	  
	  function getColor(colors, percent) {
		  if (percent.toString().indexOf('e') > -1) {
		    return "#0000FF";
		  }
		  if (percent == 100) return "#FF0000";
		  if (percent <= 0) return "#0000FF";
		  var index = parseInt(percent / 5);
		  return colors[index];
		}
  	
  	$scope.query();
  }
})();
