<template>
  <div class="data-quality">
    <el-button @click="$router.push('/data_quality/report')" style="margin:100px;">数据质量报告</el-button>
  </div>
</template>
<script>
export default {
  name: "DataQuality"
};
</script>
<style lang="scss">
.data-quality {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
