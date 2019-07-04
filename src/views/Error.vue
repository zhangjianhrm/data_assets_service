<template>
  <div class="error">
    <svg-icon icon-class="404"></svg-icon>
    <el-button type="primary" @click="$router.push('/')">回到首页</el-button>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {}
};
</script>
<style lang="scss">
.error {
  display: flex;
  flex-direction: column;
  align-items: center;

  svg {
    width: 40vw !important;
    height: 60vh !important;
  }
}
</style>
