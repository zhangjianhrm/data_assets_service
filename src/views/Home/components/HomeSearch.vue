<template>
  <div class="home__search">
    <div class="home__search_wrap">
      <el-input clearable placeholder="请输入表名" v-model="value" class="home__search_wrap_search">
        <el-select v-model="select" slot="prepend" placeholder="请选择业务系统">
          <el-option
            v-for="(item,index) in options"
            :key="index"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-button slot="append">
          <i class="su-icon-inquire" style="margin-right:5px;"></i>
          <span>搜索</span>
        </el-button>
      </el-input>
    </div>
  </div>
</template>
<script>
export default {
  name: "HomeSearch",
  data() {
    return {
      value: "",
      select: "",
      options: [
        { label: "很长很长很长的", value: 1 },
        { label: "很长很长很长的", value: 2 },
        { label: "很长很长很长的", value: 3 },
        { label: "很长很长很长的", value: 4 },
        { label: "很长很长很长的", value: 5 },
        { label: "很长很长很长的", value: 6 },
        { label: "很长很长很长很长很长的搜索", value: 7 }
      ]
    };
  }
};
</script>
<style lang="scss">
.home__search {
  width: 1280px;
  height: 140px;
  background-color: rgba(255, 255, 255, 0.1);
  position: relative;
  &_wrap {
    position: absolute;
    top: 10px;
    right: 10px;
    bottom: 10px;
    left: 10px;
    background-color: rgba(255, 255, 255, 0.1);
    padding: 30px 20px;
    .el-select .el-input {
      width: 200px;
    }
    &_search {
      height: 60px;
      .el-input__inner {
        height: 60px;
      }
      .el-input-group__append {
        button {
          width: 170px;
        }
      }
    }
  }
}
</style>
