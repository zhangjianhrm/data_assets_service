<template>
  <div class="national-standard">
    <h3 class="national-standard__title">国家标准</h3>
    <p class="national-standard__count">
      <b>{{11}}</b>
      <span>个数据类</span>
    </p>
    <hr />
    <div class="national-standard__op">
      <el-button size="small" icon="el-icon-back" @click="$router.go(-1)">返回</el-button>
      <el-button size="small" v-if="!selected.length">
        <svg-icon icon-class="download.2" style="margin-right:3px;" />
        <span>下载全部</span>
      </el-button>
      <el-button size="small" v-else>
        <svg-icon icon-class="download.2" style="margin-right:3px;" />
        <span>下载选中</span>
      </el-button>
      <!-- <el-button size="small" @click="selectAll">全选</el-button> -->
      <span
        v-show="selected.length"
        style="font-size:14px;margin-left:10px;"
      >已选择 {{selected.length}} 个</span>
      <el-input placeholder="代码 / 代码名称" v-model="input3" size="small">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <el-button-group class="national-standard__op_sort">
        <el-button
          size="small"
          v-for="(item,index) in sortMethods"
          :key="index"
          :type="currentSort==item.name? 'primary':''"
          @click="cardSort(item.name)"
        >
          <span>{{item.title}}</span>
          <span class="national-standard__op_sort_icon">
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
    <div class="national-standard__card">
      <card
        v-for="(item,index) in cardData"
        :key="index"
        :cardData="item"
        @cardSelected="cardSelected"
      ></card>
    </div>
    <el-pagination
      background
      class="national-standard__pagination"
      layout="slot, prev, pager, next, sizes, jumper"
      :page-size="pageSize"
      :page-sizes="[15, 30]"
      :total="cardData.length"
      :current-page="currentPage"
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
import url from "@/service.config";
export default {
  name: "Subpage",
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
      // 需要给 Card 组件传递的 props
      cardData: [],
      // 当前选中的 Card
      selected: [],
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
        url: url.getCard,
        method: "get",
        params: {
          start: 0,
          limit: this.pageSize
        }
      }).then(res => {
        this.cardData = res.data.card;
        this.cardSort("update");
        this.initChecked();
        console.log(res);
      });
    },
    // 初始化选择
    initChecked() {
      this.selected = [];
      for (let i = 0; i < this.cardData.length; i++) {
        if (this.cardData[i].checked) {
          this.selected.push(this.cardData[i]);
        }
      }
    },
    // 单选
    cardSelected(card, bool) {
      for (let i = 0; i < this.cardData.length; i++) {
        if (card.id == this.cardData[i].id) {
          this.$set(this.cardData[i], "checked", bool);
          this.initChecked();
          return;
        }
      }
    },
    // 全选
    selectAll(eve) {
      if (this.selected.length == this.cardData.length) {
        for (let i = 0; i < this.cardData.length; i++) {
          this.$set(this.cardData[i], "checked", false);
        }
        eve.srcElement.innerText = "全选";
      } else {
        for (let i = 0; i < this.cardData.length; i++) {
          this.$set(this.cardData[i], "checked", true);
        }
        eve.srcElement.innerText = "取消全选";
      }
      this.initChecked();
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
