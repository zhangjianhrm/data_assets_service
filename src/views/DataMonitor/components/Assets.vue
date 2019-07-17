<template>
  <div class="data-monitor__assets">
    <h5>
      <svg-icon icon-class="tit"></svg-icon>
      <span>数据资产</span>
      <i>本次统计截止到：2019-07-10 10:33:26</i>
    </h5>
    <div class="data-monitor__assets_rate">
      <div v-for="(item,index) in rate" :key="index">
        <p>{{item.name}}</p>
        <p>
          <b>{{item.rate * 100}}</b>
          <i>%</i>
        </p>
      </div>
    </div>
    <div class="data-monitor__assets_graph">
      <div class="data-monitor__assets_graph_title">
        <b>各部门数据变化趋势图</b>
        <el-radio-group v-model="radio" size="mini">
          <el-radio-button label="本周"></el-radio-button>
          <el-radio-button label="本月"></el-radio-button>
          <el-radio-button label="本年"></el-radio-button>
        </el-radio-group>
      </div>
      <div class="data-monitor__assets_graph_content"></div>
    </div>
  </div>
</template>
<script>
import load from "@/utils/load.js"; // 加载 Js
export default {
  name: "DataMonitorAssets",
  data() {
    return {
      rate: [
        { name: "活跃率", rate: "0.32" },
        { name: "覆盖率", rate: "0.32" },
        { name: "变更频率", rate: "0.32" }
      ],
      radio: "本周"
    };
  },
  async created() {
    await load(
      "https://echarts.baidu.com/gallery/vendors/echarts/echarts.min.js"
    );
    this.createGraph();
  },
  mounted() {},
  methods: {
    createGraph() {
      var dom = document.querySelector(".data-monitor__assets_graph_content");
      var myChart = echarts.init(dom);
      var base = +new Date(2016, 9, 3);
      var oneDay = 24 * 3600 * 1000;
      var valueBase = Math.random() * 300;
      var valueBase2 = Math.random() * 50;
      var data = [];
      var data2 = [];

      for (var i = 1; i < 10; i++) {
        var now = new Date((base += oneDay));
        var dayStr = [
          now.getFullYear(),
          now.getMonth() + 1,
          now.getDate()
        ].join("-");

        valueBase = Math.round((Math.random() - 0.5) * 20 + valueBase);
        valueBase <= 0 && (valueBase = Math.random() * 300);
        data.push([dayStr, valueBase]);

        valueBase2 = Math.round((Math.random() - 0.5) * 20 + valueBase2);
        valueBase2 <= 0 && (valueBase2 = Math.random() * 50);
        data2.push([dayStr, valueBase2]);
      }

      let option = {
        animation: false,
        legend: {
          top: "bottom",
          data: ["意向"]
        },
        tooltip: {
          triggerOn: "none",
          position: function(pt) {
            return [pt[0], 130];
          }
        },
        // 图例组件。
        legend: {
          itemWidth: 8,
          itemHeight: 8,
          textStyle: {
            color: "#fff",
            fontSize: "10"
          },
          // data: this.systemName,
          show: true
        },
        grid: {
          containLabel: true,
          top: 20,
          right: 20,
          left: 0,
          bottom: 0
        },
        xAxis: {
          type: "time",
          // 坐标轴轴线相关设置。
          axisLine: {
            show: false,
            lineStyle: {
              color: "rgba(255, 255, 255, 0.3)"
            }
          },
          splitLine: {
            show: false
          }
        },
        yAxis: {
          type: "value",
          // 坐标轴刻度
          axisTick: {
            show: false
          },
          // 坐标轴轴线相关设置。
          axisLine: {
            show: false,
            lineStyle: {
              color: "rgba(255, 255, 255, 0.3)"
            }
          },
          // 坐标轴在 grid 区域中的分隔线。
          splitLine: {
            show: true,
            lineStyle: { color: "rgba(255, 255, 255, 0.1)" }
          },
          axisLabel: {
            inside: false,
            formatter: "{value}\n"
          },
          z: 10
        },
        series: [
          {
            name: "模拟数据1",
            type: "line",
            smooth: true,
            symbol: "circle",
            symbolSize: 5,
            sampling: "average",
            itemStyle: {
              normal: {
                color: "rgba(98, 202, 255, 1)"
              }
            },
            stack: "a",
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "rgba(22, 115, 217, 0.5)"
                  },
                  {
                    offset: 1,
                    color: "rgba(22, 115, 217, 0.1)"
                  }
                ])
              }
            },
            data: data
          },
          {
            name: "模拟数据2",
            type: "line",
            smooth: true,
            stack: "a",
            symbol: "circle",
            symbolSize: 5,
            sampling: "average",
            itemStyle: {
              normal: {
                color: "rgba(98, 202, 255, 1)"
              }
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "rgba(31, 153, 120, 0.5)"
                  },
                  {
                    offset: 1,
                    color: "rgba(31, 153, 120, 0.1)"
                  }
                ])
              }
            },
            data: data2
          }
        ]
      };

      if (option && typeof option === "object") {
        myChart.setOption(option, true);
      }
    }
  }
};
</script>
<style lang="scss">
@import "~@/styles/variables.scss";
.data-monitor__assets {
  width: 350px;
  height: 290px;
  border: 2px solid rgba(32, 82, 160, 1);
  background: linear-gradient(rgba(11, 1, 52, 0), rgba(23, 41, 77, 1));
  color: #fff;
  box-sizing: border-box;
  padding: 14px;
  margin-bottom: 20px;
  > h5 {
    height: 12px;
    line-height: 1;
    font-size: 12px;
    margin-bottom: 10px;
    svg {
      margin-right: 4px;
    }
    span {
      color: rgba(41, 193, 204, 1);
    }
    i {
      float: right;
      font-style: normal;
      font-weight: normal;
      opacity: 0.3;
    }
  }
  &_rate {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    margin-bottom: 10px;
    > div:nth-child(1) {
      b {
        font-size: 20px;
        color: rgba(22, 115, 217, 1);
      }
    }
    > div:nth-child(2) {
      b {
        font-size: 20px;
        color: rgba(204, 112, 41, 1);
      }
    }
    > div:nth-child(3) {
      b {
        font-size: 20px;
        color: rgba(31, 153, 120, 1);
      }
    }
  }
  &_graph {
    &_title {
      margin-bottom: 10px;
      b {
        font-size: 14px;
      }
      .el-radio-group {
        float: right;
      }
    }
    &_content {
      height: 160px;
    }
  }
}
</style>
