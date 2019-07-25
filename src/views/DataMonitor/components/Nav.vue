<template>
  <div class="data-monitor__nav">
    <el-tooltip
      class="item"
      effect="light"
      placement="top"
      v-for="(item,index) in navItem"
      :key="index"
      :content="item.name"
    >
      <div class="data-monitor__nav_item" @click="$router.push(item.route)">
        <i :class="item.icon"></i>
      </div>
    </el-tooltip>
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
  width: 600px;
  height: 100px;
  // background: rgba(255, 255, 255, 0.5);
  display: flex;
  justify-content: space-between;
  &:hover {
    .data-monitor__nav_item {
      transform: translateY(50px);
    }
  }
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
    transform: translateY(-50px);
    transition: all 0.4s;
  }
}
</style>
