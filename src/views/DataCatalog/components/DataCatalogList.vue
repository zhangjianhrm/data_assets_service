<template>
  <div class="data-catalog__list">
    <div class="data-catalog__list__title">
      <h3>数据目录</h3>
    </div>
    <div class="data-catalog__list__filter">
      <el-button size="small" icon="el-icon-back" @click="$router.go(-1)">返回</el-button>
      <el-button size="small" plain @click="getCollected" type="primary">
        <svg-icon icon-class="collects" style="margin-right:3px;" />
        <span>查看已收藏</span>
      </el-button>
      <el-select size="small" v-model="value" clearable placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-select size="small" v-model="value" clearable placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-select size="small" v-model="value" clearable placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-button size="small" type="primary" @click="$router.push({name:'DataCatalogApply'})">数据目录申请</el-button>
      <el-input placeholder="数据目录" v-model="searchInput" size="small" style="width:200px;">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <el-button-group class="data-catalog__list__filter_sort">
        <el-button
          size="small"
          v-for="(item,index) in sortMethods"
          :key="index"
          :type="orderByType==item.name?'primary':''"
          @click="cardSort(item.name)"
        >
          <span>{{item.title}}</span>
          <span class="data-catalog__list__filter_sort_icon">
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
    <div class="data-catalog__list__keyword">
      <span>关键词：</span>
      <span>关键词</span>
    </div>
    <div class="data-catalog__list__card">
      <card
        v-for="(item,index) in cardData"
        :key="index"
        :cardData="item"
        :checkbox="false"
        @cardSelected="cardSelected"
        @click.native="goDetails(item.ID,item.NAME)"
      ></card>
    </div>
    <el-pagination
      background
      class="data-catalog__list__pagination"
      layout="total, prev, pager, next, sizes, jumper"
      :page-size="pageSize"
      :page-sizes="[15, 30]"
      :total="cardData.length"
      :current-page="pageIndex"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    ></el-pagination>
  </div>
</template>
<script>
import axios from "axios";
import Qs from "qs";
import url from "@/service.config";
import { close } from "fs";
export default {
  name: "DataCatalogList",
  components: {
    Card: () => import("@/components/Card/Card")
  },
  data() {
    return {
      type: this.$route.params.type,
      id: this.$route.params.id,
      title: this.$route.params.name,
      subClassUrl: url.infoStandard.codeStandard.getExecutionCodeSubClass,
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      value: "",
      searchInput: "",
      // 需要给 Card 组件传递的 props
      cardData: [],
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
        console.log(res.data.card);
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
    },
    // 查看详情
    goDetails(id, name) {
      console.log(id, name);
      this.$router.push({
        name: "DataCatalogDetails",
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
.data-catalog__list {
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
  &__filter {
    width: 1280px;
    height: 32px;
    margin: 0 auto;
    margin-bottom: 14px;
    // 返回
    > .el-button:nth-child(1) {
      float: left;
      margin-right: 12px;
    }
    // 查看收藏
    > .el-button:nth-child(2) {
      float: left;
      margin-right: 12px;
    }
    // 选择
    > .el-select {
      float: left;
      width: 96px;
      margin-right: 12px;
    }
    // 排序按钮
    > .el-button-group {
      float: right;
    }
    // 搜索
    > .el-input-group {
      float: right;
      width: 300px;
      margin-left: 24px;
    }
    // 数据目录申请
    > .el-button:nth-child(6) {
      float: right;
      margin-left: 24px;
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
  &__keyword {
    width: 1280px;
    height: 32px;
    margin: 0 auto;
    border: 1px solid #dcdfe6;
    border-radius: 3px;
    margin-bottom: 30px;
    span {
      margin-left: 20px;
      line-height: 32px;
      font-size: 14px;
      color: #606266;
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
  }
}
</style>
