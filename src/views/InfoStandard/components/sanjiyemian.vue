<template>
  <div class="national-standard">
    <h3 class="national-standard__title">信息标准三级页面</h3>
    <hr>
    <div class="national-standard__op">
      <el-input placeholder="请输入内容" v-model="input3" size="small">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </div>
    <sw-table
      style="margin-bottom:60px;"
      :hasOperation="false"
      :paginationShow="true"
      :pageSizes="[30]"
      :totalCount="32"
      :pageSize="30"
      :tableName="tableName"
      :tableTitle="tableTitle"
      :tableData="tableData"
      :tableOperation="tableOperation"
      :showSelection="true"
      :showIndex="false"
      :conflictOperation="conflictOperation"
      @selection-change="selectionChange"
      @change-page="changePage"
      @next-page="changePage"
      @prev-page="changePage"
    ></sw-table>
  </div>
</template>
<script>
export default {
  name: "sanjiyemian",
  components: {},
  data() {
    return {
      input3: "",
      //
      tableName: "tableName",
      tableData: [],
      tableData1: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        }
      ],
      tableData2: [
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ],
      tableTitle: [
        { prop: "date", label: "时间", width: "120", sortable: true },
        { prop: "name", label: "名称", width: "120", sortable: true },
        { prop: "address", label: "地址", width: "120", sortable: false }
      ],
      tableOperation: [
        { name: "详情", icon: "el-icon-document", operation: "detail" },
        { name: "编辑", icon: "el-icon-edit", operation: "edit" },
        { name: "删除", icon: "el-icon-delete", operation: "delete" },
        { name: "冻结", operation: "freeze" },
        { name: "注销", operation: "writeOff" },
        { name: "解冻", operation: "unfreeze" },
        { name: "激活", operation: "activate" },
        { name: "标签", operation: "label" },
        { name: "重置密码", operation: "resetPassword" },
        { name: "修改有效期", operation: "resetExpiry" }
      ],
      conflictOperation: {
        freeze: { prop: "state", value: ["FREEZE", "WRITTENOFF"] },
        writeOff: { prop: "state", value: ["WRITTENOFF", "FREEZE"] },
        unfreeze: { prop: "state", value: ["NORMAL", "WRITTENOFF"] }
      },
      // 当前页
      currentPage: 1
    };
  },
  created() {},
  mounted() {
    this.tableData = this.tableData1;
  },
  methods: {
    // table 的方法
    selectionChange(val) {
      this.$confirm(val);
    },
    changePage(val) {
      this.tableData = this._data[`tableData${val}`];
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
  hr {
    margin-bottom: 42px - 8px;
    background-color: rgba(12, 0, 53, 0.1);
    height: 1px;
    border: none;
  }
  &__op {
    margin-bottom: 35px;
    > div {
      float: right;
    }
    .el-input-group {
      width: 300px;
      margin-left: 28px;
    }
  }
}
</style>
