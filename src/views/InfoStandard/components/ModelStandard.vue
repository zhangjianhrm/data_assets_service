<template>
  <div class="model-standard">
    <el-tabs v-model="activeNameModelStandard">
      <el-tab-pane name="executionModel" label="学校执行模型">
        <p class="model-standard_count">
          <span>
            相关：
            <b>2</b>个模型类，
            <b>20</b>个模型子类，
            <b>200</b>条模型。
          </span>
          <span>可访问：{{executionModelCount.CLASS_COUNT}}个模型类，{{executionModelCount.SUBCLASS_COUNT}}个模型子类，{{executionModelCount.CODE_COUNT}}条模型。</span>
          <el-button
            plain
            type="primary"
            size="small"
            @click="downloadCode('downloadExecutionCode')"
          >
            <svg-icon icon-class="download" />
            <span>下载学校执行模型</span>
          </el-button>
        </p>
        <div class="model-standard_code">
          <div
            v-for="(item,index) in executionModel"
            :key="index"
            @click="goSubClass('executionModel',item.ID,item.NAME)"
          >
            <svg-icon :icon-class="'code-icon-' + index" />
            <!-- <p :style="item.emphasize?'color:#2C62FF':''">{{item.NAME}}</p> -->
            <p>{{item.NAME}}</p>
          </div>
        </div>
        <el-button
          plain
          type="primary"
          v-if="executionModel.length > 16"
          id="expand-all-excution-code"
          @click="expandAll"
        >
          <span>展开全部模型</span>
          <i class="el-icon-arrow-down"></i>
        </el-button>
      </el-tab-pane>
      <el-tab-pane name="standardModel" label="国家标准模型">
        <p class="model-standard_count">
          <span>可访问：{{nationalStandardCodeCount.CLASS_COUNT}}个模型类，{{nationalStandardCodeCount.SUBCLASS_COUNT}}个模型子类，{{nationalStandardCodeCount.CODE_COUNT}}条模型。</span>
          <el-button
            plain
            type="primary"
            size="small"
            @click="downloadCode('downloadNationalStandardCode')"
          >
            <svg-icon icon-class="download" />
            <span>下载国家标准模型</span>
          </el-button>
        </p>
        <div class="model-standard_code">
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
          <span>展开全部模型</span>
          <i class="el-icon-arrow-down"></i>
        </el-button>
      </el-tab-pane>
    </el-tabs>
    <!-- 执行模型采标率 -->
    <rate-bar-graph title="执行模型采标率"></rate-bar-graph>
  </div>
</template>
<script>
import axios from "axios";
import url from "@/service.config";
export default {
  name: "ModelStandard",
  components: {
    RateBarGraph: () => import("@/views/InfoStandard/components/RateBarGraph")
  },
  data() {
    return {
      activeNameModelStandard: "executionModel",
      executionModelToggle: true,
      executionModelCount: {},
      executionModel: [],
      nationalStandardCodeCount: {}, // 国家标准模型数量
      nationalStandardCode: [] // 国家标准模型
    };
  },
  created() {
    this.getExecutionCodeCount();
    this.getExecutionCode();
    this.getNationalStandardCodeCount();
    this.getNationalStandardCode();
  },
  methods: {
    // 获取学校执行模型数量
    getExecutionCodeCount() {
      axios({
        url: url.infoStandard.codeStandard.getExecutionCodeCount
      }).then(res => {
        if (res.data.status == 200) {
          this.executionModelCount = res.data.data;
          console.log(res.data.data);
        }
      });
    },
    // 获取学校执行模型
    getExecutionCode() {
      axios({
        url: url.infoStandard.codeStandard.getExecutionCode
      }).then(res => {
        if (res.data.status == 200) {
          this.executionModel = res.data.data;
          console.log(res);
        }
      });
    },
    // 获取国家标准模型数量
    getNationalStandardCodeCount() {
      axios({
        url: url.infoStandard.codeStandard.getNationalStandardCodeCount
      }).then(res => {
        if (res.data.status == 200) {
          this.nationalStandardCodeCount = res.data.data;
        }
      });
    },
    // 获取国家标准模型
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
    // 下载模型
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
    // 展开全部模型
    expandAll() {
      if (this.executionModelToggle) {
        document.querySelector(".model-standard_code").style.maxHeight =
          "unset";
        this.executionModelToggle = false;
        document.querySelector("#expand-all-excution-code").innerHTML =
          '<span>收起</span><i class="el-icon-arrow-up"></i>';
      } else {
        document.querySelector(".model-standard_code").style.maxHeight =
          "248px";
        this.executionModelToggle = true;
        document.querySelector("#expand-all-excution-code").innerHTML =
          '<span>展开全部模型</span><i class="el-icon-arrow-down"></i>';
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
.model-standard {
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
