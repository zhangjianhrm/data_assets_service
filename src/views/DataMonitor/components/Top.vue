<template>
  <div class="data-monitor__top">
    <div class="data-monitor__top_num">
      <div class="data-monitor__top_num_item" v-for="(item,index) in countDisplay" :key="index">
        <p>{{item.name}}</p>
        <span
          v-for="(item,index) in item.total"
          :key="index"
          :class="item != ',' ? 'num':'comma'"
        >{{item}}</span>
      </div>
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
        <h5>登录总人数</h5>
        <h3>5,123</h3>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "DataMonitorTop",
  data() {
    return {
      total: [1, 2, ",", 2, 1, 2, ",", 2, 1, 2],
      countDisplay: [
        { name: "数据总量", total: [1, 2, ",", 2, 1, 2, ",", 2, 1, 2] },
        { name: "集成部门个数", total: [2, 1, 2] },
        { name: "集成系统", total: [2, 1, 2] }
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
  }
};
</script>
<style lang="scss">
.data-monitor__top {
  width: 100%;
  height: 150px;
  background-image: url("../../../assets/DataMonitor/top.png");
  background-position: center;
  color: #fff;
  padding: 15px 20px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  &_num {
    width: 450px;
    &_item {
      float: left;
      margin-right: 40px;
      p {
        font-size: 12px;
        font-weight: 600;
        margin-bottom: 5px;
      }
      span {
        float: left;
        width: 17px;
        height: 27px;
        line-height: 27px;
        font-size: 20px;
        &.num {
          margin-right: 3px;
          background: rgba(63, 100, 209, 1);
          text-align: center;
        }
        &.comma {
          background: none;
        }
      }
    }
  }
  &_grade {
    width: 300px;
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    > div {
      position: relative;
      width: 90px;
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
        width: 60px !important;
        height: 60px !important;
      }
      p:nth-child(2) {
        line-height: 60px;
        color: rgba(153, 46, 46, 1);
      }
    }
    > div:nth-child(2) {
      svg {
        width: 80px !important;
        height: 80px !important;
      }
      p:nth-child(2) {
        color: rgba(179, 108, 54, 1);
        margin-top: 14px;
      }
    }
    > div:nth-child(3) {
      svg {
        width: 60px !important;
        height: 60px !important;
      }
      p:nth-child(2) {
        line-height: 60px;
        color: rgba(63, 100, 209, 1);
      }
    }
  }
  &_people {
    width: 450px;
    &_item {
      width: 120px;
      float: left;
      margin-left: 30px;
      h5 {
        font-size: 12px;
        text-align: right;
      }
      h3 {
        font-size: 20px;
        text-align: right;
      }
      .el-rate__icon {
        font-size: 12px;
        margin-right: 0;
      }
    }
    &_item:nth-child(1) {
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
}
</style>
