<template>
  <div class="data-monitor__nav">
    <div class="data-monitor__nav_wrap">
      <el-tooltip effect="light" content="返回">
        <div class="data-monitor__nav_wrap_item" @click="$router.go(-1)">
          <i class="el-icon-back"></i>
        </div>
      </el-tooltip>
      <el-tooltip effect="light" v-for="(item,index) in navItem" :key="index" :content="item.name">
        <div class="data-monitor__nav_wrap_item" @click="$router.push(item.route)">
          <i :class="item.icon"></i>
        </div>
      </el-tooltip>
    </div>
  </div>
</template>
<script>
export default {
  name: "DataMonitorNav",
  data() {
    return {
      navItem: [
        { name: "首页", route: "/", icon: "el-icon-house" },
        {
          name: "信息标准",
          route: "/info_standard",
          icon: "el-icon-collection"
        },
        { name: "数据目录", route: "/data_catalog", icon: "el-icon-files" },
        { name: "API 目录", route: "/x", icon: "el-icon-connection" },
        {
          name: "数据管理",
          route: "/data_management",
          icon: "el-icon-bangzhu"
        },
        {
          name: "数据质量",
          route: "/data_quality",
          icon: "el-icon-pie-chart"
        },
        {
          name: "数据监控与统计",
          route: "/data_monitor",
          icon: "el-icon-data-analysis"
        }
      ]
    };
  }
};
</script>
<style lang="scss">
@import "~@/styles/variables.scss";
.data-monitor__nav {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  margin: auto;
  width: 100vw;
  height: 20px;
  // background: rgba(255, 255, 255, 0.5);
  z-index: 999;
  &_wrap {
    width: 700px;
    height: 50px;
    display: flex;
    justify-content: space-between;
    margin: 0 auto;
    transform: translateY(-50px);
    transition: all 0.4s;
    // background: rgba(255, 255, 255, 0.5);
    &_item {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: rgba(40, 40, 40, 0.9);
      color: rgba(255, 255, 255, 1);
      text-align: center;
      line-height: 50px;
      font-size: 20px;
      cursor: pointer;
    }
  }
  &:hover {
    .data-monitor__nav_wrap {
      transform: translateY(20px);
    }
  }
}
</style>
