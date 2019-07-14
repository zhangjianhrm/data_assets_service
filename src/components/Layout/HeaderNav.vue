<template>
  <el-menu
    router
    mode="horizontal"
    text-color="#fff"
    active-text-color="#fff"
    background-color="#0c0035"
    :class="opacity == false?'header':'header opacity'"
    :default-active="activeIndex"
    @select="handleSelect"
  >
    <el-menu-item index="/">
      <img :src="logo" />
    </el-menu-item>
    <el-menu-item v-for="(item,index) in navItem" :key="index" :index="item.route">{{item.name}}</el-menu-item>
    <el-menu-item index="/" class="header__avatar">
      <img src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
    </el-menu-item>
  </el-menu>
</template>
<script>
export default {
  name: "HeaderNav",
  props: {
    opacity: {
      type: Boolean,
      default: () => {
        return false;
      }
    }
  },
  data() {
    return {
      logo: require("@/assets/sw.png"),
      navItem: [
        { name: "首页", route: "/" },
        // { name: "新首页", route: "/new_home" },
        { name: "信息标准", route: "/info_standard" },
        { name: "数据目录", route: "/data_catalog" },
        { name: "API 目录", route: "/x" },
        { name: "数据管理", route: "/data_management" },
        { name: "数据质量", route: "/data_quality" },
        { name: "数据监控与统计", route: "/data_monitor" },
        // { name: "数据地图", route: "/data_map" }
      ],
      activeIndex: this.$route.path.match(/\/\w*/)[0]
    };
  },
  created() {},
  methods: {
    handleSelect(key, keyPath) {
      // eslint-disable-next-line
      this.$nextTick(() => {
        // console.log(key, keyPath);
        // console.log(this.$route.path.match(/\/\w*/)[0]);
        // console.log(window.location.href);
      });
    }
  }
};
</script>
<style lang="scss">
@import "~@/styles/variables.scss";
.opacity {
  background: transparent !important;
  .el-menu-item {
    background: transparent !important;
  }
}
.header {
  border-bottom: none !important;
  width: 100%;
  .el-menu-item {
    background: transparent !important;
    height: 80px !important;
    line-height: 80px !important;
    &.is-active {
      border-bottom: 4px solid $color-blue !important;
    }
    &:nth-child(1) {
      border-bottom: none !important;
    }
    &:nth-last-child(1) {
      border-bottom: none !important;
    }
  }
  &__avatar {
    float: right !important;
    img {
      border-radius: 50%;
      height: 50%;
    }
  }
}
</style>
