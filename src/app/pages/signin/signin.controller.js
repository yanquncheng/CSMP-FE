(function() {
    'use strict';

    angular.module('BlurAdmin.signin')
        .controller('SignInCtrl', SignInCtrl);

    /** @ngInject */
    function SignInCtrlByAWS($scope, $state, $window, $timeout, commonService, AuthenticationService, toastr, printService) {

        AWSCognito.config.region = IG.cognitoConfigRegion;

        var poolData = {
            UserPoolId: IG.cognitoUserPoolId,
            ClientId: IG.cognitoClientId
        };
        var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);
        //sign in function starts from here

        $scope.confirm = function() {

            var userData = {
                Username: $scope.username,
                Pool: userPool
            };

            var cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);

            cognitoUser.confirmRegistration($scope.code, true, function(err, result) {
                if (err) {
                    toastr.error(err.message, 'Error');
                    return;
                }
                toastr.success(result.message, 'Success');
            });

        };

        $scope.forgot = function() {

            var userData = {
                Username: $scope.username,
                Pool: userPool
            };

            var cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);

            cognitoUser.forgotPassword({
                onSuccess: function(result) {
                    toastr.success(result.message, 'Success');
                },
                onFailure: function(err) {
                    toastr.error(err.message, 'Error');
                },
                inputVerificationCode: function() {
                    var verificationCode = prompt('Please input verification code ', '');
                    var newPassword = prompt('Enter new password ', '');
                    cognitoUser.confirmPassword(verificationCode, newPassword, this);
                }
            });

        };


        $scope.signIn = function() {

            var authenticationData = {
                Username: $scope.username,
                Password: $scope.password,
            };

            var authenticationDetails = new AWSCognito.CognitoIdentityServiceProvider.AuthenticationDetails(authenticationData);

            var userData = {
                Username: $scope.username,
                Pool: userPool
            };

            var cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);
            cognitoUser.authenticateUser(authenticationDetails, {
                onSuccess: function(result) {

                    cognitoUser.getUserAttributes(function(err, result) {
                        if (err) {
                            toastr.error(err, 'Error');
                            return null;
                        }
                        var admin = ''; // temp bypass for the problem of 5 elements and 4 elements supply from API required a proper fix
                        for (var i = 0; i < result.length; i++) {
                            if (result[i].getName() == "name") {
                                admin = result[i].getValue();
                            }
                        }

                        if (admin == 'ADMIN') {
                            AuthenticationService.setAdmin(true);

                        } else {
                            AuthenticationService.setAdmin(false);
                        }

                        AuthenticationService.setUser($scope.username);
                        AuthenticationService.setLoggedIn(true);
                        $state.go('dashboard.home.users');
                    });
                },
                onFailure: function(err) {
                    toastr.error(err.message, 'Error');
                },

            });
        };
    }; 

    /** @ngInject */
    function SignInCtrl($scope, $http, $state, $window, $timeout, $localStorage, commonService, AuthenticationService, toastr, printService) {

        AWSCognito.config.region = IG.cognitoConfigRegion;

        var poolData = {
            UserPoolId: IG.cognitoUserPoolId,
            ClientId: IG.cognitoClientId
        };
        var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);
        //sign in function starts from here

        $scope.confirm = function() {

            var userData = {
                Username: $scope.username,
                Pool: userPool
            };

            var cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);

            cognitoUser.confirmRegistration($scope.code, true, function(err, result) {
                if (err) {
                    toastr.error(err.message, 'Error');
                    return;
                }
                toastr.success(result.message, 'Success');
            });

        };

        $scope.forgot = function() {

            var userData = {
                Username: $scope.username,
                Pool: userPool
            };

            var cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);

            cognitoUser.forgotPassword({
                onSuccess: function(result) {
                    toastr.success(result.message, 'Success');
                },
                onFailure: function(err) {
                    toastr.error(err.message, 'Error');
                },
                inputVerificationCode: function() {
                    var verificationCode = prompt('Please input verification code ', '');
                    var newPassword = prompt('Enter new password ', '');
                    cognitoUser.confirmPassword(verificationCode, newPassword, this);
                }
            });

        };


        $scope.signIn = function() {


            printService.print(" BlurAdmin.signin->SignInCtrl.singIn() =  " + $scope.username);

            var authenticationData = {
                Username: $scope.username,
                Password: $scope.password,
            };

            //var authenticationDetails = new AWSCognito.CognitoIdentityServiceProvider.AuthenticationDetails(authenticationData);

            // var userData = {
            //     Username: $scope.username,
            //     Pool: userPool
            // };

           /* Dummy authentication for testing, uses $timeout to simulate api call
             ----------------------------------------------*/
            $timeout(function () {
                var isLogin = false;
                var user = {};
                var config = {headers: { 'Access-Control-Allow-Origin': '*' } };
   
                var loginreq = {"username": $scope.username, "password": $scope.password };
                
                $http.post(IG.api + '/login' , loginreq ).success(function (response) {
                       console.log("response string="+JSON.stringify(response));
                       $scope.users = response;

                       var authKey = response.authKey;
                       console.log("authKey="+authKey);

                        $localStorage.authKey= authKey;
                        $localStorage.user = response.user;


                        AuthenticationService.setUser($scope.username);
                        AuthenticationService.setLoggedIn(true);

                        /*
                        if ( response.user.role.toUpperCase() === 'ADMIN' ) 
                            AuthenticationService.setAdmin(true);
                        else 
                            AuthenticationService.setAdmin(false);
                        */
                        //AuthenticationService.setMenuItems(response.menuItems);
                        //printService.print("go to url = dashboard.maindashboard" );  
                        
                      AuthenticationService.setMenuItems([]);
                      var userMenu = response.menuItems ;
                   	  
                       if(userMenu.length>0){
                    	   var config = { headers: {
                               "Authorization": $localStorage.authKey
                           }}
                    	   $scope.menuItems = [];
                    	   $http.get(IG.api + '/menu/list' , config ).success(function (response) {
                               var menuList = response;
                               angular.forEach(menuList, function (menu) {
                                   angular.forEach(userMenu, function (menuId) {
                                       if (menuId === menu.menuId) {
                                           $scope.menuItems.push(menu)
                                           return;
                                       }
                                   })
                               })
                               
                              AuthenticationService.setMenuItems($scope.menuItems);
                               
                              $state.go('dashboard.maindashboard');
                              
                           }, 1000).error(function (err) {
                                console.log(err); 
                                toastr.error(err.message, '获取菜单失败'); 
                          });
                       }
                        
                        
                        /*
                        var config = { headers: {
                            "Authorization": $localStorage.authKey
                        }}
                       $http.get(IG.api + '/menueJson' , config ).success(function (response) {
                            console.log("response string，menueJson="+JSON.stringify(response));
                            var menueJson = response;
                             
                             AuthenticationService.setMenuItems(menueJson);
                             printService.print("go to url = dashboard.maindashboard" );    
                             
                             $state.go('dashboard.maindashboard');
                             
                        }, 1000).error(function (err) {
                             console.log(err); 
                             AuthenticationService.setAdmin(false); 
                             toastr.error(err.message, '验证失败'); 
                       });
                        */
                        
                        
                        }, 1000 ).error(function (err) {
	                        console.log(err); 
	                        AuthenticationService.setAdmin(false); 
	                        toastr.error(err.message, '验证失败'); 
                  });
                
                

           });

                




            /* Use this for real authentication
             ----------------------------------------------*/
            //$http.post('/api/authenticate', { username: username, password: password })
            //    .success(function (response) {
            //        callback(response);
            //    });

/*

            var cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);



            cognitoUser.authenticateUser(authenticationDetails, {
                onSuccess: function(result) {

                    cognitoUser.getUserAttributes(function(err, result) {
                        if (err) {
                            toastr.error(err, 'Error');
                            return null;
                        }
                        var admin = ''; // temp bypass for the problem of 5 elements and 4 elements supply from API required a proper fix
                        for (var i = 0; i < result.length; i++) {
                            if (result[i].getName() == "name") {
                                admin = result[i].getValue();
                            }
                        }

                        if (admin == 'ADMIN') {
                            AuthenticationService.setAdmin(true);

                        } else {
                            AuthenticationService.setAdmin(false);
                        }

                        AuthenticationService.setUser($scope.username);
                        AuthenticationService.setLoggedIn(true);
                        $state.go('dashboard.home.users');
                    });
                },
                onFailure: function(err) {
                    toastr.error(err.message, 'Error');
                },

            });
*/



        };
    }; 


})();
