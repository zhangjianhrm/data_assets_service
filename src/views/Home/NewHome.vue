<template>
  <div class="new-home">
    <galaxy class="new-home__galaxy"></galaxy>
    <header-nav class="new-home__header" :opacity="true"></header-nav>
    <home-scroll-data class="new-home__scroll-data"></home-scroll-data>
    <home-search class="new-home__search"></home-search>
    <home-data class="new-home__data"></home-data>
    <home-plus class="new-home__plus"></home-plus>
  </div>
</template>
<script>
export default {
  name: "NewHome",
  components: {
    Galaxy: () => import("@/views/Home/components/Galaxy"),
    HeaderNav: () => import("@/components/Layout/HeaderNav"),
    HomeScrollData: () => import("@/views/Home/components/HomeScrollData"),
    HomeSearch: () => import("@/views/Home/components/HomeSearch"),
    HomeData: () => import("@/views/Home/components/HomeData"),
    HomePlus: () => import("@/views/Home/components/HomePlus")
  },
  data() {
    return {};
  },
  created() {
    this.init();
  },
  methods: {
    init() {}
  }
};
</script>
<style lang="scss">
@import "~@/styles/variables.scss";
.new-home {
  height: 100vh;
  overflow: hidden;
  position: relative;
  display: flex;
  // flex-wrap: wrap;
  justify-content: space-around;
  flex-direction: column;
  align-items: center;

  &__galaxy {
    position: absolute;
    top: 0;
    z-index: -1;
  }
  &__header {
    position: absolute;
    top: 0;
  }
  @media only screen and (min-height: 500px) and (min-height: 579px) {
    &__scroll-data {
      margin-top: 100px;
    }
  }
  @media only screen and (min-height: 580px) and (min-height: 619px) {
    &__scroll-data {
      margin-top: 120px;
    }
  }
  @media only screen and (min-height: 620px) and (min-height: 749px) {
    &__scroll-data {
      margin-top: 130px;
    }
  }
  @media only screen and (min-height: 750px) and (min-height: 899px) {
    &__scroll-data {
      margin-top: 140px;
    }
  }
  @media only screen and (min-height: 900px) {
    &__scroll-data {
      margin-top: 180px;
    }
  }
}
</style>
