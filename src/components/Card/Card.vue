<template>
  <div class="card">
    <el-checkbox
      v-if="checkbox"
      v-model="cardData.checked"
      class="card_checkbox"
      @change="changeClick"
    />
    <p class="card_title">{{cardData.NAME}}</p>
    <div class="card_format" v-if="cardData.format">
      <b v-for="(item,index) in cardData.format" :key="index">{{item}}</b>
    </div>
    <div class="card_details">
      <p v-if="cardData.REFER_CODE_COUNT">
        <span>代码量</span>
        <span>：</span>
        <span>{{cardData.REFER_CODE_COUNT}}</span>
      </p>
      <p v-if="cardData.NUM">
        <span>代码子类</span>
        <span>：</span>
        <span>{{cardData.NUM}}</span>
      </p>
      <p v-if="cardData.ORIGIN">
        <span>来源</span>
        <span>：</span>
        <span>{{cardData.ORIGIN}}</span>
      </p>
      <!-- <p v-for="(item,index) in cardData.details" :key="index">
        <span>{{index | translator}}</span>
        <span>：</span>
        <span>{{item}}</span>
      </p>-->
    </div>
    <div class="card_operation">
      <span>更新时间：{{cardData.UPDATE_TIME}}</span>
      <div>
        <svg-icon icon-class="collects" @click.stop="collects(cardData)" />
        <span>{{cardData.COLLECT_NUM}}</span>
        <svg-icon icon-class="download.2" @click.stop="download(cardData)" />
        <span>{{cardData.DOWNLOAD_NUM}}</span>
      </div>
    </div>
    <el-dialog
      title="数据目录下载申请"
      width="30%"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      :append-to-body="true"
    >
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="线上申请" name="first">
          <el-form ref="form1" :model="form" label-width="90px" :rules="rules">
            <el-form-item label="申请人">
              <el-input v-model="form.user" size="medium" disabled></el-input>
            </el-form-item>
            <el-form-item label="真实姓名">
              <el-input v-model="form.name" size="medium" disabled></el-input>
            </el-form-item>
            <el-form-item label="所在部门">
              <el-input v-model="form.department" size="medium" disabled></el-input>
            </el-form-item>
            <el-form-item label="联系方式" prop="tel">
              <el-input v-model.number="form.tel" size="medium" clearable></el-input>
            </el-form-item>
            <el-form-item label="附件上传">
              <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                :on-exceed="handleExceed"
                :file-list="form.fileList"
              >
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="线下申请" name="second">
          <el-checkbox-group v-model="checkedCities">
            <el-checkbox
              v-for="city in cities"
              :label="city"
              :key="city"
              style="width:100%;margin:0 0 20px 20px"
            >
              <span style="margin-right:14px;">{{city}}</span>
              <el-tooltip effect="dark" content="点击下载" placement="right">
                <svg-icon icon-class="download.2" @click.prevent="downloadApplyWord(city)" />
              </el-tooltip>
            </el-checkbox>
          </el-checkbox-group>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible = false">取消</el-button>
        <el-button
          v-show="activeName == 'first'"
          size="small"
          type="primary"
          @click="submit('form1')"
        >提交</el-button>
        <el-button
          v-show="activeName == 'second' && checkedCities.length == 0"
          size="small"
          type="primary"
          @click="downloadApplyWord(cities)"
        >全部下载</el-button>
        <el-button
          v-show="activeName == 'second' && checkedCities.length > 0"
          size="small"
          type="primary"
          @click="downloadApplyWord(checkedCities)"
        >下载选中</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "Card",
  props: {
    cardData: {
      type: Object,
      default: () => {
        return {};
      }
    },
    checkbox: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      checked: false,
      dialogVisible: false,
      activeName: "first",
      form: {
        user: "李孟哲",
        name: "李孟哲",
        department: "教务处",
        tel: "",
        fileList: []
      },
      rules: {
        tel: [
          { required: true, message: "不能为空" },
          { type: "number", message: "必须为数字值" }
        ]
      },
      cities: [
        "人事部门申请模板",
        "财务部门申请模板",
        "学工部门申请模板",
        "教务部门申请模板"
      ],
      checkedCities: []
    };
  },
  methods: {
    // 点击 checkbox
    changeClick(bool) {
      this.$emit("cardSelected", this.cardData, bool);
    },
    // 按钮触发事件
    goDetails() {
      this.$emit("goDetails", this.cardData);
    },
    // 收藏
    collects(data) {
      this.$message({
        message: "收藏 " + JSON.stringify(data),
        type: "success"
      });
    },
    // 下载
    download(data) {
      // this.$message({
      //   message: "下载 " + JSON.stringify(data),
      //   type: "success"
      // });
      this.$confirm("您没有下载权限, 是否申请下载?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.dialogVisible = true;
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    // 标签切换
    handleClick(tab, event) {
      console.log(tab, event);
    },
    // 关闭 dialog
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    // 文件上传
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    // 提交申请
    submit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$message({
            message: "已提交",
            type: "success"
          });
          this.dialogVisible = false;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 下载模板
    downloadApplyWord(file) {
      this.$message({
        message: "已下载" + file,
        type: "success"
      });
    }
  },
  filters: {
    translator: value => {
      switch (value) {
        case "subclass":
          return "代码子类";
        case "source":
          return "来源";
        default:
          return value;
      }
    }
  },
  mounted() {}
};
</script>
<style lang="scss">
@import "~@/styles/variables.scss";
.card {
  float: left;
  box-sizing: border-box;
  width: 406px;
  // height: 227px;
  padding: 30px 30px 0;
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.15);
  position: relative;
  margin-right: 31px;
  margin-bottom: 31px;
  transition: all 0.4s;
  border-radius: 4px;
  background: #fff;
  overflow: hidden;
  &:nth-child(3n) {
    margin-right: 0;
  }
  &:hover {
    box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.28);
    transform: scale(1.02, 1.02);
    z-index: 2;
  }
  &_checkbox {
    // visibility: hidden;
    position: absolute;
    top: 8px;
    right: 10px;
    margin-right: 0;
  }
  &_title {
    font-size: 18px;
    line-height: 22px;
    font-weight: bold;
    color: $color-header;
    margin-bottom: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    cursor: pointer;
  }
  &_format {
    width: 100%;
    height: 24px;
    margin-bottom: 10px;
    b {
      float: left;
      width: 47px;
      height: 100%;
      // margin-right: 4px;
      color: #fff;
      text-align: center;
      font-size: 12px;
      line-height: 24px;
      &:nth-child(1) {
        background: #39259e;
        border-radius: 4px 0 0 4px;
      }
      &:nth-child(2) {
        background: #444f84;
      }
      &:nth-child(3) {
        background: #2b92ff;
      }
      &:nth-child(4) {
        background: #ffa32b;
      }
      &:nth-last-child(1) {
        border-radius: 0 4px 4px 0;
      }
    }
  }
  &_details {
    cursor: default;
    color: $color-header-50;
    font-size: 14px;
    overflow: hidden;
    margin-bottom: 80px;
    p {
      span:nth-child(1) {
        float: left;
        width: 56px;
        text-align-last: justify;
      }
      span:nth-child(3) {
        float: right;
        width: 270px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
    }
  }
  &_operation {
    position: absolute;
    bottom: 0;
    width: 346px;
    height: 60px;
    line-height: 60px;
    color: $color-header-50;
    border-top: 1px $color-header-10 solid;
    font-size: 14px;
    > span {
      float: left;
    }
    > div {
      float: right;
      svg {
        margin-right: 7px;
        cursor: pointer;
      }
      svg:nth-child(1) {
        &:hover {
          color: rgb(255, 50, 50);
        }
      }
      span:nth-child(2) {
        margin-right: 20px;
      }
    }
  }
}
</style>
