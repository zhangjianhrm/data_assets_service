<template>
  <div class="data-monitor__bottom">
    <h5 class="data-monitor__bottom_title">
      <svg-icon icon-class="silk"></svg-icon>
      <span>数据预警</span>
      <svg-icon icon-class="silk"></svg-icon>
      <div class="data-monitor__bottom_title_light"></div>
    </h5>
    <el-radio-group v-model="radio" size="mini">
      <el-radio-button label="基础监控"></el-radio-button>
      <el-radio-button label="数据交换"></el-radio-button>
      <el-radio-button label="数据服务"></el-radio-button>
      <el-radio-button label="数据目录"></el-radio-button>
      <el-radio-button label="数据质量"></el-radio-button>
    </el-radio-group>
    <el-carousel
      ref="carousel"
      height="130px"
      style="width:550px;"
      arrow="never"
      indicator-position="none"
      :interval="5000"
      @change="carouselChange"
    >
      <el-carousel-item>
        <div class="data-monitor__bottom_base" v-show="radio == '基础监控'">
          <div class="data-monitor__bottom_base_1"></div>
          <!-- <div class="data-monitor__bottom_base_1-data">
        <p>数据连接数1524/54356</p>
        <p>数据连接数1524/54356</p>
        <p>数据连接数1524/54356</p>
          </div>-->
          <div class="data-monitor__bottom_base_2"></div>
        </div>
      </el-carousel-item>
      <el-carousel-item>
        <div class="data-monitor__bottom_exchange">
          <h6>
            <span>异常作业列表</span>
            <span>
              <i>查看更多</i>
              <i class="el-icon-d-arrow-right"></i>
            </span>
          </h6>
          <el-row>
            <el-col :span="5">作业名</el-col>
            <el-col :span="5">源-目标系统</el-col>
            <el-col :span="5">上次执行时间</el-col>
            <el-col :span="5">计划下次执行时间</el-col>
            <el-col :span="4">运行摘要信息</el-col>
          </el-row>
          <el-row v-for="(item,index) in exchangeTable" :key="index">
            <el-col :span="5">{{index+1}}.{{item.name}}</el-col>
            <el-col :span="5">{{item.grade}}</el-col>
            <el-col :span="5">{{item.total}}</el-col>
            <el-col :span="5">{{item.untreated}}</el-col>
            <el-col :span="4">{{item.rate}}</el-col>
          </el-row>
        </div>
      </el-carousel-item>
      <el-carousel-item>
        <div class="data-monitor__bottom_service">
          <div class="data-monitor__bottom_service_overview">
            <p>
              <span>调用失败</span>
              <b>15</b>
            </p>
            <p>
              <span>调用失败</span>
              <b>15</b>
            </p>
            <p>
              <span>调用失败</span>
              <b>15</b>
            </p>
            <p>
              <span>纠错</span>
              <b>15</b>
            </p>
          </div>
          <div class="data-monitor__bottom_service_graph"></div>
        </div>
      </el-carousel-item>
      <el-carousel-item>
        <div class="data-monitor__bottom_catalog">
          <div class="data-monitor__bottom_catalog_overview">
            <p>3</p>
            <p>新增</p>
            <p>5</p>
            <p>申请</p>
          </div>
          <div class="data-monitor__bottom_catalog_overview">
            <p>3</p>
            <p>下载</p>
            <p>5</p>
            <p>纠错</p>
          </div>
          <div class="data-monitor__bottom_catalog_graph"></div>
        </div>
      </el-carousel-item>
      <el-carousel-item>
        <div class="data-monitor__bottom_quality">
          <div class="data-monitor__bottom_quality_overview">
            <p>3</p>
            <p>异常</p>
            <p>5</p>
            <p>告警</p>
          </div>
          <div class="data-monitor__bottom_quality_graph"></div>
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
      radio: "基础监控",
      // 数据交换
      exchangeTable: [
        {
          name: "字段处理测试",
          grade: "共享库-宿舍系统",
          total: "2019-7-18 09:24",
          untreated: "2019-7-18 09:24",
          rate: "运行失败"
        },
        {
          name: "字段处理测试",
          grade: "共享库-宿舍系统",
          total: "2019-7-18 09:24",
          untreated: "2019-7-18 09:24",
          rate: "运行失败"
        },
        {
          name: "字段处理测试",
          grade: "共享库-宿舍系统",
          total: "2019-7-18 09:24",
          untreated: "2019-7-18 09:24",
          rate: "运行失败"
        }
      ]
    };
  },
  async created() {
    await load(
      "https://echarts.baidu.com/gallery/vendors/echarts/echarts.min.js"
    );
    this.createGauge1();
    this.createGauge2();
    this.createServiceGraph();
    this.createCatalogGraph();
    this.createQualityGraph();
  },
  mounted() {},
  methods: {
    createGauge1() {
      let dom = document.querySelector(".data-monitor__bottom_base_1");
      let myChart = echarts.init(dom);
      let option = {
        series: [
          // 中间
          {
            type: "gauge",
            radius: "60%",
            startAngle: 200,
            endAngle: -20,
            // 仪表盘轴线
            axisLine: {
              show: false,
              lineStyle: {
                width: 0,
                color: [[1, "#B36C36"]]
              }
            },
            // 仪表盘数字
            axisLabel: {
              show: true,
              color: "#B36C36",
              distance: 0,
              fontSize: 6
            },
            // 小刻度
            axisTick: {
              show: true,
              length: 4,
              lineStyle: {
                color: "#B36C36", //用颜色渐变函数不起作用
                width: 1
              }
            },
            // 大刻度
            splitLine: {
              show: true,
              length: 6,
              lineStyle: {
                color: "#B36C36", //用颜色渐变函数不起作用
                width: 1.5
              }
            },
            // 显示数据
            detail: {
              formatter: "{value}%",
              offsetCenter: [0, "60%"],
              textStyle: {
                fontSize: 18,
                color: "#fff"
              }
            },
            data: [
              {
                value: 50,
                name: "表空间使用率"
              }
            ],
            title: {
              show: true,
              offsetCenter: [0, "100%"],
              color: "#fff",
              fontSize: 12
            },
            pointer: {
              show: true,
              length: "80%",
              width: 2
            }
          },
          {
            type: "gauge",
            radius: "30%",
            startAngle: 200,
            endAngle: -20,
            axisLine: {
              lineStyle: {
                color: [[1, "#B36C36"]],
                width: 1.5
              }
            },
            axisLabel: {
              show: false
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: false
            },
            itemStyle: {
              show: false
            },
            detail: {
              show: false
            },
            pointer: {
              show: false
            }
          },
          // 左侧
          {
            type: "gauge",
            radius: "60%",
            center: ["17%", "50%"],
            startAngle: 200,
            endAngle: -20,
            // 仪表盘轴线
            axisLine: {
              show: false,
              lineStyle: {
                width: 0,
                color: [[1, "#2E997C"]]
              }
            },
            // 仪表盘数字
            axisLabel: {
              show: true,
              color: "#2E997C",
              distance: 0,
              fontSize: 6
            },
            // 小刻度
            axisTick: {
              show: true,
              length: 4,
              lineStyle: {
                color: "#2E997C", //用颜色渐变函数不起作用
                width: 1
              }
            },
            // 大刻度
            splitLine: {
              show: true,
              length: 6,
              lineStyle: {
                color: "#2E997C", //用颜色渐变函数不起作用
                width: 1.5
              }
            },
            // 显示数据
            detail: {
              formatter: "{value}%",
              offsetCenter: [0, "60%"],
              textStyle: {
                fontSize: 18,
                color: "#fff"
              }
            },
            data: [
              {
                value: 30,
                name: "连接数占比"
              }
            ],
            title: {
              show: true,
              offsetCenter: [0, "100%"],
              color: "#fff",
              fontSize: 12
            },
            pointer: {
              show: true,
              length: "80%",
              width: 2
            }
          },
          {
            center: ["17%", "50%"],
            type: "gauge",
            radius: "30%",
            startAngle: 200,
            endAngle: -20,
            axisLine: {
              lineStyle: {
                color: [[1, "#2E997C"]],
                width: 1.5
              }
            },
            axisLabel: {
              show: false
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: false
            },
            itemStyle: {
              show: false
            },
            detail: {
              show: false
            },
            pointer: {
              show: false
            }
          },
          // 右侧
          {
            center: ["83%", "50%"],
            type: "gauge",
            radius: "60%",
            startAngle: 200,
            endAngle: -20,
            // 仪表盘轴线
            axisLine: {
              show: false,
              lineStyle: {
                width: 0,
                color: [[1, "#3F64D1"]]
              }
            },
            // 仪表盘数字
            axisLabel: {
              show: true,
              color: "#3F64D1",
              distance: 0,
              fontSize: 6
            },
            // 小刻度
            axisTick: {
              show: true,
              length: 4,
              lineStyle: {
                color: "#3F64D1", //用颜色渐变函数不起作用
                width: 1
              }
            },
            // 大刻度
            splitLine: {
              show: true,
              length: 6,
              lineStyle: {
                color: "#3F64D1", //用颜色渐变函数不起作用
                width: 1.5
              }
            },
            // 显示数据
            detail: {
              formatter: "{value}%",
              offsetCenter: [0, "60%"],
              textStyle: {
                fontSize: 18,
                color: "#fff"
              }
            },
            data: [
              {
                value: 70,
                name: "死锁率"
              }
            ],
            title: {
              show: true,
              offsetCenter: [0, "100%"],
              color: "#fff",
              fontSize: 12
            },
            pointer: {
              show: true,
              length: "80%",
              width: 2
            }
          },
          {
            center: ["83%", "50%"],
            type: "gauge",
            radius: "30%",
            startAngle: 200,
            endAngle: -20,
            axisLine: {
              lineStyle: {
                color: [[1, "#3F64D1"]],
                width: 1.5
              }
            },
            axisLabel: {
              show: false
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: false
            },
            itemStyle: {
              show: false
            },
            detail: {
              show: false
            },
            pointer: {
              show: false
            }
          }
        ]
      };
      myChart.setOption(option, true);
    },
    createGauge2() {
      let dom = document.querySelector(".data-monitor__bottom_base_2");
      let myChart = echarts.init(dom);
      let option = {
        series: [
          // 中间
          {
            type: "gauge",
            radius: "60%",
            startAngle: 200,
            endAngle: -20,
            // 仪表盘轴线
            axisLine: {
              show: false,
              lineStyle: {
                width: 0,
                color: [[1, "#B36C36"]]
              }
            },
            // 仪表盘数字
            axisLabel: {
              show: true,
              color: "#B36C36",
              distance: 0,
              fontSize: 6
            },
            // 小刻度
            axisTick: {
              show: true,
              length: 4,
              lineStyle: {
                color: "#B36C36", //用颜色渐变函数不起作用
                width: 1
              }
            },
            // 大刻度
            splitLine: {
              show: true,
              length: 6,
              lineStyle: {
                color: "#B36C36", //用颜色渐变函数不起作用
                width: 1.5
              }
            },
            // 显示数据
            detail: {
              formatter: "{value}%",
              offsetCenter: [0, "60%"],
              textStyle: {
                fontSize: 18,
                color: "#fff"
              }
            },
            data: [
              {
                value: 50,
                name: "内存使用率"
              }
            ],
            title: {
              show: true,
              offsetCenter: [0, "100%"],
              color: "#fff",
              fontSize: 12
            },
            pointer: {
              show: true,
              length: "80%",
              width: 2
            }
          },
          {
            type: "gauge",
            radius: "30%",
            startAngle: 200,
            endAngle: -20,
            axisLine: {
              lineStyle: {
                color: [[1, "#B36C36"]],
                width: 1.5
              }
            },
            axisLabel: {
              show: false
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: false
            },
            itemStyle: {
              show: false
            },
            detail: {
              show: false
            },
            pointer: {
              show: false
            }
          },
          // 左侧
          {
            type: "gauge",
            radius: "60%",
            center: ["17%", "50%"],
            startAngle: 200,
            endAngle: -20,
            // 仪表盘轴线
            axisLine: {
              show: false,
              lineStyle: {
                width: 0,
                color: [[1, "#2E997C"]]
              }
            },
            // 仪表盘数字
            axisLabel: {
              show: true,
              color: "#2E997C",
              distance: 0,
              fontSize: 6
            },
            // 小刻度
            axisTick: {
              show: true,
              length: 4,
              lineStyle: {
                color: "#2E997C", //用颜色渐变函数不起作用
                width: 1
              }
            },
            // 大刻度
            splitLine: {
              show: true,
              length: 6,
              lineStyle: {
                color: "#2E997C", //用颜色渐变函数不起作用
                width: 1.5
              }
            },
            // 显示数据
            detail: {
              formatter: "{value}%",
              offsetCenter: [0, "60%"],
              textStyle: {
                fontSize: 18,
                color: "#fff"
              }
            },
            data: [
              {
                value: 30,
                name: "CPU 使用率"
              }
            ],
            title: {
              show: true,
              offsetCenter: [0, "100%"],
              color: "#fff",
              fontSize: 12
            },
            pointer: {
              show: true,
              length: "80%",
              width: 2
            }
          },
          {
            center: ["17%", "50%"],
            type: "gauge",
            radius: "30%",
            startAngle: 200,
            endAngle: -20,
            axisLine: {
              lineStyle: {
                color: [[1, "#2E997C"]],
                width: 1.5
              }
            },
            axisLabel: {
              show: false
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: false
            },
            itemStyle: {
              show: false
            },
            detail: {
              show: false
            },
            pointer: {
              show: false
            }
          },
          // 右侧
          {
            center: ["83%", "50%"],
            type: "gauge",
            radius: "60%",
            startAngle: 200,
            endAngle: -20,
            // 仪表盘轴线
            axisLine: {
              show: false,
              lineStyle: {
                width: 0,
                color: [[1, "#3F64D1"]]
              }
            },
            // 仪表盘数字
            axisLabel: {
              show: true,
              color: "#3F64D1",
              distance: 0,
              fontSize: 6
            },
            // 小刻度
            axisTick: {
              show: true,
              length: 4,
              lineStyle: {
                color: "#3F64D1", //用颜色渐变函数不起作用
                width: 1
              }
            },
            // 大刻度
            splitLine: {
              show: true,
              length: 6,
              lineStyle: {
                color: "#3F64D1", //用颜色渐变函数不起作用
                width: 1.5
              }
            },
            // 显示数据
            detail: {
              formatter: "{value}%",
              offsetCenter: [0, "60%"],
              textStyle: {
                fontSize: 18,
                color: "#fff"
              }
            },
            data: [
              {
                value: 70,
                name: "硬盘使用率"
              }
            ],
            title: {
              show: true,
              offsetCenter: [0, "100%"],
              color: "#fff",
              fontSize: 12
            },
            pointer: {
              show: true,
              length: "80%",
              width: 2
            }
          },
          {
            center: ["83%", "50%"],
            type: "gauge",
            radius: "30%",
            startAngle: 200,
            endAngle: -20,
            axisLine: {
              lineStyle: {
                color: [[1, "#3F64D1"]],
                width: 1.5
              }
            },
            axisLabel: {
              show: false
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: false
            },
            itemStyle: {
              show: false
            },
            detail: {
              show: false
            },
            pointer: {
              show: false
            }
          }
        ]
      };
      myChart.setOption(option, true);
    },
    createServiceGraph() {
      let dom = document.querySelector(".data-monitor__bottom_service_graph");
      let myChart = echarts.init(dom);
      let option = {
        title: {
          text: "今日API调用趋势",
          left: 0,
          textStyle: {
            color: "#fff",
            fontSize: "12"
          }
        },
        legend: {
          right: 0,
          itemWidth: 8,
          itemHeight: 8,
          textStyle: {
            color: "#fff",
            fontSize: "10"
          },
          data: ["调用总数", "调用失败"]
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
          }
        },
        series: [
          {
            name: "调用总数",
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: "line",
            smooth: true,
            itemStyle: {
              color: "rgba(22, 115, 217, 1)"
            },
            symbol: "none"
          },
          {
            name: "调用失败",
            data: [645, 674, 134, 566, 223, 345, 345],
            type: "line",
            smooth: true,
            itemStyle: {
              color: "rgba(204, 112, 41, 1)"
            },
            symbol: "none"
          }
        ]
      };

      if (option && typeof option === "object") {
        myChart.setOption(option, true);
      }
    },
    createCatalogGraph() {
      let dom = document.querySelector(".data-monitor__bottom_catalog_graph");
      let myChart = echarts.init(dom);
      let option = {
        title: {
          text: "今日API调用趋势",
          left: 0,
          textStyle: {
            color: "#fff",
            fontSize: "12"
          }
        },
        legend: {
          right: 0,
          itemWidth: 8,
          itemHeight: 8,
          textStyle: {
            color: "#fff",
            fontSize: "10"
          },
          data: ["调用总数", "调用失败"]
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
          }
        },
        series: [
          {
            name: "调用总数",
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: "line",
            smooth: true,
            itemStyle: {
              color: "rgba(22, 115, 217, 1)"
            },
            symbol: "none"
          },
          {
            name: "调用失败",
            data: [645, 674, 134, 566, 223, 345, 345],
            type: "line",
            smooth: true,
            itemStyle: {
              color: "rgba(204, 112, 41, 1)"
            },
            symbol: "none"
          }
        ]
      };

      if (option && typeof option === "object") {
        myChart.setOption(option, true);
      }
    },
    createQualityGraph() {
      let dom = document.querySelector(".data-monitor__bottom_quality_graph");
      let myChart = echarts.init(dom);
      let option = {
        title: {
          text: "今日API调用趋势",
          left: 0,
          textStyle: {
            color: "#fff",
            fontSize: "12"
          }
        },
        legend: {
          right: 0,
          itemWidth: 8,
          itemHeight: 8,
          textStyle: {
            color: "#fff",
            fontSize: "10"
          },
          data: ["调用总数", "调用失败"]
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
          }
        },
        series: [
          {
            name: "调用总数",
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: "line",
            smooth: true,
            itemStyle: {
              color: "rgba(22, 115, 217, 1)"
            },
            symbol: "none"
          },
          {
            name: "调用失败",
            data: [645, 674, 134, 566, 223, 345, 345],
            type: "line",
            smooth: true,
            itemStyle: {
              color: "rgba(204, 112, 41, 1)"
            },
            symbol: "none"
          }
        ]
      };

      if (option && typeof option === "object") {
        myChart.setOption(option, true);
      }
    },
    carouselChange(a, b) {
      switch (a) {
        case 0:
          this.radio = "基础监控";
          break;
        case 1:
          this.radio = "数据交换";
          break;
        case 2:
          this.radio = "数据服务";
          break;
        case 3:
          this.radio = "数据目录";
          break;
        case 4:
          this.radio = "数据质量";
          break;
      }
    }
  },
  watch: {
    radio(a, b) {
      switch (a) {
        case "基础监控":
          this.$refs.carousel.setActiveItem(0);
          break;
        case "数据交换":
          this.$refs.carousel.setActiveItem(1);
          break;
        case "数据服务":
          this.$refs.carousel.setActiveItem(2);
          break;
        case "数据目录":
          this.$refs.carousel.setActiveItem(3);
          break;
        case "数据质量":
          this.$refs.carousel.setActiveItem(4);
          break;
      }
    }
  }
};
</script>
<style lang="scss">
@import "~@/styles/variables.scss";
.data-monitor__bottom {
  width: 100%;
  background-image: url("../../../assets/DataMonitor/monitor-bottom.svg");
  background-position: top center;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 10px;
  box-sizing: border-box;
  &_title {
    font-size: 14px;
    height: 14px;
    line-height: 1;
    color: rgba(216, 64, 64, 1);
    position: relative;
    overflow: hidden;
    animation: shine 1s ease-in-out infinite;
    margin-bottom: 10px;
    svg {
      width: 30px !important;
      height: 14px !important;
    }
    span {
      margin: 0 4px;
      font-weight: 600;
    }
    &_light {
      position: absolute;
      height: 40px;
      width: 50px;
      top: -10px;
      background: linear-gradient(
        to right,
        rgba(0, 0, 0, 0),
        rgba(22, 38, 75, 1),
        rgba(0, 0, 0, 0)
      );
      animation: scroll 1s ease-in-out infinite;
    }
  }
  .el-radio-group {
    margin-bottom: 10px;
  }
  &_base {
    width: 550px;
    display: flex;
    &_1,
    &_2 {
      width: 50%;
      height: 130px;
      &-data {
        display: flex;
        p {
          flex: 1;
          font-size: 12px;
          height: 12px;
          line-height: 1;
          color: #fff;
          text-align: center;
        }
      }
    }
  }
  &_exchange {
    width: 550px;
    height: 130px;
    font-size: 12px;
    color: #fff;
    > h6 {
      height: 12px;
      line-height: 1;
      font-size: 12px;
      margin-bottom: 10px;
      span:nth-child(1) {
        float: left;
      }
      span:nth-child(2) {
        float: right;
        color: rgba(255, 255, 255, 0.5);
        i {
          font-style: normal;
        }
      }
    }
    .el-row {
      line-height: 26px;
      font-weight: 600;
      color: rgba(255, 255, 255, 0.5);
      .el-col {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .el-col:nth-child(1) {
        padding-left: 6px;
      }
      .el-col:nth-last-child(1) {
        text-align: right;
        padding-right: 6px;
      }
    }
    .el-row:nth-child(2n-1) {
      background: rgba(0, 114, 201, 0.1);
    }
    .el-row:nth-child(2) {
      color: rgba(255, 255, 255, 1);
    }
  }
  &_service {
    width: 550px;
    overflow: hidden;
    &_overview {
      width: 100px;
      float: left;
      padding-top: 14px;
      p {
        font-size: 12px;
        line-height: 1;
        margin-bottom: 10px;
        span {
          margin-right: 10px;
          color: #fff;
          display: inline-block;
          width: 50px;
          text-align-last: justify;
        }
        b {
          font-size: 18px;
          color: rgba(41, 193, 204, 1);
        }
      }
      p:nth-child(1) {
        * {
          color: rgba(216, 64, 64, 1);
        }
      }
    }
    &_graph {
      width: 430px;
      height: 130px;
      float: right;
    }
  }
  &_catalog {
    width: 550px;
    overflow: hidden;
    &_overview {
      width: 40px;
      float: left;
      padding-top: 14px;
      height: 130px;
      background: rgba(9, 0, 41, 1);
      padding: 0 10px;
      // margin-right: 10px;
      p {
        text-align: center;
        font-size: 12px;
        line-height: 1;
      }
      p:nth-child(1) {
        color: rgba(41, 193, 204, 1);
        font-size: 20px;
        font-weight: 600;
        margin-top: 15px;
        margin-bottom: 5px;
      }
      p:nth-child(2) {
        color: #fff;
        border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        padding-bottom: 10px;
      }
      p:nth-child(3) {
        color: rgba(41, 193, 204, 1);
        font-size: 20px;
        font-weight: 600;
        padding-top: 10px;
        margin-bottom: 5px;
      }
      p:nth-child(4) {
        color: #fff;
      }
    }
    &_graph {
      float: right;
      width: 400px;
      height: 130px;
    }
  }
  &_quality {
    width: 550px;
    overflow: hidden;
    &_overview {
      width: 60px;
      float: left;
      padding-top: 14px;
      height: 100px;
      background: rgba(9, 0, 41, 1);
      padding: 10px;
      p {
        text-align: center;
        font-size: 12px;
        line-height: 1;
      }
      p:nth-child(1) {
        color: rgba(179, 108, 54, 1);
        font-size: 20px;
        font-weight: 600;
        margin-bottom: 5px;
      }
      p:nth-child(2) {
        color: rgba(179, 108, 54, 1);
        border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        padding-bottom: 10px;
      }
      p:nth-child(3) {
        color: rgba(216, 64, 64, 1);
        font-size: 20px;
        font-weight: 600;
        padding-top: 10px;
        margin-bottom: 5px;
      }
      p:nth-child(4) {
        color: rgba(216, 64, 64, 1);
      }
    }
    &_graph {
      width: 430px;
      height: 130px;
      float: right;
    }
  }
  @keyframes scroll {
    0% {
      transform: skewX(150deg) translateX(-50px);
    }
    100% {
      transform: skewX(150deg) translateX(100px);
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
  @media only screen and (min-width: 100px) and (max-width: 1365px) {
    height: 210px;
  }
  @media only screen and (min-width: 1366px) and (max-width: 1599px) {
    height: 210px;
  }
  @media only screen and (min-width: 1600px) and (max-width: 1919px) {
    height: 220px;
  }
  @media only screen and (min-width: 1920px) {
    height: 230px;
  }
  .el-carousel__indicator--horizontal {
    padding: 0 4px;
  }
}
</style>
