<template>
  <div class="code-standard">
    <el-tabs v-model="activeName2">
      <el-tab-pane name="executionCode" label="学校执行代码">
        <p class="code-standard_count">
          <span>
            相关：
            <b>2</b>个代码类，
            <b>20</b>个代码子类，
            <b>200</b>条代码。
          </span>
          <span>可访问：4个代码类，360个代码子类，10823条代码。</span>
          <button class="button small">
            <svg-icon icon-class="download" />
            <span>下载执行代码</span>
          </button>
        </p>
        <div class="code-standard_code">
          <div
            v-for="(item,index) in executionCode"
            :key="index"
            @click="$router.push('/info_standard/subpage')"
          >
            <svg-icon :icon-class="item.icon" />
            <b :style="item.emphasize?'color:#2C62FF':''">{{item.name}}</b>
          </div>
        </div>
        <button class="button medium" @click="expandAll" id="expand-all-excution-code">
          <span>展开全部代码</span>
          <i class="el-icon-arrow-down"></i>
        </button>
      </el-tab-pane>
      <el-tab-pane name="cankaodaima" label="国家标准代码">sssssssssssssssssssss</el-tab-pane>
    </el-tabs>
    <!-- 执行代码采标率 -->
    <rate-bar-graph></rate-bar-graph>
  </div>
</template>
<script>
export default {
  name: "CodeStandard",
  components: {
    RateBarGraph: () => import("@/views/InfoStandard/components/RateBarGraph")
  },
  data() {
    return {
      activeName2: "executionCode",
      executionCodeToggle: true,
      executionCode: [
        { icon: "people", name: "教职工", emphasize: true },
        { icon: "people", name: "教职工", emphasize: true },
        { icon: "people", name: "教职工", emphasize: false },
        { icon: "people", name: "教职工", emphasize: false },
        { icon: "people", name: "教职工", emphasize: false },
        { icon: "people", name: "教职工", emphasize: false },
        { icon: "people", name: "教职工", emphasize: false },
        { icon: "people", name: "教职工", emphasize: false },
        { icon: "people", name: "教职工", emphasize: false },
        { icon: "people", name: "教职工", emphasize: false },
        { icon: "people", name: "教职工", emphasize: false },
        { icon: "people", name: "教职工", emphasize: false },
        { icon: "people", name: "教职工", emphasize: false },
        { icon: "people", name: "教职工", emphasize: false },
        { icon: "people", name: "教职工", emphasize: false },
        { icon: "people", name: "教职工", emphasize: false },
        { icon: "people", name: "教职工", emphasize: false },
        { icon: "people", name: "教职工", emphasize: false },
        { icon: "people", name: "教职工", emphasize: false },
        { icon: "people", name: "教职工", emphasize: false }
      ]
    };
  },
  methods: {
    // 展开全部代码
    expandAll() {
      if (this.executionCodeToggle) {
        document.querySelector(".code-standard_code").style.maxHeight = "unset";
        this.executionCodeToggle = false;
        document.querySelector("#expand-all-excution-code").innerHTML =
          '<span>收起</span><i class="el-icon-arrow-up"></i>';
      } else {
        document.querySelector(".code-standard_code").style.maxHeight = "260px";
        this.executionCodeToggle = true;
        document.querySelector("#expand-all-excution-code").innerHTML =
          '<span>展开全部代码</span><i class="el-icon-arrow-down"></i>';
      }
    }
  }
};
</script>
<style lang="scss">
@import "~@/styles/variables.scss";
.code-standard {
  margin-top: 20px;
  .el-tabs {
    &__header {
      box-shadow: unset;
    }
    &__nav-scroll {
      display: flex;
      justify-content: center;
    }
    &__nav-wrap::after {
      background: transparent;
    }
    &__item {
      height: 50px;
      line-height: 50px;
      color: $color-header;
      font-size: 28px;
      font-weight: bold;
    }
    &__active-bar {
      background: $color-blue;
      height: 3px;
    }
    &__item.is-active {
      color: $color-header;
    }
    &__content {
      > div {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-bottom: 45px;
      }
    }
  }
  &_count {
    font-size: 14px;
    color: $color-header;
    margin-bottom: 26px;
    > span {
      b {
        font-size: 16px;
      }
    }
    > span:nth-child(2) {
      opacity: 0.5;
    }
  }
  &_code {
    width: 1280px;
    overflow: hidden;
    max-height: 260px;
    margin-bottom: 20px;
    > div {
      float: left;
      width: 60px;
      margin: 14px 50px;
      text-align: center;
      cursor: pointer;
      svg {
        width: 60px !important;
        height: 60px !important;
      }
      b {
        font-size: 16px;
        line-height: 40px;
        color: $color-header;
      }
      &:hover {
        svg {
          fill: $color-blue;
        }
        b {
          color: $color-blue;
        }
      }
    }
  }
}
</style>
