'use strict';


angular.module('BlurAdmin', [
        'ngAnimate',
        'ui.bootstrap',
        'ui.sortable',
        'ui.router',
        'ui.select',
        'ngTouch',
        'toastr', 
        'smart-table',
        'ngStorage', 
        'xeditable',
        'ui.slimscroll',
        'ngJsTree',
        'permission',
        'permission.ui',
        'angular-progress-button-styles',
        'BlurAdmin.authService',
        'BlurAdmin.printService',
        //'BlurAdmin.S3UploadService',
        'BlurAdmin.commonservice',
        'BlurAdmin.httpService',
        'BlurAdmin.service',
        'BlurAdmin.signin',
        'BlurAdmin.theme',
        'BlurAdmin.pages',
        'ngFileUpload', // added for file uploads s3 backet
        'BlurAdmin.theme.components',
        'angular-loading-bar',
        'nvd3',
    	'highcharts-ng'

    ]).config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
        cfpLoadingBarProvider.includeSpinner = false;
    }])
    .filter('fixed', function () {
      return function (value, count) {
        var number = parseFloat(value);

        if (isNaN(number)) return value;
        return number.toFixed(count);
      }
    })
    .run(function($rootScope, $state, $localStorage, PermRoleStore, AuthenticationService, printService) {
        AuthenticationService.setLoggedIn(false);
        printService.print("Test-A1:" + AuthenticationService.isLoggedIn() );
        PermRoleStore.defineRole('AUTHORIZED', function() {
            return AuthenticationService.isLoggedIn();
        }); 

        PermRoleStore.defineManyRoles({
                'AUTHORIZED1': ['canReadInvoices'],
                'AA': ['canReadInvoices'],
                'ADMIN1': ['canReadInvoices','canEditInvoices','canUploadImages']
              }); 

        PermRoleStore.defineRole('ADMIN', function() {
            return AuthenticationService.isAdmin();
        });

        $rootScope.$on('$stateChangeStart', function(evt, to, params) {
            if (to.redirectTo) {
                evt.preventDefault();
                $state.go(to.redirectTo, params, {
                    location: 'replace'
                });
            }
        });
    });
