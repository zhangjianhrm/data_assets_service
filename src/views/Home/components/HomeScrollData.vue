<template>
  <div class="home__scroll_data">
    <span>数据总量</span>
    <div>
      <i>{{time | formatDate}}</i>
      <digit-roll :rollDigits="endVal" />
    </div>
    <span>条</span>
  </div>
</template>
<script>
export default {
  name: "HomeScrollData",
  components: { DigitRoll: () => import("@huoyu/vue-digitroll") },
  data() {
    return {
      // 最终值
      endVal: 1546231234,
      time: Date.parse(new Date())
    };
  },
  created() {
    this.getTime();
  },
  destroyed() {
    clearTimeout(this.timer);
  },
  methods: {
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
  height: 56px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  > span {
    font-size: 18px;
    line-height: 30px;
    color: rgba(159, 184, 255, 1);
    font-weight: 600;
  }
  > div {
    color: #fff;
    font-size: 56px;
    position: relative;
    margin: 0 10px;
    .d-roll-wrapper {
      margin: 0;
      .d-roll-item {
        // height: 56px !important;
        position: relative;
        overflow: unset;
      }
      .d-roll-item > .d-roll-bar > div {
        line-height: 56px !important;
      }
      .d-roll-list {
        li:nth-last-child(3n) {
          margin-left: 30px;
          &::before {
            content: ",";
            display: block;
            width: 30px;
            line-height: 56px;
            position: absolute;
            left: -36px;
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
    > i {
      position: absolute;
      top: -16px;
      right: 0px;
      font-size: 16px;
      line-height: 1;
      font-style: normal;
    }
  }
}
</style>
