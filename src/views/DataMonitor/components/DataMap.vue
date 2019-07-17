<template>
  <div class="data-map">
    <div class="data-map__content"></div>
    <div class="data-map__center">
      <svg-icon icon-class="center" class="data-map__center_center"></svg-icon>
      <svg-icon icon-class="glow" class="data-map__center_glow"></svg-icon>
      <svg-icon icon-class="ball" class="data-map__center_ball"></svg-icon>
      <div class="data-map__center_shine">
        <svg-icon icon-class="ball-lig-up" class="data-map__center_shine_1"></svg-icon>
        <svg-icon icon-class="ball-lig-down" class="data-map__center_shine_2"></svg-icon>
        <svg-icon icon-class="ball-lig-down" class="data-map__center_shine_3"></svg-icon>
        <svg-icon icon-class="ball-lig-up" class="data-map__center_shine_4"></svg-icon>
        <svg-icon icon-class="ball-lig-up" class="data-map__center_shine_5"></svg-icon>
        <svg-icon icon-class="ball-lig-up" class="data-map__center_shine_6"></svg-icon>
        <svg-icon icon-class="ball-lig-up" class="data-map__center_shine_7"></svg-icon>
      </div>
      <div class="data-map__center_orbit">
        <div class="data-map__center_orbit_1"></div>
        <div class="data-map__center_orbit_2"></div>
      </div>
      <svg-icon icon-class="orbit-max" class="data-map__center_orbit-max"></svg-icon>
      <svg-icon icon-class="orbit-top" class="data-map__center_orbit-top"></svg-icon>
      <!-- <svg-icon icon-class="monitor" class="data-map__center_monitor"></svg-icon>
      <svg-icon icon-class="monitor1" class="data-map__center_monitor-1"></svg-icon>-->
      <svg-icon icon-class="monitor2" class="data-map__center_monitor-2"></svg-icon>
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
          symbolSize: 90
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
            show: true,
            data: ["流入", "流出"],
            top: 80,
            textStyle: {
              color: "#fff"
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
          ]
        },
        true
      );
    }
  }
};
</script>
<style lang="scss">
.data-map {
  width: 910px;
  height: 650px;
  &__content {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 1;
  }
  &__center {
    position: absolute;
    width: 100%;
    height: 100%;
    > svg,
    &_orbit,
    &_shine {
      position: absolute;
      left: 0;
      right: 0;
      margin: auto;
    }
    &_center {
      top: 31px;
      width: 280px !important;
      height: 280px !important;
    }
    &_glow {
      top: -48px;
      width: 695px !important;
      height: 530px !important;
    }
    &_ball {
      top: 107px;
      width: 133px !important;
      height: 133px !important;
    }
    &_shine {
      top: 107px;
      width: 133px !important;
      height: 133px !important;
      // background: #000;
      position: relative;
      > * {
        position: absolute;
      }
      &_1 {
        top: 9px;
        left: 36px;
        width: 40px !important;
        height: 40px !important;
        animation: shine 1.6s ease-in-out infinite;
      }
      &_2 {
        bottom: -15px;
        left: 58px;
        width: 40px !important;
        height: 40px !important;
        animation: shine 1s ease-in-out infinite;
      }
      &_3 {
        bottom: 25px;
        right: -13px;
        width: 40px !important;
        height: 40px !important;
        animation: shine 3s ease-in-out infinite;
      }
      &_4 {
        top: -2px;
        right: 24px;
        width: 40px !important;
        height: 40px !important;
        animation: shine 1s ease-in-out infinite;
      }
      &_5 {
        bottom: -53px;
        right: 47px;
        width: 18px !important;
        height: 18px !important;
        animation: float 3s ease-in-out infinite;
      }
      &_6 {
        bottom: -67px;
        right: 58px;
        width: 18px !important;
        height: 18px !important;
        animation: float 2.5s ease-in-out infinite;
      }
      &_7 {
        bottom: -32px;
        left: 31px;
        width: 18px !important;
        height: 18px !important;
        animation: float 2.5s ease-in-out infinite;
      }
    }
    &_orbit {
      top: 25px;
      width: 600px;
      height: 600px;
      transform-style: preserve-3d;
      transform: rotateX(71deg);
      opacity: 0.5;
      > * {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
      }
      &_1 {
        width: 470px;
        height: 470px;
        top: -90px;
        border-radius: 50%;
        border: 3px dashed #1375dc;
        animation: rotate 50s linear infinite;
      }
      &_2 {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        border: 1px dashed #29f4ee;
        animation: rotate 50s linear infinite;
      }
    }
    &_orbit-max {
      width: 633px !important;
      height: 254px !important;
      top: 210px;
    }
    &_orbit-top {
      width: 378px !important;
      height: 76px !important;
      top: 140px;
    }
    &_monitor {
      top: 138px;
      left: -300px !important;
      width: 44px !important;
      height: 64px !important;
    }
    &_monitor-1 {
      top: 118px;
      right: -320px !important;
      width: 52px !important;
      height: 39px !important;
    }
    &_monitor-2 {
      top: 244px;
      right: -57px !important;
      width: 15px !important;
      height: 15px !important;
    }
    // 动画
    @keyframes rotate {
      0% {
        transform: rotate(360deg);
      }
      100% {
        transform: rotate(0);
      }
    }
    @keyframes shine {
      0% {
        opacity: 0;
      }
      50% {
        opacity: 1;
      }
      100% {
        opacity: 0;
      }
    }
    @keyframes float {
      0% {
        opacity: 0;
        transform: translateY(0px);
      }
      50% {
        opacity: 1;
      }
      100% {
        opacity: 0;
        transform: translateY(-30px);
      }
    }
  }
  @media only screen and (min-width: 100px) and (max-width: 1365px) {
    top: -25px;
    transform: scale(0.65);
  }
  @media only screen and (min-width: 1366px) and (max-width: 1439px) {
    top: -50px;
    transform: scale(0.7);
  }
  @media only screen and (min-width: 1440px) and (max-width: 1599px) {
    transform: scale(0.8);
  }
  @media only screen and (min-width: 1600px) and (max-width: 1919px) {
    transform: scale(0.9);
  }
  @media only screen and (min-width: 1920px) {
    // transform: scale(1.3);
  }
}
</style>
