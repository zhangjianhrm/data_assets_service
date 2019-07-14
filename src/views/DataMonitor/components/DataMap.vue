<template>
  <div class="data-map">
    <div class="data-map__content"></div>
    <div class="data-map__center">
      <svg-icon icon-class="glow" class="data-map__center_glow"></svg-icon>
      <svg-icon icon-class="ball" class="data-map__center_ball"></svg-icon>
      <div class="data-map__center_orbit">
        <div class="data-map__center_orbit_1"></div>
        <div class="data-map__center_orbit_2"></div>
      </div>
      <svg-icon icon-class="orbit-max" class="data-map__center_orbit-max"></svg-icon>
      <svg-icon icon-class="orbit-top" class="data-map__center_orbit-top"></svg-icon>
    </div>
  </div>
</template>
<script>
import load from "@/utils/load.js"; // 加载 Js

export default {
  name: "DataMap",
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
      planePath: "rect", // 箭头样式，包括 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'
      lineColor: ["#71D197", "#1877DF"], // 线条颜色
      lineWidth: 0.5, // 线条宽度
      lineCurveness: 0.1, // 线条曲率
      lineOpacity: 0.4, // 线条透明度
      dataCenter: require("@/assets/icon/datamap/全量库.png")
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
  mounted() {},
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
          symbolSize: 50
        });
      }
      // 中心点
      pointCoord.push({
        name: data[0].name,
        value: data[0].coord,
        symbol: "image://" + this.dataCenter,
        symbolSize: 0
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
      let myChart = echarts.init(document.querySelector(".data-map__content"));
      // 图表配置
      myChart.setOption(
        {
          // 地图
          geo: {
            map: "china",
            center: this.pointData[0].coord, // 地图中心
            roam: false, // 是否可拖动
            zoom: 2,
            silent: true, // 是否禁用选中
            aspectScale: 1, // 长宽比
            itemStyle: {
              opacity: 0
            }
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
                show: true, // 是否显示特效
                period: 6, // 特效动画的时间，单位为 s
                trailLength: 0.1,
                symbol: this.planePath,
                symbolSize: 2,
                color: this.lineColor[0]
              },
              // 标签
              label: {
                show: true,
                position: "end",
                formatter: function(params) {
                  let txt = "";
                  if (params.data.coords) {
                    txt = params.data.coords[1][2].out;
                  }
                  return txt;
                }
              },
              // 线条的颜色
              lineStyle: {
                color: this.lineColor[0],
                width: this.lineWidth,
                opacity: this.lineOpacity,
                curveness: this.lineCurveness
              },
              zlevel: 2
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
                color: this.lineColor[1],
                symbol: this.planePath,
                symbolSize: 2
              },
              // 标签
              label: {
                show: true,
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
                color: this.lineColor[1],
                width: this.lineWidth,
                opacity: this.lineOpacity,
                curveness: this.lineCurveness
              },
              zlevel: 2
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
                fontFamily: "PingFang SC",
                fontWeight: "lighter",
                distance: 14,
                position: "top",
                formatter: "{b}"
              },
              zlevel: 2
            }
          ],
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
            data: ["流入", "流出"],
            type: "plain",
            textStyle: {
              color: "#fff"
            },
            selectedMode: "multiple"
          }
        },
        true
      );
    }
  }
};
</script>
<style lang="scss">
.data-map {
  width: 100%;
  // height: calc(100vh - 80px);
  height: 100vh;
  position: relative;
  // background-image: url(../../assets/bg.jpg);
  &__content {
    position: absolute;
    width: 700px;
    height: 700px;
    top: -200px;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
  }
  &__center {
    position: absolute;
    width: 700px;
    height: 700px;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    > svg,
    &_orbit {
      position: absolute;
      left: 0;
      right: 0;
      margin: auto;
    }
    &_glow {
      top: 54px;
      width: 365px !important;
      height: 232px !important;
    }
    &_ball {
      top: 85px;
      width: 95px !important;
      height: 95px !important;
    }
    &_orbit {
      width: 500px;
      height: 500px;
      transform-style: preserve-3d;
      transform: rotateX(71deg);
      > * {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
      }
      &_1 {
        width: 350px;
        height: 350px;
        top: -90px;
        border-radius: 50%;
        border: 3px dashed #1375dc;
        animation: rotate 50s linear infinite;
      }
      &_2 {
        width: 470px;
        height: 470px;
        border-radius: 50%;
        border: 1px dashed #29f4ee;
        animation: rotate 50s linear infinite;
      }
    }
    &_orbit-max {
      width: 500px !important;
      height: 182px !important;
      top: 168px;
    }
    &_orbit-top {
      width: 280px !important;
      height: 56px !important;
      top: 112px;
    }
    @keyframes rotate {
      0% {
        transform: rotate(360deg);
      }
      100% {
        transform: rotate(0);
      }
    }
  }
}
</style>
