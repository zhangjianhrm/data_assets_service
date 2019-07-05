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
          <el-button type="primary" size="small" plain>
            <svg-icon icon-class="download" />
            <span>下载学校执行代码</span>
          </el-button>
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
        <el-button
          plain
          type="primary"
          v-if="executionCode.length > 16"
          id="expand-all-excution-code"
          @click="expandAll"
        >
          <span>展开全部代码</span>
          <i class="el-icon-arrow-down"></i>
        </el-button>
      </el-tab-pane>
      <el-tab-pane name="standardCode" label="国家标准代码">
        <p class="code-standard_count">
          <span>可访问：{{nationalStandardCodeCount.CLASS_COUNT}}个代码类，{{nationalStandardCodeCount.SUBCLASS_COUNT}}个代码子类，{{nationalStandardCodeCount.CODE_COUNT}}条代码。</span>
          <el-button
            type="primary"
            size="small"
            plain
            @click="downloadCode('nationalStandardCode')"
          >
            <svg-icon icon-class="download" />
            <span>下载国家标准代码</span>
          </el-button>
        </p>
        <div class="code-standard_code">
          <div
            v-for="(item,index) in nationalStandardCode"
            :key="index"
            @click="goSubpage(item.ID,item.NAME)"
          >
            <svg-icon :icon-class="'code-icon-' + index" />
            <!-- <p :style="item.emphasize?'color:#2C62FF':''">{{item.NAME}}</p> -->
            <p>{{item.NAME}}</p>
          </div>
        </div>
        <el-button
          plain
          type="primary"
          v-if="nationalStandardCode.length > 16"
          id="expand-all-excution-code"
          @click="expandAll"
        >
          <span>展开全部代码</span>
          <i class="el-icon-arrow-down"></i>
        </el-button>
      </el-tab-pane>
    </el-tabs>
    <!-- 执行代码采标率 -->
    <rate-bar-graph></rate-bar-graph>
  </div>
</template>
<script>
import axios from "axios";
import url from "@/service.config";
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
        { icon: "code-icon-7", name: "资产管理", emphasize: false },
        { icon: "code-icon-0", name: "资产管理", emphasize: false },
        { icon: "code-icon-1", name: "资产管理", emphasize: false },
        { icon: "code-icon-7", name: "资产管理", emphasize: false },
        { icon: "code-icon-3", name: "资产管理", emphasize: false },
        { icon: "code-icon-5", name: "资产管理", emphasize: false },
        { icon: "code-icon-8", name: "资产管理", emphasize: false },
        { icon: "code-icon-2", name: "资产管理", emphasize: false }
      ],
      nationalStandardCodeCount: {},
      nationalStandardCode: []
    };
  },
  created() {
    this.getNationalStandardCodeCount();
    this.getNationalStandardCode();
  },
  methods: {
    // 获取国家标准代码数量
    getNationalStandardCodeCount() {
      axios({
        url: url.infoStandard.codeStandard.getNationalStandardCodeCount
      }).then(res => {
        if (res.data.status == 200) {
          this.nationalStandardCodeCount = res.data.data;
        }
      });
    },
    // 获取国家标准代码
    getNationalStandardCode() {
      axios({
        url: url.infoStandard.codeStandard.getNationalStandardCode
      }).then(res => {
        this.nationalStandardCode = res.data.data;
        // console.log(res);
      });
    },
    // 下载代码
    downloadCode(type) {
      axios({
        url: url.infoStandard.codeStandard.downloadNationalStandardCode
      }).then(res => {
        if (res.data.status == 200) {
          // console.log(res.data.data);
          let fileName = res.data.data;
          window.location.href =
            url.server +
            "/api/code/downloadFile?fileName=" +
            fileName +
            "&clientFileName=" +
            fileName;
        }
      });
    },
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
    },
    //
    goSubpage(id, name) {
      // $router.push('/info_standard/subpage')
      console.log(id, name);
      this.$router.push({
        name: "CodeSubclass",
        params: {
          id: id,
          name: name
        }
      });
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
