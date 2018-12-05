(function checkAvailabilityValidatorIIFE() {
    angular.module('BlurAdmin.pages.Automation.ServiceCapacityProvide')
    .directive('checkAvailability', checkAvailabilityFunc) ;
    
    function checkAvailabilityFunc($http, $q, $timeout) {
      return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attr, ngModel) {
          // fetch the call address from directives 'checkIfAvailable' attribute
          var serverAddr = attr.checkAvailability;
          
          ngModel.$asyncValidators.invalidUsername = function(modelValue, viewValue) {
            var username = modelValue;
            var deferred = $q.defer();
          
            // ask the server if this username exists
            $http.get(serverAddr, {data: username}).then(
              function(response) {
                  if (response.data.exists) {
                    console.log("TEST1");
                    deferred.resolve();
                  } else {
                    console.log("TEST2");
                    deferred.reject();
                  }
              });
              
            // return the promise of the asynchronous validator
            return deferred.promise;
          }
        }
      }
    }
     
  })();