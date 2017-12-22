/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard')
      .controller('capacityByAppChartCtrl', capacityByAppChartCtrl);

  /** @ngInject */
  function capacityByAppChartCtrl($scope, baConfig, colorHelper) {

      $scope.transparent = baConfig.theme.blur;
      var dashboardColors = baConfig.colors.dashboard;
      $scope.data = [
        {
            "name": "a1",    
            "value": 505.9
        },
        {
            "name": "a2",
            "value": 200
        }
    ];

          var chart = AmCharts.makeChart( "disk", {
          "type": "pie",
          "theme": "none",
          "dataProvider": $scope.data,
          "valueField": "value",
          "titleField": "name",
           "balloon":{
            "fixedPosition":true
          },
          "pullOutRadius": 10,
          "labelRadius": 30,
          "labelText": "[[name]]",
          "percentPrecision": 1,
          "maxLabelWidth": 100,
          "labelFunction": function(label){
            var str = label.title;
            while (str.indexOf("-") >= 0 || str.indexOf("_") >= 0){
                       str = str.replace("-", " ");
                       str = str.replace("_", " ");
                    }
            return str;
          },
          "color": '#fff'
        });


  }
})();