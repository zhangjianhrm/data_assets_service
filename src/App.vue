<template>
  <div id="app">
    <el-scrollbar wrap-class="app-scrollbar" style="height:100vh;">
      <router-view name="header-nav"></router-view>
      <router-view></router-view>
      <el-backtop target=".app-scrollbar"></el-backtop>
      <!-- <back-to-top /> -->
    </el-scrollbar>
  </div>
</template>

<script>
export default {
  name: "DataAssetsService",
  components: {
    BackToTop: () => import("@/components/BackToTop")
  },
  data() {
    return {};
  }
};
</script>
<style lang="scss">
#app {
  // background: rgb(250, 250, 250);
  .app-scrollbar {
    // height: 100vh;
    // height: 100%;
    overflow-x: hidden !important;
  }
}
</style>
