<template>
  <div class="rate-bar-graph">
    <p class="rate-bar-graph__title">{{title}}</p>
    <el-carousel class="rate-bar-graph_overview" arrow="never" height="100%">
      <el-carousel-item v-for="(item,index) in system" :key="index">
        <h3>{{ item.name }}</h3>
        <h2>{{ parseInt(item.rate[0]*100)+'%' }}</h2>
        <p>采标率</p>
        <section></section>
        <h2>{{ item.rank[0] }}</h2>
        <p>采标率排名</p>
      </el-carousel-item>
    </el-carousel>
    <div class="rate-bar-graph__graph">
      <section>
        <span
          v-for="(item,index) in system"
          :key="index"
          @click="seriesToggle(item.name,index,$event)"
        >{{item.name}}</span>
        <span @click="barGraphToggle('rate',$event)" style="opacity:1;">采标率</span>
        <span @click="barGraphToggle('rank',$event)" style="opacity:1;">采标率排名</span>
        <el-select v-model="currentYear" placeholder="请选择" size="small">
          <el-option
            v-for="item in years"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </section>
      <div id="rate-bar-graph__rate"></div>
      <div id="rate-bar-graph__rank"></div>
      <div id="rate-bar-graph__temp"></div>
    </div>
  </div>
</template>
<script>
import load from "@/utils/load"; // 加载 Js
import axios from "axios";
import url from "@/service.config";
export default {
  name: "RateBarGraph",
  props: {
    title: {
      type: String,
      default: () => {
        return "采标率";
      }
    }
  },
  data() {
    return {
      // 年份
      years: [
        {
          value: "2018",
          label: "2018"
        },
        {
          value: "2017",
          label: "2017"
        },
        {
          value: "2016",
          label: "2016"
        },
        {
          value: "2015",
          label: "2015"
        },
        {
          value: "2014",
          label: "2014"
        }
      ],
      // 当前已选择的年份
      currentYear: "2018",
      // 月份
      months: [
        "一月",
        "二月",
        "三月",
        "四月",
        "五月",
        "六月",
        "七月",
        "八月",
        "九月",
        "十月",
        "十一月",
        "十二月"
      ],
      // 系统
      system: [
        {
          name: "人事系统",
          rate: [0.9, 0.8, 0.4, 0.5, 0.3, 0.2, 0.1, 0.2, 0.7, 0.1, 0.2, 0.2],
          rank: [20, 70, 40, 44, 20, 20, 10, 20, 20, 10, 20, 20]
        },
        {
          name: "教务系统",
          rate: [0.3, 0.8, 0.4, 0.5, 0.2, 0.2, 0.1, 0.2, 0.2, 0.1, 0.2, 0.2],
          rank: [20, 70, 40, 44, 20, 20, 10, 20, 20, 10, 20, 20]
        },
        {
          name: "财务系统",
          rate: [0.4, 0.8, 0.4, 0.5, 0.2, 0.2, 0.1, 0.2, 0.2, 0.1, 0.2, 0.2],
          rank: [20, 70, 40, 44, 20, 20, 10, 20, 20, 10, 20, 20]
        },
        {
          name: "后勤系统",
          rate: [0.5, 0.8, 0.4, 0.5, 0.2, 0.2, 0.1, 0.2, 0.2, 0.1, 0.2, 0.2],
          rank: [20, 70, 40, 44, 20, 20, 10, 20, 20, 10, 20, 20]
        }
      ],
      // 系统缓存
      // systemTemp: [],
      // 系统颜色
      systemColor: [
        {
          rate: "rgba(50, 150, 250, 1)",
          rank: "rgba(50, 150, 250, 0)",
          borderColor: "rgba(27, 140, 253, 1)"
        },
        {
          rate: "rgba(58, 38, 157, 1)",
          rank: "rgba(58, 38, 157, 0)",
          borderColor: "rgba(40, 20, 141, 1)"
        },
        {
          rate: "rgba(68, 78, 138, 1)",
          rank: "rgba(68, 78, 138, 0)",
          borderColor: "rgba(39, 48, 117, 1)"
        },
        {
          rate: "rgba(255, 183, 92, 1)",
          rank: "rgba(255, 183, 92, 0)",
          borderColor: "rgba(246, 168, 70, 1)"
        }
      ],
      //
      barWidth: [6, 6, 6, 6],
      borderWidth: [2, 2, 2, 2],
      leng: 2,
      currentBarGraph: ""
    };
  },
  async created() {
    await load(
      "https://echarts.baidu.com/gallery/vendors/echarts/echarts.min.js"
    );
    await this.getRateData();
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
    returnSeries(s) {
      let series = [];
      for (let i = 0; i < this.system.length; i++) {
        series.push({
          type: "bar",
          itemStyle: {
            color: this.systemColor[i][s],
            borderColor: this.systemColor[i].borderColor,
            borderWidth: this.borderWidth[i]
          },
          barWidth: this.barWidth[i],
          barGap: "100%",
          name: this.system[i].name,
          data: this.system[i][s]
        });
      }
      return series;
    },
    // 创建条形图
    createBarGraph() {
      // eslint-disable-next-line
      let systemRate = echarts.init(
        document.querySelector("#rate-bar-graph__rate")
      );
      // 采标率跳转
      systemRate.on("click", params => {
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
      // eslint-disable-next-line
      let systemRank = echarts.init(
        document.querySelector("#rate-bar-graph__rank")
      );
      // 上图表配置 Rate
      systemRate.setOption(
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
                "<span style='margin-left:4px;'>采标率：</span>" +
                parseInt(params.value * 100) +
                "%"
              );
            }
          },
          // 图例组件。
          legend: {
            data: this.systemName,
            show: false
          },
          // 直角坐标系内绘图网格，单个 grid 内最多可以放置上下两个 X 轴，左右两个 Y 轴。
          grid: {
            top: "20",
            right: "0",
            bottom: "-20",
            left: "0",
            containLabel: true
          },
          xAxis: [
            {
              type: "category",
              show: false,
              axisTick: { show: false },
              data: this.months
            }
          ],
          yAxis: [
            {
              type: "value",
              // 坐标轴的分割段数
              splitNumber: 1,
              // 强制设置坐标轴分割间隔。
              interval: 0.2,
              // 坐标轴轴线相关设置。
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
              inverse: false,
              axisLabel: {
                formatter: function(val) {
                  if (val == 0) {
                    return 0;
                  } else {
                    return val * 100 + "%";
                  }
                },
                margin: 10
                // align: "left"
              }
            }
          ],
          series: this.returnSeries("rate")
        },
        true
      );
      // 下图表配置 Rank
      systemRank.setOption(
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
              if (params.color == "rgba(50, 150, 250, 0)") {
                return (
                  params.seriesName +
                  "<br><i style='display:inline-block;width:4px;height:4px;background:#fff;border:2px solid rgb(50,150,250);border-radius:50%;'></i>" +
                  "<span style='margin-left:4px;'>采标率排名：</span>" +
                  params.value
                );
              } else if (params.color == "rgba(58, 38, 157, 0)") {
                return (
                  params.seriesName +
                  "<br><i style='display:inline-block;width:4px;height:4px;background:#fff;border:2px solid rgb(58,38,157);border-radius:50%;'></i>" +
                  "<span style='margin-left:4px;'>采标率排名：</span>" +
                  params.value
                );
              } else if (params.color == "rgba(68, 78, 138, 0)") {
                return (
                  params.seriesName +
                  "<br><i style='display:inline-block;width:4px;height:4px;background:#fff;border:2px solid rgb(68,78,138);border-radius:50%;'></i>" +
                  "<span style='margin-left:4px;'>采标率排名：</span>" +
                  params.value
                );
              } else if (params.color == "rgba(255, 183, 92, 0)") {
                return (
                  params.seriesName +
                  "<br><i style='display:inline-block;width:4px;height:4px;background:#fff;border:2px solid rgb(255,183,92);border-radius:50%;'></i>" +
                  "<span style='margin-left:4px;'>采标率排名：</span>" +
                  params.value
                );
              }
            }
          },
          // 图例组件
          legend: {
            data: this.systemName,
            show: false
          },
          // 直角坐标系内绘图网格，单个 grid 内最多可以放置上下两个 X 轴，左右两个 Y 轴。
          grid: {
            top: "0",
            right: "0",
            bottom: "0",
            left: "11",
            containLabel: true
          },
          xAxis: [
            {
              type: "category",
              // 坐标轴轴线相关设置。
              axisLine: {
                // show: false,
                lineStyle: {
                  color: "rgba(12, 0, 53, 0.4)"
                }
              },
              axisTick: { show: false },
              data: this.months
            }
          ],
          yAxis: [
            {
              type: "value",
              // 坐标轴的分割段数
              splitNumber: 1,
              // 强制设置坐标轴分割间隔。
              interval: 20,
              // 坐标轴轴线相关设置。
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
              inverse: true,
              axisLabel: {
                margin: 10
              }
            }
          ],
          series: this.returnSeries("rank")
        },
        true
      );
    },
    // 创建临时条形图
    createTempBarGraph(item) {
      // eslint-disable-next-line
      let systemTemp = echarts.init(
        document.querySelector("#rate-bar-graph__temp")
      );
      if (item == "rate") {
        // 下图表配置 Rank
        systemTemp.setOption(
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
                if (params.color == "rgba(50, 150, 250, 0)") {
                  return (
                    params.seriesName +
                    "<br><i style='display:inline-block;width:4px;height:4px;background:#fff;border:2px solid rgb(50,150,250);border-radius:50%;'></i>" +
                    "<span style='margin-left:4px;'>采标率排名：</span>" +
                    params.value
                  );
                } else if (params.color == "rgba(58, 38, 157, 0)") {
                  return (
                    params.seriesName +
                    "<br><i style='display:inline-block;width:4px;height:4px;background:#fff;border:2px solid rgb(58,38,157);border-radius:50%;'></i>" +
                    "<span style='margin-left:4px;'>采标率排名：</span>" +
                    params.value
                  );
                } else if (params.color == "rgba(68, 78, 138, 0)") {
                  return (
                    params.seriesName +
                    "<br><i style='display:inline-block;width:4px;height:4px;background:#fff;border:2px solid rgb(68,78,138);border-radius:50%;'></i>" +
                    "<span style='margin-left:4px;'>采标率排名：</span>" +
                    params.value
                  );
                } else if (params.color == "rgba(255, 183, 92, 0)") {
                  return (
                    params.seriesName +
                    "<br><i style='display:inline-block;width:4px;height:4px;background:#fff;border:2px solid rgb(255,183,92);border-radius:50%;'></i>" +
                    "<span style='margin-left:4px;'>采标率排名：</span>" +
                    params.value
                  );
                }
              }
            },
            // 图例组件
            legend: {
              data: this.systemName,
              show: false
            },
            // 直角坐标系内绘图网格，单个 grid 内最多可以放置上下两个 X 轴，左右两个 Y 轴。
            grid: {
              top: "7",
              right: "0",
              bottom: "0",
              left: "11",
              containLabel: true
            },
            xAxis: [
              {
                type: "category",
                // 坐标轴轴线相关设置。
                axisLine: {
                  // show: false,
                  lineStyle: {
                    color: "rgba(12, 0, 53, 0.4)"
                  }
                },
                axisTick: { show: false },
                data: this.months
              }
            ],
            yAxis: [
              {
                type: "value",
                // 坐标轴的分割段数
                splitNumber: 1,
                // 强制设置坐标轴分割间隔。
                interval: 20,
                // 坐标轴轴线相关设置。
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
                inverse: true,
                axisLabel: {
                  margin: 10
                }
              }
            ],
            series: this.returnSeries("rank")
          },
          true
        );
      } else if (item == "rank") {
        // 上图表配置 Rate
        systemTemp.setOption(
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
                  "<span style='margin-left:4px;'>采标率：</span>" +
                  parseInt(params.value * 100) +
                  "%"
                );
              }
            },
            // 图例组件。
            legend: {
              data: this.systemName,
              show: false
            },
            // 直角坐标系内绘图网格，单个 grid 内最多可以放置上下两个 X 轴，左右两个 Y 轴。
            grid: {
              top: "20",
              right: "0",
              bottom: "0",
              left: "0",
              containLabel: true
            },
            xAxis: [
              {
                type: "category",
                // 坐标轴轴线相关设置。
                axisLine: {
                  // show: false,
                  lineStyle: {
                    color: "rgba(12, 0, 53, 0.4)"
                  }
                },
                axisTick: { show: false },
                data: this.months
              }
            ],
            yAxis: [
              {
                type: "value",
                // 坐标轴的分割段数
                splitNumber: 1,
                // 强制设置坐标轴分割间隔。
                interval: 0.2,
                // 坐标轴轴线相关设置。
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
                inverse: false,
                axisLabel: {
                  formatter: function(val) {
                    if (val == 0) {
                      return 0;
                    } else {
                      return val * 100 + "%";
                    }
                  },
                  margin: 10
                  // align: "left"
                }
              }
            ],
            series: this.returnSeries("rate")
          },
          true
        );
      }
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
      if (this.currentBarGraph == "rank") {
        this.createTempBarGraph("rank");
      } else if (this.currentBarGraph == "rate") {
        this.createTempBarGraph("rate");
      }
    },
    // 采标率、采标率排名开关
    barGraphToggle(item, eve) {
      let tempEle = document.querySelector("#rate-bar-graph__temp");
      if (eve.target.style.opacity == "1") {
        if (this.leng > 1) {
          tempEle.style.visibility = "visible";
          eve.target.style.opacity = "0.3";
          this.currentBarGraph = item;
          this.leng--;
          this.createTempBarGraph(item);
        } else {
          this.$message({
            showClose: true,
            message: "至少选择一项",
            type: "error"
          });
        }
      } else {
        tempEle.style.visibility = "hidden";
        eve.target.style.opacity = "1";
        this.leng++;
        this.createTempBarGraph(item);
      }
    }
  }
};
</script>
<style lang="scss">
@import "~@/styles/variables.scss";
.rate-bar-graph {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  background: rgb(245, 245, 245);
  padding: 37px 0 129px;
  &__title {
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
  &__graph {
    position: relative;
    width: 1040px;
    > section {
      z-index: 2;
      position: relative;
      width: 100%;
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
        &:nth-last-child(3) {
          margin-left: 65px;
          &::before {
            background: rgba(50, 150, 250, 1);
            border: 2px solid rgba(27, 140, 253, 1);
          }
        }
        &:nth-last-child(2) {
          &::before {
            background: #fff;
            border: 2px solid rgba(50, 150, 250, 1);
          }
        }
      }
      .el-select {
        position: absolute;
        right: 0;
        .el-input {
          width: 80px;
          &__inner {
            border-radius: 1px;
          }
        }
      }
    }
    > div {
      width: 100%;
      position: absolute;
      overflow: hidden;
      &#rate-bar-graph__rate {
        top: 36px;
        z-index: 1;
        height: 200px;
      }
      &#rate-bar-graph__rank {
        bottom: 0;
        z-index: 1;
        height: 200px;
      }
      &#rate-bar-graph__temp {
        top: 36px;
        z-index: 2;
        height: 400px;
        visibility: hidden;
        background: rgb(245, 245, 245);
      }
    }
  }
}
</style>
