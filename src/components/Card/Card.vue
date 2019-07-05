<template>
  <div class="card">
    <el-checkbox v-if="checkbox" v-model="checked" class="card_checkbox" @change="changeCheck" />
    <p
      class="card_title"
      @click="$router.push('/info_standard/subpage/sanjiyemian')"
    >{{cardData.title}}</p>
    <div class="card_format" v-if="cardData.format">
      <b v-for="(item,index) in cardData.format" :key="index">{{item}}</b>
    </div>
    <div class="card_details" @click="$router.push('/info_standard/subpage/sanjiyemian')">
      <p>
        <span>数据量</span>
        <span>：</span>
        <span>{{cardData.count}}</span>
      </p>
      <p v-for="(item,index) in cardData.details" :key="index">
        <span>{{index | translator}}</span>
        <span>：</span>
        <span>{{item}}</span>
      </p>
    </div>
    <div class="card_operation">
      <span>更新时间：{{cardData.update | formatDate}}</span>
      <div>
        <svg-icon icon-class="collects" @click="collects(cardData)" style="cursor:pointer;" />
        <span>{{cardData.collects}}</span>
        <svg-icon icon-class="download.2" @click="download(cardData)" style="cursor:pointer;" />
        <span>{{cardData.downloads}}</span>
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
    changeCheck(bool) {
      this.$emit("cardSelected", this.cardData, bool);
    },
    // 按钮触发事件
    goDetails() {
      this.$emit("goDetails", this.cardData);
    },
    // 点赞
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
          return "数据子类";
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
<style lang="scss" scoped>
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
    // .card_checkbox {
    //   visibility: visible;
    // }
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
    margin-bottom: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    cursor: pointer;
  }
  &_format {
    width: 100%;
    height: 22px;
    margin-bottom: 4px;
    b {
      float: left;
      width: 47px;
      height: 22px;
      margin-right: 4px;
      color: #fff;
      text-align: center;
      font-size: 12px;
      line-height: 22px;
      &:nth-child(1) {
        background: #39259e;
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
    line-height: 60px;
    color: $color-header-50;
    border-top: 1px $color-header-10 solid;
    font-size: 14px;
    > div {
      float: right;
      svg {
        margin-right: 7px;
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
