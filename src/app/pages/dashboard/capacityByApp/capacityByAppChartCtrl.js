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

/*
    var sampleData = [{
            noOfColleges: 25,
            place: "Maharashtra",
            drilldown: [{
                noOfColleges: 15,
                place: "Pune",
                drilldown: [{
                    noOfColleges: 10,
                    place: "Yerawada"
                }, {
                    noOfColleges: 5,
                    place: "Kothrud"
                }]
            }, {
                noOfColleges: 10,
                place: "Mumbai",
                drilldown: [{
                    noOfColleges: 8,
                    place: "Bandra",
                    drilldown: [{
                        noOfColleges: 3,
                        place: "Turner Road"
                    }, {
                        noOfColleges: 5,
                        place: "Perry Road"
                    }]
                }, {
                    noOfColleges: 2,
                    place: "Varali"
                }]
            }]
        }, {
            noOfColleges: 50,
            place: "Gujarat",
            drilldown: [{
                noOfColleges: 20,
                place: "Surat"
            }, {
                noOfColleges: 30,
                place: "Rajkot",
                drilldown: [{
                    noOfColleges: 12,
                    place: "Patan",
                }, {
                    noOfColleges: 18,
                    place: "Modhera",
                }]
            }, {
                noOfColleges: 4,
                place: "Godhra"
            }]
        }, {
            noOfColleges: 20,
            place: "MP",
            drilldown: [{
                noOfColleges: 4,
                place: "Indore",
                drilldown: [{
                    place: "Devas",
                    noOfColleges: 2,
                }, {
                    place: "Dhar",
                    noOfColleges: 2,
                }]
            }, {
                noOfColleges: 5,
                place: "Bhopal"
            }, {
                noOfColleges: 8,
                place: "Ujjain",
                drilldown: [{
                    place: "Shajapur",
                    noOfColleges: 2,
                }, {
                    place: "Ratlam",
                    noOfColleges: 6,
                }]
            }, {
                noOfColleges: 3,
                place: "Sachi"
            }]
        }];
*/
        httpService.get('/capacity/distributemap', null, cfg, function (response) {
            var RawCapacity = response.RawCapacity; 

            var sampleData = [];
            var dataItem = {};
            dataItem["noOfColleges"] = RawCapacity.RawCapacityGB;
            dataItem["place"] = "Raw";
            dataItem["drilldown"] = [];
            sampleData.push(dataItem);

            var dataItemL2 = {};
            dataItemL2["noOfColleges"] = RawCapacity.ConfiguredRawCapacityGB.Total;
            dataItemL2["place"] = "ConfiguredRaw";
            dataItemL2["drilldown"] = [];
            dataItem.drilldown.push(dataItemL2);

                var dataItemL3 = {};
                dataItemL3["noOfColleges"] = RawCapacity.ConfiguredRawCapacityGB.ConfiguredUsable.Total;
                dataItemL3["place"] = "ConfiguredUsable";
                dataItemL3["drilldown"] = [];
                dataItemL2.drilldown.push(dataItemL3);

                    var dataItemL4 = {};
                    dataItemL4["noOfColleges"] = RawCapacity.ConfiguredRawCapacityGB.ConfiguredUsable.Allocated.Total;
                    dataItemL4["place"] = "Allocated";
                    dataItemL4["drilldown"] = [];
                    dataItemL3.drilldown.push(dataItemL4);

                        var dataItemL5 = {};
                        dataItemL5["noOfColleges"] = RawCapacity.ConfiguredRawCapacityGB.ConfiguredUsable.Allocated.BlockUsed;
                        dataItemL5["place"] = "BlockUsed";
                        dataItemL5["drilldown"] = [];
                        dataItemL4.drilldown.push(dataItemL5);

                        var dataItemL5 = {};
                        dataItemL5["noOfColleges"] = RawCapacity.ConfiguredRawCapacityGB.ConfiguredUsable.Allocated.FileUsed;
                        dataItemL5["place"] = "FileUsed";
                        dataItemL5["drilldown"] = [];
                        dataItemL4.drilldown.push(dataItemL5);



                    var dataItemL4 = {};
                    dataItemL4["noOfColleges"] = RawCapacity.ConfiguredRawCapacityGB.ConfiguredUsable.AllocateUsable.Total;
                    dataItemL4["place"] = "Allocated";
                    dataItemL4["drilldown"] = [];
                    dataItemL3.drilldown.push(dataItemL4);



                var dataItemL3 = {};
                dataItemL3["noOfColleges"] = RawCapacity.ConfiguredRawCapacityGB.RAIDOverhead;
                dataItemL3["place"] = "RAIDOverhead"; 
                dataItemL2.drilldown.push(dataItemL3);


            var dataItemL2 = {};
            dataItemL2["noOfColleges"] = RawCapacity.UnconfiguredRawCapacityGB;
            dataItemL2["place"] = "UnconfiguredRaw"; 
            dataItem.drilldown.push(dataItemL2);

            var dataItemL2 = {};
            dataItemL2["noOfColleges"] = RawCapacity.HotSpareCapacityGB;
            dataItemL2["place"] = "HotSpare"; 
            dataItem.drilldown.push(dataItemL2);

            var dataItemL2 = {};
            dataItemL2["noOfColleges"] = RawCapacity.UnusableCapacityGB;
            dataItemL2["place"] = "Unusable"; 
            dataItem.drilldown.push(dataItemL2);

            var config = {
                containerId: "disk",
                width: 500,
                height: 340,
                data: sampleData, 
                label: function(d) {
                    return d.data.place + ":" + d.data.noOfColleges;
                },
                value: "noOfColleges",
                inner: "drilldown", 
                transition: "bounce",
                transitionDuration: 1000,
                donutRadius: 50
            };
            var samplePie = new psd3.Pie(config);

        });


  }
})();