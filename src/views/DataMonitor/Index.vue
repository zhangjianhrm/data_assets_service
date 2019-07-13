<template>
  <div class="data-monitor">
    <!-- <scroll-demo></scroll-demo> -->
    <data-map></data-map>
    <top class="data-monitor__top"></top>
    <div class="data-monitor__left">
      <assets></assets>
    </div>
    <bottom></bottom>
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
  &__top {
    position: absolute;
    top: 0px;
    left: 0px;
  }
  &__left {
    position: absolute;
    top: 150px;
    left: 20px;
  }
  &__bottom {
    position: absolute;
    bottom: 0px;
    left: 0px;
  }
}
</style>
