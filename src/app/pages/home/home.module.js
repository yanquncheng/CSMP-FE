/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function() {
    'use strict';

    angular.module('BlurAdmin.pages.home', [
            'BlurAdmin.pages.home.user',
            'BlurAdmin.pages.home.users'
        ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('dashboard.home', {
                url: '/home',
                templateUrl: 'app/pages/home/home.html',
                title: 'Current Interns',
                controller: "HomeCtrl",
                sidebarMeta: {
                    icon: 'ion-android-home',
                    order: 100,
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
                resolve: {
                    interns: ["$http", '$rootScope',
                        function($http, $rootScope) {
                            return $http.get(IG.api + 'users/status/active')
                                .then(function(response) {
                                    return response.data.data.Items;
                                });
                        }
                    ]
                }

            })

        ;
    }

})();
