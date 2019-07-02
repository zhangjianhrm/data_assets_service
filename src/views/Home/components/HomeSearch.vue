<template>
  <div class="home__search">
    <div class="home__search_wrap">
      <el-input placeholder="请输入内容" v-model="input3" class="home__search_wrap_search">
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
      input3: ""
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
