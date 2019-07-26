<template>
  <div class="data-map__details">
    <div class="data-map__details_title"></div>
    <div class="data-map__details_effect">
      <div class="data-map__details_effect_top"></div>
      <div class="data-map__details_effect_center"></div>
      <div class="data-map__details_effect_bottom"></div>
      <div class="data-map__details_effect_title">表影响力排行</div>
      <div class="data-map__details_effect_content">
        <el-row>
          <el-col :span="4">排名</el-col>
          <el-col :span="8">表名</el-col>
          <el-col :span="8">数据库</el-col>
          <el-col :span="4">关联数</el-col>
        </el-row>
        <el-row v-for="(item,index) in effectTable" :key="index">
          <el-col :span="4" style="font-size:18px;font-style:italic;">{{index + 1}}</el-col>
          <el-col :span="8">{{item.name}}</el-col>
          <el-col :span="8">{{item.db}}</el-col>
          <el-col :span="4">{{item.r}}</el-col>
        </el-row>
      </div>
    </div>
    <div class="data-map__details_metadata">
      <div class="data-map__details_metadata_top"></div>
      <div class="data-map__details_metadata_center"></div>
      <div class="data-map__details_metadata_bottom"></div>
      <div class="data-map__details_metadata_title">24小时元数据变化占比</div>
      <div class="data-map__details_metadata_pie"></div>
      <div class="data-map__details_metadata_title">影响列表</div>
      <div class="data-map__details_metadata_content">
        <el-row>
          <el-col :span="4">序号</el-col>
          <el-col :span="7">作业</el-col>
          <el-col :span="6">流向</el-col>
          <el-col :span="7">下次执行时间</el-col>
        </el-row>
        <el-row v-for="(item,index) in workTable" :key="index">
          <el-col :span="4">{{index + 1}}</el-col>
          <el-col :span="7">{{item.name}}</el-col>
          <el-col :span="6">{{item.db}}</el-col>
          <el-col :span="7">{{item.time}}</el-col>
        </el-row>
      </div>
    </div>
    <scroll-card></scroll-card>
    <div class="data-map__details_map">
      <div class="data-map__details_map_select">
        <div class="data-map__details_map_select_top"></div>
        <div class="data-map__details_map_select_center"></div>
        <div class="data-map__details_map_select_bottom"></div>
        <div class="data-map__details_map_select_db">
          <span class="data-map__details_map_select_db_name">数据库</span>
          <el-select class="data-map__details_map_select_db_select" v-model="value" placeholder>
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import echarts from "echarts";
export default {
  name: "DataMapDetails",
  components: {
    ScrollCard: () => import("./ScrollCard")
  },
  data() {
    return {
      effectTable: [
        { name: "学生信息表", db: "全量库", r: 45 },
        { name: "教职工信息表", db: "人事系统", r: 35 },
        { name: "一卡通信息表", db: "财务系统", r: 25 },
        { name: "奖学金", db: "财务系统", r: 15 },
        { name: "图书基本信息", db: "图书馆系统", r: 5 }
      ],
      pieData: [
        { value: 40, name: "人事部", icon: "circle" },
        { value: 35, name: "教务部", icon: "circle" },
        { value: 40, name: "很长的学工部", icon: "circle" },
        { value: 30, name: "财务部", icon: "circle" },
        { value: 40, name: "后勤部", icon: "circle" },
        { value: 30, name: "宣传部", icon: "circle" }
      ],
      workTable: [
        { name: "学生信息表", db: "全量库", time: "19/07/26" },
        { name: "教职工信息表", db: "人事系统", time: "19/07/26" },
        { name: "一卡通信息表", db: "财务系统", time: "19/07/26" },
        { name: "奖学金", db: "财务系统", time: "19/07/26" },
        { name: "图书基本信息", db: "图书馆系统", time: "19/07/26" }
      ],
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "教务数据库分析"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      value: ""
    };
  },
  mounted() {
    this.createPie();
  },
  methods: {
    createPie() {
      let dom = document.querySelector(".data-map__details_metadata_pie");
      let myChart = echarts.init(dom);
      let option = {
        title: {
          show: false,
          text: "严重程度",
          left: 10,
          textStyle: {
            color: "#fff",
            fontSize: "12"
          }
        },
        tooltip: {
          trigger: "item",
          formatter: "{c}"
        },
        legend: {
          right: 0,
          y: "center",
          orient: "vertical",
          itemWidth: 8,
          itemHeight: 8,
          // borderRadius: 20,
          textStyle: {
            color: "#fff",
            fontSize: "10"
          },
          data: this.pieData
        },
        calculable: true,
        series: [
          {
            name: "半径模式",
            type: "pie",
            radius: [0, 60],
            center: ["40%", "50%"],
            color: [
              "#992E2E",
              "#B36C36",
              "#B39C36",
              "#2E997C",
              "#3F64D1",
              "#6B36B3"
            ],
            roseType: "radius",
            label: {
              show: false,
              color: "#fff",
              formatter: "{c} 条"
            },
            lableLine: {
              normal: {
                show: false
              },
              emphasis: {
                show: true
              }
            },
            data: this.pieData
          }
        ]
      };
      myChart.setOption(option, true);
    }
  }
};
</script>
<style lang="scss">
@import "~@/styles/variables.scss";
.data-map__details {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-image: url(../../../assets/DataMonitor/grid.png);
  background-color: $color-footer;
  position: relative;
  &_title {
    width: 100%;
    height: 100px;
    background: url(../../../assets/DataMonitor/data-map-details-title.png);
    background-repeat: no-repeat;
    background-position: top center;
    background-size: 100%;
  }
  &_effect {
    position: absolute;
    top: 52px;
    right: 10px;
    width: 310px;
    height: 200px;
    &_top {
      position: absolute;
      top: 0;
      width: 100%;
      height: 50px;
      background-image: url(../../../assets/DataMonitor/right-top.png);
      background-repeat: no-repeat;
      background-position: top center;
      background-size: 100%;
    }
    &_center {
      position: absolute;
      top: 50px;
      right: 2px;
      bottom: 50px;
      left: 0;
      border-right: 1px solid rgba(39, 115, 230, 0.4);
      border-left: 1px solid rgba(39, 115, 230, 0.4);
      background-color: rgba(13, 29, 76, 0.4);
    }
    &_bottom {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 50px;
      background-image: url(../../../assets/DataMonitor/right-bottom.png);
      background-repeat: no-repeat;
      background-position: bottom center;
      background-size: 100%;
    }
    &_title {
      position: absolute;
      top: 0;
      width: 100%;
      height: 30px;
      background-image: url(../../../assets/DataMonitor/item-title.png);
      background-repeat: no-repeat;
      background-position: top center;
      // background-size: 100%;
      font-size: 12px;
      text-align: center;
      color: rgba(41, 193, 204, 1);
      line-height: 30px;
      font-weight: 600;
    }
    &_content {
      position: absolute;
      top: 30px;
      width: 100%;
      // height: 30px;
      font-size: 12px;
      text-align: center;
      color: rgba(41, 193, 204, 1);
      line-height: 30px;
      font-weight: 600;
      padding: 0 15px;
      box-sizing: border-box;
      .el-row {
        color: #fff;
        height: 26px;
        line-height: 26px;
        &:nth-child(2) {
          color: rgba(216, 64, 64, 1);
        }
        &:nth-child(3) {
          color: rgba(179, 108, 54, 1);
        }
        &:nth-child(4) {
          color: rgba(179, 156, 54, 1);
        }
        &:nth-child(2n-1) {
          background: rgba(63, 100, 209, 0.1);
        }
      }
    }
  }
  &_metadata {
    position: absolute;
    top: 260px;
    right: 10px;
    bottom: 15px;
    width: 310px;
    // height: 351px;
    &_top {
      position: absolute;
      top: 0;
      width: 100%;
      height: 50px;
      background-image: url(../../../assets/DataMonitor/right-top.png);
      background-repeat: no-repeat;
      background-position: top center;
      background-size: 100%;
    }
    &_center {
      position: absolute;
      top: 50px;
      right: 2px;
      bottom: 50px;
      left: 0;
      border-right: 1px solid rgba(39, 115, 230, 0.4);
      border-left: 1px solid rgba(39, 115, 230, 0.4);
      background-color: rgba(13, 29, 76, 0.4);
    }
    &_bottom {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 50px;
      background-image: url(../../../assets/DataMonitor/right-bottom.png);
      background-repeat: no-repeat;
      background-position: bottom center;
      background-size: 100%;
    }
    &_title {
      position: absolute;
      top: 0;
      width: 100%;
      height: 30px;
      background-image: url(../../../assets/DataMonitor/item-title.png);
      background-repeat: no-repeat;
      background-position: top center;
      font-size: 12px;
      text-align: center;
      color: rgba(41, 193, 204, 1);
      line-height: 30px;
      font-weight: 600;
    }
    &_pie {
      position: absolute;
      top: 40px;
      width: 100%;
      height: 150px;
    }
    &_title:nth-child(6) {
      top: 190px;
    }
    &_content {
      position: absolute;
      top: 230px;
      width: 100%;
      font-size: 12px;
      text-align: center;
      color: rgba(41, 193, 204, 1);
      line-height: 30px;
      font-weight: 600;
      padding: 0 15px;
      box-sizing: border-box;
      height: 104px;
      overflow: hidden;
      .el-row {
        color: #fff;
        height: 26px;
        line-height: 26px;
        &:nth-child(2) {
          color: rgba(216, 64, 64, 1);
        }
        &:nth-child(3) {
          color: rgba(179, 108, 54, 1);
        }
        &:nth-child(4) {
          color: rgba(179, 156, 54, 1);
        }
        &:nth-child(2n-1) {
          background: rgba(63, 100, 209, 0.1);
        }
      }
    }
  }
  &_scroll-card {
    position: absolute;
    top: 52px;
    right: 335px;
    bottom: 15px;
    z-index: 1;
  }
  &_map {
    position: absolute;
    top: 27px;
    right: 400px;
    left: 11px;
    bottom: 0;
    background: url(../../../assets/DataMonitor/map-min.png);
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    &_select {
      position: absolute;
      top: 0;
      width: 240px;
      bottom: 15px;
      &_top {
        position: absolute;
        top: 0;
        width: 100%;
        height: 70px;
        background: url(../../../assets/DataMonitor/left-top.png);
        background-repeat: no-repeat;
        background-position: top left;
      }
      &_center {
        position: absolute;
        top: 70px;
        right: 0;
        bottom: 70px;
        left: 2px;
        background: linear-gradient(
          90deg,
          rgba(0, 9, 77, 0.7) 0%,
          rgba(11, 2, 52, 0.33) 87%,
          rgba(0, 9, 77, 0.07) 99%
        );
      }
      &_bottom {
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 70px;
        background: url(../../../assets/DataMonitor/left-bottom.png);
        background-repeat: no-repeat;
        background-position: top left;
      }
      &_db {
        position: absolute;
        top: 40px;
        left: 15px;
        width: 214px;
        height: 38px;
        background: url(../../../assets/DataMonitor/select.png);
        &_name {
          color: rgba(41, 193, 204, 1);
          font-size: 12px;
          font-weight: bold;
          line-height: 38px;
          margin-left: 12px;
        }
        &_select {
          float: right;
        }
      }

      .el-input__inner {
        width: 100px;
        background: transparent;
        border-color: transparent !important;
        // &:hover {
        //   border-color: transparent;
        // }
      }
    }
  }
  @media only screen and (min-width: 1366px) and (max-width: 1599px) {
  }
  @media only screen and (min-width: 1600px) and (max-width: 1919px) {
  }
  @media only screen and (min-width: 1920px) {
    &_effect {
      top: 72px;
    }
    &_metadata {
      top: 280px;
    }
    &_scroll-card {
      top: 72px;
    }
    &_map {
      top: 37px;
      left: 16px;
    }
  }
}
</style>
