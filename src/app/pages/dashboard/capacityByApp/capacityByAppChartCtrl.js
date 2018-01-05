/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard')
      .controller('capacityByAppChartCtrl', capacityByAppChartCtrl);

  /** @ngInject */
  function capacityByAppChartCtrl($scope, baConfig, colorHelper,httpService, $localStorage) {
        var config = { headers: {
            "Authorization": $localStorage.authKey
        }};
        
        var cfg = angular.copy(config);
            httpService.get('/capacity/distributemapByArray', null, cfg, function (response) {
                var capacityData = response;

                var chart = AmCharts.makeChart("disk111", {
                    "type": "serial",
                    "theme": "chalk",
                    "plotAreaBorderColor": "#FF0000", 
                    "plotAreaFillColors": "#383535",    
                    "color": "#E1DADA",
                    "legend": {
                        "horizontalGap": 5,
                        "maxColumns": 3,
                        "position": "bottom",
                        "useGraphSettings": true,
                        "color": "#FFFFFF",
                        "markerSize": 5
                    },
                    "dataProvider": capacityData,
                    "valueAxes": [{
                        "stackType": "regular",
                        "axisAlpha": 0.3,
                        "gridAlpha": 0,
                        "title": "容量(GB)"
                    }],
                    "graphs": [{
                        "balloonText": "<b>[[title]]</b><br><span style='font-size:14px'>[[category]]: <b>[[value]]</b></span>",
                        "fillAlphas": 0.8,
                        "labelText": "[[value]]",
                        "lineAlpha": 0.3,
                        "title": "Allocated",
                        "hidden": true,
                        "type": "column",
                        "color": "#000000",
                        "valueField": "Allocated"
                    }, {
                        "balloonText": "<b>[[title]]</b><br><span style='font-size:14px'>[[category]]: <b>[[value]]</b></span>",
                        "fillAlphas": 0.8,
                        "labelText": "[[value]]",
                        "lineAlpha": 0.3,
                        "title": "ConfiguredUsable",
                        "type": "column",
                        "color": "#000000",
                        "valueField": "ConfiguredUsableFree"
                    }, {
                        "balloonText": "<b>[[title]]</b><br><span style='font-size:14px'>[[category]]: <b>[[value]]</b></span>",
                        "fillAlphas": 0.8,
                        "labelText": "[[value]]",
                        "lineAlpha": 0.3,
                        "title": "PoolFree",
                        "type": "column",
                        "color": "#000000",
                        "valueField": "PoolFree"
                    }, {
                        "balloonText": "<b>[[title]]</b><br><span style='font-size:14px'>[[category]]: <b>[[value]]</b></span>",
                        "fillAlphas": 0.8,
                        "labelText": "[[value]]",
                        "lineAlpha": 0.3,
                        "title": "NASPoolFree",
                        "type": "column",
                        "color": "#000000",
                        "valueField": "NASPoolFree"
                    }],
                    "categoryField": "device",
                    "categoryAxis": {
                        "gridPosition": "start",
                        "axisAlpha": 0,
                        "gridAlpha": 0,
                        "position": "left"
                    },
                    "export": {
                        "enabled": true
                     }

                });

        });



  }
})();