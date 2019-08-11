<template>
  <div class="ISM">
    <data-monitor-nav></data-monitor-nav>
    <div class="ISM_bg"></div>
    <div class="ISM_content">
      <div class="ISM_count">
        <div class="ISM_count_item" v-for="(item,index) in count" :key="index">
          <p>
            <b>{{item.name}}</b>
            <span v-if="item.refer">(参考/</span>
            <span v-if="item.exe">执行)</span>
            <span v-if="item.code">(代码/</span>
            <span v-if="item.model">模型)</span>
          </p>
          <h3>
            <span v-if="item.refer">{{item.refer}}/</span>
            <span v-if="item.exe">{{item.exe}}</span>
            <span v-if="item.code">{{item.code}}/</span>
            <span v-if="item.model">{{item.model}}</span>
            <span v-if="item.count">{{item.count}}</span>
          </h3>
        </div>
      </div>
      <div class="ISM_card">
        <div class="ISM_card_left_top ISM-card">
          <div class="ISM-card-top"></div>
          <div class="ISM-card-center"></div>
          <div class="ISM-card-bottom"></div>
          <div class="ISM-card-title">信息标准下载/收藏/浏览TOP10</div>
          <div class="ISM_card_left_top_type">
            <div
              v-for="(item,index) in typeList"
              :key="index"
              :class="currentType == item.type ? 'activeRing':''"
              @click="selectType(item.type)"
            >
              <div></div>
              <span>{{item.name}}</span>
            </div>
          </div>
          <div class="ISM_card_left_top_date">
            <monitor-select v-model="currentLeftTopItem" :options="itemList"></monitor-select>
            <monitor-select v-model="currentLeftTopDate" :options="dateList"></monitor-select>
          </div>
          <div class="ISM_card_left_top_content">
            <p style="color:#fff;">
              <span>排名</span>
              <span>表名</span>
              <span>次数</span>
            </p>
            <vue-seamless-scroll
              class="ISM_card_left_top_content_wrap"
              :data="tableLeftTop"
              :class-option="scrollOption"
            >
              <p v-for="(item,index) in tableLeftTop" :key="index">
                <span>{{ item.rank }}</span>
                <span>{{ item.table }}</span>
                <span>{{ item.times }}</span>
              </p>
            </vue-seamless-scroll>
          </div>
        </div>
        <div class="ISM_card_left_bottom ISM-card">
          <div class="ISM-card-top"></div>
          <div class="ISM-card-center"></div>
          <div class="ISM-card-bottom"></div>
          <div class="ISM-card-title">数据中心管理文档访问统计</div>
          <monitor-select v-model="currentDateLeftBottom" :options="dateList"></monitor-select>
          <div class="ISM_card_left_bottom_graph"></div>
        </div>
        <div class="ISM_card_center">
          <div class="ISM_card_center_top ISM-card">
            <div class="ISM-card-top"></div>
            <div class="ISM-card-center"></div>
            <div class="ISM-card-bottom"></div>
            <div class="ISM-card-title">信息标准环比分析情况</div>
            <div class="ISM_card_center_top_date">
              <monitor-select v-model="currentCenterTopItem" :options="itemList"></monitor-select>
              <monitor-select v-model="currentCenterTopYear" :options="yearList"></monitor-select>
            </div>
            <div class="ISM_card_center_top_graph"></div>
          </div>
          <div class="ISM_card_center_bottom ISM-card">
            <div class="ISM-card-top"></div>
            <div class="ISM-card-center"></div>
            <div class="ISM-card-bottom"></div>
            <div class="ISM-card-title">信息标准新增/修改/删除统计</div>
            <monitor-select v-model="currentDateCenterBottom" :options="dateList"></monitor-select>
            <div class="ISM_card_center_bottom_graph"></div>
          </div>
        </div>
        <div class="ISM_card_right ISM-card">
          <div class="ISM-card-top"></div>
          <div class="ISM-card-center"></div>
          <div class="ISM-card-bottom"></div>
          <div class="ISM-card-title">业务系统采标率趋势详情</div>
          <div class="ISM_card_right_date">
            <monitor-select v-model="currentYearLeft" :options="yearList"></monitor-select>
            <monitor-select v-model="currentMonthLeft" :options="monthList"></monitor-select>
          </div>
          <div class="ISM_card_right_graph"></div>
          <div class="ISM_card_right_legend">
            <div class="ISM_card_right_legend_1"></div>
            <span @click="rightBarLegned(1)">采标率</span>
            <div class="ISM_card_right_legend_2"></div>
            <span @click="rightBarLegned(2)">排名</span>
          </div>
          <div class="ISM_card_right_rank">
            <p style="color:#fff;">
              <span>排名</span>
              <span>业务系统</span>
              <span>采标率</span>
              <span>环比</span>
              <span>排名变动</span>
            </p>
            <vue-seamless-scroll
              class="ISM_card_right_rank_wrap"
              :data="tableLeftTop"
              :class-option="scrollOption"
            >
              <p v-for="(item,index) in tableRight" :key="index">
                <span>{{ item.rank }}</span>
                <span>{{ item.name }}</span>
                <span>{{ (item.rate * 100).toFixed(0)}}%</span>
                <span v-if="item.tend>0">+{{ item.tend }}</span>
                <span v-if="item.tend<=0">{{ item.tend }}</span>
                <span v-if="item.rankChange=='up'" style="color:#992E2E;">↑</span>
                <span v-if="item.rankChange==''">-</span>
                <span v-if="item.rankChange=='down'" style="color:#1F9978;">↓</span>
              </p>
            </vue-seamless-scroll>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import load from "@/utils/load.js"; // 加载 Js
import { close } from "fs";

export default {
  name: "ISMonitor",
  components: {
    DataMonitorNav: () => import("./Nav"),
    MonitorSelect: () => import("@/components/Select/MonitorSelect"),
    VueSeamlessScroll: () => import("vue-seamless-scroll")
  },
  data() {
    return {
      count: [
        { name: "代码类", refer: 656, exe: 123 },
        { name: "代码子类", refer: 656, exe: 123 },
        { name: "代码类", refer: 656, exe: 123 },
        { name: "代码类", refer: 656, exe: 123 },
        { name: "代码类", refer: 656, exe: 123 },
        { name: "代码类", refer: 656, exe: 123 },
        { name: "代码类", refer: 656, exe: 123 },
        { name: "版本", code: 656, model: 123 },
        { name: "数据中心管理文档", count: 8 }
      ],
      // 类型
      typeList: [
        { name: "下载", type: "downloads" },
        { name: "收藏", type: "collects" },
        { name: "浏览", type: "visit" }
      ],
      currentType: "downloads",
      itemList: [
        {
          value: "model",
          label: "模型"
        },
        {
          value: "code",
          label: "代码"
        }
      ],
      currentLeftTopItem: "code",
      currentCenterTopItem: "code",
      dateList: [
        {
          value: "week",
          label: "近一周"
        },
        {
          value: "month",
          label: "近一月"
        }
      ],
      yearList: [
        { value: "2019", label: "2019" },
        { value: "2018", label: "2018" },
        { value: "2017", label: "2017" },
        { value: "2016", label: "2016" },
        { value: "2015", label: "2015" }
      ],
      monthList: [
        { value: "1", label: "1月" },
        { value: "2", label: "2月" },
        { value: "3", label: "3月" },
        { value: "4", label: "4月" },
        { value: "5", label: "5月" },
        { value: "6", label: "6月" },
        { value: "7", label: "7月" },
        { value: "8", label: "8月" },
        { value: "9", label: "9月" },
        { value: "10", label: "10月" },
        { value: "11", label: "11月" },
        { value: "12", label: "12月" }
      ],
      currentLeftTopDate: "week",
      currentCenterTopYear: "2019",
      tableLeftTop: [
        { rank: 1, table: "Table_01", times: 12345 },
        { rank: 2, table: "Table_02", times: 2345 },
        { rank: 3, table: "Table_03", times: 345 },
        { rank: 4, table: "Table_04", times: 345 },
        { rank: 5, table: "Table_05", times: 45 },
        { rank: 6, table: "Table_06", times: 5 },
        { rank: 7, table: "Table_07", times: 4 },
        { rank: 8, table: "Table_08", times: 3 },
        { rank: 9, table: "Table_09", times: 2 },
        { rank: 10, table: "Table_10", times: 1 }
      ],
      currentDateLeftBottom: "week",
      currentDateCenterTop: "week",
      currentDateCenterBottom: "week",
      currentYearLeft: "2019",
      currentMonthLeft: "8",
      leftBottomBar: null,
      centerTopBar: null,
      centerBottomBar: null,
      rightBar: null,
      rightBarX: ["C0", "C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8", "C9"],
      rightBarSeries: [
        [91, 41, 10, 47, 32, 82, 60, 95, 70, 84],
        [-25, -31, -21, -10, -19, -72, -62, -62, -92, -93]
      ],
      tableRight: [
        { rank: 1, name: "人事系统", rate: 0.9, tend: 1.9, rankChange: "up" },
        { rank: 2, name: "教务系统", rate: 0.85, tend: 1.8, rankChange: "up" },
        { rank: 3, name: "财务系统", rate: 0.7, tend: 0.7, rankChange: "" },
        { rank: 4, name: "教职工系统", rate: 0.65, tend: 0, rankChange: "up" },
        {
          rank: 5,
          name: "Table_05",
          rate: 0.6,
          tend: -0.5,
          rankChange: "down"
        },
        { rank: 6, name: "Table_06", rate: 0.55, tend: 0.5, rankChange: "" },
        { rank: 7, name: "Table_07", rate: 0.5, tend: 0.5, rankChange: "up" },
        {
          rank: 8,
          name: "Table_08",
          rate: 0.45,
          tend: 0.5,
          rankChange: "down"
        },
        { rank: 9, name: "Table_09", rate: 0.4, tend: 0.5, rankChange: "down" },
        {
          rank: 10,
          name: "Table_10",
          rate: 0.38,
          tend: 0.5,
          rankChange: "down"
        }
      ]
    };
  },
  async created() {
    await load(
      "https://echarts.baidu.com/gallery/vendors/echarts/echarts.min.js"
    );
    this.createLeftBottomBar();
    this.createCenterTopBar();
    this.createCenterBottomLine();
    this.createRightBar();
  },
  mounted() {},
  methods: {
    selectType(type) {
      this.currentType = type;
    },
    createLeftBottomBar() {
      let dom = document.querySelector(".ISM_card_left_bottom_graph");
      this.leftBottomBar = echarts.init(dom);
      this.leftBottomBar.setOption({
        grid: {
          containLabel: true,
          right: 20,
          bottom: 0,
          left: 10,
          top: 35
        },
        legend: {
          itemWidth: 8,
          itemHeight: 8,
          icon: "circle",
          left: 32,
          textStyle: {
            color: "#fff",
            fontSize: "10"
          },
          data: ["浏览", "下载", "收藏"]
        },
        xAxis: [
          {
            type: "category",
            data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
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
            // name: "API 数量",
            // min: 0,
            // max: 250,
            interval: 100,
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
          }
        ],
        series: [
          {
            name: "浏览",
            type: "bar",
            barWidth: "15%",
            itemStyle: {
              color: "rgba(63, 100, 209, 1)",
              barBorderRadius: 5
            },
            data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6]
          },
          {
            name: "下载",
            type: "bar",
            barWidth: "15%",
            itemStyle: {
              color: "rgba(204, 112, 41, 1)",
              barBorderRadius: 5
            },
            data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6]
          },
          {
            name: "收藏",
            type: "bar",
            barWidth: "15%",
            itemStyle: {
              color: "rgba(31, 153, 120, 1)",
              barBorderRadius: 5
            },
            data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6]
          }
        ]
      });
    },
    createCenterTopBar() {
      let dom = document.querySelector(".ISM_card_center_top_graph");
      this.centerTopBar = echarts.init(dom);
      this.centerTopBar.setOption({
        grid: {
          containLabel: true,
          right: 20,
          bottom: 30,
          left: 10,
          top: 40,
          containLabel: true
        },
        legend: {
          itemWidth: 8,
          itemHeight: 8,
          icon: "circle",
          left: 32,
          textStyle: {
            color: "#fff",
            fontSize: "10"
          },
          data: ["更新量", "环比"]
        },
        xAxis: [
          {
            type: "category",
            data: ["一月", "二月", "三月", "四月", "五月", "六月", "七月"],
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
            name: "浏览量",
            nameLocation: "start",
            // min: 0,
            // max: 250,
            interval: 100,
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
          },
          {
            type: "value",
            name: "环比增长",
            nameLocation: "start",
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
        dataZoom: [
          {
            type: "slider",
            show: true,
            start: 0,
            end: 50,
            showDetail: false,
            bottom: 0,
            height: 16
          }
        ],
        series: [
          {
            name: "更新量",
            type: "bar",
            barWidth: "15%",
            itemStyle: {
              color: "rgba(63, 100, 209, 1)",
              barBorderRadius: 5
            },
            data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6]
          },
          {
            name: "环比",
            type: "line",
            itemStyle: {
              color: "rgba(204, 112, 41, 1)"
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
      });
    },
    createCenterBottomLine() {
      let dom = document.querySelector(".ISM_card_center_bottom_graph");
      this.centerBottomBar = echarts.init(dom);
      this.centerBottomBar.setOption({
        legend: {
          left: 32,
          itemWidth: 8,
          itemHeight: 8,
          icon: "circle",
          textStyle: {
            color: "#fff",
            fontSize: "10"
          },
          data: ["新增", "修改", "删除"]
        },
        grid: {
          containLabel: true,
          right: 20,
          bottom: 0,
          left: 10,
          top: 35
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
            name: "新增",
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
            name: "修改",
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
            name: "删除",
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
      });
    },
    createRightBar() {
      var dom = document.querySelector(".ISM_card_right_graph");
      this.rightBar = echarts.init(dom);
      this.rightBar.setOption({
        grid: {
          containLabel: true,
          right: 20,
          bottom: 30,
          left: 10,
          top: 40,
          containLabel: true
        },
        legend: {
          show: false,
          itemWidth: 8,
          itemHeight: 8,
          left: 32,
          textStyle: {
            color: "#fff",
            fontSize: "10"
          },
          data: ["采标率", "排名"]
        },
        xAxis: {
          data: this.rightBarX,
          // name: "名次",
          axisLine: {
            show: false,
            lineStyle: {
              color: "rgba(255, 255, 255, 0.3)"
            }
          }
        },
        yAxis: {
          splitArea: { show: false },
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
          min: -100,
          max: 100,
          axisLabel: {
            formatter: (value, inedx) => {
              if (value > 0) return value + "%";
              else return -value;
            }
          }
        },
        dataZoom: [
          {
            type: "slider",
            show: true,
            start: 0,
            end: 50,
            showDetail: false,
            bottom: 0,
            height: 16
          }
        ],
        series: [
          {
            name: "采标率",
            type: "bar",
            stack: "one",
            barWidth: 10,
            itemStyle: {
              color: "rgba(31, 153, 120, 0.5)",
              borderColor: "rgba(31, 153, 120, 1)"
            },
            data: this.rightBarSeries[0]
          },
          {
            name: "排名",
            type: "bar",
            stack: "one",
            barWidth: 10,
            itemStyle: {
              color: "rgba(31, 153, 120, 0)",
              borderColor: "rgba(31, 153, 120, 1)"
            },
            data: this.rightBarSeries[1]
          }
        ]
      });
    },
    rightBarLegned(i) {
      if (i === 1) {
        if (this.rightBarSeries[0].length > 0) {
          this.$set(this.rightBarSeries, [0], []);
        } else {
          this.$set(
            this.rightBarSeries,
            [0],
            this.$options.data().rightBarSeries[0]
          );
        }
      } else if (i === 2) {
        if (this.rightBarSeries[1].length > 0) {
          this.$set(this.rightBarSeries, [1], []);
        } else {
          this.$set(
            this.rightBarSeries,
            [1],
            this.$options.data().rightBarSeries[1]
          );
        }
      }
      this.createRightBar();
    }
  },
  computed: {
    scrollOption() {
      return {
        step: 0.5
      };
    }
  }
};
</script>
<style lang="scss">
@import "~@/styles/variables.scss";
.ISM {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: $color-footer;
  background-image: url("../../../assets/ISM/ISM-title.svg");
  background-repeat: no-repeat;
  background-position: 0 10px;
  background-size: 100%;
  display: flex;
  align-content: center;
  flex-wrap: wrap;
  justify-content: center;
  &_bg {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-image: url(../../../assets/Common/map.png);
    background-repeat: no-repeat;
    background-position: center;
    background-size: 70%;
    opacity: 0.3;
  }
  &_content {
    width: 1330px;
  }
  &_count {
    width: 1330px;
    height: 60px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    &_item {
      width: 130px;
      height: 60px;
      background-image: url(../../../assets/ISM/card.png);
      p {
        font-size: 12px;
        text-align: center;
        color: rgba(255, 255, 255, 1);
        line-height: 12px;
        margin-top: 14px;
        margin-bottom: 6px;
      }
      h3 {
        text-align: center;
        font-size: 18px;
        line-height: 18px;
      }
      &:nth-child(4n-3) {
        h3 {
          color: rgba(178, 108, 54, 1);
        }
      }
      &:nth-child(4n-2) {
        h3 {
          color: rgba(178, 156, 54, 1);
        }
      }
      &:nth-child(4n-1) {
        h3 {
          color: rgba(41, 193, 204, 1);
        }
      }
      &:nth-child(4n) {
        h3 {
          color: rgba(22, 115, 217, 1);
        }
      }
    }
  }
  &_card {
    width: 1330px;
    height: 450px;
    position: relative;
    &_left_top {
      width: 430px;
      height: 230px;
      top: 0;
      left: 0;
      &_type {
        position: absolute;
        top: 40px;
        bottom: 20px;
        left: 20px;
        width: 50px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        > div {
          width: 50px;
          height: 50px;
          line-height: 50px;
          text-align: center;
          color: rgba(41, 193, 204, 1);
          position: relative;
          font-size: 12px;
          cursor: pointer;
          div {
            opacity: 0.3;
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            background-image: url(../../../assets/DataMonitor/ring.png);
            background-size: 100%;
          }
          span {
            display: block;
            position: relative;
            z-index: 1;
          }
        }
      }
      &_date {
        position: absolute;
        top: 40px;
        right: 15px;
        .monitor-select {
          float: left;
          &:nth-child(1) {
            margin-right: 10px;
          }
        }
      }
      &_content {
        position: absolute;
        top: 80px;
        right: 15px;
        font-size: 12px;
        width: 326px;
        &_wrap {
          height: 104px;
          overflow: hidden;
        }
        p {
          width: 100%;
          height: 26px;
          line-height: 26px;
          color: rgba(255, 255, 255, 1);
          span {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          span:nth-child(1) {
            float: left;
            width: 60px;
            text-align: center;
          }
          span:nth-child(2) {
            float: left;
            width: 200px;
          }
          span:nth-child(3) {
            float: right;
            width: 60px;
            text-align: center;
          }
          &:nth-child(1) {
            color: rgba(216, 64, 64, 1);
            font-weight: 600;
          }
          &:nth-child(2) {
            color: rgba(204, 112, 41, 1);
            font-weight: 600;
          }
          &:nth-child(3) {
            color: rgba(179, 156, 54, 1);
            font-weight: 600;
          }
          &:nth-child(2n-1) {
            background: rgba(0, 114, 201, 0.1);
          }
        }
      }
    }
    &_left_bottom {
      width: 430px;
      height: 200px;
      left: 0;
      bottom: 0;
      .monitor-select {
        position: absolute;
        right: 15px;
        top: 40px;
      }
      &_graph {
        position: absolute;
        top: 40px;
        width: 100%;
        height: 150px;
      }
    }
    &_center_top {
      width: 430px;
      height: 230px;
      left: 0;
      right: 0;
      top: 0;
      margin: auto;
      &_date {
        position: absolute;
        top: 40px;
        right: 15px;
        .monitor-select {
          float: left;
          &:nth-child(1) {
            margin-right: 10px;
          }
        }
      }
      &_graph {
        height: 180px;
        position: absolute;
        top: 40px;
        width: 100%;
      }
    }
    &_center_bottom {
      width: 430px;
      height: 200px;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      .monitor-select {
        position: absolute;
        right: 15px;
        top: 40px;
      }
      &_graph {
        position: absolute;
        top: 40px;
        width: 100%;
        height: 150px;
      }
    }
    &_right {
      width: 430px;
      height: 450px;
      right: 0;
      &_date {
        position: absolute;
        top: 40px;
        right: 15px;
        .monitor-select {
          float: left;
          &:nth-child(1) {
            margin-right: 10px;
          }
        }
      }
      &_graph {
        height: 240px;
        position: absolute;
        top: 40px;
        width: 100%;
      }
      &_legend {
        position: absolute;
        top: 47px;
        left: 50px;
        height: 12px;
        > * {
          float: left;
          margin-right: 10px;
          cursor: pointer;
        }
        &_1 {
          margin-top: 1px;
          width: 8px;
          height: 8px;
          background: rgba(31, 153, 120, 0.5);
          border: 1px solid rgba(31, 153, 120, 1);
        }
        &_2 {
          margin-top: 1px;
          width: 8px;
          height: 8px;
          background: rgba(31, 153, 120, 0);
          border: 1px solid rgba(31, 153, 120, 1);
        }
        span {
          font-size: 12px;
          color: rgba(255, 255, 255, 1);
          line-height: 12px;
        }
      }
      &_rank {
        position: absolute;
        top: 300px;
        right: 15px;
        font-size: 12px;
        left: 15px;
        &_wrap {
          height: 104px;
          overflow: hidden;
        }
        p {
          width: 100%;
          height: 26px;
          line-height: 26px;
          color: rgba(255, 255, 255, 1);
          span {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            text-align: center;
            float: left;
            &:nth-child(1) {
              width: 60px;
            }
            &:nth-child(2) {
              width: 100px;
              text-align: left;
            }
            &:nth-child(3) {
              width: 80px;
            }
            &:nth-child(4) {
              width: 80px;
            }
            &:nth-child(5) {
              width: 80px;
            }
          }
          &:nth-child(1) {
            color: rgba(216, 64, 64, 1);
            font-weight: 600;
          }
          &:nth-child(2) {
            color: rgba(204, 112, 41, 1);
            font-weight: 600;
          }
          &:nth-child(3) {
            color: rgba(179, 156, 54, 1);
            font-weight: 600;
          }
          &:nth-child(2n-1) {
            background: rgba(0, 114, 201, 0.1);
          }
        }
      }
    }
  }
  .ISM-card {
    position: absolute;
    // overflow: hidden;
    &-top {
      position: absolute;
      top: 0;
      width: 100%;
      height: 50px;
      background-image: url(../../../assets/ISM/top.png);
      background-repeat: no-repeat;
      background-position: top center;
      background-size: 100%;
    }
    &-center {
      position: absolute;
      top: 50px;
      right: 2px;
      bottom: 50px;
      left: 0;
      border-right: 1px solid rgba(39, 115, 230, 0.4);
      border-left: 1px solid rgba(39, 115, 230, 0.4);
      background-color: rgba(13, 29, 76, 0.4);
    }
    &-bottom {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 50px;
      background-image: url(../../../assets/ISM/bottom.png);
      background-repeat: no-repeat;
      background-position: bottom center;
      background-size: 100%;
    }
    &-title {
      text-align: center;
      font-size: 13px;
      color: rgba(41, 193, 204, 1);
      line-height: 30px;
      position: relative;
      background-image: url(../../../assets/ISM/title.png);
      background-repeat: no-repeat;
      background-position: bottom center;
      font-weight: 600;
    }
  }
  .activeRing {
    color: #fff;
    animation: clockwise 5s infinite linear;
    > div {
      opacity: 1;
    }
    > span {
      animation: anticlockwise 5s infinite linear;
    }
    @keyframes clockwise {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
    @keyframes anticlockwise {
      from {
        transform: rotate(360deg);
      }
      to {
        transform: rotate(0deg);
      }
    }
  }
  @media only screen and (min-width: 1366px) and (max-width: 1599px) {
  }
  @media only screen and (min-width: 1600px) and (max-width: 1919px) {
    &_content {
      transform: scale(1.15);
    }
  }
  @media only screen and (min-width: 1920px) {
    &_content {
      transform: scale(1.3);
    }
  }
}
</style>
