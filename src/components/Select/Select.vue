<template>
  <div class="select">
    <b v-show="!selectDBvisible">{{currentDB}}</b>
    <i class="ISM_card_left_top_date_arrow el-icon-arrow-down" @click.stop="selectDB()"></i>
    <i
      v-show="!selectDBvisible && currentDB != ''"
      class="ISM_card_left_top_date_clear el-icon-circle-close"
      @click="currentDB = ''"
    ></i>
    <div class="ISM_card_left_top_date_items" v-show="selectDBvisible">
      <div
        v-for="(item,index) in DBList"
        :key="index"
        @click.stop="selectDB(item.label)"
      >{{item.label}}</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Select",
  props: {
    options: {
      type: Array,
      default: () => {
        return [
          {
            value: "选项1",
            label: "选项1"
          },
          {
            value: "选项2",
            label: "选项2"
          }
        ];
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.select {
  width: 73px;
  height: 27px;
  background: url(../../../assets/ISM/select.png);
  cursor: pointer;
  > b {
    color: #fff;
    font-size: 12px;
    margin: 0 12px;
  }
  &_clear {
    float: right;
    color: #fff;
    font-size: 14px;
    line-height: 38px;
  }
  &_arrow {
    float: right;
    color: #fff;
    font-size: 12px;
    font-weight: bold;
    line-height: 38px;
    text-align: center;
    width: 34px;
    position: relative;
    z-index: 2;
    transition: all 0.3s;
  }
  &_items {
    position: absolute;
    top: 2px;
    right: 16px;
    border: 1px solid rgba(39, 115, 230, 0.4);
    border-bottom: none;
    border-right: none;
    width: 140px;
    z-index: 1;
    > div {
      color: #fff;
      height: 33px;
      line-height: 33px;
      border-right: 1px solid rgba(39, 115, 230, 0.4);
      border-bottom: 1px solid rgba(39, 115, 230, 0.4);
      background-color: rgba(13, 29, 76, 0.4);
      text-indent: 12px;
      font-size: 12px;
      &:hover {
        background: rgba(31, 70, 144, 1);
      }
      &:nth-child(1) {
        border-right: none;
      }
    }
  }
}
</style>
