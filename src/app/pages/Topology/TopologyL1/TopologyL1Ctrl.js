
(function () {
  'use strict';


  angular.module('BlurAdmin.pages.Topology.TopologyL1')
      .controller('TopologyL1Ctrl', TopologyL1CtrlFunc);

  /** @ngInject */
  function TopologyL1CtrlFunc($scope, $filter, $http, $localStorage ) {

      console.log($localStorage.authKey);
      var config = { headers: {
          "Authorization": $localStorage.authKey
      }}

      $http.get(IG.api + '/topology/level1' , config )
          .success(function (response) { 

              var nodeDataArray = response.entity;  
              var linkDataArray = response.linkByGroup; 
              $scope.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);
 
          }) 
          .error(function (err) {
                console.log(err);   
      });



      // Create the Diagram's Model:
      var nodeDataArray1 = [ // node data
              { key: "Pool1", text: "数据中心", isGroup: true, category: "Pool" , color: "lightblue"}, 
              { key: "Lane1", text: "主机", isGroup: true, group: "Pool1", color: "lightblue" },
              { key: "Lane2", text: "交换机1", isGroup: true, group: "Pool1", color: "lightgreen" },
              { key: "Lane21", text: "交换机2", isGroup: true, group: "Pool1", color: "lightgreen" },
              { key: "Lane3", text: "虚拟存储", isGroup: true, group: "Pool1", color: "lightyellow" },
              { key: "Lane4", text: "物理存储", isGroup: true, group: "Pool1", color: "orange" },
              { key: "oneA", group: "Lane1" },
              { key: "oneB", group: "Lane1" },
              { key: "oneC", group: "Lane1" },
              { key: "oneD", group: "Lane1" },
              { key: "twoA", group: "Lane2" },
              { key: "twoB", group: "Lane2" },
              { key: "twoC", group: "Lane2" },
              { key: "twoD", group: "Lane2" },
              { key: "twoE", group: "Lane2" },
              { key: "twoF", group: "Lane2" },
              { key: "twoG", group: "Lane2" },
              { key: "threeA", group: "Lane3" },
              { key: "fourA", group: "Lane4" , desc: "这是个描述" , category: "NodeDetail", color: "lightyellow"},
              { key: "fourB", group: "Lane4" , desc: "这是个描述 for fourB " , category: "simple", color: "lightyellow"},
              { key: "fourC", group: "Lane4" , desc: "这是个描述 for fourC " , category: "simple", color: "lightyellow"},
              { key: "four1", group: "Lane4" },
              { key: "four2", group: "Lane4" },
              { key: "four3", group: "Lane4" },
              { key: "four4", group: "Lane4" },
              { key: "fourD", group: "Lane4" } 
            ];
             var linkDataArray1 =   [ // link data 
                    { from: "topo:srm.StorageEntity:000296800706", to: "topo:srm.PhysicalSwitch:100050EB1A90B3B7" },
                    { from: "topo:srm.StorageEntity:VNX5600", to: "topo:srm.PhysicalSwitch:100050EB1A90B3B7"},
                    { from: "topo:srm.StorageEntity:VNX5600", to: "topo:srm.PhysicalSwitch:100050EB1AA83CD3" }, 
                    { from: "fourA", to: "twoG" , routing: go.Link.Normal},
                    { from: "fourB", to: "fourC" },
                    { from: "fourC", to: "fourD" }
                  ];

  } 
 
})();
