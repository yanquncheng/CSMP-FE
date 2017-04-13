/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard', [])
      .config(routeConfig);


  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('dashboard.maindashboard', {
          url: '/maindashboard',
          templateUrl: 'app/pages/dashboard/dashboard.html',
          title: 'Dashboard',
          sidebarMeta: {
            icon: 'ion-android-home',
            order: 0,
          }, 
                data: {
                    permissions: {
                        only: ['AUTHORIZED'],
                        redirectTo: function() {
                            return {
                                state: 'signin',
                                options: {
                                    reload: true
                                }
                            };
                        }
                    }
                },
                // resolve: { 
                //     interns: ["$http", '$rootScope',
                //         function($http, $rootScope) {
                //             return $http.get(IG.api + 'users/status/active')
                //                 .then(function(response) {
                //                     return response.data.data.Items;
                //                 });
                //         }
                //     ]
                // }

        });
  }

})();
