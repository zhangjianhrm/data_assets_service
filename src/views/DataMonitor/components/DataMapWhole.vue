<template>
  <div class="dmap">
    <div class="dmap__content"></div>
    <div class="dmap__legend">
      <div>全部</div>
      <div>API 流向</div>
      <div>数据交换</div>
    </div>
  </div>
</template>
<script>
import load from "@/utils/load.js"; // 加载 Js

// import echarts from "echarts";
export default {
  name: "DMap",
  props: {},
  data() {
    return {
      // 地图数据
      pointData: [
        { name: "全量库", coord: [105, 40] }, // 中心点放在最前面
        { name: "财务系统", coord: [96, 43, { in: 10, out: 9 }] },
        { name: "图书馆系统", coord: [92, 40, { in: 10, out: 0 }] },
        { name: "宿管系统", coord: [96, 36, { in: 10, out: 9 }] },
        { name: "一卡通系统", coord: [105, 35, { in: 10, out: 9 }] },
        { name: "资产系统", coord: [114, 36, { in: 10, out: 9 }] },
        { name: "人事系统", coord: [118, 40, { in: 10, out: 9 }] },
        { name: "教务系统", coord: [114, 43, { in: 10, out: 0 }] }
      ],
      planePath: "diamond", // 箭头样式，包括 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'
      lineColor: ["#71D197", "#1877DF"], // 线条颜色
      lineWidth: 0.5, // 线条宽度
      lineCurveness: 0.1, // 线条曲率
      lineOpacity: 0.4, // 线条透明度
      dataCenter: require("@/assets/DataMonitor/ball.png"),
      symbolSize: 50
    };
  },
  async created() {
    await load(
      "https://echarts.baidu.com/gallery/vendors/echarts/echarts.min.js"
    );
    await load(
      "https://echarts.baidu.com/gallery/vendors/echarts/map/js/china.js"
    );
    this.createMap();
  },
  mounted() {
    this.computedPos();
  },
  methods: {
    // 自动圆形排列
    computedPos() {
      let angle = 360 / (this.pointData.length - 1); // 初始角度
      let angleX = 360 / (this.pointData.length - 1); // 递增角度
      let r = 20; // 半径
      for (let i = 1; i < this.pointData.length; i++) {
        angle += angleX;
        let x = 105 + r * Math.cos((angle * Math.PI) / 180);
        let y = 40 + r * Math.sin((angle * Math.PI) / 180);
        this.$set(this.pointData[i].coord, [0], x);
        this.$set(this.pointData[i].coord, [1], y);
      }
    },
    // 获取各个点的坐标
    getPointCoord(data) {
      let pointCoord = [];
      // 其他点
      for (let i = 1; i < data.length; i++) {
        pointCoord.push({
          name: data[i].name,
          value: data[i].coord,
          symbol:
            "image://" +
            require("@/assets/icon/datamap/" + data[i].name + ".png"),
          symbolSize: this.symbolSize
        });
      }
      // 中心点
      pointCoord.push({
        name: data[0].name,
        value: data[0].coord,
        symbol: "image://" + this.dataCenter,
        symbolSize: 100
      });
      return pointCoord;
    },
    // 获取路线 （点数据，流向）
    getRouteMap(data, type) {
      let routeMap = [];
      if (type == "out") {
        // 流出
        for (let i = 0; i < data.length; i++) {
          if (data[0].name != data[i].name && data[i].coord[2].out == 0) {
            routeMap.push({
              coords: [data[0].coord, data[i].coord],
              effect: { color: "transparent" },
              label: { show: false },
              lineStyle: { width: 1 }
            });
          } else if (data[0].name != data[i].name) {
            routeMap.push({
              coords: [data[0].coord, data[i].coord]
            });
          }
        }
      } else {
        // 流入
        for (let i = 0; i < data.length; i++) {
          if (data[0].name != data[i].name) {
            routeMap.push({
              coords: [data[i].coord, data[0].coord]
            });
          }
        }
      }
      // console.log(JSON.stringify(routeMap));
      return routeMap;
    },
    // 创建地图
    createMap() {
      // eslint-disable-next-line
      let myChart = echarts.init(document.querySelector(".dmap__content"));
      // 图表配置
      myChart.setOption(
        {
          // 地图
          geo: {
            map: "china",
            center: this.pointData[0].coord, // 地图中心
            roam: false, // 是否可拖动
            zoom: 1.5,
            silent: true, // 是否禁用选中
            aspectScale: 5 / 3, // 长宽比
            itemStyle: {
              opacity: 0
            }
          },
          // 提示框
          tooltip: {
            // show: false,
            trigger: "item",
            position: "top",
            formatter: params => {
              let txt = "";
              if (params.data.value) {
                if (params.data.value[2]) {
                  let data_in = params.data.value[2].in;
                  let data_out = params.data.value[2].out;
                  let data_sum = data_in + data_out;
                  txt = "数据流入流出总和：" + data_sum;
                }
              }
              return txt;
            },
            textStyle: {
              fontSize: 12
            }
          },
          // 图例
          legend: {
            show: false,
            itemWidth: 20,
            itemHeight: 2,
            data: ["流入", "流出"],
            bottom: 150,
            right: 100,
            textStyle: {
              color: "rgba(255,255,255,0.1)"
            },
            selectedMode: "multiple"
          },
          // 系列列表
          series: [
            // 流出
            {
              name: "流出",
              type: "lines",
              // 数据
              data: this.getRouteMap(this.pointData, "out"),
              // 箭头效果
              effect: {
                show: true,
                period: 6, // 特效动画的时间，单位为 s
                trailLength: 0.1,
                symbol: this.planePath,
                symbolSize: 4
                // color: this.lineColor[0]
              },
              // 标签
              label: {
                show: true,
                position: "end",
                formatter: params => {
                  let txt = "";
                  if (params.data.coords) {
                    txt = params.data.coords[1][2].out;
                  }
                  return txt;
                }
              },
              // 线条的颜色
              lineStyle: {
                color: {
                  type: "linear",
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: "#7effff" // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "#43bcd1" // 100% 处的颜色
                    }
                  ]
                },
                width: this.lineWidth,
                opacity: this.lineOpacity,
                curveness: this.lineCurveness
              }
            },
            // 流入
            {
              name: "流入",
              type: "lines",
              // 数据
              data: this.getRouteMap(this.pointData, "in"),
              // 箭头的颜色
              effect: {
                show: true,
                period: 6,
                trailLength: 0.1,
                // color: this.lineColor[1],
                symbol: this.planePath,
                symbolSize: 4
              },
              // 标签
              label: {
                show: true,
                color: "#fff",
                position: "middle",
                formatter: function(params) {
                  let txt = "";
                  if (params.data.coords) {
                    txt = params.data.coords[0][2].in;
                  }
                  return txt;
                }
              },
              // 线条的颜色
              lineStyle: {
                color: {
                  type: "linear",
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: "#f9dc5c" // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "#ed254e" // 100% 处的颜色
                    }
                  ]
                },
                width: this.lineWidth,
                opacity: this.lineOpacity,
                curveness: this.lineCurveness
              }
            },
            // 点
            {
              type: "graph",
              coordinateSystem: "geo",
              data: this.getPointCoord(this.pointData), // 数据
              large: true,
              animation: false,
              legendHoverLink: false,
              hoverAnimation: false,
              label: {
                show: true, // 文字样式
                color: "white",
                fontSize: 12,
                fontWeight: "lighter",
                distance: 14,
                position: "top",
                formatter: "{b}"
              }
            }
          ]
        },
        true
      );
    }
  }
};
</script>
<style lang="scss">
.dmap {
  position: absolute;
  top: 100px;
  right: 570px;
  bottom: 15px;
  left: 260px;
  // overflow: hidden;
  // display: flex;
  // justify-content: center;
  // align-items: center;
  &__content {
    width: 1100px !important;
    height: 800px !important;
    position: absolute !important;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  &__legend {
    width: 258px;
    height: 31px;
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    display: flex;
    justify-content: center;
    cursor: pointer;
    > div {
      transition: all 0.2s;
      width: 86px;
      height: 31px;
      background-image: url(../../../assets/DataMonitor/tab.png);
      background-repeat: no-repeat;
      background-position: top center;
      background-size: 100%;
      color: #fff;
      text-align: center;
      line-height: 28px;
      font-size: 12px;
      &:hover {
        background-image: url(../../../assets/DataMonitor/tab-active.png);
      }
    }
  }
  @media only screen and (min-width: 100px) and (max-width: 1365px) {
    // top: -25px;
    // transform: scale(0.65);
  }
  @media only screen and (min-width: 1366px) and (max-width: 1599px) {
    .dmap__content {
      transform: translate(-50%, -50%) scale(0.6);
    }
  }
  @media only screen and (min-width: 1600px) and (max-width: 1919px) {
    .dmap__content {
      transform: translate(-50%, -50%) scale(0.8);
    }
  }
  @media only screen and (min-width: 1920px) {
    // transform: scale(1);
  }
}
</style>
