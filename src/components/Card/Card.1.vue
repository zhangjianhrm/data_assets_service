<template>
  <div class="card">
    <el-checkbox
      v-if="checkbox"
      v-model="cardData.checked"
      class="card_checkbox"
      @click.native.stop
      @change="changeClick"
    />
    <p class="card_title">{{cardData.NAME}}</p>
    <div class="card_format" v-if="cardData.format">
      <b v-for="(item,index) in cardData.format" :key="index">{{item}}</b>
    </div>
    <div class="card_details">
      <p v-if="cardData.REFER_CODE_COUNT">
        <span>代码量</span>
        <span>：</span>
        <span>{{cardData.REFER_CODE_COUNT}}</span>
      </p>
      <p v-if="cardData.NUM">
        <span>代码子类</span>
        <span>：</span>
        <span>{{cardData.NUM}}</span>
      </p>
      <p v-if="cardData.ORIGIN">
        <span>来源</span>
        <span>：</span>
        <span>{{cardData.ORIGIN}}</span>
      </p>
      <!-- <p v-for="(item,index) in cardData.details" :key="index">
        <span>{{index | translator}}</span>
        <span>：</span>
        <span>{{item}}</span>
      </p>-->
    </div>
    <div class="card_operation">
      <span>更新时间：{{cardData.UPDATE_TIME}}</span>
      <div>
        <svg-icon icon-class="collects" @click.stop="collects(cardData)" />
        <span>{{cardData.COLLECT_NUM}}</span>
        <svg-icon icon-class="download.2" @click.stop="download(cardData)" />
        <span>{{cardData.DOWNLOAD_NUM}}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Card",
  props: {
    cardData: {
      type: Object,
      default: () => {
        return {};
      }
    },
    checkbox: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return { checked: false };
  },
  methods: {
    // 点击 checkbox
    changeClick(bool) {
      this.$emit("cardSelected", this.cardData, bool);
    },
    // 按钮触发事件
    goDetails() {
      this.$emit("goDetails", this.cardData);
    },
    // 收藏
    collects(data) {
      this.$message({
        message: "收藏 " + JSON.stringify(data),
        type: "success"
      });
    },
    // 下载
    download(data) {
      this.$message({
        message: "下载 " + JSON.stringify(data),
        type: "success"
      });
    }
  },
  filters: {
    translator: value => {
      switch (value) {
        case "subclass":
          return "代码子类";
        case "source":
          return "来源";
        default:
          return value;
      }
    }
  },
  mounted() {}
};
</script>
<style lang="scss">
@import "~@/styles/variables.scss";
.card {
  float: left;
  box-sizing: border-box;
  width: 406px;
  // height: 227px;
  padding: 30px 30px 0;
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.15);
  position: relative;
  margin-right: 31px;
  margin-bottom: 31px;
  transition: all 0.4s;
  border-radius: 4px;
  background: #fff;
  overflow: hidden;
  &:nth-child(3n) {
    margin-right: 0;
  }
  &:hover {
    box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.28);
    transform: scale(1.02, 1.02);
    z-index: 2;
  }
  &_checkbox {
    // visibility: hidden;
    position: absolute;
    top: 8px;
    right: 10px;
    margin-right: 0;
  }
  &_title {
    font-size: 18px;
    line-height: 22px;
    font-weight: bold;
    color: $color-header;
    margin-bottom: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    cursor: pointer;
  }
  &_format {
    width: 100%;
    height: 24px;
    margin-bottom: 10px;
    b {
      float: left;
      width: 47px;
      height: 100%;
      // margin-right: 4px;
      color: #fff;
      text-align: center;
      font-size: 12px;
      line-height: 24px;
      &:nth-child(1) {
        background: #39259e;
        border-radius: 4px 0 0 4px;
      }
      &:nth-child(2) {
        background: #444f84;
      }
      &:nth-child(3) {
        background: #2b92ff;
      }
      &:nth-child(4) {
        background: #ffa32b;
      }
      &:nth-last-child(1) {
        border-radius: 0 4px 4px 0;
      }
    }
  }
  &_details {
    cursor: default;
    color: $color-header-50;
    font-size: 14px;
    overflow: hidden;
    margin-bottom: 80px;
    p {
      span:nth-child(1) {
        float: left;
        width: 56px;
        text-align-last: justify;
      }
      span:nth-child(3) {
        float: right;
        width: 270px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
    }
  }
  &_operation {
    position: absolute;
    bottom: 0;
    width: 346px;
    height: 60px;
    line-height: 60px;
    color: $color-header-50;
    border-top: 1px $color-header-10 solid;
    font-size: 14px;
    > span {
      float: left;
    }
    > div {
      float: right;
      svg {
        margin-right: 7px;
        cursor: pointer;
      }
      svg:nth-child(1) {
        &:hover {
          color: rgb(255, 50, 50);
        }
      }
      span:nth-child(2) {
        margin-right: 20px;
      }
    }
  }
}
</style>
