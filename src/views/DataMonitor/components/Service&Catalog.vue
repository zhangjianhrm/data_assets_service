<template>
  <div class="data-monitor__service-catalog">
    <el-carousel
      height="310px"
      arrow="never"
      indicator-position="outside"
      trigger="click"
      :autoplay="true"
    >
      <el-carousel-item class="data-monitor__catalog">
        <h5>
          <svg-icon icon-class="tit"></svg-icon>
          <span>信息标准</span>
        </h5>
        <div class="data-monitor__catalog_info">
          <div>
            <h3>54/56</h3>
            <p>执行标准</p>
            <p>（代码/模型）</p>
          </div>
          <div>
            <h3>54/56</h3>
            <p>采标率</p>
            <p>（代码/模型）</p>
          </div>
          <div>
            <h3>54/56</h3>
            <p>标准规范</p>
          </div>
        </div>
        <h5>
          <svg-icon icon-class="tit"></svg-icon>
          <span>数据目录</span>
        </h5>
        <div class="data-monitor__catalog_catalog">
          <div v-for="(item,index) in rate" :key="index">
            <p>
              <b></b>
              <span>{{item.name}}</span>
            </p>
            <h3>{{item.rate | formatNum}}</h3>
          </div>
          <section class="data-monitor__catalog_catalog_pie"></section>
        </div>
      </el-carousel-item>
      <el-carousel-item class="data-monitor__service">
        <h5>
          <svg-icon icon-class="tit"></svg-icon>
          <span>数据服务</span>
        </h5>
        <div class="data-monitor__service_count">
          <div class="data-monitor__service_count_item" v-for="item in 4" :key="item">
            <p>
              <b></b>
              <span>总数</span>
            </p>
            <h3>{{234345 | formatNum}}</h3>
          </div>
        </div>
        <div class="data-monitor__service_graph">
          <div class="data-monitor__service_graph_title">
            <b>各部门API数量趋势</b>
            <el-radio-group v-model="radio" size="mini">
              <el-radio-button label="本周"></el-radio-button>
              <el-radio-button label="本月"></el-radio-button>
              <el-radio-button label="本年"></el-radio-button>
            </el-radio-group>
          </div>
          <div class="data-monitor__service_graph_content"></div>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script>
import load from "@/utils/load.js"; // 加载 Js
export default {
  data() {
    return {
      radio: "本周",
      rate: [
        { name: "总数", rate: 15655 },
        { name: "下载次数", rate: 12345 },
        { name: "申请", rate: 12346 },
        { name: "纠错", rate: 2366 }
      ]
    };
  },
  async created() {
    await load(
      "https://echarts.baidu.com/gallery/vendors/echarts/echarts.min.js"
    );
    this.createPie();
    this.createGraph();
  },
  mounted() {},
  methods: {
    createPie() {
      let dom = document.querySelector(".data-monitor__catalog_catalog_pie");
      let myChart = echarts.init(dom);
      let option = {
        tooltip: {
          trigger: "item",
          // formatter: "{d}%"
          formatter: "{c}"
        },
        legend: {
          right: 0,
          orient: "vertical",
          itemWidth: 8,
          itemHeight: 8,
          // borderRadius: 20,
          height: 40,
          textStyle: {
            color: "#fff",
            fontSize: "10"
          },
          data: ["人事部", "财务部", "教务处", "后勤部"]
        },
        calculable: true,
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: ["50%", "70%"],
            center: ["30%", "50%"],
            color: ["#992E2E", "#3F64D1", "#2E997C", "#B39C36"],
            avoidLabelOverlap: false,
            label: {
              show: true,
              color: "#fff",
              formatter: "{c}",
              position: "inside"
            },
            data: [
              { value: 335, name: "人事部" },
              { value: 310, name: "财务部" },
              { value: 234, name: "教务处" },
              { value: 135, name: "后勤部" }
            ]
          }
        ]
      };
      myChart.setOption(option, true);
    },
    createGraph() {
      var dom = document.querySelector(".data-monitor__service_graph_content");
      var myChart = echarts.init(dom);

      let option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: "#999"
            }
          }
        },
        grid: {
          containLabel: true,
          right: 0,
          bottom: 0,
          left: 0
        },
        legend: {
          itemWidth: 8,
          itemHeight: 8,
          textStyle: {
            color: "#fff",
            fontSize: "10"
          },
          data: ["当日", "环比", "增长率"]
        },
        xAxis: [
          {
            type: "category",
            data: [
              "1月",
              "2月",
              "3月",
              "4月",
              "5月",
              "6月",
              "7月",
              "8月",
              "9月",
              "10月",
              "11月",
              "12月"
            ],
            axisLine: {
              show: false,
              lineStyle: {
                color: "rgba(255, 255, 255, 0.3)"
              }
            },
            axisPointer: {
              type: "shadow"
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            name: "API 数量",
            min: 0,
            max: 250,
            interval: 50,
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
            }
            // axisLabel: {
            //   formatter: "{value} "
            // }
          },
          {
            type: "value",
            name: "增长率",
            // min: 0,
            // max: 100,
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
          }
        ],
        series: [
          {
            name: "当日",
            type: "bar",
            itemStyle: {
              color: "rgba(63, 100, 209, 1)"
            },
            data: [
              2.0,
              4.9,
              7.0,
              23.2,
              25.6,
              76.7,
              135.6,
              162.2,
              32.6,
              20.0,
              6.4,
              3.3
            ]
          },
          {
            name: "环比",
            type: "bar",
            itemStyle: {
              color: "rgba(204, 112, 41, 1)"
            },
            data: [
              2.6,
              5.9,
              9.0,
              26.4,
              28.7,
              70.7,
              175.6,
              182.2,
              48.7,
              18.8,
              6.0,
              2.3
            ]
          },
          {
            name: "增长率",
            type: "line",
            itemStyle: {
              color: "rgba(31, 153, 120, 1)"
            },
            yAxisIndex: 1,
            data: [
              2.0,
              2.2,
              3.3,
              4.5,
              6.3,
              10.2,
              -20.3,
              23.4,
              23.0,
              16.5,
              12.0,
              6.2
            ]
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
.data-monitor__service-catalog {
  width: 350px;
  height: 348px;
  background: linear-gradient(rgba(11, 1, 52, 0.5), rgba(23, 41, 77, 1));
  border: 2px solid rgba(32, 82, 160, 1);
  color: #fff;
  box-sizing: border-box;
  padding: 14px;
  margin-bottom: 20px;
  
  .el-carousel__indicator--horizontal {
    padding: 4px 4px;
  }
}
.data-monitor__catalog {
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
  }
  &_info {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    > div {
      h3 {
        font-size: 20px;
        line-height: 1;
        text-align: center;
        margin-bottom: 8px;
      }
      p {
        font-size: 12px;
        line-height: 1;
        text-align: center;
        margin-bottom: 4px;
      }
    }
    > div:nth-child(1) {
      h3 {
        color: rgba(46, 153, 124, 1);
      }
    }
    > div:nth-child(2) {
      h3 {
        color: rgba(179, 108, 54, 1);
      }
    }
    > div:nth-child(3) {
      h3 {
        color: rgba(63, 100, 209, 1);
      }
    }
  }
  &_catalog {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    font-size: 12px;
    margin-bottom: 10px;
    > div {
      width: 50%;
      margin-bottom: 10px;
      p {
        font-size: 12px;
        line-height: 1;
        margin-bottom: 4px;
        b {
          float: left;
          width: 8px;
          height: 8px;
          background: rgba(41, 193, 204, 1);
          border-radius: 50%;
          margin-top: 2px;
          margin-right: 4px;
        }
      }
      h3 {
        font-size: 20px;
        color: rgba(41, 193, 204, 1);
      }
    }
    &_pie {
      width: 100%;
      height: 80px;
    }
  }
}
.data-monitor__service {
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
  }
  &_count {
    &_item {
      width: 50%;
      float: left;
      margin-bottom: 14px;
      p {
        height: 12px;
        font-size: 12px;
        line-height: 1;
        margin-bottom: 4px;
        b {
          float: left;
          width: 8px;
          height: 8px;
          background: rgba(41, 193, 204, 1);
          border-radius: 50%;
          margin-top: 2px;
          margin-right: 4px;
        }
      }
      h3 {
        height: 18px;
        font-size: 18px;
        line-height: 1;
        color: rgba(41, 193, 204, 1);
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
