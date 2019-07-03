<template>
  <div class="data-catalog-category">
    <el-tabs tab-position="left" class="data-catalog-category_content">
      <el-tab-pane label="用户管理">
        <div class="data-catalog-category_content_item" v-for="item in 15" :key="item">部门</div>
      </el-tab-pane>
      <el-tab-pane label="配置管理">
        <div class="data-catalog-category_content_item" v-for="item in 3" :key="item">部门</div>
      </el-tab-pane>
      <el-tab-pane label="角色管理">
        <div class="data-catalog-category_content_item" v-for="item in 9" :key="item">部门</div>
      </el-tab-pane>
      <el-tab-pane label="定时任务补偿">
        <div class="data-catalog-category_content_item" v-for="item in 12" :key="item">部门</div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  name: "DataCatalogCategory"
};
</script>
<style lang="scss">
.data-catalog-category {
  height: 562px;
  background: rgba(250, 250, 250, 1);
  display: flex;
  justify-content: center;
  &_content {
    width: 1280px;
    height: 400px;
    margin-top: 70px;
    .el-tabs__item.is-left {
      height: 100px;
      width: 190px;
      background: rgba(9, 0, 41, 1);
      color: #fff;
      text-align: center;
      line-height: 100px;
      font-size: 18px;
      &.is-active {
        background: rgba(44, 98, 255, 1);
      }
    }
    .el-tabs__header.is-left {
      margin-right: 50px;
    }
    &_item {
      float: left;
      width: 154px;
      height: 118px;
      background: rgba(255, 255, 255, 1);
      border: 1px solid rgba(12, 0, 53, 0.1);
      margin-right: 21px;
      margin-bottom: 20px;
      text-align: center;
      line-height: 118px;
      &:nth-child(6n) {
        margin-right: 0;
      }
    }
  }
}
</style>
