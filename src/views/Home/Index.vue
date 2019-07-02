<template>
  <div class="home">
    <header-nav :opacity="true" id="header"></header-nav>
    <home-banner></home-banner>
    <home-news id="home-news"></home-news>
  </div>
</template>
<script>
export default {
  name: "HomeIndex",
  components: {
    HeaderNav: () => import("@/components/Layout/HeaderNav"),
    HomeBanner: () => import("@/views/Home/components/Banner"),
    HomeNews: () => import("@/views/Home/components/HomeNews")
  },
  data() {
    return {};
  }
};
</script>
<style lang="scss">
#header {
  position: absolute;
  top: 0;
  z-index: 1;
}
#home-news {
  z-index: 3;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 50px;
}
</style>
