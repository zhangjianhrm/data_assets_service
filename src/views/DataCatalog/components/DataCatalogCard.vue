<template>
  <div class="data-catalog-card">
    <div class="data-catalog-card__title">
      <h3>数据目录</h3>
    </div>
    <div class="data-catalog-card__op">
      <el-button size="small" icon="el-icon-back" @click="$router.go(-1)">返回</el-button>
      <el-button size="small" @click="downloadSubClass">
        <svg-icon icon-class="download.2" style="margin-right:3px;" />
        <span v-if="selected.length">下载选中</span>
        <span v-else>下载全部</span>
      </el-button>
      <!-- <el-button size="small" @click="selectAll">全选</el-button> -->
      <span
        v-show="selected.length"
        style="font-size:14px;margin-left:10px;"
      >已选择 {{selected.length}} 个</span>
      <el-input placeholder="代码 / 代码名称" v-model="input3" size="small">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <el-button-group class="data-catalog-card__op_sort">
        <el-button
          size="small"
          v-for="(item,index) in sortMethods"
          :key="index"
          :type="orderByType==item.name? 'primary':''"
          @click="cardSort(item.name)"
        >
          <span>{{item.title}}</span>
          <span class="data-catalog-card__op_sort_icon">
            <i
              class="el-icon-caret-top"
              :style="orderByType==item.name && orderByWay=='desc' ? 'color:#fff;' : ''"
            ></i>
            <i
              class="el-icon-caret-bottom"
              :style="orderByType==item.name && orderByWay=='asc' ? 'color:#fff;' : ''"
            ></i>
          </span>
        </el-button>
      </el-button-group>
    </div>
    <div class="data-catalog-card__card">
      <card
        v-for="(item,index) in cardData"
        :key="index"
        :cardData="item"
        @cardSelected="cardSelected"
        @click.native="$router.push('/info_standard/code_subclass/subclass_details')"
      ></card>
    </div>
    <el-pagination
      background
      class="data-catalog-card__pagination"
      layout="slot, prev, pager, next, sizes, jumper"
      :page-size="pageSize"
      :page-sizes="[15, 30]"
      :total="cardData.length"
      :current-page="pageIndex"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    >
      <span class="data-catalog-card__pagination_total">
        共
        <b>{{cardData.length}}</b> 条数据
      </span>
    </el-pagination>
  </div>
</template>
<script>
import axios from "axios";
import Qs from "qs";
import url from "@/service.config";
import { close } from "fs";
export default {
  name: "SubClass",
  components: {
    Card: () => import("@/components/Card/Card.1")
  },
  data() {
    return {
      type: this.$route.params.type,
      id: this.$route.params.id,
      title: this.$route.params.name,
      subClassUrl: url.infoStandard.codeStandard.getExecutionCodeSubClass,
      input3: "",
      // 需要给 Card 组件传递的 props
      cardData: [],
      // 当前选中的 Card
      selected: [],
      // 排序方式
      sortMethods: [
        { title: "更新时间", name: "UPDATE_TIME" },
        { title: "下载量", name: "DOWNLOAD_NUM" },
        { title: "收藏量", name: "COLLECT_NUM" },
        { title: "代码量", name: "REFER_CODE_COUNT" }
      ],
      // 当前排序
      orderByType: "UPDATE_TIME",
      // 升序降序
      orderByWay: "desc", // desc || asc
      // 当前页
      pageIndex: 1,
      // 每页数量
      pageSize: 15
    };
  },
  created() {
    this.getCard();
  },
  methods: {
    // 获取数据
    getCard() {
      if (this.type == "executionCode") {
        this.subClassUrl =
          url.infoStandard.codeStandard.getExecutionCodeSubClass;
      } else if (this.type == "nationalStandardCode") {
        this.subClassUrl =
          url.infoStandard.codeStandard.getNationalStandardCodeSubClass;
      }
      axios({
        // url: this.subClassUrl,
        url: url.getCardMedium,
        method: "get"
        // params: {
        // id: this.id,
        // orderByType: this.orderByType,
        // orderByWay: this.orderByWay,
        // pageIndex: this.pageIndex - 1,
        // pageSize: this.pageSize,
        // queryCriteria: ""
        // },
        // paramsSerializer: params => {
        //   return Qs.stringify(params, { arrayFormat: "repeat" });
        // }
      }).then(res => {
        // this.cardData = res.data.data.items;
        this.cardData = res.data.card;
        console.log(res.data);
      });
    },
    // 卡片排序
    cardSort(type) {
      if (this.orderByWay == "desc") {
        this.orderByWay = "asc";
      } else {
        this.orderByWay = "desc";
      }
      this.orderByType = type;
      this.getCard();
    },
    // 初始化选择
    initChecked() {
      this.selected = [];
      let selectedID = "";
      for (let i = 0; i < this.cardData.length; i++) {
        if (this.cardData[i].checked === true) {
          this.selected.push(this.cardData[i]);
          selectedID += this.cardData[i].ID + ",";
        }
      }
      return selectedID.slice(0, selectedID.length - 1);
    },
    // 单选
    cardSelected(card, bool) {
      for (let i = 0; i < this.cardData.length; i++) {
        if (card.ID == this.cardData[i].ID) {
          this.$set(this.cardData[i], "checked", bool);
          this.initChecked();
          return;
        }
      }
    },
    // 下载
    downloadSubClass() {
      axios({
        url: url.infoStandard.codeStandard.downloadSubClass,
        method: "get",
        params: {
          parentId: this.id,
          idList: this.initChecked()
        },
        paramsSerializer: params => {
          return Qs.stringify(params, { arrayFormat: "repeat" });
        }
      }).then(res => {
        if (res.data.status == 200) {
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
    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }
};
</script>
<style lang="scss">
@import "~@/styles/variables.scss";
.data-catalog-card {
  width: 100%;
  overflow: hidden;
  &__title {
    width: 100%;
    height: 160px;
    line-height: 160px;
    text-align: center;
    background: $color-header;
    color: #fff;
    font-size: 28px;
    margin-bottom: 40px;
  }
  &__op {
    width: 1280px;
    margin: 0 auto;
    margin-bottom: 35px;
    > div {
      float: right;
    }
    // 搜索
    .el-input-group {
      width: 300px;
      margin-left: 28px;
    }
    // 排序
    &_sort {
      &_icon {
        position: relative;
        margin: 0 9px 0 3px;
        color: rgba(176, 175, 178, 1);
        i:nth-child(1) {
          position: absolute;
          top: -2px;
        }
        i:nth-child(2) {
          position: absolute;
          bottom: -2px;
        }
      }
    }
  }
  &__card {
    width: 1280px;
    margin: 0 auto;
    &::after {
      content: "";
      clear: both;
      display: block;
    }
  }
  &__pagination {
    margin-bottom: 48px;
    display: flex;
    justify-content: center;
    &_total {
      margin-right: 15px;
      color: rgba(66, 78, 103, 1);
      line-height: 36px !important;
      b {
        color: $color-blue;
      }
    }
    .btn-prev,
    .btn-next {
      width: 40px;
      height: 40px;
      border: 1px solid rgba(232, 232, 232, 1);
      border-radius: 3px;
      background: rgba(255, 255, 255, 1) !important;
    }
    ul {
      li {
        box-sizing: border-box;
        width: 40px;
        height: 40px;
        background: rgba(255, 255, 255, 1) !important;
        border: 1px solid rgba(232, 232, 232, 1) !important;
        border-radius: 3px !important;
        line-height: 38px;
        &.active {
          background: $color-blue !important;
          & + li {
            border: 1px solid rgba(232, 232, 232, 1);
          }
        }
      }
    }
    .el-input__inner {
      height: 40px !important;
      border: 1px solid rgba(232, 232, 232, 1) !important;
    }
    .el-pagination__jump {
      color: rgba(66, 78, 103, 1);
    }
    .el-pager li.btn-quicknext,
    .el-pager li.btn-quickprev {
      line-height: 38px;
      color: rgba(66, 78, 103, 1);
    }
  }
}
</style>
