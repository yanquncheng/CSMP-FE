/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard')
      .controller('eventByRecentlyCtrl', eventByRecentlyCtrl);

  /** @ngInject */
  function eventByRecentlyCtrl($scope,httpService, $localStorage,$interval,$timeout) {

        var config = { headers: {
            "Authorization": $localStorage.authKey
        }};
        var cfg = angular.copy(config);


        $scope.reloadEvents = function(){
 
                httpService.get('/events', null, cfg, function (response) {
                    var capacityData = response;

                    var eventResult = [];
                    for ( var i in response ) {
                        var item = response[i];

                        var resItem = {};
                        resItem["severity"] = item.severity;
                        resItem["device"] = item.device;
                        resItem["part"] = item.parttype + ' ' + item.part;
                        resItem["header"] = item.eventdisplayname;
                        resItem["text"] = item.fullmsg;
                        resItem["time"] = moment(parseInt(item.timestamp)*1000).format("YYYY-MM-DD HH:mm:ss");
                        var diff = moment.unix(item.timestamp).fromNow();
                        resItem["ago"] = diff;
                        resItem["expanded"] = false;
                        resItem["deviceType"] = item.devtype;

                        eventResult.push(resItem);
                    }
                    $scope.feed = eventResult;

                  });
                  
     
    };
 

    $scope.expandMessage = function(message){
      message.expanded = !message.expanded;
    } 

    // 10分钟执行一次
    $scope.runner_reloadevents = $interval($scope.reloadEvents(), 600000);
    
    $scope.$on('$destroy', function () {
        $interval.cancel($scope.runner_reloadevents);  
    });

  }
})();