<template>
  <div class="ISM">
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
              v-for="(item,index) in RsGType"
              :key="index"
              :class="currentRsGType == item.type ? 'activeRsGType':''"
              @click="selectType(item.type)"
            >
              <div></div>
              <span>{{item.name}}</span>
            </div>
          </div>
          <div class="ISM_card_left_top_date">
            <monitor-select v-model="currentType" :options="typeList"></monitor-select>
          </div>
        </div>
        <div class="ISM_card_left_bottom ISM-card">
          <div class="ISM-card-top"></div>
          <div class="ISM-card-center"></div>
          <div class="ISM-card-bottom"></div>
        </div>
      </div>
      <div class="ISM_card_center">
        <div class="ISM_card_center_top ISM-card">
          <div class="ISM-card-top"></div>
          <div class="ISM-card-center"></div>
          <div class="ISM-card-bottom"></div>
          <div class="ISM-card-title">信息标准下载/收藏/浏览TOP10</div>
        </div>
        <div class="ISM_card_center_bottom ISM-card">
          <div class="ISM-card-top"></div>
          <div class="ISM-card-center"></div>
          <div class="ISM-card-bottom"></div>
        </div>
      </div>
      <div class="ISM_card_right ISM-card">
        <div class="ISM-card-top"></div>
        <div class="ISM-card-center"></div>
        <div class="ISM-card-bottom"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "ISMonitor",
  components: {
    MonitorSelect: () => import("@/components/Select/MonitorSelect")
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
      // 分析图类型
      RsGType: [
        { name: "下载", type: "downloads" },
        { name: "收藏", type: "collects" },
        { name: "浏览", type: "visit" }
      ],
      currentRsGType: "downloads",
      typeList: [
        {
          value: "model",
          label: "模型"
        },
        {
          value: "code",
          label: "代码"
        }
      ],
      currentType: "code"
    };
  },
  methods: {
    selectType(type) {
      this.currentRsGType = type;
    },
    selectDB(item) {
      this.selectDBvisible = !this.selectDBvisible;
      if (item) {
        this.currentDB = item;
      }
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
        }
      }
      &_bottom {
        width: 430px;
        height: 200px;
      }
    }
    &_center {
      &_top {
        width: 430px;
        height: 230px;
        margin-bottom: 20px;
      }
      &_bottom {
        width: 430px;
        height: 200px;
      }
    }
    &_right {
      width: 430px;
      height: 450px;
    }
  }
  .ISM-card {
    position: relative;
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
      font-size: 14px;
      color: rgba(41, 193, 204, 1);
      line-height: 30px;
      position: relative;
    }
  }
  .activeRsGType {
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
