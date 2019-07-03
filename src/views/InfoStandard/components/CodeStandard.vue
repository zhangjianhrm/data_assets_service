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
            <p :style="item.emphasize?'color:#2C62FF':''">{{item.name}}</p>
          </div>
        </div>
        <button
          class="button medium"
          id="expand-all-excution-code"
          v-if="executionCode.length > 16"
          @click="expandAll"
        >
          <span>展开全部代码</span>
          <i class="el-icon-arrow-down"></i>
        </button>
      </el-tab-pane>
      <el-tab-pane name="cankaodaima" label="国家标准代码">
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
            v-for="(item,index) in standardCode"
            :key="index"
            @click="$router.push('/info_standard/subpage')"
          >
            <svg-icon :icon-class="item.icon" />
            <p :style="item.emphasize?'color:#2C62FF':''">{{item.name}}</p>
          </div>
        </div>
        <button
          class="button medium"
          id="expand-all-excution-code"
          v-if="standardCode.length > 16"
          @click="expandAll"
        >
          <span>展开全部代码</span>
          <i class="el-icon-arrow-down"></i>
        </button>
      </el-tab-pane>
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
        { icon: "code-icon-1", name: "办公与档案管理", emphasize: true },
        { icon: "code-icon-2", name: "教职工管理", emphasize: true },
        { icon: "code-icon-3", name: "教学管理", emphasize: false },
        { icon: "code-icon-4", name: "科研管理", emphasize: false },
        { icon: "code-icon-5", name: "通用人员管理", emphasize: false },
        { icon: "code-icon-6", name: "学生管理", emphasize: false },
        { icon: "code-icon-7", name: "学校管理", emphasize: false },
        { icon: "code-icon-8", name: "一卡通管理", emphasize: false },
        { icon: "code-icon-2", name: "一卡通管理", emphasize: false },
        { icon: "code-icon-1", name: "一卡通管理", emphasize: false },
        { icon: "code-icon-9", name: "资产管理", emphasize: false },
        { icon: "code-icon-10", name: "资产管理", emphasize: false },
        { icon: "code-icon-11", name: "资产管理", emphasize: false },
        { icon: "code-icon-7", name: "资产管理", emphasize: false },
        { icon: "code-icon-3", name: "资产管理", emphasize: false },
        { icon: "code-icon-5", name: "资产管理", emphasize: false },
        { icon: "code-icon-12", name: "资产管理", emphasize: false },
        { icon: "code-icon-2", name: "资产管理", emphasize: false },
      ],
      standardCode: [
        { icon: "code-icon-7", name: "学校管理", emphasize: false },
        { icon: "code-icon-8", name: "一卡通管理", emphasize: false },
        { icon: "code-icon-9", name: "资产管理", emphasize: false },
        { icon: "code-icon-10", name: "资产管理", emphasize: false },
        { icon: "code-icon-11", name: "资产管理", emphasize: false },
        { icon: "code-icon-12", name: "资产管理", emphasize: false }
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
        document.querySelector(".code-standard_code").style.maxHeight = "248px";
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
    max-height: 248px;
    margin-bottom: 20px;
    > div {
      float: left;
      box-sizing: border-box;
      width: 120px;
      margin: 0 20px 24px;
      text-align: center;
      cursor: pointer;
      svg {
        width: 60px !important;
        height: 60px !important;
        margin: 0px auto;
        display: block;
      }
      p {
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
