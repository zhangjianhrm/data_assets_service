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

      let option = {
        legend: {
          left: 0,
          itemWidth: 8,
          itemHeight: 8,
          textStyle: {
            color: "#fff",
            fontSize: "10"
          },
          data: ["活跃率", "覆盖率", "变更频率"]
        },
        grid: {
          containLabel: true,
          top: 35,
          left: 0,
          right: 0,
          bottom: 0
        },
        xAxis: {
          type: "category",
          // 坐标轴轴线相关设置。
          axisLine: {
            show: false,
            lineStyle: {
              color: "rgba(255, 255, 255, 0.3)"
            }
          },
          splitLine: {
            show: false
          },
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        },
        yAxis: {
          type: "value",
          // name: "变更频率",
          // min: 0,
          // max: 25,
          // interval: 5,
          // 坐标轴刻度
          axisTick: {
            show: false
          },
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
            formatter: "{value} %"
          }
        },
        series: [
          {
            name: "活跃率",
            data: [82, 32, 91, 34, 90, 30, 20],
            type: "line",
            smooth: true,
            itemStyle: {
              color: "rgba(22, 115, 217, 1)"
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgba(22, 115, 217, 1)"
                },
                {
                  offset: 1,
                  color: "rgba(22, 115, 217, 0)"
                }
              ])
            },
            symbol: "none"
          },
          {
            name: "覆盖率",
            data: [45, 74, 34, 66, 23, 45, 94],
            type: "line",
            smooth: true,
            itemStyle: {
              color: "rgba(204, 112, 41, 1)"
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgba(204, 112, 41, 1)"
                },
                {
                  offset: 1,
                  color: "rgba(204, 112, 41, 0)"
                }
              ])
            },
            symbol: "none"
          },
          {
            name: "变更频率",
            data: [55, 30, 24, 56, 22, 34, 34],
            type: "line",
            smooth: true,
            itemStyle: {
              color: "rgba(31, 153, 120, 1)"
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgba(31, 153, 120, 1)"
                },
                {
                  offset: 1,
                  color: "rgba(31, 153, 120, 0)"
                }
              ])
            },
            symbol: "none"
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
