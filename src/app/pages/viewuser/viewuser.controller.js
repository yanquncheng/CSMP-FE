(function() {
    'use strict';

    angular.module('BlurAdmin.pages.viewuser')
        .controller('ViewCtrl', ViewCtrl);

    /** @ngInject */
    function ViewCtrl($scope, $http, $uibModal, toastr,internviewees) {

        $scope.smartTablePageSize = 10;

        $scope.dataInterviewee = [];

        $scope.dataInterviewee = (internviewees);
        $scope.Interviewee = [].concat($scope.dataInterviewee);

        $scope.selectedIntern = {};

        var signUp = function(email, username, password) {
            // cognito
            AWSCognito.config.region = IG.cognitoConfigRegion;

            var poolData = {
                UserPoolId: IG.cognitoUserPoolId,
                ClientId: IG.cognitoClientId
            };

            var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);

            var attributeList = [];

            var attributes = [{
                Name: 'email',
                Value: email
            }, {
                Name: 'profile',
                Value: '/'
            }, {
                Name: 'name',
                Value: 'INTERN'
            }];

            _.each(attributes, function(attribute) {
                attributeList.push(new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(attribute));
            });

            userPool.signUp(username, password, attributeList, null, function(err, result) {
                if (err) {
                    console.log(err);
                    return;
                }

            });
        };
        var internSelected = function(index) {
          var intern = $scope.selectedIntern;
            $http.post(IG.api + 'users/user', $scope.selectedIntern).then(function(response) {
                if ((response.data.status) === "success") {
                    toastr.success("New Intern added successfully");
                    $scope.Interviewee.splice(index, 1);
                    signUp(intern.email,intern.email,"99Xt@intern");
                } else {
                    toastr.error("Unable to add new intern");
                }

            });
        };
        $scope.viewdata = function(row) {
            $scope.selectedIntern = angular.copy(row);
            var index = $scope.Interviewee.indexOf(row);
            $uibModal.open({
                animation: true,
                controller: 'ViewModalCtrl',
                templateUrl: 'app/pages/viewuser/viewusermodal/viewusermodal.html'
            }).result.then(function(data) {
                var status = {
                    'status': 'active'
                };
                $scope.selectedIntern = angular.merge($scope.selectedIntern, data, status);
                internSelected(index);
            });
        };
    }
})();
