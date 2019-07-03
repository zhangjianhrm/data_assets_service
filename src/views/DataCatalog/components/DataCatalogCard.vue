<template>
  <div class="data-catalog-card">
    <div class="data-catalog-card__title">
      <h3>数据目录</h3>
    </div>
    <div class="data-catalog-card__op">
      <el-input placeholder="代码 / 代码名称" v-model="input3" size="small">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <el-button-group class="data-catalog-card__op_sort">
        <el-button
          size="small"
          v-for="(item,index) in sortMethods"
          :key="index"
          :type="currentSort==item.name? 'primary':''"
          @click="cardSort(item.name)"
        >
          <span>{{item.title}}</span>
          <span class="data-catalog-card__op_sort_icon">
            <i
              class="el-icon-caret-top"
              :style="currentSort==item.name && descending ? 'color:#fff;' : ''"
            ></i>
            <i
              class="el-icon-caret-bottom"
              :style="currentSort==item.name && !descending ? 'color:#fff;' : ''"
            ></i>
          </span>
        </el-button>
      </el-button-group>
    </div>
    <div class="data-catalog-card__card">
      <card v-for="(item,index) in cardData" :key="index" :cardData="item" :checkbox="false"></card>
    </div>
    <el-pagination
      background
      class="data-catalog-card__pagination"
      layout="slot, prev, pager, next, sizes, jumper"
      :page-size="pageSize"
      :page-sizes="[15, 30]"
      :total="cardData.length"
      :current-page="currentPage"
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
import url from "@/service.config";
export default {
  name: "DataCatalogCard",
  components: {
    Card: () => import("@/components/Card/Card.1")
  },
  data() {
    return {
      input3: "",
      // 排序方式
      sortMethods: [
        { title: "更新时间", name: "update" },
        { title: "下载量", name: "downloads" },
        { title: "收藏量", name: "collects" },
        { title: "代码量", name: "count" }
      ],
      // 默认排序
      currentSort: "update",
      // 降序
      descending: true,
      cardData: [],
      // 当前页
      currentPage: 1,
      //
      pageSize: 15
    };
  },
  created() {
    this.getCard();
  },
  methods: {
    // 获取数据
    getCard() {
      axios({
        url: url.getCardMedium,
        method: "get",
        params: {
          start: 0,
          limit: this.pageSize
        }
      }).then(res => {
        this.cardData = res.data.card;
        this.cardSort("update");
      });
    },
    // 升序
    ascend(property) {
      return (m, n) => {
        let a = m[property];
        let b = n[property];
        return a - b;
      };
    },
    // 降序
    descend(property) {
      return (m, n) => {
        let a = m[property];
        let b = n[property];
        return b - a;
      };
    },
    // 卡片排序
    cardSort(type) {
      this.currentSort = type;
      if (this.descending) {
        this.cardData.sort(this.descend(type));
        this.descending = false;
      } else {
        this.cardData.sort(this.ascend(type));
        this.descending = true;
      }
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
    // margin-bottom: 35px;
    width: 1280px;
    margin: 0 auto 35px;
    overflow: hidden;
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
