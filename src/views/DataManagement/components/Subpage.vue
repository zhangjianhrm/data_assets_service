<template>
  <div class="data-management-subpage">
    <div class="data-management-subpage__title">
      <h4>学生基本信息子类</h4>
      <el-button-group>
        <el-button
          size="small"
          :type="currentData == 'init'?'primary':''"
          @click="changeData('init')"
        >原始数据</el-button>
        <el-button
          size="small"
          :type="currentData == 'handled'?'primary':''"
          @click="changeData('handled')"
        >翻译数据</el-button>
      </el-button-group>
    </div>
    <hr />
    <div class="data-management-subpage__op">
      <el-button size="small" type="primary" @click="insertEvent">新增</el-button>
      <el-button size="small" type="primary" @click="deleteSelectedEvent">删除选中</el-button>
      <el-button size="small" type="primary" @click="exportCsvEvent">导入</el-button>
      <el-button size="small" type="primary">导出</el-button>
      <el-button size="small" type="primary">高级查询</el-button>
    </div>
    <div v-loading="loading">
      <elx-editable
        ref="elxEditable"
        class="data-management-subpage__table"
        border
        :default-sort="{prop: 'updateTime', order: 'descending'}"
        :data.sync="list"
        :edit-config="{trigger: 'manual', mode: 'row', showIcon:false, clearActiveMethod}"
      >
        <elx-editable-column type="selection" width="40"></elx-editable-column>
        <elx-editable-column prop="id" label="学生ID" width="180"></elx-editable-column>
        <elx-editable-column
          prop="name"
          label="名字"
          show-overflow-tooltip
          :edit-render="{name: 'ElInput'}"
        ></elx-editable-column>
        <elx-editable-column
          prop="sex"
          label="性别"
          :edit-render="{name: 'ElSelect', options: sexList}"
        ></elx-editable-column>
        <elx-editable-column
          prop="region"
          label="地区"
          width="200"
          :edit-render="{name: 'ElCascader', props: {options: regionList}}"
        >
          <template v-slot="scope">
            <div>{{ getCascaderLabel(scope.row.region, regionList) }}</div>
            <div
              v-if="!scope.row.region"
              style="background:#FBE3D2;width:100%;height:100%;line-height:40px;"
            >——</div>
          </template>
        </elx-editable-column>
        <elx-editable-column
          prop="date"
          label="日期"
          width="200"
          :edit-render="{name: 'ElDatePicker', props: {type: 'datetime', format: 'yyyy-MM-dd'}}"
        >
          <template v-slot="scope">
            <div>{{ getDatePicker(scope.row.date) }}</div>
            <div
              v-if="!scope.row.date"
              style="background:#FBE3D2;width:100%;height:100%;line-height:40px;"
            >——</div>
          </template>
        </elx-editable-column>
        <elx-editable-column
          prop="flag"
          label="是否启用"
          :formatter="formatterFlag"
          :edit-render="{name: 'ElSwitch'}"
        ></elx-editable-column>
        <elx-editable-column prop="attr3" label="链接">
          <template>
            <a href="https://github.com/xuliangzhan/vue-element-extends" target="_blank">打开链接</a>
          </template>
        </elx-editable-column>
        <elx-editable-column label="操作" width="100" fixed="right">
          <template v-slot="scope">
            <template v-if="$refs.elxEditable.hasActiveRow(scope.row)">
              <i class="el-icon-circle-check" @click="saveRowEvent(scope.row)"></i>
              <i class="el-icon-circle-close" @click="cancelRowEvent(scope.row)"></i>
            </template>
            <template v-else>
              <i class="el-icon-edit" @click="openActiveRowEvent(scope.row)"></i>
              <i class="el-icon-delete" @click="removeEvent(scope.row)"></i>
            </template>
          </template>
        </elx-editable-column>
      </elx-editable>
      <el-pagination
        background
        class="data-management-subpage__pagination"
        layout="slot, prev, pager, next, sizes, jumper"
        :page-size="pageVO.pageSize"
        :page-sizes="[15, 30]"
        :total="pageVO.totalResult"
        :current-page="pageVO.currentPage"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
        <span class="data-management-subpage__pagination_total">
          共
          <b>{{list.length}}</b> 条数据
        </span>
      </el-pagination>
    </div>
  </div>
</template>
<script>
import XEUtils from "xe-utils";
// import XEAjax from "xe-ajax";
export default {
  data() {
    return {
      currentData: "init",
      // 表格数据
      list: [
        {
          id: 2019070401,
          date: 1551322088449,
          name: "小徐",
          sex: "1",
          age: "26",
          flag: false,
          remark: "备注",
          region: ["zujian", "data", "tag"]
        },
        {
          id: 2019070401,
          date: 1551322088449,
          name: "小徐",
          sex: "1",
          age: "26",
          flag: false,
          remark: "备注"
        },
        {
          id: 2019070401,
          date: 1551322088449,
          name: "小徐",
          sex: "1",
          age: "26",
          flag: false,
          remark: "备注",
          region: ["zujian", "data", "tag"]
        },
        {
          id: 2019070401,
          name: "小徐",
          sex: "1",
          age: "26",
          flag: false,
          remark: "备注",
          region: ["zujian", "data", "tag"]
        },
        {
          id: 2019070401,
          date: 1551322088449,
          name: "小徐",
          sex: "1",
          age: "26",
          flag: false,
          remark: "备注",
          region: ["zujian", "data", "tag"]
        },
        {
          id: 2019070401,
          date: 1551322088449,
          name: "小徐",
          sex: "1",
          age: "26",
          flag: false,
          remark: "备注",
          region: ["zujian", "data", "tag"]
        },
        {
          id: 2019070401,
          date: 1551322088449,
          name: "小徐",
          sex: "1",
          age: "26",
          flag: false,
          remark: "备注",
          region: ["zujian", "data", "tag"]
        }
      ],
      sexList: [
        {
          label: "男",
          value: "1"
        },
        {
          label: "女",
          value: "0"
        }
      ],
      loading: false,
      regionList: [
        {
          value: "zhinan",
          label: "指南",
          children: [
            {
              value: "shejiyuanze",
              label: "设计原则",
              children: [
                {
                  value: "yizhi",
                  label: "一致"
                },
                {
                  value: "fankui",
                  label: "反馈"
                },
                {
                  value: "xiaolv",
                  label: "效率"
                },
                {
                  value: "kekong",
                  label: "可控"
                }
              ]
            },
            {
              value: "daohang",
              label: "导航",
              children: [
                {
                  value: "cexiangdaohang",
                  label: "侧向导航"
                },
                {
                  value: "dingbudaohang",
                  label: "顶部导航"
                }
              ]
            }
          ]
        },
        {
          value: "zujian",
          label: "组件",
          children: [
            {
              value: "basic",
              label: "Basic",
              children: [
                {
                  value: "layout",
                  label: "Layout 布局"
                },
                {
                  value: "color",
                  label: "Color 色彩"
                },
                {
                  value: "typography",
                  label: "Typography 字体"
                },
                {
                  value: "icon",
                  label: "Icon 图标"
                },
                {
                  value: "button",
                  label: "Button 按钮"
                }
              ]
            },
            {
              value: "form",
              label: "Form",
              children: [
                {
                  value: "radio",
                  label: "Radio 单选框"
                },
                {
                  value: "checkbox",
                  label: "Checkbox 多选框"
                },
                {
                  value: "input",
                  label: "Input 输入框"
                },
                {
                  value: "input-number",
                  label: "InputNumber 计数器"
                },
                {
                  value: "select",
                  label: "Select 选择器"
                },
                {
                  value: "cascader",
                  label: "Cascader 级联选择器"
                },
                {
                  value: "switch",
                  label: "Switch 开关"
                },
                {
                  value: "slider",
                  label: "Slider 滑块"
                },
                {
                  value: "time-picker",
                  label: "TimePicker 时间选择器"
                },
                {
                  value: "date-picker",
                  label: "DatePicker 日期选择器"
                },
                {
                  value: "datetime-picker",
                  label: "DateTimePicker 日期时间选择器"
                },
                {
                  value: "upload",
                  label: "Upload 上传"
                },
                {
                  value: "rate",
                  label: "Rate 评分"
                },
                {
                  value: "form",
                  label: "Form 表单"
                }
              ]
            },
            {
              value: "data",
              label: "Data",
              children: [
                {
                  value: "table",
                  label: "Table 表格"
                },
                {
                  value: "tag",
                  label: "Tag 标签"
                },
                {
                  value: "progress",
                  label: "Progress 进度条"
                },
                {
                  value: "tree",
                  label: "Tree 树形控件"
                },
                {
                  value: "pagination",
                  label: "Pagination 分页"
                },
                {
                  value: "badge",
                  label: "Badge 标记"
                }
              ]
            },
            {
              value: "notice",
              label: "Notice",
              children: [
                {
                  value: "alert",
                  label: "Alert 警告"
                },
                {
                  value: "loading",
                  label: "Loading 加载"
                },
                {
                  value: "message",
                  label: "Message 消息提示"
                },
                {
                  value: "message-box",
                  label: "MessageBox 弹框"
                },
                {
                  value: "notification",
                  label: "Notification 通知"
                }
              ]
            },
            {
              value: "navigation",
              label: "Navigation",
              children: [
                {
                  value: "menu",
                  label: "NavMenu 导航菜单"
                },
                {
                  value: "tabs",
                  label: "Tabs 标签页"
                },
                {
                  value: "breadcrumb",
                  label: "Breadcrumb 面包屑"
                },
                {
                  value: "dropdown",
                  label: "Dropdown 下拉菜单"
                },
                {
                  value: "steps",
                  label: "Steps 步骤条"
                }
              ]
            },
            {
              value: "others",
              label: "Others",
              children: [
                {
                  value: "dialog",
                  label: "Dialog 对话框"
                },
                {
                  value: "tooltip",
                  label: "Tooltip 文字提示"
                },
                {
                  value: "popover",
                  label: "Popover 弹出框"
                },
                {
                  value: "card",
                  label: "Card 卡片"
                },
                {
                  value: "carousel",
                  label: "Carousel 走马灯"
                },
                {
                  value: "collapse",
                  label: "Collapse 折叠面板"
                }
              ]
            }
          ]
        },
        {
          value: "ziyuan",
          label: "资源",
          children: [
            {
              value: "axure",
              label: "Axure Components"
            },
            {
              value: "sketch",
              label: "Sketch Templates"
            },
            {
              value: "jiaohu",
              label: "组件交互文档"
            }
          ]
        }
      ],
      pageVO: {
        currentPage: 1,
        pageSize: 10,
        totalResult: 0
      },
      isClearActiveFlag: true
    };
  },
  created() {
    // this.findSexList();
    // this.findRegionList();
    // this.findList();
  },
  methods: {
    // 改变数据
    changeData(d) {
      this.currentData = d;
    },
    // 表格方法
    findList() {
      this.loading = true;
      XEAjax.doGet(
        `/api/user/page/list/${this.pageVO.pageSize}/${this.pageVO.currentPage}`
      )
        .then(response => {
          let { page, result } = response.data;
          this.list = result;
          this.pageVO.totalResult = page.totalResult;
          this.loading = false;
        })
        .catch(e => {
          this.loading = false;
        });
    },
    findSexList() {
      XEAjax.doGet("/api/conf/sex/list").then(({ data }) => {
        this.sexList = data;
      });
    },
    findRegionList() {
      XEAjax.doGet("/api/conf/region/list").then(({ data }) => {
        this.regionList = data;
      });
    },
    searchEvent() {
      this.pageVO.currentPage = 1;
      this.findList();
    },
    handleSizeChange(pageSize) {
      this.pageVO.pageSize = pageSize;
      this.findList();
    },
    handleCurrentChange(currentPage) {
      this.pageVO.currentPage = currentPage;
      this.findList();
    },
    formatterFlag(row, column, cellValue, index) {
      return cellValue ? "是" : "否";
    },
    formatterDate(row, column, cellValue, index) {
      return XEUtils.toDateString(cellValue, "yyyy-MM-dd HH:mm:ss");
    },
    clearActiveMethod({ type, row }) {
      return this.isClearActiveFlag && type === "out"
        ? this.checkOutSave(row)
        : this.isClearActiveFlag;
    },
    filterHandler(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },
    insertEvent() {
      let activeInfo = this.$refs.elxEditable.getActiveRow();
      let { insertRecords } = this.$refs.elxEditable.getAllRecords();
      if (!activeInfo && !insertRecords.length) {
        this.$refs.elxEditable
          .insert({
            name: `New ${Date.now()}`,
            age: 26,
            flag: false
          })
          .then(({ row }) => {
            this.$refs.elxEditable.setActiveRow(row);
          });
      }
    },
    // 点击表格外面处理
    checkOutSave(row) {
      if (!row.id) {
        this.isClearActiveFlag = false;
        this.$confirm("该数据未保存，请确认操作?", "温馨提示", {
          distinguishCancelAndClose: true,
          confirmButtonText: "保存数据",
          cancelButtonText: "移除数据",
          type: "warning"
        })
          .then(action => {
            this.$refs.elxEditable.clearActive();
            this.saveRowEvent(row);
          })
          .catch(action => {
            if (action === "cancel") {
              this.$refs.elxEditable.remove(row);
            }
          })
          .then(() => {
            this.isClearActiveFlag = true;
          });
      } else if (this.$refs.elxEditable.hasRowChange(row)) {
        this.isClearActiveFlag = false;
        this.$confirm("检测到未保存的内容，请确认操作?", "温馨提示", {
          distinguishCancelAndClose: true,
          confirmButtonText: "保存数据",
          cancelButtonText: "取消修改",
          type: "warning"
        })
          .then(() => {
            this.$refs.elxEditable.clearActive();
            this.saveRowEvent(row);
          })
          .catch(action => {
            if (action === "cancel") {
              this.$refs.elxEditable.revert(row);
              this.$refs.elxEditable.clearActive();
            }
          })
          .then(() => {
            this.isClearActiveFlag = true;
          });
        return false;
      }
      return this.isClearActiveFlag;
    },
    // 编辑处理
    openActiveRowEvent(row) {
      this.$nextTick(() => {
        let activeInfo = this.$refs.elxEditable.getActiveRow();
        if (activeInfo && activeInfo.isUpdate) {
          this.isClearActiveFlag = false;
          this.$confirm("检测到未保存的内容，请确认操作?", "温馨提示", {
            distinguishCancelAndClose: true,
            confirmButtonText: "保存数据",
            cancelButtonText: "取消修改",
            type: "warning"
          })
            .then(() => {
              this.$refs.elxEditable.setActiveRow(row);
              this.saveRowEvent(activeInfo.row);
            })
            .catch(action => {
              if (action === "cancel") {
                this.$refs.elxEditable.revert(activeInfo.row);
                this.$refs.elxEditable.setActiveRow(row);
              }
            })
            .then(() => {
              this.isClearActiveFlag = true;
            });
        } else {
          this.$refs.elxEditable.setActiveRow(row);
        }
      });
    },
    // 取消处理
    cancelRowEvent(row) {
      if (!row.id) {
        this.isClearActiveFlag = false;
        this.$confirm("该数据未保存，是否移除?", "温馨提示", {
          distinguishCancelAndClose: true,
          confirmButtonText: "移除数据",
          cancelButtonText: "返回继续",
          type: "warning"
        })
          .then(action => {
            if (action === "confirm") {
              this.$refs.elxEditable.remove(row);
            }
          })
          .catch(e => e)
          .then(() => {
            this.isClearActiveFlag = true;
          });
      } else if (this.$refs.elxEditable.hasRowChange(row)) {
        this.isClearActiveFlag = false;
        this.$confirm("检测到未保存的内容，是否取消修改?", "温馨提示", {
          distinguishCancelAndClose: true,
          confirmButtonText: "取消修改",
          cancelButtonText: "返回继续",
          type: "warning"
        })
          .then(action => {
            this.$refs.elxEditable.clearActive();
            this.$refs.elxEditable.revert(row);
          })
          .catch(action => {
            if (action === "cancel") {
              this.$refs.elxEditable.setActiveRow(row);
            }
          })
          .then(() => {
            this.isClearActiveFlag = true;
          });
      } else {
        this.$refs.elxEditable.clearActive();
      }
    },
    removeEvent(row) {
      if (row.id) {
        this.isClearActiveFlag = false;
        this.$confirm("确定永久删除该数据?", "温馨提示", {
          distinguishCancelAndClose: true,
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.loading = true;
            XEAjax.doDelete(`/api/user/delete/${row.id}`)
              .then(({ data }) => {
                this.findList();
              })
              .catch(e => {
                this.loading = false;
              });
          })
          .catch(action => action)
          .then(() => {
            this.isClearActiveFlag = true;
          });
      } else {
        this.$refs.elxEditable.remove(row);
      }
    },
    deleteSelectedEvent() {
      let removeRecords = this.$refs.elxEditable.getSelecteds();
      if (removeRecords.length) {
        this.isClearActiveFlag = false;
        this.$confirm("确定删除所选数据?", "温馨提示", {
          distinguishCancelAndClose: true,
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.loading = true;
            XEAjax.doPost("/api/user/save", { removeRecords })
              .then(({ data }) => {
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
                this.findList();
              })
              .catch(e => {
                this.loading = false;
              });
          })
          .catch(action => action)
          .then(() => {
            this.isClearActiveFlag = true;
          });
      } else {
        this.$message({
          type: "info",
          message: "请至少选择一条数据！"
        });
      }
    },
    saveRowEvent(row) {
      this.$refs.elxEditable.validateRow(row, valid => {
        if (valid) {
          let url = "/api/user/add";
          if (row.id) {
            url = "/api/user/update";
          }
          if (XEUtils.isDate(row.date)) {
            row.date = row.date.getTime();
          }
          this.loading = true;
          this.$refs.elxEditable.clearActive();
          XEAjax.doPost(url, row)
            .then(({ data }) => {
              this.findList();
              this.$message({ message: "保存成功", type: "success" });
            })
            .catch(e => {
              this.loading = false;
            });
        }
      });
    },
    exportCsvEvent() {
      this.$refs.elxEditable.exportCsv();
    },
    // 获取多级选项
    getCascaderLabel(value, list) {
      let values = value || [];
      let labels = [];
      let matchCascaderData = function(index, list) {
        let val = values[index];
        if (list && values.length > index) {
          list.forEach(item => {
            if (item.value === val) {
              labels.push(item.label);
              matchCascaderData(++index, item.children);
            }
          });
        }
      };
      matchCascaderData(0, list);
      return labels.join(" / ");
    },
    // 日期选择器
    getDatePicker(value) {
      return XEUtils.toDateString(value, "yyyy/MM/dd");
    }
  }
};
</script>
<style lang="scss">
@import "~@/styles/variables.scss";
.data-management-subpage {
  display: flex;
  flex-direction: column;
  align-items: center;
  &__title {
    width: 1280px;
    height: 32px;
    margin-top: 20px;
    margin-bottom: 20px;
    h4 {
      float: left;
      line-height: 32px;
      font-size: 24px;
      color: rgba(12, 0, 53, 1);
    }
    .el-button-group {
      float: right;
    }
  }
  > hr {
    width: 1280px;
    margin-top: 0px;
    margin-bottom: 12px;
  }
  &__op {
    width: 1280px;
    margin-bottom: 12px;
  }
  &__table {
    width: 1280px;
    margin-bottom: 12px;
    .cell {
      text-align: center;
      font-size: 12px;
      padding: 0 !important;
    }
    thead {
      .elx-editable-column {
        height: 40px;
        background: rgba(12, 0, 53, 0.08);
      }
    }
    tbody {
      .elx-editable-column {
        height: 40px;
      }
      tr:nth-child(2n) {
        background: rgba(250, 250, 251, 1);
      }
      tr {
        td {
          .el-input {
            .el-input__inner {
              height: 30px !important;
            }
          }
          .el-select__caret.el-input__icon {
            line-height: 30px;
          }
          .el-input__icon.el-icon-time {
            line-height: 30px;
          }
        }
        td:nth-last-child(1) {
          .cell {
            i {
              font-size: 16px;
              padding: 0 7px;
              cursor: pointer;
            }
            .el-icon-edit {
              color: rgba(12, 0, 53, 1);
              border-right: 2px solid rgba(12, 0, 53, 0.08);
            }
            .el-icon-circle-check {
              color: #67c23a;
              border-right: 2px solid rgba(12, 0, 53, 0.08);
            }
            .el-icon-delete,
            .el-icon-circle-close {
              color: #f56c6c;
            }
          }
        }
      }
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
