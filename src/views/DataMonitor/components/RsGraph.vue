<template>
  <div class="data-map__details_rsg">
    <div class="data-map__details_rsg_content" id="go"></div>
  </div>
</template>
<script>
import go from "gojs";
export default {
  name: "RsGraph",
  mounted() {
    this.createGo();
  },
  methods: {
    createGo() {
      const $ = go.GraphObject.make;

      this.myDiagram = $(go.Diagram, "go", {
        layout: $(go.TreeLayout, {
          setsPortSpot: false,
          setsChildPortSpot: false,
          isRealtime: false
        })
      });

      this.myDiagram.nodeTemplate = $(
        go.Node,
        "Vertical",
        { defaultStretch: go.GraphObject.Horizontal },
        { fromSpot: go.Spot.RightSide, toSpot: go.Spot.LeftSide },
        $(
          go.Panel,
          "Auto",
          $(
            go.Shape,
            { fill: "white" },
            new go.Binding("fill", "role", r => {
              return r[0] === "t" ? "lightgray" : "white";
            })
          ),
          $(
            go.TextBlock,
            { margin: new go.Margin(2, 2, 0, 2), textAlign: "center" },
            new go.Binding("text", "header")
          )
        ),
        $(
          go.Panel,
          "Auto",
          { minSize: new go.Size(100, 70) },
          $(go.Shape, "Rectangle", { fill: "white" }),
          $(
            go.TextBlock,
            { width: 120 },
            { margin: new go.Margin(2, 2, 0, 2), textAlign: "center" },
            new go.Binding("text", "text")
          ),
          $(
            go.Shape,
            {
              visible: false,
              width: 10,
              height: 10,
              alignment: new go.Spot(0.5, 1, 0, -3),
              alignmentFocus: go.Spot.Bottom
            },
            new go.Binding("visible", "loop")
          )
        ),
        $(
          go.Panel,
          "Auto",
          $(
            go.Shape,
            { fill: "white" },
            new go.Binding("fill", "role", function(r) {
              return r[0] === "b" ? "lightgray" : "white";
            })
          ),
          $(
            go.TextBlock,
            { margin: new go.Margin(2, 2, 0, 2), textAlign: "center" },
            new go.Binding("text", "footer")
          )
        )
      );

      this.myDiagram.groupTemplate = $(
        go.Group,
        "Vertical",
        {
          layout: $(go.TreeLayout, {
            setsPortSpot: false,
            setsChildPortSpot: false
          })
        },
        { defaultStretch: go.GraphObject.Horizontal },
        { fromSpot: go.Spot.RightSide, toSpot: go.Spot.LeftSide },
        $(
          go.Panel,
          "Auto",
          $(
            go.Shape,
            { fill: "white" },
            new go.Binding("fill", "role", function(r) {
              return r[0] === "t" ? "lightgray" : "white";
            })
          ),
          $(
            go.TextBlock,
            { margin: new go.Margin(2, 2, 0, 2), textAlign: "center" },
            new go.Binding("text", "header")
          )
        ),
        $(
          go.Panel,
          "Auto",
          $(go.Shape, { fill: "white" }),
          $(go.Placeholder, { padding: 20 }),
          $(
            go.Shape,
            {
              visible: false,
              width: 10,
              height: 10,
              alignment: new go.Spot(0.5, 1, 0, -3),
              alignmentFocus: go.Spot.Bottom
            },
            new go.Binding("visible", "loop")
          )
        ),
        $(
          go.Panel,
          "Auto",
          $(
            go.Shape,
            { fill: "white" },
            new go.Binding("fill", "role", function(r) {
              return r[0] === "b" ? "lightgray" : "white";
            })
          ),
          $(
            go.TextBlock,
            { margin: new go.Margin(2, 2, 0, 2), textAlign: "center" },
            new go.Binding("text", "footer")
          )
        )
      );

      this.myDiagram.linkTemplate = $(
        go.Link,
        { routing: go.Link.Orthogonal, corner: 5 },
        $(go.Shape),
        $(go.Shape, { toArrow: "Triangle" })
      );

      this.myDiagram.model = new go.GraphLinksModel(
        [
          {
            key: 1,
            header: "Supplier",
            text: "Planned Order Variations",
            footer: "Retailer",
            role: "b"
          },
          {
            key: 2,
            header: "Supplier",
            text: "Order & Delivery Variations",
            footer: "Retailer",
            role: "t",
            loop: true
          },
          {
            key: 3,
            header: "Supplier",
            isGroup: true,
            footer: "Shipper",
            role: "b"
          },
          {
            key: 4,
            header: "Supplier",
            text: "Planned Order Variations",
            footer: "Retailer",
            role: "b",
            group: 3
          },
          {
            key: 5,
            header: "Supplier",
            text: "Order & Delivery Variations",
            footer: "Retailer",
            role: "t",
            group: 3
          },
          {
            key: 13,
            header: "Supplier",
            isGroup: true,
            footer: "Shipper",
            role: "b",
            loop: true
          },
          {
            key: 14,
            header: "Supplier",
            text: "Planned Order Variations",
            footer: "Retailer",
            role: "b",
            group: 13
          },
          {
            key: 15,
            header: "Supplier",
            text: "Order & Delivery Variations",
            footer: "Retailer",
            role: "t",
            group: 13
          }
        ],
        [
          { from: 1, to: 2 },
          { from: 2, to: 3 },
          { from: 2, to: 13 },
          { from: 4, to: 5 },
          { from: 14, to: 15 }
        ]
      );
    }
  }
};
</script>
<style lang="scss">
.data-map__details_rsg {
  background: linear-gradient(
    90deg,
    rgba(7, 22, 66, 0) 3%,
    rgba(7, 22, 66, 0.62) 9%,
    rgba(7, 22, 66, 1) 35%
  );
  &_content {
    width: 100%;
    height: 100%;
    canvas {
      outline: none;
    }
  }
}
</style>
