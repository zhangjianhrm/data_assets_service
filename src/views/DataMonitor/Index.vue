<template>
  <div class="data-monitor">
    <!-- <scroll-demo></scroll-demo> -->
    <star class="data-monitor__star"></star>
    <div class="data-monitor__cover"></div>
    <data-map class="data-monitor__data-map"></data-map>
    <top class="data-monitor__top"></top>
    <bottom></bottom>
    <div class="data-monitor__left">
      <div class="data-monitor__left_stage">
        <assets></assets>
        <quality></quality>
      </div>
    </div>
    <div class="data-monitor__right">
      <div class="data-monitor__right_stage">
        <service-catalog></service-catalog>
        <live></live>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "DataMonitor",
  components: {
    ScrollDemo: () => import("./components/ScrollDemo"),
    DataMap: () => import("./components/DataMap"),
    Top: () => import("./components/Top"),
    Assets: () => import("./components/Assets"),
    Quality: () => import("./components/Quality"),
    ServiceCatalog: () => import("./components/Service&Catalog"),
    Live: () => import("./components/Live"),
    Bottom: () => import("./components/Bottom"),
    Star: () => import("@/components/Star/Star.vue")
  }
};
</script>
<style lang="scss">
@import "~@/styles/variables.scss";
.data-monitor {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: $color-header;
  position: relative;
  &__cover {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background: linear-gradient(rgba(12, 0, 53, 0.9), rgba(12, 0, 53, 0.2));
  }
  &__data-map {
    position: absolute;
    top: 0px;
    right: 0;
    bottom: 0;
    left: 0px;
    margin: auto;
  }
  &__top {
    position: absolute;
    top: 0px;
    left: 0px;
  }
  &__left {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 25px;
    margin: auto;
    height: 506px;
    transform-style: preserve-3d;
    perspective: 550px;
    transform-origin: 100% 50%;
    z-index: 2;
    &_stage {
      transform: rotateY(10deg);
    }
  }
  &__right {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 25px;
    margin: auto;
    height: 506px;
    transform-style: preserve-3d;
    perspective: 550px;
    transform-origin: 100% 50%;
    z-index: 2;
    &_stage {
      transform: rotateY(-10deg);
    }
  }
  &__bottom {
    position: absolute;
    bottom: 0px;
    left: 0px;
    z-index: 2;
  }
  @media only screen and (min-width: 100px) and (max-width: 1365px) {
    &__left {
      top: unset;
      bottom: 110px;
    }
    &__right {
      top: unset;
      bottom: 110px;
    }
  }
  @media only screen and (min-width: 1366px) and (max-width: 1439px) {
    &__left {
      top: 60px;
    }
    &__right {
      top: 60px;
    }
  }
  @media only screen and (min-width: 1440px) and (max-width: 1599px) {
    &__left {
      top: 25px;
      left: 79px;
      transform: scale(1.15);
    }
    &__right {
      top: 25px;
      right: 26px;
      transform: scale(1.15);
    }
  }
  @media only screen and (min-width: 1600px) and (max-width: 1919px) {
  }
  @media only screen and (min-width: 1920px) {
    &__left {
      top: 95px;
      left: 170px;
      transform: scale(1.4);
    }
    &__right {
      top: 95px;
      right: 30px;
      transform: scale(1.4);
    }
  }
  // el-radio
  .el-radio-button__inner {
    background: transparent;
    border: 1px solid $color-blue;
    padding: 4px 10px;
  }
  .el-radio-button:first-child .el-radio-button__inner {
    border-left: 1px solid $color-blue;
  }
  // .el-carousel
  .el-carousel__button {
    width: 8px;
    height: 8px;
    border-radius: 50%;
  }
}
</style>
