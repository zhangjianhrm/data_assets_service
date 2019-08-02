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
          <span>可访问：{{executionModelCount.classAmount}}个类，{{executionModelCount.subsetAmount}}个子集，{{executionModelCount.subclassAmount}}个子类，{{executionModelCount.dataitemAmount}}数据项。</span>
          <el-button
            plain
            type="primary"
            size="small"
            @click="downloadModel('downloadExecutionModel')"
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
        <!-- 执行模型采标率 -->
        <rate-bar-graph title="执行模型采标率"></rate-bar-graph>
      </el-tab-pane>
      <el-tab-pane name="standardModel" label="国家标准模型">
        <p class="model-standard_count">
          <span>可访问：{{standardModelCount.classAmount}}个模型类，{{standardModelCount.subclassAmount}}个模型子类，{{standardModelCount.subsetAmount}}个子集，{{standardModelCount.dataitemAmount}}个数据项。</span>
          <el-button
            plain
            type="primary"
            size="small"
            @click="downloadModel('downloadStandardModel')"
          >
            <svg-icon icon-class="download" />
            <span>下载国家标准模型</span>
          </el-button>
        </p>
        <div class="model-standard_code">
          <div
            v-for="(item,index) in standardModel"
            :key="index"
            @click="goSubClass('standardModel',item.ID,item.NAME)"
          >
            <svg-icon :icon-class="'code-icon-' + index" />
            <p>{{item.NAME}}</p>
          </div>
        </div>
        <el-button
          plain
          type="primary"
          v-if="standardModel.length > 16"
          id="expand-all-excution-code"
          @click="expandAll"
        >
          <span>展开全部模型</span>
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
  name: "ModelStandard",
  components: {
    RateBarGraph: () => import("@/views/InfoStandard/components/RateBarGraph")
  },
  data() {
    return {
      activeNameModelStandard: "executionModel",
      executionModelToggle: true,
      executionModelCount: {}, // 执行模型数量
      executionModel: [],
      standardModelCount: {}, // 标准模型数量
      standardModel: [] // 标准模型
    };
  },
  created() {
    this.getExecutionModelCount();
    this.getExecutionModelList();
    this.getStandardModelCount();
    this.getStandardModelList();
  },
  methods: {
    // 获取学校执行模型数量
    getExecutionModelCount() {
      axios({
        url: url.infoStandard.modelStandard.getExecutionModelCount
      }).then(res => {
        if (res.data.status == 200) {
          this.executionModelCount = res.data.data;
        }
      });
    },
    // 获取学校执行模型列表
    getExecutionModelList() {
      axios({
        url: url.infoStandard.modelStandard.getExecutionModelList
      }).then(res => {
        if (res.data.status == 200) {
          this.executionModel = res.data.data;
        }
      });
    },
    // 获取国家标准模型数量
    getStandardModelCount() {
      axios({
        url: url.infoStandard.modelStandard.getStandardModelCount
      }).then(res => {
        if (res.data.status == 200) {
          this.standardModelCount = res.data.data;
        }
      });
    },
    // 获取国家标准模型
    getStandardModelList() {
      axios({
        url: url.infoStandard.modelStandard.getStandardModelList
      }).then(res => {
        if (res.data.status == 200) {
          this.standardModel = res.data.data;
          console.log(res.data.data);
        }
      });
    },
    // 下载模型
    downloadModel(type) {
      axios({
        url: url.infoStandard.modelStandard[type]
      }).then(res => {
        console.log(res);
        if (res.data.status == 200) {
          let fileName = res.data.data;
          window.location.href =
            url.server +
            "/api/model/downloadFile?fileName=" +
            fileName +
            "&clientFileName=" +
            fileName;
        } else {
          this.$message.error(res.data.message);
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
