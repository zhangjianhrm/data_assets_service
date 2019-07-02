<template>
  <div class="map">
    <div class="map-wrap" id="data-map-v1"></div>
  </div>
</template>
<script>
import load from "@/utils/load.js"; // 加载 Js

export default {
  name: "DataMapV1",
  props: {
    pointData: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data() {
    return {};
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
    // 获取各个点的坐标
    getPointCoord(data) {
      let pointCoord = [];
      for (let i = 1; i < data.length; i++) {
        pointCoord.push({
          name: data[i].name,
          value: data[i].coord
        });
      }
      pointCoord.push({
        name: data[0].name,
        value: data[0].coord,
        symbolSize: 8,
        // 中心点的样式
        itemStyle: {
          normal: {
            color: "white",
            borderColor: "#000"
          }
        }
      });
      return pointCoord;
    },
    // 获取路线 （点数据，流向）
    getRouteMap(data, type) {
      let routeMap = [];
      if (type == "out") {
        // 流出
        for (let i = 0; i < data.length; i++) {
          if (data[0].name != data[i].name) {
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
      let myChart = echarts.init(document.querySelector("#data-map-v1"));

      // 样式配置
      let planePath = "arrow"; // 箭头样式，包括 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'
      let width = 1; // 线条宽度
      let curveness = 0.2; // 线条曲率
      let opacity = 0.4; // 线条透明度

      // 图表配置
      myChart.setOption(
        {
          // 地图
          geo: {
            map: "china",
            center: this.pointData[0].coord, // 地图中心
            roam: true, // 是否可拖动
            silent: true, // 是否禁用选中
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
              // 箭头的颜色
              effect: {
                show: true, // 是否显示特效
                period: 6, // 特效动画的时间，单位为 s
                trailLength: 0.1,
                symbol: planePath,
                symbolSize: 8,
                color: "HotPink"
              },
              // 标签
              label: {
                show: true,
                position: "middle",
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
                normal: {
                  color: "HotPink",
                  width: width,
                  opacity: opacity,
                  curveness: curveness
                }
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
                color: "aqua",
                symbol: planePath,
                symbolSize: 8
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
                normal: {
                  color: "aqua",
                  width: width,
                  opacity: opacity,
                  curveness: curveness
                }
              },
              zlevel: 2
            },
            // 点
            {
              type: "effectScatter",
              coordinateSystem: "geo",
              // 数据
              data: this.getPointCoord(this.pointData),
              // 波纹
              rippleEffect: {
                period: 5, // 动画的周期，秒数
                scale: 5, // 动画中波纹的最大缩放比例
                brushType: "fill" // 波纹的绘制方式，可选 'stroke' 和 'fill'
              },
              symbol: "circle", // 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'
              // 文字样式
              label: {
                show: true,
                position: "bottom",
                distance: 14,
                fontSize: 12,
                formatter: "{b}",
                emphasis: {
                  formatter: "{b}"
                }
              },
              // 点的大小
              symbolSize: 5,
              // 点的样式
              itemStyle: {
                normal: {
                  color: "white", // 颜色
                  borderColor: "blue" // 描边颜色
                }
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
<style lang="scss" scoped>
.map {
  &-wrap {
    height: calc(100vh - 61px);
    background: black;
  }
}
</style>
