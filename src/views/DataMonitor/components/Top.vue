<template>
  <div class="data-monitor__top">
    <div class="data-monitor__top_num">
      <div class="data-monitor__top_num_item" v-for="(item,index) in countDisplay" :key="index">
        <p>{{item.name}}</p>
        <DigitRoll :rollDigits="item.total" />
      </div>
    </div>
    <div class="data-monitor__top_logo">
      <svg-icon icon-class="swlogo"></svg-icon>
      <p>数据资产监控中心大屏</p>
    </div>
    <div class="data-monitor__top_grade">
      <div>
        <svg-icon icon-class="circle-red"></svg-icon>
        <p>
          <b>12</b>
          <i>%</i>
        </p>
        <p>问题数据率</p>
      </div>
      <div>
        <svg-icon icon-class="circle-yellow"></svg-icon>
        <p>
          <b>8.5</b>
        </p>
        <p>质量评分</p>
      </div>
      <div>
        <svg-icon icon-class="circle-blue"></svg-icon>
        <p>
          <b>12</b>
          <i>%</i>
        </p>
        <p>问题数据上升率</p>
      </div>
    </div>
    <div class="data-monitor__top_people">
      <div class="data-monitor__top_people_item" v-for="item in 3" :key="item">
        <el-rate
          disabled
          v-model="value"
          disabled-void-icon-class="el-icon-user-solid"
          :max="10"
          :icon-classes="iconClasses"
          :colors="colors[item-1]"
        ></el-rate>
        <h3>5,123</h3>
        <h5>登录总人数</h5>
      </div>
    </div>
  </div>
</template>
<script>
import { setInterval } from "timers";
// import DigitRoll from '@huoyu/vue-digitroll';
export default {
  name: "DataMonitorTop",
  components: { DigitRoll: () => import("@huoyu/vue-digitroll") },
  data() {
    return {
      total: 123456,
      countDisplay: [
        { name: "数据总量", total: 123456 },
        { name: "集成部门", total: 123 },
        { name: "集成系统", total: 123 }
      ],
      value: 5,
      iconClasses: [
        "el-icon-user-solid",
        "el-icon-user-solid",
        "el-icon-user-solid"
      ],
      colors: [
        ["#3F64D1", "#3F64D1", "#3F64D1"],
        ["#B36C36", "#B36C36", "#B36C36"],
        ["#1F9978", "#1F9978", "#1F9978"]
      ]
    };
  },
  mounted() {
    setInterval(() => {
      this.restart();
    }, 1000);
  },
  methods: {
    restart() {
      let random = `${Math.random()}`.substr(2).substr(0, 4);
      this.$set(this.countDisplay[0], "total", ++this.total);
    }
  }
};
</script>
<style lang="scss">
.data-monitor__top {
  width: 100%;
  background-image: url("../../../assets/DataMonitor/monitor-top.svg");
  background-repeat: no-repeat;
  background-position: bottom center;
  background-size: cover;
  color: #fff;
  box-sizing: border-box;
  &_num {
    // width: 450px;
    float: left;
    &_item {
      float: left;
      margin-right: 40px;
      p {
        font-size: 14px;
        line-height: 1;
        font-weight: 600;
        margin-bottom: 5px;
      }
      .d-roll-wrapper {
        margin: 0;
        .d-roll-item {
          width: 17px;
          margin-right: 3px;
          background: rgba(63, 100, 209, 1);
          position: relative;
          overflow: unset;
        }
        .d-roll-list {
          li:nth-last-child(3n) {
            margin-left: 17px;
            &::before {
              content: ",";
              display: block;
              width: 17px;
              float: left;
              position: absolute;
              left: -21px;
            }
          }
          li:nth-child(1) {
            margin-left: 0;
            &::before {
              content: unset;
            }
          }
        }
      }
    }
  }
  &_logo {
    position: absolute;
    right: 0;
    left: 0;
    top: 7px;
    margin: auto;
    width: 168px;
    svg {
      width: 20px !important;
      height: 20px !important;
    }
    p {
      float: right;
      font-size: 14px;
    }
  }
  &_grade {
    position: absolute;
    top: 32px;
    right: 0;
    left: 0;
    margin: auto;
    width: 300px;
    display: flex;
    justify-content: space-between;
    > div {
      position: relative;
      flex: 1;
      svg {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        margin: auto;
      }
      p {
        font-size: 12px;
        text-align: center;
        b {
          font-size: 20px;
        }
      }
    }
    > div:nth-child(1) {
      svg {
        width: 50px !important;
        height: 50px !important;
      }
      p:nth-child(2) {
        line-height: 50px;
        color: rgba(153, 46, 46, 1);
      }
    }
    > div:nth-child(2) {
      svg {
        width: 70px !important;
        height: 70px !important;
      }
      p:nth-child(2) {
        color: rgba(179, 108, 54, 1);
        margin-top: 10px;
      }
    }
    > div:nth-child(3) {
      svg {
        width: 50px !important;
        height: 50px !important;
      }
      p:nth-child(2) {
        line-height: 50px;
        color: rgba(63, 100, 209, 1);
      }
    }
  }
  &_people {
    float: right;
    &_item {
      width: 130px;
      float: left;
      margin-left: 30px;
      .el-rate {
        height: 16px;
        text-align: right;
        margin-bottom: 2px;
        &__icon {
          font-size: 12px;
          margin-right: 0;
        }
      }
      h3 {
        font-size: 18px;
        line-height: 1;
        text-align: right;
        margin-bottom: 2px;
      }
      h5 {
        font-size: 14px;
        line-height: 1;
        text-align: right;
      }
    }
    &_item:nth-child(1) {
      margin-left: 0px;
      h3 {
        color: rgba(63, 100, 209, 1);
      }
    }
    &_item:nth-child(2) {
      h3 {
        color: rgba(204, 112, 41, 1);
      }
    }
    &_item:nth-child(3) {
      h3 {
        color: rgba(31, 153, 120, 1);
      }
    }
  }
  @media only screen and (min-width: 0px) and (max-width: 1365px) {
    height: 114px;
    padding: 10px 20px;
  }
  @media only screen and (min-width: 1366px) and (max-width: 1439px) {
    height: 114px;
    padding: 10px 20px;
  }
  @media only screen and (min-width: 1440px) and (max-width: 1599px) {
    height: 120px;
    padding: 20px;
  }
  @media only screen and (min-width: 1600px) and (max-width: 1919px) {
    height: 120px;
    padding: 20px;
  }
  @media only screen and (min-width: 1920px) {
    padding: 20px;
    height: 140px;
    &_logo {
      top: 10px;
    }
    &_grade {
      top: 50px;
    }
  }
}
</style>
