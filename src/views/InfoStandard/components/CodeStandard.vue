<template>
  <div class="code-standard">
    <el-tabs v-model="activeNameCodeStandard">
      <el-tab-pane name="executionCode" label="学校执行代码">
        <p class="code-standard_count">
          <span>
            相关：
            <b>2</b>个代码类，
            <b>20</b>个代码子类，
            <b>200</b>条代码。
          </span>
          <span>可访问：{{executionCodeCount.CLASS_COUNT}}个代码类，{{executionCodeCount.SUBCLASS_COUNT}}个代码子类，{{executionCodeCount.CODE_COUNT}}条代码。</span>
          <el-button
            plain
            type="primary"
            size="small"
            @click="downloadCode('downloadExecutionCode')"
          >
            <svg-icon icon-class="download" />
            <span>下载学校执行代码</span>
          </el-button>
        </p>
        <div class="code-standard_code">
          <div
            v-for="(item,index) in executionCode"
            :key="index"
            @click="goSubClass('executionCode',item.ID,item.NAME)"
          >
            <svg-icon :icon-class="'code-icon-' + index" />
            <!-- <p :style="item.emphasize?'color:#2C62FF':''">{{item.NAME}}</p> -->
            <p>{{item.NAME}}</p>
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
        <!-- 执行代码采标率 -->
        <rate-bar-graph title="执行代码采标率"></rate-bar-graph>
      </el-tab-pane>
      <el-tab-pane name="standardCode" label="国家标准代码">
        <p class="code-standard_count">
          <span>可访问：{{nationalStandardCodeCount.CLASS_COUNT}}个代码类，{{nationalStandardCodeCount.SUBCLASS_COUNT}}个代码子类，{{nationalStandardCodeCount.CODE_COUNT}}条代码。</span>
          <el-button
            plain
            type="primary"
            size="small"
            @click="downloadCode('downloadNationalStandardCode')"
          >
            <svg-icon icon-class="download" />
            <span>下载国家标准代码</span>
          </el-button>
        </p>
        <div class="code-standard_code">
          <div
            v-for="(item,index) in nationalStandardCode"
            :key="index"
            @click="goSubClass('nationalStandardCode',item.ID,item.NAME)"
          >
            <svg-icon :icon-class="'code-icon-' + index" />
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
      activeNameCodeStandard: "executionCode",
      executionCodeToggle: true,
      executionCodeCount: {},
      executionCode: [],
      nationalStandardCodeCount: {}, // 国家标准代码数量
      nationalStandardCode: [] // 国家标准代码
    };
  },
  created() {
    this.getExecutionCodeCount();
    this.getExecutionCode();
    this.getNationalStandardCodeCount();
    this.getNationalStandardCode();
  },
  methods: {
    // 获取学校执行代码数量
    getExecutionCodeCount() {
      axios({
        url: url.infoStandard.codeStandard.getExecutionCodeCount
      }).then(res => {
        if (res.data.status == 200) {
          this.executionCodeCount = res.data.data;
          console.log(res.data.data);
        }
      });
    },
    // 获取学校执行代码
    getExecutionCode() {
      axios({
        url: url.infoStandard.codeStandard.getExecutionCode
      }).then(res => {
        if (res.data.status == 200) {
          this.executionCode = res.data.data;
          console.log(res);
        }
      });
    },
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
        if (res.data.status == 200) {
          this.nationalStandardCode = res.data.data;
          // console.log(res);
        }
      });
    },
    // 下载代码
    downloadCode(type) {
      axios({
        url: url.infoStandard.codeStandard[type]
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
    goSubClass(type, id, name) {
      // console.log(id, name);
      this.$router.push({
        name: "CodeSubclass",
        params: {
          type: type,
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
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
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
