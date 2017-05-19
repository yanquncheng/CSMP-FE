(function() {
    'use strict';

    angular.module('BlurAdmin.commonservice', [])
        .factory('commonService',commonService);

    /** @ngInject */
    function commonService($http, $timeout,toastr, $uibModal) {
        var service = {};
        var data = '';

        service.set = function(content) {
            console.log(content);
            data = content;
        };

        service.get = function() {
            console.log(data);
            return data;
        };
        
        /**
         * 消息提示方法
         */
        service.showMsg = function(type , msg) {
      	  
      	  if(type=="success"){
      		  toastr.success( msg + "");
      		  
      	  }else if (type=="info"){
      		  toastr.info( msg + "");
      		  
      	  }else if (type=="error"){
      		  toastr.error( msg + "");
      		  
      	  }else{
      		  toastr.warning( msg + "");
      	  }
        };
        
        
        /**
         * 确认提示框 提示方法
         */
        service.confirm = function(msg) {
        	var modalInstance = $uibModal.open({
                animation: true,
                template: "<div class='modal-content'>" +
                		"<div class='modal-header bg-primary'>" +
                		"<i class='glyphicon glyphicon-info-sign'></i><span> 提示</span>" +
                		"</div>" +
                		"<div class='modal-body text-center'>"+msg+"</div>" +
                		"<div class='modal-footer'>" +
                		"<button type='button' class='btn btn-primary' ng-click='$close()'>确认</button>" +
                		"<button type='button' class='btn btn-warning' ng-click='$dismiss()'>取消</button>" +
                		"</div></div>",
    			size: 'md',//md lg sm
                resolve: {items: function () {}  }
               });
        	 
        	return modalInstance ;
        };
        
        
        return service;
    }
})();
