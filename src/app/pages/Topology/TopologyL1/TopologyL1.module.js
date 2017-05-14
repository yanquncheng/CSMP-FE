(function () {
  'use strict';

  angular.module('BlurAdmin.pages.Topology.TopologyL1', [])
      .config(routeConfig)
      .directive('goDiagram', directiveFunction);


  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('dashboard.Topology.TopologyL1', {
          url: '/TopologyL1',
          templateUrl: 'app/pages/Topology/TopologyL1/TopologyL1.html',
          controller: 'TopologyL1Ctrl',
          title: 'Topology Level 1',
          sidebarMeta: {
            order: 10,
          },
        });
  }



  /** @ngInject */
  function directiveFunction() {
 
     return {




        restrict: 'E',
        template: '<div></div>',  // just an empty DIV element
        replace: true,
        scope: { model: '=goModel' },
        link: function(scope, element, attrs) {
          if (window.goSamples) goSamples(); // init for these samples -- you don't need to call this







          var $ = go.GraphObject.make;
          var diagram =  // create a Diagram for the given HTML DIV element
            $(go.Diagram, element[0],
              {
                initialContentAlignment: go.Spot.Center, 
                "ModelChanged": updateAngular,
                "ChangedSelection": updateSelection,
                "undoManager.isEnabled": true
              });





          // -----------------------------------------------------
          //                      Functions  
          // -----------------------------------------------------

          // whenever a GoJS transaction has finished modifying the model, update all Angular bindings
          function updateAngular(e) {
            if (e.isTransactionFinished) {
              scope.$apply();
            }
          }
          // update the Angular model when the Diagram.selection changes
          function updateSelection(e) {
            diagram.model.selectedNodeData = null;
            var it = diagram.selection.iterator;
            while (it.next()) {
              var selnode = it.value;
              // ignore a selected link or a deleted node
              if (selnode instanceof go.Node && selnode.data !== null) {
                diagram.model.selectedNodeData = selnode.data;
                break;
              }
            }
            scope.$apply();
          }

          function onSelectionChanged(node) {
              var datas = diagram.model.nodeDataArray;
              for ( var i in datas ) {
                var item = datas[i];
                if ( item.key == "fourA" ) {
                  item.desc = "aaaa";
                }
                item.desc = "bbbb";
              } 
              var icon = node.findObject("Icon");
              if (icon !== null) {
                if (node.isSelected)
                  icon.fill = "cyan";
                else
                  icon.fill = "lightgray";
              }
          }

              // this is a Part.dragComputation function for limiting where a Node may be dragged
          function stayInGroup(part, pt, gridpt) {
            // don't constrain top-level nodes
            var grp = part.containingGroup;
            if (grp === null) return pt;
            // try to stay within the background Shape of the Group
            var back = grp.resizeObject;
            if (back === null) return pt;
            // allow dragging a Node out of a Group if the Shift key is down
            if (part.diagram.lastInput.shift) return pt;
            var p1 = back.getDocumentPoint(go.Spot.TopLeft);
            var p2 = back.getDocumentPoint(go.Spot.BottomRight);
            var b = part.actualBounds;
            var loc = part.location;
            // find the padding inside the group's placeholder that is around the member parts
            var m = grp.placeholder.padding;
            // now limit the location appropriately
            var x = Math.max(p1.x + m.left, Math.min(pt.x, p2.x - m.right - b.width - 1)) + (loc.x-b.x);
            var y = Math.max(p1.y + m.top, Math.min(pt.y, p2.y - m.bottom - b.height - 1)) + (loc.y-b.y);
            return new go.Point(x, y);
          }


          // highlight all Links and Nodes coming out of a given Node
          function showConnections(node) {
            var diagram = node.diagram;
            diagram.startTransaction("highlight");
            // remove any previous highlighting
            diagram.clearHighlighteds();
            // for each Link coming out of the Node, set Link.isHighlighted
            node.findLinksOutOf().each(function(l) { l.isHighlighted = true; });
            // for each Node destination for the Node, set Node.isHighlighted
            node.findNodesOutOf().each(function(n) { n.isHighlighted = true; });

            // TODO: 

            console.log(node.data);
            if ( node.data.relationship !== undefined ) {
                for ( var i in node.data.relationship ) {
                   var item = node.data.relationship[i];
                  var node1 = diagram.findNodeForKey(item);
                  node1.isHighlighted = true;
                }
            }
 

            diagram.commitTransaction("highlight");
          }

          // -----------------------------------------------------
          //                 Function End  
          // -----------------------------------------------------

          // -----------------------------------------------------
          //                      Templates  
          // -----------------------------------------------------

          diagram.linkTemplate =
            $(go.Link,
              //{ routing: go.Link.AvoidsNodes, corner: 5 },
              new go.Binding("routing", "routing"),
              { relinkableFrom: true, relinkableTo: true },
              $(go.Shape),
              $(go.Shape, { toArrow: "" })
            );


          diagram.nodeTemplate =
            $(go.Node, "Auto",
              { selectionAdorned: false,  // don't bother with any selection adornment
              selectionChanged: onSelectionChanged },  // executed when Part.isSelected has changed

              new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
              //$(go.Shape, "Rectangle",
              $(go.Shape, "RoundedRectangle",
                { name: "Icon", fill: "lightgray", strokeWidth: 2,   portId: "", cursor: "pointer", fromLinkable: true, toLinkable: true },
                  new go.Binding("stroke", "isHighlighted", function(h) { return h ? "red" : "yellow"; }).ofObject()
                ),
              $(go.TextBlock, { margin: 5 },
                new go.Binding("text", "key")),
              { dragComputation: stayInGroup } // limit dragging of Nodes to stay within the containing Group, defined above
            );


            // the "simple" template just shows the key string and the color in the background,
            // but it also includes a tooltip that shows the description
            var sampletemplate =
              $(go.Node, "Auto",
                            { // when the user clicks on a Node, highlight all Links coming out of the node
                    // and all of the Nodes at the other ends of those Links.
                    click: function(e, node) { showConnections(node); }  // defined below
                  },
                $(go.Shape, "Rectangle",
                { strokeWidth: 2, stroke: null },
                new go.Binding("fill", "color"),
                // the Shape.stroke color depends on whether Node.isHighlighted is true
                new go.Binding("stroke", "isHighlighted", function(h) { return h ? "red" : "blue"; })
                    .ofObject()),
                $(go.TextBlock,
                  new go.Binding("text", "displayName")),
                {
                  toolTip:
                    $(go.Adornment, "Auto",
                      $(go.Shape, { fill: "#FFFFCC" }),
                      $(go.TextBlock, { margin: 4 },
                        new go.Binding("text", "desc"))
                    )
                }
              );

            // the "detailed" template shows all of the information in a Table Panel
            var array_template =
              $(go.Node, "Auto",
                  { // when the user clicks on a Node, highlight all Links coming out of the node
                    // and all of the Nodes at the other ends of those Links.
                    click: function(e, node) { showConnections(node); }  // defined below
                  },
                  { selectionAdorned: false,  // don't bother with any selection adornment
                  selectionChanged: onSelectionChanged },  // executed when Part.isSelected has changed

                $(go.Shape, "RoundedRectangle",
                    //new go.Binding("fill", "color")  
                    { name: "Icon", fill: "lightgray", strokeWidth: 2,   portId: "", cursor: "pointer", fromLinkable: true, toLinkable: true },
                    // the Shape.stroke color depends on whether Node.isHighlighted is true
                    new go.Binding("stroke", "isHighlighted", function(h) { return h ? "red" : "yellow"; }).ofObject()
                    ),
                $(go.Panel, "Table",
                  { defaultAlignment: go.Spot.Left },
                  $(go.TextBlock, { row: 0, column: 0, columnSpan: 2, font: "bold 12pt sans-serif" },
                    new go.Binding("text", "displayName")),
                  $(go.TextBlock, { row: 1, column: 0 }, "vendor:"),
                  $(go.TextBlock, { row: 1, column: 1 }, new go.Binding("text", "vendor")),
                  $(go.TextBlock, { row: 2, column: 0 }, " model:"),
                  $(go.TextBlock, { row: 2, column: 1 }, new go.Binding("text", "arrayModel")),
                  $(go.TextBlock, { row: 3, column: 0 }, "  type:"),
                  $(go.TextBlock, { row: 3, column: 1 }, new go.Binding("text", "arrayType"))
                ), 
                {
                  toolTip:
                    $(go.Adornment, "Auto",
                      $(go.Shape, { fill: "#FFFFCC" }),
                      $(go.TextBlock, { margin: 4 },
                        new go.Binding("text", "softwareVersion"))
                    )
                }
              );

            var switch_template =
              $(go.Node, "Auto",
                  { // when the user clicks on a Node, highlight all Links coming out of the node
                    // and all of the Nodes at the other ends of those Links.
                    click: function(e, node) { showConnections(node); }  // defined below
                  },
                  { selectionAdorned: false,  // don't bother with any selection adornment
                  selectionChanged: onSelectionChanged },  // executed when Part.isSelected has changed

                $(go.Shape, "RoundedRectangle",
                    //new go.Binding("fill", "color")  
                    { name: "Icon", fill: "lightgray", strokeWidth: 2,   portId: "", cursor: "pointer", fromLinkable: true, toLinkable: true },
                    // the Shape.stroke color depends on whether Node.isHighlighted is true
                    new go.Binding("stroke", "isHighlighted", function(h) { return h ? "red" : "yellow"; }).ofObject()
                    ),
                $(go.Panel, "Table",
                  { defaultAlignment: go.Spot.Left },
                  $(go.TextBlock, { row: 0, column: 0, columnSpan: 2, font: "bold 12pt sans-serif" },
                    new go.Binding("text", "displayName")),
                  $(go.TextBlock, { row: 1, column: 0 }, "vendor:"),
                  $(go.TextBlock, { row: 1, column: 1 }, new go.Binding("text", "vendor")),
                  $(go.TextBlock, { row: 2, column: 0 }, " model:"),
                  $(go.TextBlock, { row: 2, column: 1 }, new go.Binding("text", "model"))
                ), 
                {
                  toolTip:
                    $(go.Adornment, "Auto",
                      $(go.Shape, { fill: "#FFFFCC" }),
                      $(go.TextBlock, { margin: 4 },
                        new go.Binding("text", "softwareVersion"))
                    )
                }
              );

            // create the nodeTemplateMap, holding three node templates:
            var templmap = new go.Map("string", go.Node);
            // for each of the node categories, specify which template to use
            templmap.add("PhysicalSwitch", switch_template);
            templmap.add("StorageEntity", array_template);
            // for the default category, "", use the same template that Diagrams use by default;
            // this just shows the key value as a simple TextBlock
            templmap.add("", diagram.nodeTemplate);

            diagram.nodeTemplateMap = templmap;

          // -----------------------------------------------------
          //             Templates  End
          // -----------------------------------------------------




          // -----------------------------------------------------
          //             Swimlane Template
          // -----------------------------------------------------
           // These parameters need to be set before defining the templates.
            var MINLENGTH = 600;  // this controls the minimum length of any swimlane
            var MINBREADTH = 80;  // this controls the minimum breadth of any non-collapsed swimlane

            function groupStyle() {  // common settings for both Lane and Pool Groups
              return [
                {
                  layerName: "Background",  // all pools and lanes are always behind all nodes and links
                  background: "transparent",  // can grab anywhere in bounds
                  movable: false, // allows users to re-order by dragging
                  copyable: false,  // can't copy lanes or pools
                  avoidable: false,  // don't impede AvoidsNodes routed Links
                  minLocation: new go.Point(NaN, -Infinity),  // only allow vertical movement
                  maxLocation: new go.Point(NaN, Infinity)
                },
                new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify)
              ];
            }

            // hide links between lanes when either lane is collapsed
            function updateCrossLaneLinks(group) {
              group.findExternalLinksConnected().each(function(l) {
                l.visible = (l.fromNode.isVisible() && l.toNode.isVisible());
              });
            }




            // compute the minimum size of a Pool Group needed to hold all of the Lane Groups
            function computeMinPoolSize(pool) {
              // assert(pool instanceof go.Group && pool.category === "Pool");
              var len = MINLENGTH;
              pool.memberParts.each(function(lane) {
                // pools ought to only contain lanes, not plain Nodes
                if (!(lane instanceof go.Group)) return;
                var holder = lane.placeholder;
                if (holder !== null) {
                  var sz = holder.actualBounds;
                  len = Math.max(len, sz.width);
                }
              });
              return new go.Size(len, NaN);
            }

            // compute the minimum size for a particular Lane Group
            function computeLaneSize(lane) {
              // assert(lane instanceof go.Group && lane.category !== "Pool");
              var sz = computeMinLaneSize(lane);
              if (lane.isSubGraphExpanded) {
                var holder = lane.placeholder;
                if (holder !== null) {
                  var hsz = holder.actualBounds;
                  sz.height = Math.max(sz.height, hsz.height);
                }
              }
              // minimum breadth needs to be big enough to hold the header
              var hdr = lane.findObject("HEADER");
              if (hdr !== null) sz.height = Math.max(sz.height, hdr.actualBounds.height);
              return sz;
            }

            // determine the minimum size of a Lane Group, even if collapsed
            function computeMinLaneSize(lane) {
              if (!lane.isSubGraphExpanded) return new go.Size(MINLENGTH, 1);
              return new go.Size(MINLENGTH, MINBREADTH);
            }


            // define a custom grid layout that makes sure the length of each lane is the same
            // and that each lane is broad enough to hold its subgraph
            function PoolLayout() {
              go.GridLayout.call(this);
              this.cellSize = new go.Size(1, 1);
              this.wrappingColumn = 1;
              this.wrappingWidth = Infinity;
              this.isRealtime = false;  // don't continuously layout while dragging
              this.alignment = go.GridLayout.Position;
              // This sorts based on the location of each Group.
              // This is useful when Groups can be moved up and down in order to change their order.
              this.comparer = function(a, b) {
                var ay = a.location.y;
                var by = b.location.y;
                if (isNaN(ay) || isNaN(by)) return 0;
                if (ay < by) return -1;
                if (ay > by) return 1;
                return 0;
              };
            }
            go.Diagram.inherit(PoolLayout, go.GridLayout);

            /** @override */
            PoolLayout.prototype.doLayout = function(coll) {
              var diagram = this.diagram;
              if (diagram === null) return;
              diagram.startTransaction("PoolLayout");
              var pool = this.group;
              if (pool !== null && pool.category === "Pool") {
                // make sure all of the Group Shapes are big enough
                var minsize = computeMinPoolSize(pool);
                pool.memberParts.each(function(lane) {
                  if (!(lane instanceof go.Group)) return;
                  if (lane.category !== "Pool") {
                    var shape = lane.resizeObject;
                    if (shape !== null) {  // change the desiredSize to be big enough in both directions
                      var sz = computeLaneSize(lane);
                      shape.width = (isNaN(shape.width) ? minsize.width : Math.max(shape.width, minsize.width));
                      shape.height = (!isNaN(shape.height)) ? Math.max(shape.height, sz.height) : sz.height;
                      var cell = lane.resizeCellSize;
                      if (!isNaN(shape.width) && !isNaN(cell.width) && cell.width > 0) shape.width = Math.ceil(shape.width / cell.width) * cell.width;
                      if (!isNaN(shape.height) && !isNaN(cell.height) && cell.height > 0) shape.height = Math.ceil(shape.height / cell.height) * cell.height;
                    }
                  }
                });
              }
              // now do all of the usual stuff, according to whatever properties have been set on this GridLayout
              go.GridLayout.prototype.doLayout.call(this, coll);
              diagram.commitTransaction("PoolLayout");
            };
            // end PoolLayout class




            // each Group is a "swimlane" with a header on the left and a resizable lane on the right
            diagram.groupTemplate =
              $(go.Group, "Horizontal", groupStyle(),
                {
                  selectionObjectName: "SHAPE",  // selecting a lane causes the body of the lane to be highlit, not the label
                  resizable: false, resizeObjectName: "SHAPE",  // the custom resizeAdornmentTemplate only permits two kinds of resizing
                  layout: $(go.GridLayout,
                            { comparer: go.GridLayout.smartComparer }),
                  computesBoundsAfterDrag: true,  // needed to prevent recomputing Group.placeholder bounds too soon
                  computesBoundsIncludingLinks: false,  // to reduce occurrences of links going briefly outside the lane
                  computesBoundsIncludingLocation: true,  // to support empty space at top-left corner of lane
                  handlesDragDropForMembers: true,  // don't need to define handlers on member Nodes and Links
                  mouseDrop: function(e, grp) {  // dropping a copy of some Nodes and Links onto this Group adds them to this Group
                    if (!e.shift) return;  // cannot change groups with an unmodified drag-and-drop
                    // don't allow drag-and-dropping a mix of regular Nodes and Groups
                    if (!e.diagram.selection.any(function(n) { return n instanceof go.Group; })) {
                      var ok = grp.addMembers(grp.diagram.selection, true);
                      if (ok) {
                        updateCrossLaneLinks(grp);
                      } else {
                        grp.diagram.currentTool.doCancel();
                      }
                    } else {
                      e.diagram.currentTool.doCancel();
                    }
                  },
                  subGraphExpandedChanged: function(grp) {
                    var shp = grp.resizeObject;
                    if (grp.diagram.undoManager.isUndoingRedoing) return;
                    if (grp.isSubGraphExpanded) {
                      shp.height = grp._savedBreadth;
                    } else {
                      grp._savedBreadth = shp.height;
                      shp.height = NaN;
                    }
                    updateCrossLaneLinks(grp);
                  }
                },
                new go.Binding("isSubGraphExpanded", "expanded").makeTwoWay(),
                // the lane header consisting of a Shape and a TextBlock
                $(go.Panel, "Horizontal",
                  { name: "HEADER",
                    angle: 270,  // maybe rotate the header to read sideways going up
                    alignment: go.Spot.Center },
                  $(go.Panel, "Horizontal",  // this is hidden when the swimlane is collapsed
                    new go.Binding("visible", "isSubGraphExpanded").ofObject(),
                    $(go.Shape, "Diamond",
                      { width: 8, height: 8, fill: "white" },
                      new go.Binding("fill", "color")),
                    $(go.TextBlock,  // the lane label
                      { font: "bold 13pt sans-serif", editable: true, margin: new go.Margin(2, 0, 0, 0) },
                      new go.Binding("text", "text").makeTwoWay())
                  ),
                  $("SubGraphExpanderButton", { margin: 5 })  // but this remains always visible!
                ),  // end Horizontal Panel
                $(go.Panel, "Auto",  // the lane consisting of a background Shape and a Placeholder representing the subgraph
                  $(go.Shape, "Rectangle",  // this is the resized object
                    { name: "SHAPE", fill: "white" },
                    new go.Binding("fill", "color"),
                    new go.Binding("desiredSize", "size", go.Size.parse).makeTwoWay(go.Size.stringify)),
                  $(go.Placeholder,
                    { padding: 12, alignment: go.Spot.TopLeft }),
                  $(go.TextBlock,  // this TextBlock is only seen when the swimlane is collapsed
                    { name: "LABEL",
                      font: "bold 13pt sans-serif", editable: true,
                      angle: 0, alignment: go.Spot.TopLeft, margin: new go.Margin(2, 0, 0, 4) },
                    new go.Binding("visible", "isSubGraphExpanded", function(e) { return !e; }).ofObject(),
                    new go.Binding("text", "text").makeTwoWay())
                )  // end Auto Panel
              );  // end Group


            // define a custom resize adornment that has two resize handles if the group is expanded
            diagram.groupTemplate.resizeAdornmentTemplate =
              $(go.Adornment, "Spot",
                $(go.Placeholder),
                $(go.Shape,  // for changing the length of a lane
                  {
                    alignment: go.Spot.Right,
                    desiredSize: new go.Size(7, 50),
                    fill: "lightblue", stroke: "dodgerblue",
                    cursor: "col-resize"
                  },
                  new go.Binding("visible", "", function(ad) {
                    if (ad.adornedPart === null) return false;
                    return ad.adornedPart.isSubGraphExpanded;
                  }).ofObject()),
                $(go.Shape,  // for changing the breadth of a lane
                  {
                    alignment: go.Spot.Bottom,
                    desiredSize: new go.Size(50, 7),
                    fill: "lightblue", stroke: "dodgerblue",
                    cursor: "row-resize"
                  },
                  new go.Binding("visible", "", function(ad) {
                    if (ad.adornedPart === null) return false;
                    return ad.adornedPart.isSubGraphExpanded;
                  }).ofObject())
              );

            diagram.groupTemplateMap.add("Pool",
              $(go.Group, "Auto", groupStyle(),
                { // use a simple layout that ignores links to stack the "lane" Groups on top of each other
                  layout: $(PoolLayout, { spacing: new go.Size(0, 0) })  // no space between lanes
                },
                $(go.Shape,
                  { fill: "white" },
                  new go.Binding("fill", "color")),
                $(go.Panel, "Table",
                  { defaultColumnSeparatorStroke: "black" },
                  $(go.Panel, "Horizontal",
                    { column: 0, angle: 270 },
                    $(go.TextBlock,
                      { font: "bold 16pt sans-serif", editable: true, margin: new go.Margin(2, 0, 0, 0) },
                      new go.Binding("text").makeTwoWay())
                  ),
                  $(go.Placeholder,
                    { column: 1 })
                )
              ));
          // -----------------------------------------------------
          //             Swimlane Template End
          // -----------------------------------------------------



          scope.$watch("model", function(newmodel) {
            var oldmodel = diagram.model;
            if (oldmodel !== newmodel) {
              diagram.removeDiagramListener("ChangedSelection", updateSelection);
              diagram.model = newmodel;
              diagram.addDiagramListener("ChangedSelection", updateSelection);
            }
          });


          // notice when the value of "model" changes: update the Diagram.model
          /*
          scope.$watch("model", function(newmodel) {
            var oldmodel = diagram.model;
            if (oldmodel !== newmodel) {
              diagram.removeDiagramListener("ChangedSelection", updateSelection);
              diagram.model = newmodel;
              diagram.addDiagramListener("ChangedSelection", updateSelection);
            }
          });
          */












        }  // link: function(scope, element, attrs) End
 
      };   // return 

  }
 





})();



