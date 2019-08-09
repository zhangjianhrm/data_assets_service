<template>
  <div class="monitor-select" @click.stop="showOptions">
    <b class="monitor-select_value">{{valueTrans}}</b>
    <i class="monitor-select_arrow el-icon-arrow-down" ref="arrow"></i>
    <i
      v-if="clearable"
      v-show="!optionsVisible && currentValue != ''"
      class="monitor-select_clear el-icon-circle-close"
      @click="currentValue = ''"
    ></i>
    <div class="monitor-select_options" v-show="optionsVisible">
      <div
        class="monitor-select_options_item"
        v-for="(item,index) in options"
        :key="index"
        @click.stop="select(item.value)"
      >{{item.label}}</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Select",
  model: {
    prop: "currentValue",
    event: "change"
  },
  props: {
    currentValue: [String, Number],
    options: {
      type: Array,
      default: () => {
        return [];
      }
    },
    clearable: { type: Boolean, default: false }
  },
  data() {
    return { optionsVisible: false };
  },
  mounted() {
    let body = document.querySelector("body");
    body.addEventListener("click", () => {
      this.optionsVisible = false;
    });
  },
  methods: {
    // 展开选项
    showOptions() {
      this.optionsVisible = !this.optionsVisible;
    },
    // 传值
    select(value) {
      this.$emit("change", value);
      this.optionsVisible = false;
    }
  },
  watch: {
    optionsVisible(n, o) {
      let arrow = this.$refs.arrow;
      if (n) {
        arrow.classList.add("selectBtnTrans");
      } else {
        arrow.classList.remove("selectBtnTrans");
      }
    }
  },
  computed: {
    valueTrans() {
      for (let i = 0; i < this.options.length; i++) {
        if (this.currentValue === this.options[i].value) {
          return this.options[i].label;
        }
      }
    }
  }
};
</script>
<style lang="scss">
.monitor-select {
  width: 73px;
  height: 27px;
  background: url(../../assets/ISM/select.png);
  position: relative;
  cursor: pointer;
  &_value {
    color: #fff;
    font-size: 12px;
    margin: 0 12px;
  }
  &_clear {
    position: absolute;
    right: 20px;
    color: #fff;
    font-size: 12px;
    line-height: 27px;
  }
  &_arrow {
    position: absolute;
    right: 6px;
    color: #fff;
    font-size: 12px;
    line-height: 27px;
    text-align: center;
    z-index: 2;
    transition: all 0.3s;
  }
  &_options {
    position: absolute;
    top: 30px;
    left: 0px;
    border: 1px solid rgba(39, 115, 230, 0.4);
    border-bottom: none;
    border-right: none;
    width: 100px;
    z-index: 1;
    &_item {
      color: #fff;
      height: 27px;
      line-height: 27px;
      border-right: 1px solid rgba(39, 115, 230, 0.4);
      border-bottom: 1px solid rgba(39, 115, 230, 0.4);
      background-color: rgba(13, 29, 76, 0.4);
      text-indent: 12px;
      font-size: 12px;
      &:hover {
        background: rgba(31, 70, 144, 1);
      }
    }
  }
  .selectBtnTrans {
    transform: rotate(180deg);
  }
}
</style>
