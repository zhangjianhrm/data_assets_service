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
      // 颜色
      var yellow = "#F5B700";
      var pink = "#D84040";

      this.myDiagram = $(go.Diagram, "go", {
        layout: $(go.TreeLayout, {
          setsPortSpot: false,
          setsChildPortSpot: false,
          isRealtime: false
        }),
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
          fill: "transparent", // 背景色
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
              fill: "#0B0134",
              width: 218,
              height: 35,
              strokeWidth: 0 // 描边粗细
            }),
            $(
              go.TextBlock,
              {
                textAlign: "center",
                stroke: "#7EFAFC",
                font: "bold 14px PingFang SC"
              },
              new go.Binding("text", "header")
            )
          ),
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
                  width: 180,
                  stroke: "#FFF",
                  font: "bold 12px PingFang SC"
                },
                new go.Binding("text", "tableName")
              ),
              // 按钮
              $("PanelExpanderButton", "LIST", {
                column: 1,
                "ButtonIcon.fill": "#FFF",
                "ButtonIcon.stroke": "#FFF"
              })
            ),
            // 下划线
            $(go.Shape, {
              // column: 0,
              // row: 1,
              fill: "#0B0235",
              width: 200,
              height: 1,
              strokeWidth: 0 // 描边粗细
            }),
            // 列表
            $(
              go.Panel,
              "Vertical",
              {
                name: "LIST",
                width: 200,
                margin: new go.Margin(0, 0, 10, 0),
                // height: 200,
                // alignment: go.Spot.TopLeft,
                // defaultAlignment: go.Spot.Left,
                // stretch: go.GraphObject.Horizontal,
                // defaultStretch: go.GraphObject.Vertical,
                itemTemplate: $(
                  go.Panel,
                  "Auto",
                  {
                    margin: new go.Margin(10, 20, 0, 0)
                  },
                  $(go.Shape, {
                    fill: "rgba(63, 100, 209, 0.1)",
                    width: 90,
                    height: 30,
                    strokeWidth: 0 // 描边粗细
                  }),
                  $(
                    go.TextBlock,
                    {
                      stroke: "#FFF",
                      font: "normal 12px PingFang SC"
                    },
                    new go.Binding("text", "name")
                  )
                )
              },
              new go.Binding("itemArray", "tableField")
            )
          )
        )
      );
      // 连接线 过滤器
      function linkColorConverter(linkdata, elt) {
        var link = elt.part;
        if (!link) return pink;
        var f = link.fromNode;
        if (!f || !f.data || !f.data.blood) return pink;
        var t = link.toNode;
        if (!t || !t.data || !t.data.blood) return pink;
        return yellow;
      }
      function toArrowConverter(linkdata, elt) {
        var link = elt.part;
        if (!link) return 1;
        var f = link.fromNode;
        if (!f || !f.data || !f.data.blood) return 1;
        var t = link.toNode;
        if (!t || !t.data || !t.data.blood) return 1;
        return 0;
      }
      function fromArrowConverter(linkdata, elt) {
        var link = elt.part;
        if (!link) return 0;
        var f = link.fromNode;
        if (!f || !f.data || !f.data.blood) return 0;
        var t = link.toNode;
        if (!t || !t.data || !t.data.blood) return 0;
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
        [
          {
            key: 1,
            header: "全量库",
            tableName: "学生基本信息",
            tableField: [{ name: "姓名" }, { name: "年龄" }, { name: "班级" }],
            blood: true
          },
          {
            key: 2,
            header: "测试2",
            tableName: "学生基本信息",
            tableField: [
              { name: "姓名" },
              { name: "年龄" },
              { name: "班级" },
              { name: "专业" },
              { name: "学院" }
            ]
          },
          {
            key: 3,
            header: "测试3",
            tableName: "学生基本信息",
            tableField: [{ name: "姓名" }, { name: "年龄" }, { name: "班级" }]
          },
          {
            key: 4,
            header: "测试4",
            tableName: "学生基本信息",
            tableField: [{ name: "姓名" }, { name: "年龄" }, { name: "班级" }],
            blood: true
          },
          {
            key: 5,
            header: "测试5",
            tableName: "学生基本信息",
            tableField: [{ name: "姓名" }, { name: "年龄" }, { name: "班级" }],
            blood: true
          },
          {
            key: 6,
            header: "测试6",
            tableName: "学生基本信息",
            tableField: [{ name: "姓名" }, { name: "年龄" }, { name: "班级" }]
          },
          {
            key: 7,
            header: "测试7",
            tableName: "学生基本信息",
            tableField: [{ name: "姓名" }, { name: "年龄" }, { name: "班级" }],
            blood: true
          },
          {
            key: 8,
            header: "测试8",
            tableName: "学生基本信息",
            tableField: [{ name: "姓名" }, { name: "年龄" }, { name: "班级" }]
          },
          {
            key: 9,
            header: "测试9",
            tableName: "学生基本信息",
            tableField: [{ name: "姓名" }, { name: "年龄" }, { name: "班级" }]
          },
          {
            key: 10,
            header: "测试10",
            tableName: "学生基本信息",
            tableField: [{ name: "姓名" }, { name: "年龄" }, { name: "班级" }],
            blood: true
          },
          {
            key: 11,
            header: "测试11",
            tableName: "学生基本信息",
            tableField: [{ name: "姓名" }, { name: "年龄" }, { name: "班级" }],
            blood: true
          },
          {
            key: 12,
            header: "测试11",
            tableName: "学生基本信息",
            tableField: [{ name: "姓名" }, { name: "年龄" }, { name: "班级" }]
          }
        ],
        [
          { from: 1, to: 2 },
          { from: 5, to: 1 },
          { from: 1, to: 9 },
          { from: 10, to: 1 },
          { from: 4, to: 5 },
          { from: 7, to: 5 },
          { from: 11, to: 10 },
          { from: 2, to: 3 },
          { from: 2, to: 6 },
          { from: 6, to: 8 },
          { from: 3, to: 12 }
        ]
      );
    }
  }
};
</script>
<style lang="scss">
.data-map__details_rsg {
  opacity: 0.95;
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
