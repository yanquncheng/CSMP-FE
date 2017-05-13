
(function () {
  'use strict';


  angular.module('BlurAdmin.pages.Topology.TopologyL1')
      .controller('TopologyL1Ctrl', TopologyL1CtrlFunc);

  /** @ngInject */
  function TopologyL1CtrlFunc($scope, $filter, $http, $localStorage ) {
      // Create the Diagram's Model:
      var nodeDataArray = [ // node data
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
      var linkDataArray =   [ // link data 
              { from: "twoA", to: "twoB" },
              { from: "threeA", to: "twoG"},
              { from: "twoG", to: "oneC" }, 
              { from: "fourA", to: "twoG" , routing: go.Link.Normal},
              { from: "fourB", to: "fourC" },
              { from: "fourC", to: "fourD" }
            ];



      $scope.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);

  } 
 
})();
