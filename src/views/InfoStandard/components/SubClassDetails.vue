<template>
  <div class="subclass-details">
    <h3 class="subclass-details__title">{{title}}</h3>
    <hr />
    <div class="subclass-details__op">
      <el-button size="small" icon="el-icon-back" @click="$router.go(-1)">返回</el-button>
      <el-input placeholder="请输入内容" v-model="input3" size="small">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </div>
    <sw-table
      style="margin-bottom:60px;"
      :hasOperation="false"
      :paginationShow="true"
      :pageSize="30"
      :pageSizes="[30]"
      :totalCount="totalCount"
      :tableName="tableName"
      :tableTitle="tableTitle"
      :tableData="tableData"
      :showSelection="true"
      :showIndex="false"
      @selection-change="selectionChange"
      @change-page="changePage"
      @next-page="changePage"
      @prev-page="changePage"
    ></sw-table>
  </div>
</template>
<script>
import axios from "axios";
import Qs from "qs";
import url from "@/service.config";
export default {
  name: "subclass-details",
  components: {},
  data() {
    return {
      type: this.$route.params.type,
      id: this.$route.params.id,
      title: this.$route.params.name,
      subClassDetailsUrl: "",
      input3: "",
      // 表格数据
      totalCount: 0,
      tableName: "tableName",
      tableData: [
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
      tableTitle: [
        { prop: "NUM", label: "代码", ortable: true },
        { prop: "NAME", label: "代码名称", width: "120", sortable: true },
        { prop: "PARENT_CODE", label: "上级代码", sortable: false },
        { prop: "CODE_LEVEL", label: "所属层级", sortable: false },
        { prop: "SHORT_NAME", label: "简称", sortable: false }
      ],
      // 当前页
      pageIndex: 1,
      // 每页数量
      pageSize: 15,
      // 搜索关键词
      queryCriteria: ""
    };
  },
  created() {
    this.getSubClassDetails();
  },
  mounted() {},
  methods: {
    // 获取数据
    getSubClassDetails() {
      if (this.type == "executionCode") {
        this.subClassDetailsUrl =
          url.infoStandard.codeStandard.getExecutionCodeSubClassDetails;
      } else if (this.type == "nationalStandardCode") {
        this.subClassDetailsUrl =
          url.infoStandard.codeStandard.getNationalStandardCodeSubClassDetails;
      }
      axios({
        url: this.subClassDetailsUrl,
        method: "get",
        params: {
          id: this.id, // pageIndex=0&pageSize=20&queryCriteria=1
          pageIndex: this.pageIndex - 1,
          pageSize: this.pageSize,
          queryCriteria: this.queryCriteria
        },
        paramsSerializer: params => {
          return Qs.stringify(params, { arrayFormat: "repeat" });
        }
      }).then(res => {
        if (res.data.status == 200) {
          console.log(res.data);
          this.tableData = res.data.data.items;
        }
      });
    },
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
.subclass-details {
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
    overflow: hidden;
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
