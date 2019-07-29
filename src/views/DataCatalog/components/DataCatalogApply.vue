<template>
  <div class="data-catalog__apply">
    <div class="data-catalog__apply_title">
      <div>
        <el-button size="small" icon="el-icon-back" @click="$router.go(-1)">返回</el-button>
        <span>数据目录申请</span>
      </div>
    </div>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="120px"
      class="demo-ruleForm"
    >
      <el-form-item label="申请人" prop="name">
        <el-input v-model="ruleForm.user" size="medium" disabled></el-input>
      </el-form-item>
      <el-form-item label="单位部门" prop="name">
        <el-input v-model="ruleForm.department" size="medium" disabled></el-input>
      </el-form-item>
      <el-form-item label="目录名称" prop="catalogName">
        <el-input v-model="ruleForm.catalogName" size="medium" clearable></el-input>
      </el-form-item>
      <el-form-item label="数据返回格式" prop="resource">
        <el-radio-group v-model="ruleForm.resource" size="medium">
          <el-radio-button label="JSON"></el-radio-button>
          <el-radio-button label="XML"></el-radio-button>
          <el-radio-button label="XLS"></el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="目录主题" prop="theme">
        <el-select v-model="ruleForm.theme" multiple placeholder="请选择" size="medium">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="申请数据" prop="applyData">
        <el-input
          type="textarea"
          v-model="ruleForm.applyData"
          maxlength="150"
          clearable
          show-word-limit
        ></el-input>
      </el-form-item>
      <el-form-item label>
        <div class="tips">
          <p>
            <b>填写示例：</b>
          </p>
          <p>
            <b>数据内容：</b>
            <span>学生基本信息表、学生学籍信息表中学生的学号、姓名、生源地、院系、专业、班级、绩点、学籍状态。</span>
          </p>
          <p>
            <b>数据范围：</b>
            <span>2017-2018 第二学期</span>
          </p>
          <p>
            <b>调用参数：</b>
            <span>院系、专业、范围</span>
          </p>
        </div>
      </el-form-item>
      <el-form-item label="申请理由" prop="applyData">
        <el-input
          type="textarea"
          v-model="ruleForm.applyReason"
          maxlength="150"
          clearable
          show-word-limit
        ></el-input>
      </el-form-item>
      <el-form-item label="联系方式" prop="tel">
        <el-input v-model="ruleForm.tel" size="medium" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交申请</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
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
      ruleForm: {
        user: "李孟哲",
        department: "艺术设计学院",
        catalogName: "",
        resource: "",
        theme: [],
        applyData: "",
        applyReason: "",
        tel: ""
      },
      rules: {
        catalogName: [
          { required: true, message: "请输入目录名称", trigger: "blur" },
          { min: 1, max: 15, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        resource: [
          { required: true, message: "请选择返回格式", trigger: "change" }
        ],
        theme: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个主题",
            trigger: "change"
          }
        ],
        applyData: [
          { required: true, message: "请填写申请数据", trigger: "blur" }
        ],
        applyReason: [
          { required: true, message: "请填写申请理由", trigger: "blur" }
        ],
        tel: [{ validator: this.checkAge, trigger: "blur" }]
      }
    };
  },
  methods: {
    checkAge(rule, value, callback) {
      if (!value) {
        return callback(new Error("请输入联系方式"));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("只能输入数字"));
        } else {
          if (value.length < 7) {
            callback(new Error("请输入正确的联系方式"));
          } else {
            callback();
          }
        }
      }, 1000);
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style lang="scss">
@import "~@/styles/variables.scss";
.data-catalog__apply {
  display: flex;
  flex-direction: column;
  align-items: center;
  &_title {
    width: 100%;
    height: 74px;
    background-color: $color-header;
    margin-bottom: 60px;
    > div {
      width: 1280px;
      height: 32px;
      margin: 21px auto 0;
      > .el-button {
        float: left;
      }
      > span {
        line-height: 32px;
        color: #fff;
        font-size: 24px;
        font-weight: 500;
        margin-left: 24px;
      }
    }
  }
  .el-form {
    margin-bottom: 60px;
    .tips {
      color: $color-header;
      width: 600px;
      height: 130px;
      background: rgba(255, 181, 98, 0.1);
      border: 1px solid rgba(255, 183, 119, 1);
      padding: 10px;
      font-size: 14px;
      line-height: 20px;
      box-sizing: border-box;
      p:nth-child(1) {
        margin-bottom: 10px;
      }
    }
    .el-textarea {
      textarea {
        max-height: 114px !important;
        min-height: 114px !important;
      }
    }
  }
}
</style>

