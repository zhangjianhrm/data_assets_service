<template>
  <div class="data-monitor__live">
    <h5>
      <svg-icon icon-class="tit"></svg-icon>
      <span>实时操作提醒</span>
      <!-- <span @click="add" style="float:right;">更新</span> -->
    </h5>
    <div class="data-monitor__live_content">
      <transition-group name="list-complete" tag="div">
        <p v-for="item in table" :key="item" class="list-complete-item">
          <span>{{ item }}</span>
          <span>2019-07-25 15:28</span>
        </p>
      </transition-group>
    </div>
  </div>
</template>
<script>
import { setInterval } from "timers";
export default {
  data() {
    return {
      table: [
        "用户 3 下载了数据目录",
        "用户 2 下载了很多很多很多的数据目录",
        "用户 1 下载了数据目录"
      ],
      nextNum: 4
    };
  },
  mounted() {
    setInterval(() => {
      this.add();
    }, 5000);
  },
  methods: {
    add() {
      this.table.splice(0, 0, "用户 " + this.nextNum++ + " 下载了数据目录");
    }
  }
};
</script>
<style lang="scss">
.data-monitor__live {
  width: 350px;
  height: 138px;
  background: linear-gradient(rgba(11, 1, 52, 0.5), rgba(23, 41, 77, 1));
  border: 2px solid rgba(32, 82, 160, 1);
  color: #fff;
  box-sizing: border-box;
  padding: 14px;
  position: relative;
  overflow: hidden;
  > h5 {
    height: 14px;
    line-height: 1;
    font-size: 14px;
    margin-bottom: 10px;
    svg {
      margin-right: 4px;
    }
    span {
      color: rgba(41, 193, 204, 1);
      cursor: pointer;
    }
  }
  &_content {
    font-size: 12px;
    width: 100%;
    // height: 78px;
    // overflow: hidden;
    p {
      height: 26px;
      line-height: 26px;
      padding: 0 10px;
      span:nth-child(1) {
        float: left;
        width: 50%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      span:nth-child(2) {
        float: right;
      }
      &:nth-child(1) {
        color: rgba(216, 64, 64, 1);
        background: rgba(0, 114, 201, 0.1);
      }
      &:nth-child(2) {
        color: rgba(204, 112, 41, 1);
      }
      &:nth-child(3) {
        color: rgba(179, 156, 54, 1);
        background: rgba(0, 114, 201, 0.1);
      }
      &:nth-child(4) {
        line-height: 100px;
        color: transparent;
      }
    }
  }
}
.list-complete-item {
  transition: all 1s;
}
.list-complete-enter,
.list-complete-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
.list-complete-leave-active {
  position: absolute;
}
</style>
