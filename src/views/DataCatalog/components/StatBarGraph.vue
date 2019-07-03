<template>
  <div class="stat-bar-graph">
    <p class="stat-bar-graph_title">下载次数与浏览次数统计</p>
    <!-- 轮播 -->
    <el-carousel class="stat-bar-graph_overview" arrow="never" height="100%">
      <el-carousel-item v-for="(item,index) in system" :key="index">
        <h3>{{ item.name }}</h3>
        <h2>{{ parseInt(item.rate[0]*100)+'%' }}</h2>
        <p>采标率</p>
        <section></section>
        <h2>{{ item.rank[0] }}</h2>
        <p>采标率排名</p>
      </el-carousel-item>
    </el-carousel>
    <!-- 图表 -->
    <div class="stat-bar-graph_bar-graph">
      <section class="stat-bar-graph_bar-graph_op">
        <div class="stat-bar-graph_bar-graph_op_date">
          <el-date-picker
            v-model="date"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            size="small"
            :picker-options="pickerOptions"
          ></el-date-picker>
        </div>
        <div class="stat-bar-graph_bar-graph_op_total">
          <p>
            <span>下载总次数：</span>
            <b>{{12345 | formatNum}}</b>
            <span>次</span>
          </p>
          <p>
            <span>浏览总次数：</span>
            <b>{{12345 | formatNum}}</b>
            <span>次</span>
          </p>
        </div>
        <div class="stat-bar-graph_bar-graph_op_legend">
          <span
            v-for="(item,index) in system"
            :key="index"
            @click="seriesToggle(item.name,index,$event)"
          >{{item.name}}</span>
        </div>
      </section>
      <div id="stat-bar-graph"></div>
    </div>
  </div>
</template>
<script>
import load from "@/utils/load"; // 加载 Js
import axios from "axios";
import url from "@/service.config";
export default {
  name: "StatBarGraph",
  props: {},
  data() {
    return {
      // 系统
      system: [
        {
          name: "下载次数",
          rate: [0.9, 0.8, 0.4, 0.5, 0.3, 0.2, 0.1, 0.2, 0.7, 0.1, 0.2, 0.2],
          rank: [20, 70, 40, 44, 20, 20, 10, 20, 20, 10, 20, 20]
        },
        {
          name: "调用次数",
          rate: [0.3, 0.8, 0.4, 0.5, 0.2, 0.2, 0.1, 0.2, 0.2, 0.1, 0.2, 0.2],
          rank: [20, 70, 40, 44, 20, 20, 10, 20, 20, 10, 20, 20]
        }
      ],
      dataCatalog: [
        { name: "xxxx1", download: 456, use: 3454 },
        { name: "xxxx2", download: 3454, use: 4556 },
        { name: "xxxx3", download: 3454, use: 555 },
        { name: "xxxx4", download: 456, use: 3454 },
        { name: "xxxx5", download: 4564, use: 3534 },
        { name: "xxxx6", download: 345, use: 456 },
        { name: "xxxx7", download: 3534, use: 55 },
        { name: "xxxx8", download: 3434, use: 3454 },
        { name: "xxxx9", download: 345, use: 456 },
        { name: "xxxx10", download: 3454, use: 5675 },
        { name: "xxxx11", download: 3434, use: 345 },
        { name: "xxxx12", download: 34344, use: 553 },
        { name: "xxxx13", download: 34, use: 55 },
        { name: "xxxx14", download: 3454, use: 3454 },
        { name: "xxxx15", download: 3453, use: 456 },
        { name: "xxxx15", download: 3453, use: 456 },
        { name: "xxxx16", download: 3534, use: 55 },
        { name: "xxxx17", download: 4564, use: 3534 },
        { name: "xxxx18", download: 345, use: 456 },
      ],
      // 颜色
      color: [
        {
          color: "rgba(50, 150, 250, 1)",
          borderColor: "rgba(27, 140, 253, 1)"
        },
        {
          color: "rgba(58, 38, 157, 1)",
          borderColor: "rgba(40, 20, 141, 1)"
        }
      ],
      // 宽度
      barWidth: [6, 6],
      borderWidth: [2, 2],
      // 日期选择器
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      date: ""
    };
  },
  async created() {
    await load(
      "https://echarts.baidu.com/gallery/vendors/echarts/echarts.min.js"
    );
    // await this.getRateData();
    await this.createBarGraph();
  },
  mounted() {},
  methods: {
    // 获取数据
    getRateData() {
      axios({
        url: url.getInfoStandard,
        timeout: 3000
      })
        .then(res => {
          this.system = res.data.system;
          this.createBarGraph();
          console.log(res);
        })
        .catch(err => {
          this.system = [
            {
              name: "人事系统",
              rate: [
                0.9,
                0.8,
                0.4,
                0.5,
                0.3,
                0.2,
                0.1,
                0.2,
                0.7,
                0.1,
                0.2,
                0.2
              ],
              rank: [20, 70, 40, 44, 20, 20, 10, 20, 20, 10, 20, 20]
            },
            {
              name: "教务系统",
              rate: [
                0.3,
                0.8,
                0.4,
                0.5,
                0.2,
                0.2,
                0.1,
                0.2,
                0.2,
                0.1,
                0.2,
                0.2
              ],
              rank: [20, 70, 40, 44, 20, 20, 10, 20, 20, 10, 20, 20]
            },
            {
              name: "财务系统",
              rate: [
                0.4,
                0.8,
                0.4,
                0.5,
                0.2,
                0.2,
                0.1,
                0.2,
                0.2,
                0.1,
                0.2,
                0.2
              ],
              rank: [20, 70, 40, 44, 20, 20, 10, 20, 20, 10, 20, 20]
            },
            {
              name: "后勤系统",
              rate: [
                0.5,
                0.8,
                0.4,
                0.5,
                0.2,
                0.2,
                0.1,
                0.2,
                0.2,
                0.1,
                0.2,
                0.2
              ],
              rank: [20, 70, 40, 44, 20, 20, 10, 20, 20, 10, 20, 20]
            }
          ];
          this.createBarGraph();
          this.$message.error("网络错误：" + err);
        });
    },
    // 计算系列列表
    returnSeries(type) {
      let series = [];
      for (let i = 0; i < this.dataCatalog.length; i++) {
        series.push(this.dataCatalog[i][type]);
      }
      return series;
    },
    // 创建条形图
    createBarGraph() {
      // eslint-disable-next-line
      let statBarGraph = echarts.init(
        document.querySelector("#stat-bar-graph")
      );
      // 跳转
      statBarGraph.on("click", params => {
        console.log(params);
        this.$router.push({
          name: "RatePage",
          params: {
            name: params.seriesName,
            month: params.name,
            year: this.currentYear
          }
        });
      });
      // 配置
      statBarGraph.setOption(
        {
          // 提示框组件
          tooltip: {
            trigger: "item",
            axisPointer: {
              // 坐标轴指示器，坐标轴触发有效
              type: "line" // 默认为直线，可选为：'line' | 'shadow'
            },
            backgroundColor: "rgba(255, 255, 255, 1)",
            textStyle: {
              color: "rgba(12, 0, 53, 1)"
            },
            extraCssText: "box-shadow: 0px 2px 6px 0px rgba(0,0,0,0.3)",
            formatter: params => {
              return (
                params.seriesName +
                "<br><i style='display:inline-block;width:8px;height:8px;background:" +
                params.color +
                ";border-radius:50%;'></i>" +
                "<span style='margin-left:4px;'>" +
                params.name +
                "：</span>" +
                params.value
              );
            }
          },
          // 图例组件。
          legend: {
            show: false
          },
          // 直角坐标系内绘图网格，单个 grid 内最多可以放置上下两个 X 轴，左右两个 Y 轴。
          grid: {
            top: "20",
            right: "10",
            // bottom: "0",
            left: "0",
            containLabel: true
          },
          xAxis: [
            {
              type: "category",
              axisLine: {
                show: false,
                lineStyle: {
                  color: "rgba(12, 0, 53, 0.4)"
                }
              },
              show: true,
              axisTick: { show: false },
              data: this.returnSeries("name")
            }
          ],
          yAxis: [
            {
              type: "value",
              axisLine: {
                show: false,
                lineStyle: {
                  color: "rgba(12, 0, 53, 0.4)"
                }
              },
              // 坐标轴刻度相关设置。
              axisTick: {
                show: false
              },
              // 坐标轴在 grid 区域中的分隔线。
              splitLine: {
                show: true,
                lineStyle: { color: "rgba(12, 0, 53, 0.1)" }
              },
              splitArea: { show: false },
              inverse: false
            }
          ],
          dataZoom: [
            {
              type: "slider",
              show: true,
              start: 0,
              end: 50,
              showDetail: false,
              bottom: 0
            }
          ],
          series: [
            {
              type: "bar",
              itemStyle: {
                color: this.color[0].color,
                borderColor: this.color[0].borderColor,
                borderWidth: this.borderWidth[0]
              },
              barWidth: this.barWidth[0],
              barGap: "100%",
              name: "下载次数",
              data: this.returnSeries("download")
            },
            {
              type: "bar",
              itemStyle: {
                color: this.color[1].color,
                borderColor: this.color[1].borderColor,
                borderWidth: this.borderWidth[1]
              },
              barWidth: this.barWidth[1],
              barGap: "100%",
              name: "调用次数",
              data: this.returnSeries("use")
            }
          ]
        },
        true
      );
    },
    // 某一系统开关
    seriesToggle(item, index, eve) {
      if (this.barWidth[index] == 6) {
        this.$set(this.barWidth, index, -0.001);
        this.$set(this.borderWidth, index, 0);
        eve.target.style = "opacity:0.3;";
      } else {
        this.$set(this.barWidth, index, 6);
        this.$set(this.borderWidth, index, 2);
        eve.target.style = "opacity:1;";
      }
      this.createBarGraph();
    }
  }
};
</script>
<style lang="scss">
@import "~@/styles/variables.scss";
.stat-bar-graph {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  background: rgb(250, 250, 250);
  padding: 37px 0 129px;
  &_title {
    width: 100%;
    text-align: center;
    font-size: 30px;
    font-weight: bold;
    line-height: 42px;
    color: $color-header;
    margin-bottom: 56px;
  }
  &_overview {
    width: 150px;
    height: 406px;
    background: $color-footer;
    margin-right: 50px;
    padding: 15px 20px;
    h3 {
      color: #fff;
    }
    h2 {
      font-size: 28px;
      font-weight: 400;
      color: rgba(255, 113, 107, 1);
      line-height: 40px;
      text-align: center;
    }
    h2:nth-child(2) {
      margin-top: 80px;
    }
    section {
      margin-top: 40px;
      background: #fff;
      height: 2px;
      opacity: 0.4;
    }
    h2:nth-child(5) {
      margin-top: 48px;
    }
    p {
      text-align: center;
      line-height: 22px;
      font-size: 16px;
      font-weight: 500;
      color: #fff;
      opacity: 0.6;
    }
    .el-carousel__button {
      width: 10px;
      height: 10px;
      border-radius: 50%;
    }
  }
  &_bar-graph {
    position: relative;
    width: 1040px;
    &_op {
      z-index: 2;
      position: relative;
      // width: 100%;
      overflow: hidden;
      &_date {
        width: 100%;
        margin-bottom: 18px;
      }
      &_total {
        height: 22px;
        float: left;
        overflow: hidden;
        p {
          float: left;
          line-height: 22px;
          margin-right: 30px;
          color: $color-header;
          span {
            font-size: 14px;
          }
          b {
            font-size: 22px;
            margin: 0 3px;
          }
        }
      }
      &_legend {
        float: right;
        overflow: hidden;
        > span {
          float: left;
          line-height: 32px;
          margin-right: 18px;
          color: rgba(12, 0, 53, 0.4);
          font-size: 14px;
          cursor: pointer;
          user-select: none;
          &::before {
            content: "";
            float: left;
            box-sizing: border-box;
            width: 14px;
            height: 14px;
            margin-right: 8px;
            margin-top: 9px;
          }
          &:nth-child(1) {
            &::before {
              background: rgba(50, 150, 250, 1);
              border: 2px solid rgba(27, 140, 253, 1);
            }
          }
          &:nth-child(2) {
            &::before {
              background: rgba(58, 38, 157, 1);
              border: 2px solid rgba(40, 20, 141, 1);
            }
          }
          &:nth-child(3) {
            &::before {
              background: rgba(68, 78, 138, 1);
              border: 2px solid rgba(39, 48, 117, 1);
            }
          }
          &:nth-child(4) {
            &::before {
              background: rgba(255, 183, 92, 1);
              border: 2px solid rgba(246, 168, 70, 1);
            }
          }
        }
      }
    }
    #stat-bar-graph {
      width: 100%;
      height: 400px - 36px - 10px;
      // position: absolute;
      // top: 36px;
      z-index: 1;
      overflow: hidden;
    }
  }
}
</style>
