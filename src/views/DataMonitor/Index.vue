<template>
  <div class="data-monitor">
    <!-- <scroll-demo></scroll-demo> -->
    <data-map></data-map>
    <top class="data-monitor__top"></top>
    <bottom></bottom>
    <div class="data-monitor__left">
      <div class="data-monitor__left_stage">
        <assets></assets>
        <br />
        <assets></assets>
      </div>
    </div>
    <div class="data-monitor__right">
      <div class="data-monitor__right_stage">
        <assets></assets>
        <br />
        <assets></assets>
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
    Bottom: () => import("./components/Bottom")
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
  width: 100%;
  background: #000;
  &__top {
    position: absolute;
    top: 0px;
    left: 0px;
  }
  &__left {
    position: absolute;
    top: 150px;
    left: 25px;
    transform-style: preserve-3d;
    perspective: 550px;
    transform-origin: 100% 50%;
    &_stage {
      transform: rotateY(10deg);
    }
  }
  &__right {
    position: absolute;
    top: 150px;
    right: 25px;
    transform-style: preserve-3d;
    perspective: 550px;
    transform-origin: 100% 50%;
    &_stage {
      transform: rotateY(-10deg);
    }
  }
  &__bottom {
    position: absolute;
    bottom: 0px;
    left: 0px;
  }
}
</style>
