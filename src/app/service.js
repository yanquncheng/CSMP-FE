
(function() {
	'use strict';

angular.module('BlurAdmin.service', []).
  factory('ReportExport', function () {
    var basePath = '/api/report/export';
    return {
        brocadePort:function(serialNumber){
            window.open(basePath+'/brocade/port/export/'+serialNumber);
        },
        brocadeZone:function(serialNumber){
          window.open(basePath+'/brocade/zone/'+serialNumber);
        },
        capacityDataCenter:function(extension){
          window.open(basePath+'/capacity/data_center/'+extension);
        },
        capacityLogicalPool:function(extension){
          window.open(basePath+'/capacity/logical_pool/'+extension);
        },
        capacityStorage:function(extension){
          window.open(basePath+'/capacity/storage/'+extension);
        },
        capacityApplicationHost:function(extension){
            window.open(basePath+'/capacity/application_host/'+extension);
        },
        capacityVirtualGateway:function(extension){
            window.open(basePath+'/capacity/virtual_gateway/'+extension);
        }
    };
  }).
  factory('fixedNumber', function () {
    return function (value, count) {
      var number = parseFloat(value);

      if (isNaN(number)) return value;
      return number.toFixed(count);
    }
  })
})();