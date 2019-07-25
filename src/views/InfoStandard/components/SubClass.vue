<template>
  <div class="national-standard">
    <h3 class="national-standard__title">{{title}}</h3>
    <p class="national-standard__count">
      <b>{{11}}</b>
      <span>个数据类</span>
    </p>
    <hr />
    <div class="national-standard__op">
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
      <el-input placeholder="代码 / 代码名称" v-model="keyword" size="small">
        <el-button slot="append" icon="el-icon-search" @click="searchSubClass"></el-button>
      </el-input>
      <el-button-group class="national-standard__op_sort">
        <el-button
          size="small"
          v-for="(item,index) in sortMethods"
          :key="index"
          :type="orderByType==item.name? 'primary':''"
          @click="cardSort(item.name)"
        >
          <span>{{item.title}}</span>
          <span class="national-standard__op_sort_icon">
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
    <div class="national-standard__card">
      <card
        v-for="(item,index) in cardData"
        :key="index"
        :cardData="item"
        @cardSelected="cardSelected"
        @click.native="goDetails(item.ID,item.NAME)"
      ></card>
    </div>
    <el-pagination
      background
      class="national-standard__pagination"
      layout="slot, prev, pager, next, sizes, jumper"
      :page-size="pageSize"
      :page-sizes="[15, 30]"
      :total="cardData.length"
      :current-page="pageIndex"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    >
      <span class="national-standard__pagination_total">
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
      downloadSubClassUrl:
        url.infoStandard.codeStandard.downloadExecutionCodeSubClass,
      keyword: "",
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
      switch (this.type) {
        case "executionCode":
          this.subClassUrl =
            url.infoStandard.codeStandard.getExecutionCodeSubClass;
          break;
        case "nationalStandardCode":
          this.subClassUrl =
            url.infoStandard.codeStandard.getNationalStandardCodeSubClass;
          break;
        case "executionModel":
          this.subClassUrl =
            url.infoStandard.modelStandard.getExecutionModelSubclass;
          break;
      }
      axios({
        url: this.subClassUrl,
        method: "get",
        params: {
          id: this.id,
          order: this.orderByType,
          orderByWay: this.orderByWay,
          pageIndex: this.pageIndex - 1,
          pageSize: this.pageSize,
          keyword: this.keyword
        },
        paramsSerializer: params => {
          return Qs.stringify(params, { arrayFormat: "repeat" });
        }
      }).then(res => {
        // this.cardData = res.data.data.items;
        console.log(res);
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
      if (this.type == "executionCode") {
        this.downloadSubClassUrl =
          url.infoStandard.codeStandard.downloadExecutionCodeSubClass;
      } else if (this.type == "nationalStandardCode") {
        this.downloadSubClassUrl =
          url.infoStandard.codeStandard.downloadNationalStandardCodeSubClass;
      }
      axios({
        url: this.downloadSubClassUrl,
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
    // 查看详情
    goDetails(id, name) {
      console.log(id, name);
      // this.$router.push("/info_standard/code_subclass/subclass_details");
      this.$router.push({
        name: "SubclassDetails",
        params: {
          type: this.type,
          id: id,
          name: name
        }
      });
    },
    // 搜索
    searchSubClass() {
      this.getCard();
    },

    // 全选
    // selectAll(eve) {
    //   if (this.selected.length == this.cardData.length) {
    //     for (let i = 0; i < this.cardData.length; i++) {
    //       this.$set(this.cardData[i], "checked", false);
    //     }
    //     eve.srcElement.innerText = "全选";
    //   } else {
    //     for (let i = 0; i < this.cardData.length; i++) {
    //       this.$set(this.cardData[i], "checked", true);
    //     }
    //     eve.srcElement.innerText = "取消全选";
    //   }
    //   this.initChecked();
    // },
    // // 升序
    // ascend(property) {
    //   return (m, n) => {
    //     let a = m[property];
    //     let b = n[property];
    //     return a - b;
    //   };
    // },
    // // 降序
    // descend(property) {
    //   return (m, n) => {
    //     let a = m[property];
    //     let b = n[property];
    //     return b - a;
    //   };
    // },
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
.national-standard {
  width: 1280px;
  margin: 0 auto;
  &__title {
    font-size: 32px;
    color: $color-header;
    margin-top: 22px;
  }
  &__count {
    margin-bottom: 21px - 8px;
    b {
      font-size: 20px;
      color: $color-blue;
    }
    span {
      font-size: 16px;
    }
  }
  hr {
    margin-bottom: 42px - 8px;
  }
  &__op {
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
    width: 100%;
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
