<template>
  <div class="data-map__details_rsg">
    <div class="data-map__details_rsg_bg">
      <div class="data-map__details_rsg_bg_top"></div>
      <div class="data-map__details_rsg_bg_center"></div>
      <div class="data-map__details_rsg_bg_bottom"></div>
      <div class="data-map__details_rsg_bg_left"></div>
    </div>
    <div class="data-map__details_rsg_cover"></div>
    <!-- <div class="data-map__details_rsg_content" id="go"></div> -->
    <div class="data-map__details_rsg_content" id="go2"></div>
  </div>
</template>
<script>
import go from "gojs";
export default {
  name: "RsGraph",
  props: {
    RsGData: Object
  },
  data() {
    return {};
  },
  mounted() {
    // this.createGo();
    this.createGo2();
  },
  watch: {
    RsGData() {
      this.myDiagram.model = new go.GraphLinksModel(
        this.RsGData.nodeData,
        this.RsGData.linkData
      );
    }
  },
  methods: {
    createGo() {
      const $ = go.GraphObject.make;
      // 颜色
      var yellow = "#F5B700";
      var pink = "#D84040";

      this.myDiagram = $(go.Diagram, "go", {
        layout: $(go.TreeLayout, {
          setsPortSpot: false,
          setsChildPortSpot: false,
          isRealtime: false
        }),
        allowDragOut: true,
        hasHorizontalScrollbar: false,
        hasVerticalScrollbar: false
        // isReadOnly: true
      });

      this.myDiagram.nodeTemplate = $(
        go.Node,
        "Auto",
        // { defaultStretch: go.GraphObject.Horizontal },
        { fromSpot: go.Spot.RightSide, toSpot: go.Spot.LeftSide }, // 线的位置
        // 背景
        $(go.Shape, "RoundedRectangle", {
          width: 220,
          fill: "rgba(7, 22, 66, 0.7)", // 背景色
          stroke: "#1A4D99", // 描边色
          strokeWidth: 1 // 描边粗细
        }),
        // 内容
        $(
          go.Panel,
          "Vertical",
          // 库名
          $(
            go.Panel,
            "Auto",
            $(go.Shape, {
              width: 220,
              height: 35,
              fill: "rgba(0,198,255,0.05)", // 背景色
              strokeWidth: 0 // 描边粗细
            }),
            $(go.Picture, require("../../../assets/DataMonitor/rsg-bg.png"), {
              margin: new go.Margin(0, 0, 0, 0),
              width: 218,
              height: 35
            }),
            $(
              go.Panel,
              "Horizontal",
              $(
                go.Picture,
                require("../../../assets/DataMonitor/rsg-title.png"),
                { margin: new go.Margin(0, 10, 0, 0), width: 21, height: 14 }
              ),
              $(
                go.TextBlock,
                {
                  textAlign: "center",
                  stroke: "#7EFAFC",
                  font: "bold 14px PingFang SC"
                },
                new go.Binding("text", "header")
              )
            )
          ),
          // 表
          $(go.Panel, "Vertical", new go.Binding("itemArray", "table"), {
            itemTemplate: $(
              go.Panel,
              "Vertical",
              // 表名
              $(
                go.Panel,
                "Table",
                {
                  margin: new go.Margin(10, 0, 10, 0)
                },
                $(
                  go.TextBlock,
                  {
                    column: 0,
                    width: 180,
                    stroke: "#FFF",
                    font: "bold 12px PingFang SC"
                  },
                  new go.Binding("text", "tableName")
                ),
                // 按钮
                $("PanelExpanderButton", {
                  column: 1,
                  "ButtonIcon.fill": "#FFF",
                  "ButtonIcon.stroke": "#FFF"
                })
              ),
              // 下划线
              $(go.Shape, {
                fill: "#0B0235",
                width: 200,
                height: 1,
                margin: new go.Margin(0, 0, 5, 0),
                strokeWidth: 0 // 描边粗细
              }),
              // 字段
              $(
                go.Panel,
                "Vertical",
                { name: "COLLAPSIBLE" },
                new go.Binding("itemArray", "tableField"),
                {
                  itemTemplate: $(
                    go.Panel,
                    "Auto",
                    {
                      margin: new go.Margin(0, 0, 5, 0)
                    },
                    $(
                      go.Shape,
                      {
                        fill: "rgba(63, 100, 209, 0.2)",
                        width: 200,
                        height: 20,
                        strokeWidth: 0 // 描边粗细
                      },
                      new go.Binding("fill", "type", value => {
                        switch (value) {
                          case "descendants":
                            return "rgba(245, 183, 0, 0.2)";
                            break;
                          case "ancestors":
                            return "rgba(216, 64, 64, 0.2)";
                            break;
                          default:
                            return "rgba(63, 100, 209, 0.2)";
                            break;
                        }
                      })
                    ),
                    $(
                      go.TextBlock,
                      {
                        stroke: "#FFF",
                        font: "normal 10px PingFang SC"
                      },
                      new go.Binding("text", "name"),
                      new go.Binding("stroke", "type", value => {
                        switch (value) {
                          case "descendants":
                            return "rgba(204, 154, 4, 1)";
                            break;
                          case "ancestors":
                            return "rgba(245, 47, 87, 1)";
                            break;
                          default:
                            return "rgba(255, 255, 255, 1)";
                            break;
                        }
                      })
                    )
                  )
                }
              )
            )
          })
        )
      );
      // 连接线 过滤器
      function linkColorConverter(linkdata, elt) {
        var link = elt.part;
        if (!link) return pink;
        var f = link.fromNode;
        if (!f || !f.data || !f.data.ancestors) return pink;
        var t = link.toNode;
        if (!t || !t.data || !t.data.ancestors) return pink;
        return yellow;
      }
      function toArrowConverter(linkdata, elt) {
        var link = elt.part;
        if (!link) return 1;
        var f = link.fromNode;
        if (!f || !f.data || !f.data.ancestors) return 1;
        var t = link.toNode;
        if (!t || !t.data || !t.data.ancestors) return 1;
        return 0;
      }
      function fromArrowConverter(linkdata, elt) {
        var link = elt.part;
        if (!link) return 0;
        var f = link.fromNode;
        if (!f || !f.data || !f.data.ancestors) return 0;
        var t = link.toNode;
        if (!t || !t.data || !t.data.ancestors) return 0;
        return 1;
      }
      // 连接线
      this.myDiagram.linkTemplate = $(
        go.Link,
        { routing: go.Link.Orthogonal, corner: 15 },
        // 线
        $(
          go.Shape,
          { isPanelMain: true, strokeWidth: 1 },
          new go.Binding("stroke", "", linkColorConverter)
        ),
        // 影响 箭头
        $(
          go.Shape,
          { toArrow: "Standard", fill: pink, strokeWidth: 0 },
          new go.Binding("width", "", toArrowConverter)
        ),
        // 血缘 箭头
        $(
          go.Shape,
          { fromArrow: "Backward", fill: yellow, strokeWidth: 0 },
          new go.Binding("width", "", fromArrowConverter)
        )
      );
      // 数据
      this.myDiagram.model = new go.GraphLinksModel(
        this.RsGData.nodeData,
        this.RsGData.linkData
      );
    },
    createGo2() {
      const $ = go.GraphObject.make;
      // 颜色
      var yellow = "#F5B700";
      var pink = "#D84040";

      this.myDiagram = $(go.Diagram, "go2", {
        layout: $(go.TreeLayout, {
          setsPortSpot: false,
          setsChildPortSpot: false,
          isRealtime: false
        }),
        allowDragOut: false,
        hasHorizontalScrollbar: false,
        hasVerticalScrollbar: false
        // isReadOnly: true
      });
      // this.myDiagram.addDiagramListener("ObjectSingleClicked", e => {
      //   if (e.subject.name == "HIGHLIGHT") {
      //     console.log(e);
      //     this.$alert(e, "标题名称", {
      //       confirmButtonText: "确定",
      //       callback: action => {
      //         this.$message({
      //           type: "info",
      //           message: `action: ${action}`
      //         });
      //       }
      //     });
      //   }
      // });
      this.myDiagram.groupTemplate = $(
        go.Group,
        "Auto",
        {
          layout: $(go.TreeLayout, {
            setsPortSpot: false,
            setsChildPortSpot: false
          })
        },
        // { defaultStretch: go.GraphObject.Horizontal },
        { fromSpot: go.Spot.RightSide, toSpot: go.Spot.LeftSide },
        // 背景
        $(go.Shape, "RoundedRectangle", {
          // width: 220,
          fill: "rgba(7, 22, 66, 0.7)", // 背景色
          stroke: "#1A4D99", // 描边色
          strokeWidth: 1 // 描边粗细
        }),
        // 内容
        $(
          go.Panel,
          "Vertical",
          // 库名
          $(
            go.Panel,
            "Auto",
            $(go.Shape, {
              width: 220,
              height: 35,
              fill: "rgba(0,198,255,0.05)", // 背景色
              strokeWidth: 0 // 描边粗细
            }),
            $(go.Picture, require("../../../assets/DataMonitor/rsg-bg.png"), {
              margin: new go.Margin(0, 0, 0, 0),
              width: 218,
              height: 35
            }),
            $(
              go.Panel,
              "Horizontal",
              $(
                go.Picture,
                require("../../../assets/DataMonitor/rsg-title.png"),
                { margin: new go.Margin(0, 10, 0, 0), width: 21, height: 14 }
              ),
              $(
                go.TextBlock,
                {
                  textAlign: "center",
                  stroke: "#7EFAFC",
                  font: "bold 14px PingFang SC"
                },
                new go.Binding("text", "header")
              )
            )
          ),
          // 表
          $(go.Placeholder, { padding: 10 })
        )
      );
      this.myDiagram.nodeTemplate = $(
        go.Node,
        "Auto",
        // { defaultStretch: go.GraphObject.Horizontal },
        // 线的位置
        { fromSpot: go.Spot.RightSide, toSpot: go.Spot.LeftSide },
        // 背景
        $(go.Shape, "RoundedRectangle", {
          width: 200,
          fill: "rgba(7, 22, 66, 0.7)", // 背景色
          stroke: "#1A4D99", // 描边色
          strokeWidth: 1 // 描边粗细
        }),
        // 表
        $(
          go.Panel,
          "Vertical",
          // 表名
          $(
            go.Panel,
            "Table",
            {
              margin: new go.Margin(10, 0, 10, 0)
            },
            $(
              go.TextBlock,
              {
                column: 0,
                width: 160,
                stroke: "#FFF",
                font: "bold 12px PingFang SC"
              },
              new go.Binding("text", "tableName")
            ),
            // 按钮
            $("PanelExpanderButton", {
              column: 1,
              "ButtonIcon.fill": "#FFF",
              "ButtonIcon.stroke": "#FFF"
            })
          ),
          // 下划线
          $(go.Shape, {
            fill: "#0B0235",
            width: 180,
            height: 1,
            margin: new go.Margin(0, 0, 5, 0),
            strokeWidth: 0 // 描边粗细
          }),
          // 字段
          $(
            go.Panel,
            "Vertical",
            { name: "COLLAPSIBLE" },
            new go.Binding("itemArray", "tableField"),
            {
              itemTemplate: $(
                go.Panel,
                "Auto",
                {
                  margin: new go.Margin(0, 0, 5, 0)
                },
                $(
                  go.Shape,
                  {
                    fill: "rgba(63, 100, 209, 0.2)",
                    width: 180,
                    height: 20,
                    strokeWidth: 0 // 描边粗细
                  },
                  new go.Binding("fill", "type", value => {
                    switch (value) {
                      case "ancestors":
                        return "rgba(245, 183, 0, 0.2)";
                        break;
                      case "descendants":
                        return "rgba(216, 64, 64, 0.2)";
                        break;
                      default:
                        return "rgba(63, 100, 209, 0.2)";
                        break;
                    }
                  })
                ),
                $(
                  go.TextBlock,
                  {
                    stroke: "#FFF",
                    font: "normal 10px PingFang SC"
                  },
                  new go.Binding("text", "name"),
                  new go.Binding("stroke", "type", value => {
                    switch (value) {
                      case "ancestors":
                        return "rgba(204, 154, 4, 1)";
                        break;
                      case "descendants":
                        return "rgba(245, 47, 87, 1)";
                        break;
                      default:
                        return "rgba(255, 255, 255, 1)";
                        break;
                    }
                  })
                )
              )
            }
          )
        )
      );
      // 连接线 过滤器
      function linkColorConverter(linkdata, elt) {
        var link = elt.part;
        if (!link) return pink;
        var f = link.fromNode;
        if (!f || !f.data || !f.data.ancestors) return pink;
        var t = link.toNode;
        if (!t || !t.data || !t.data.ancestors) return pink;
        return yellow;
      }
      function toArrowConverter(linkdata, elt) {
        var link = elt.part;
        if (!link) return 1;
        var f = link.fromNode;
        if (!f || !f.data || !f.data.ancestors) return 1;
        var t = link.toNode;
        if (!t || !t.data || !t.data.ancestors) return 1;
        return 0;
      }
      function fromArrowConverter(linkdata, elt) {
        var link = elt.part;
        if (!link) return 0;
        var f = link.fromNode;
        if (!f || !f.data || !f.data.ancestors) return 0;
        var t = link.toNode;
        if (!t || !t.data || !t.data.ancestors) return 0;
        return 1;
      }
      // 连接线
      this.myDiagram.linkTemplate = $(
        go.Link,
        {
          routing: go.Link.Orthogonal,
          corner: 15,
          cursor: "pointer",
          mouseOver: (e, link) => {
            link.findObject("HIGHLIGHT").strokeWidth = 7;
          },
          mouseLeave: (e, link) => {
            link.findObject("HIGHLIGHT").strokeWidth = 2;
          },
          click: (e, link) => {
            // link.findObject("HIGHLIGHT").strokeWidth = 7;
            console.log(e, link);
            this.$alert(link.jb, "标题名称", {
              confirmButtonText: "确定",
              callback: action => {
                this.$message({
                  type: "info",
                  message: `action: ${action}`
                });
              }
            });
          }
        },
        // 线
        $(
          go.Shape,
          { isPanelMain: true, strokeWidth: 2, name: "HIGHLIGHT" },
          new go.Binding("stroke", "", linkColorConverter)
        ),
        // 影响 箭头
        $(
          go.Shape,
          { toArrow: "Standard", fill: pink, strokeWidth: 0 },
          new go.Binding("width", "", toArrowConverter)
        ),
        // 血缘 箭头
        $(
          go.Shape,
          { fromArrow: "Backward", fill: yellow, strokeWidth: 0 },
          new go.Binding("width", "", fromArrowConverter)
        )
      );
      // 数据
      this.myDiagram.model = new go.GraphLinksModel(
        this.RsGData.nodeData,
        this.RsGData.linkData
      );
    }
  }
};
</script>
<style lang="scss">
.data-map__details_rsg {
  &_bg {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    &_top {
      position: absolute;
      top: 0;
      right: 0;
      width: 100px;
      height: 40px;
      background-image: url(../../../assets/DataMonitor/rsg-top.png);
    }
    &_center {
      position: absolute;
      top: 40px;
      right: 0;
      border-right: 1px solid rgba(39, 115, 229, 1);
      bottom: 40px;
      width: 100px;
      box-sizing: border-box;
      background: rgba(7, 22, 66, 1);
    }
    &_bottom {
      position: absolute;
      right: 0;
      bottom: 0;
      width: 100px;
      height: 40px;
      background-image: url(../../../assets/DataMonitor/rsg-bottom.png);
    }
    &_left {
      position: absolute;
      top: 0;
      right: 100px;
      bottom: 0;
      left: 0;
      background: linear-gradient(
        90deg,
        rgba(7, 22, 66, 0.1) 3%,
        rgba(7, 22, 66, 0.62) 9%,
        rgba(7, 22, 66, 1) 35%
      );
    }
  }
  &_cover {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-image: url(../../../assets/DataMonitor/grid.png);
  }
  &_content {
    width: 100%;
    height: 100%;
    canvas {
      outline: none;
    }
  }
}
</style>
