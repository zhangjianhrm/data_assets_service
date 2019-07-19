<template>
  <div class="info-standard__rate">
    <div class="info-standard__rate_title">
      <p>{{title}}</p>
      <el-button size="small" type="primary">
        <svg-icon icon-class="download.2" style="margin-right:3px;" />
        <span>下载表</span>
      </el-button>
    </div>
    <div class="info-standard__rate_overview">
      <span>采用执行代码</span>
      <b>1200</b>
      <span>个，采标率</span>
      <b>59.73%</b>
      <span>，未采用执行代码</span>
      <b style="color:rgba(255, 133, 44, 1);">880</b>
      <span>个。</span>
    </div>
    <div class="info-standard__rate_list">
      <el-row v-for="(item,index) in list" :key="index">
        <el-col :span="2" style="line-height:32px;">
          <b>{{item.title}}：</b>
        </el-col>
        <el-col :span="21">
          <el-button
            class="info-standard__rate_list_item"
            size="small"
            v-for="(itemChild,indexChild) in item.children"
            :key="indexChild"
            :type="itemChild == currentItem ? 'primary':''"
            @click="currentItem = itemChild"
          >{{itemChild}}</el-button>
        </el-col>
        <el-col :span="1">
          <el-button
            size="small"
            style="float:right;width:32px;padding:9px;"
            v-show="item.children.length > 9"
            :icon="toggle[index]?'el-icon-arrow-up':'el-icon-arrow-down'"
            @click="expand($event,index)"
          ></el-button>
        </el-col>
      </el-row>
    </div>
    <hr />
    <div class="info-standard__rate_tip">提示：左表中橙色色块的字段表示与右表有差异</div>
    <div class="info-standard__rate_table">
      <div class="info-standard__rate_table_title">
        <div>工作简历信息表</div>
        <div>人事管理数据子集/教职工基本数据类 / 工作简历子类</div>
      </div>
      <div class="info-standard__rate_table_table">
        <el-table
          border
          size="mini"
          class="info-standard__rate_table_table_left"
          :data="tableDataLeft"
        >
          <el-table-column prop="name" label="数据项名" width="140">
            <template slot-scope="scope">
              <div
                v-if="tableDataRight[scope.$index].name != scope.row.name"
                style="background:#FFE7D5;position:absolute;top:0;right:0;bottom:0;left:0;padding:0 10px;line-height: 3;"
              >{{scope.row.name}}</div>
              <div v-else>{{scope.row.name}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="cname" label="中文简称" width="140"></el-table-column>
          <el-table-column prop="type" label="类型" width="140"></el-table-column>
          <el-table-column prop="length" label="长度" width="140"></el-table-column>
          <el-table-column prop="limit" label="约束" width="140"></el-table-column>
          <el-table-column prop="quote" label="引用" width="140">
            <template slot-scope="scope">
              <div v-if="scope.row.quote == ''">—</div>
              <div v-else>{{scope.row.quote}}</div>
            </template>
          </el-table-column>
        </el-table>
        <el-table
          border
          size="mini"
          class="info-standard__rate_table_table_right"
          :data="tableDataRight"
        >
          <el-table-column prop="name" label="数据项名" width="140"></el-table-column>
          <el-table-column prop="cname" label="中文简称" width="140"></el-table-column>
          <el-table-column prop="type" label="类型" width="140"></el-table-column>
          <el-table-column prop="length" label="长度" width="140"></el-table-column>
          <el-table-column prop="limit" label="约束" width="140"></el-table-column>
          <el-table-column prop="quote" label="引用" width="140"></el-table-column>
        </el-table>
      </div>
      <el-pagination
        background
        class="info-standard__rate_table_pagination"
        layout="total, sizes, prev, pager, next, jumper"
        :current-page="currentPage"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        :total="tableDataLeft.length"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  name: "RatePage",
  data() {
    return {
      title:
        this.$route.params.year +
        "年" +
        this.$route.params.month +
        this.$route.params.name +
        "采标率",
      list: [
        {
          title: "未采表",
          children: [
            "not-adopted_1",
            "not-adopted_2",
            "not-adopted_3",
            "not-adopted_4",
            "not-adopted_5",
            "not-adopted_6",
            "not-adopted_7",
            "not-adopted_8",
            "not-adopted_9",
            "not-adopted_10",
            "not-adopted_11",
            "not-adopted_12",
            "not-adopted_13",
            "not-adopted_14",
            "not-adopted_15",
            "not-adopted_16",
            "not-adopted_17",
            "not-adopted_18",
            "not-adopted_19",
            "not-adopted_20",
            "not-adopted_21",
            "not-adopted_22"
          ]
        },
        {
          title: "已采表",
          children: [
            "adopted_1",
            "adopted_2",
            "adopted_3",
            "adopted_4",
            "adopted_5",
            "adopted_6",
            "adopted_7",
            "adopted_8",
            "adopted_9"
          ]
        }
      ],
      // 当前选择的表
      currentItem: "",
      toggle: [false, false],
      // 表格数据
      tableDataLeft: [
        {
          name: "XiaohuWang",
          cname: "王小虎",
          type: "TYPE_A",
          length: 10,
          limit: "xx",
          quote: ""
        },
        {
          name: "XiaohuWang",
          cname: "王小虎",
          type: "TYPE_A",
          length: 10,
          limit: "xx",
          quote: ""
        },
        {
          name: "XiaohuWang",
          cname: "王小虎",
          type: "TYPE_A",
          length: 10,
          limit: "xx",
          quote: ""
        }
      ],
      tableDataRight: [
        {
          name: "DahuWang",
          cname: "王大虎",
          type: "TYPE_A",
          length: 10,
          limit: "xx",
          quote: ""
        },
        {
          name: "DahuWang",
          cname: "王大虎",
          type: "TYPE_B",
          length: 10,
          limit: "xx",
          quote: ""
        },
        {
          name: "XiaohuWang",
          cname: "王小虎",
          type: "TYPE_A",
          length: 10,
          limit: "xx",
          quote: ""
        }
      ],
      // 当前页
      currentPage: 1
    };
  },
  created() {
    this.currentItem = this.list[0].children[0];
  },
  mounted() {
    // 滚动监听
    document
      .querySelector(
        ".info-standard__rate_table_table_left .el-table__body-wrapper"
      )
      .addEventListener("scroll", res => {
        document.querySelector(
          ".info-standard__rate_table_table_left .el-table__header-wrapper"
        ).scrollLeft = res.target.scrollLeft;
        document.querySelector(
          ".info-standard__rate_table_table_right .el-table__body-wrapper"
        ).scrollLeft = res.target.scrollLeft;
        document.querySelector(
          ".info-standard__rate_table_table_right .el-table__header-wrapper"
        ).scrollLeft = res.target.scrollLeft;
      });
  },
  methods: {
    // 展开折叠
    expand(e, index) {
      if (this.toggle[index]) {
        if (e.target.nodeName == "BUTTON") {
          e.target.parentElement.parentElement.style.height = "42px";
        } else {
          e.target.parentElement.parentElement.parentElement.style.height =
            "42px";
        }
        this.$set(this.toggle, [index], false);
      } else {
        if (e.target.nodeName == "BUTTON") {
          e.target.parentElement.parentElement.style.height = "unset";
        } else {
          e.target.parentElement.parentElement.parentElement.style.height =
            "unset";
        }
        this.$set(this.toggle, [index], true);
      }
    },
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
.info-standard__rate {
  width: 1280px;
  margin: 0 auto;
  &_title {
    display: flex;
    justify-content: space-between;
    margin-top: 24px;
    margin-bottom: 12px;
    > p {
      // float: left;
      font-size: 24px;
      line-height: 32px;
      color: $color-header;
      font-weight: 600;
    }
  }
  &_overview {
    color: $color-header;
    line-height: 18px;
    margin-bottom: 24px;
    span {
      font-size: 14px;
    }
    b {
      font-size: 18px;
      margin: 0 4px;
    }
  }
  &_list {
    font-size: 14px;
    color: $color-header;
    .el-row {
      height: 42px;
      overflow: hidden;
    }
    &_item {
      float: left;
      width: 10%;
      // margin-left: 1.25% !important;
      border: none;
      margin-bottom: 10px;
    }
    &_item:nth-child(9n + 1) {
      margin-left: 0;
    }
  }
  hr {
    margin: 12px 0;
  }
  &_tip {
    font-size: 14px;
    color: $color-header-50;
    line-height: 32px;
  }
  &_table {
    &_title {
      height: 36px;
      line-height: 36px;
      text-align: center;
      font-weight: 600;
      > div {
        width: 50%;
        height: 100%;
        // border: 1px solid #ebeef5;
        border: 1px solid $color-header-10;
        border-bottom: none;
        box-sizing: border-box;
        &:nth-child(1) {
          float: left;
          background: rgba(12, 0, 53, 0.08);
          border-right: none;
        }
        &:nth-child(2) {
          float: right;
          background: rgba(44, 98, 255, 0.1);
        }
      }
    }
    &_table {
      display: flex;
      margin-bottom: 24px;
      > .el-table {
        flex: 1;
        border-color: $color-header-10;
        * {
          border-color: $color-header-10;
        }
        .el-table__row {
          td {
            position: relative;
          }
        }
      }
      > .el-table thead tr th {
        background: none;
      }
      > .el-table:nth-child(1)::after {
        width: 0 !important;
      }
      &_right {
        .el-table__body-wrapper {
          /*滚动条整体部分*/
          &::-webkit-scrollbar {
            display: none;
            width: 0px;
            height: 0px;
            // border-radius: 4px;
            background-color: transparent;
          }
          /*滚动条中可以拖动的那部分*/
          &::-webkit-scrollbar-thumb {
            background-color: $sw-scrollbar;
            border-radius: 4px;
            &:hover {
              background-color: $sw-scrollbar-hover;
            }
          }
        }
      }
    }
    &_pagination {
      margin-bottom: 78px;
      display: flex;
      justify-content: center;
    }
  }
}
</style>
