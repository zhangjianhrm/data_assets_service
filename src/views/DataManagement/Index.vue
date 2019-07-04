<template>
  <div class="data-management">
    <el-button @click="$router.push('/data_management/subpage')">学生基本信息子类</el-button>
  </div>
</template>
<script>
export default {
  name: "DataManagement"
};
</script>
<style lang="scss">
.data-management {
  display: flex;
  justify-content: center;
}
</style>
