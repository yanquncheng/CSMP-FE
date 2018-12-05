(function() {
    'use strict';
    angular.module('BlurAdmin.pages', [
            'ui.router',
            'BlurAdmin.pages.sides',
            'BlurAdmin.pages.home',
            'BlurAdmin.pages.register',
            'BlurAdmin.pages.profile',
            'BlurAdmin.pages.viewReview',
            'BlurAdmin.pages.settings',
            'BlurAdmin.pages.viewtasks',
            'BlurAdmin.pages.addtasks',
            'BlurAdmin.pages.viewuser',
            'BlurAdmin.pages.interntasks',
            'BlurAdmin.pages.settings',
            'BlurAdmin.pages.dashboards',
            'BlurAdmin.pages.charts',
            'BlurAdmin.pages.ui',
            'BlurAdmin.pages.tables',
            'BlurAdmin.pages.form',
            'BlurAdmin.pages.components',
            'BlurAdmin.pages.EquipmentManagement',
            'BlurAdmin.pages.ConfigManagement',
            'BlurAdmin.pages.objectManage',
            'BlurAdmin.pages.sysManage',
			'BlurAdmin.pages.performance',
			'BlurAdmin.pages.EventManagement',
			'BlurAdmin.pages.CapacityManagement', 
			'BlurAdmin.pages.objectManage',
			'BlurAdmin.pages.reportManage',
            'BlurAdmin.pages.templatedetails',
			'BlurAdmin.pages.demos',
            'BlurAdmin.pages.dashboardsPerformance',
            'BlurAdmin.pages.Automation'
        ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($urlRouterProvider, baSidebarServiceProvider) {
            console.log("Begining BlurAdmin.pages->routeConfig");

        $urlRouterProvider.otherwise('/dashboard');
    }

})();
