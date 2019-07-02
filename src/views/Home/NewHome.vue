<template>
  <div class="new-home">
    <galaxy></galaxy>
    <header-nav id="header-nav" :opacity="true"></header-nav>
    <home-scroll-data id="home-scroll-data"></home-scroll-data>
    <home-search id="home-search"></home-search>
    <home-data id="home-data"></home-data>
    <home-plus id="home-plus"></home-plus>
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
  position: relative;
  height: 100vh;
  overflow: hidden;
  #header-nav {
    position: absolute;
    top: 0;
    z-index: 1;
  }
  #home-scroll-data {
    position: absolute;
    top: 160px;
    left: 0;
    right: 0;
    margin: auto;
    z-index: 1;
  }
  #home-search {
    position: absolute;
    top: 250px;
    left: 0;
    right: 0;
    margin: auto;
    z-index: 1;
  }
  #home-data {
    position: absolute;
    top: 400px;
    left: 0;
    right: 0;
    margin: auto;
    z-index: 1;
  }
  #home-news {
    z-index: 1;
    position: absolute;
    right: 0;
    bottom: 50px;
    left: 0;
  }
  #home-plus {
    z-index: 1;
    position: absolute;
    right: 0;
    top: 470px;
    left: 0;
    margin: auto;
  }
  @media only screen and (min-height: 500px) and (min-height: 579px) {
    #home-scroll-data {
      top: 100px;
    }
    #home-search {
      top: 200px;
    }
    #home-data {
      top: 350px;
    }
    #home-plus {
      top: 470px;
    }
  }
  @media only screen and (min-height: 580px) and (min-height: 619px) {
    #home-scroll-data {
      top: 120px;
    }
    #home-search {
      top: 200px;
    }
    #home-data {
      top: 350px;
    }
    #home-plus {
      top: 450px;
    }
  }
  @media only screen and (min-height: 620px) and (min-height: 749px) {
    #home-scroll-data {
      top: 130px;
    }
    #home-search {
      top: 220px;
    }
    #home-data {
      top: 370px;
    }
    #home-plus {
      top: 480px;
    }
  }
  @media only screen and (min-height: 750px) and (min-height: 899px) {
    #home-scroll-data {
      top: 130px;
    }
    #home-search {
      top: 220px;
    }
    #home-data {
      top: 370px;
    }
    #home-plus {
      top: 520px;
    }
  }
  @media only screen and (min-height: 900px) {
    #home-scroll-data {
      top: 180px;
    }
    #home-search {
      top: 270px;
    }
    #home-data {
      top: 420px;
    }
    #home-plus {
      top: 580px;
    }
  }
}
</style>
