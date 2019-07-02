<template>
  <div class="home__scroll_data">
    <span>数据总量</span>
    <b>
      <i>{{time | formatDate}}</i>
      <count-to :startVal="startVal" :endVal="endVal" :duration="duration" separator=","></count-to>
    </b>
    <span>条</span>
  </div>
</template>
<script>
import countTo from "vue-count-to";
export default {
  name: "HomeScrollData",
  components: { countTo },
  data() {
    return {
      // 需要滚动的时间
      duration: 1000,
      // 初始值
      startVal: 0,
      // 最终值
      endVal: 1546234582581,
      time: Date.parse(new Date())
    };
  },
  created() {
    this.getData();
    this.getTime();
  },
  destroyed() {
    clearTimeout(this.timer);
  },
  methods: {
    // 这是获取数据的函数
    getData() {
      this.endVal += 75;
    },
    getTime() {
      this.time += 1000;
    },
    // 数据定时器
    timerData() {
      return setTimeout(() => {
        this.getData();
      }, 5000);
    },
    // 时间定时器
    timerTime() {
      return setTimeout(() => {
        this.getTime();
      }, 1000);
    }
  },
  watch: {
    // endVal() {
    //   this.timerData();
    // },
    time() {
      this.timerTime();
    }
  }
};
</script>
<style lang="scss">
@import "~@/styles/variables.scss";
.home__scroll_data {
  width: 1210px;
  height: 60px;
  text-align: center;
  > span {
    font-size: 18px;
    color: rgba(159, 184, 255, 1);
    font-weight: bolder;
  }
  > b {
    color: #fff;
    font-size: 56px;
    position: relative;
    > i {
      position: absolute;
      top: -14px;
      right: 20px;
      font-size: 16px;
      font-style: normal;
      font-weight: normal;
    }
  }
}
</style>
