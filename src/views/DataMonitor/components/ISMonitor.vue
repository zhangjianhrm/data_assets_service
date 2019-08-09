<template>
  <div class="ISM">
    <data-monitor-nav></data-monitor-nav>
    <div class="ISM_title"></div>
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
          <span v-if="item.code">({{item.code}}/</span>
          <span v-if="item.model">{{item.model}}</span>
          <span v-if="item.count">{{item.count}}</span>
        </h3>
      </div>
    </div>
    <div class="ISM_card">
      <div class="ISM_card_left">
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
            <monitor-select v-model="currentItem" :options="itemList"></monitor-select>
            <monitor-select v-model="currentDate" :options="dateList"></monitor-select>
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
      </div>
      <div class="ISM_card_center">
        <div class="ISM_card_center_top ISM-card">
          <div class="ISM-card-top"></div>
          <div class="ISM-card-center"></div>
          <div class="ISM-card-bottom"></div>
          <div class="ISM-card-title">信息标准环比分析情况</div>
          <div class="ISM_card_center_top_date">
            <monitor-select v-model="currentItem" :options="itemList"></monitor-select>
            <monitor-select v-model="currentDate" :options="dateList"></monitor-select>
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
        <div class="ISM_card_center_bottom_graph"></div>
      </div>
    </div>
  </div>
</template>
<script>
import load from "@/utils/load.js"; // 加载 Js

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
      currentItem: "code",
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
      currentDate: "week",
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
      centerBottomBar: null
    };
  },
  async created() {
    await load(
      "https://echarts.baidu.com/gallery/vendors/echarts/echarts.min.js"
    );
    this.createLeftBottomBar();
    this.createCenterTopBar();
    this.createCenterBottomLine();
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
          left: 32,
          textStyle: {
            color: "#fff",
            fontSize: "10"
          },
          data: ["浏览", "增长率"]
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
      });
    },
    createCenterBottomLine() {
      let dom = document.querySelector(".ISM_card_center_bottom_graph");
      this.centerBottomBar = echarts.init(dom);
      this.centerBottomBar.setOption({
        legend: {
          left: 0,
          itemWidth: 8,
          itemHeight: 8,
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
  background-image: url(../../../assets/Common/map.png);
  background-color: $color-footer;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 60%;
  &_title {
    width: 100%;
    height: 50px;
    background-image: url("../../../assets/ISM/ISM-title.svg");
    background-repeat: no-repeat;
    background-position: top center;
    background-size: 100%;
    margin-top: 10px;
    margin-bottom: 20px;
  }
  &_count {
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: space-around;
    margin-bottom: 24px;
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
    width: 100%;
    display: flex;
    justify-content: space-around;
    &_left {
      &_top {
        width: 430px;
        height: 230px;
        margin-bottom: 20px;
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
      &_bottom {
        width: 430px;
        height: 200px;
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
    }
    &_center {
      &_top {
        width: 430px;
        height: 230px;
        margin-bottom: 20px;
        .monitor-select {
          position: absolute;
          right: 15px;
          top: 40px;
        }
        &_graph {
          height: 180px;
          position: absolute;
          top: 40px;
          width: 100%;
        }
      }
      &_bottom {
        width: 430px;
        height: 200px;
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
    }
    &_right {
      width: 430px;
      height: 450px;
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
    }
  }
  .ISM-card {
    position: relative;
    overflow: hidden;
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
}
</style>
