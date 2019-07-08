<template>
  <div class="info-standard">
    <div class="info-standard__title">
      <h3>信息标准</h3>
      <p>此处为信息标准模块的简单介绍，此处为信息标准模块的简单介绍，此处为信息标准模块的简单介绍。</p>
    </div>
    <!-- 代码标准、模型标准、信息标准管理规范 -->
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane name="code-standard">
        <span slot="label">
          <svg-icon icon-class="info-standard" />
          <b>代码标准</b>
        </span>
        <code-standard></code-standard>
      </el-tab-pane>
      <el-tab-pane name="model-standard">
        <span slot="label">
          <svg-icon icon-class="model-standard" />
          <b>模型标准</b>
        </span>
        <model-standard></model-standard>
      </el-tab-pane>
      <el-tab-pane name="management-norms">
        <span slot="label">
          <svg-icon icon-class="info-standard-management-specification" />
          <b>信息标准管理规范</b>
        </span>
        <management-norms></management-norms>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  name: "InfoStandard",
  components: {
    CodeStandard: () => import("@/views/InfoStandard/components/CodeStandard"),
    ModelStandard: () =>
      import("@/views/InfoStandard/components/ModelStandard"),
    ManagementNorms: () =>
      import("@/views/InfoStandard/components/ManagementNorms")
  },
  data() {
    return {
      activeName: "code-standard"
    };
  },
  methods: {
    handleClick(tab, event) {
      // eslint-disable-next-line
      console.log(tab, event);
    }
  }
};
</script>
<style lang="scss">
@import "~@/styles/variables.scss";
.info-standard {
  width: 100%;
  &__title {
    width: 100%;
    height: 160px;
    text-align: center;
    background: $color-header;
    color: #fff;
    overflow: hidden;
    h3 {
      font-size: 28px;
      line-height: 40px;
      margin-top: 30px;
    }
    p {
      font-size: 16px;
      line-height: 30px;
      margin-top: 10px;
      opacity: 0.6;
    }
  }
  .el-tabs {
    &__header {
      box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.2);
    }
    &__nav-scroll {
      display: flex;
      justify-content: center;
    }
    &__nav-wrap::after {
      background: transparent;
    }
    &__item {
      height: 60px;
      line-height: 60px;
      color: $color-header;
      > span {
        padding: 0 10px;
        box-sizing: border-box;
        > b {
          margin-left: 4px;
        }
      }
    }
    &__active-bar {
      background: $color-blue;
      height: 4px;
    }
    &__item.is-active {
      color: $color-header;
    }
  }
}
</style>
