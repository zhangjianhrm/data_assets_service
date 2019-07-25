<template>
  <div class="data-map__details">
    <div class="data-map__details_title"></div>
    <scroll-demo></scroll-demo>
    <div class="data-map__details_table">
      <div class="data-map__details_table_top"></div>
      <div class="data-map__details_table_center"></div>
      <div class="data-map__details_table_bottom"></div>
      <div class="data-map__details_table_title">表影响力排行</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "DataMapDetails",
  components: {
    ScrollDemo: () => import("./ScrollDemo")
  }
};
</script>
<style lang="scss">
@import "~@/styles/variables.scss";
.data-map__details {
  width: 100vw;
  height: 100vh;
  background-image: url(../../../assets/DataMonitor/grid.png);
  background-color: $color-footer;
  position: relative;
  &_title {
    width: 100%;
    height: 100px;
    background: url(../../../assets/DataMonitor/data-map-details-title.png);
    background-repeat: no-repeat;
    background-position: top center;
    background-size: 100%;
  }
  &_table {
    position: absolute;
    top: 52px;
    right: 10px;
    width: 310px;
    height: 192px;
    &_top {
      position: absolute;
      top: 0;
      width: 100%;
      height: 50px;
      background-image: url(../../../assets/DataMonitor/top.png);
      background-repeat: no-repeat;
      background-position: top center;
      background-size: 100%;
    }
    &_center {
      position: absolute;
      top: 49px;
      right: 2px;
      bottom: 50px;
      left: 0;
      border-right: 1px solid rgba(39, 115, 230, 0.4);
      border-left: 1px solid rgba(39, 115, 230, 0.4);
      background-color: rgba(13, 29, 76, 0.4);
    }
    &_bottom {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 50px;
      background-image: url(../../../assets/DataMonitor/bottom.png);
      background-repeat: no-repeat;
      background-position: bottom center;
      background-size: 100%;
    }
    &_title {
      position: absolute;
      top: 0;
      width: 100%;
      height: 30px;
      background-image: url(../../../assets/DataMonitor/item-title.png);
      background-repeat: no-repeat;
      background-position: top center;
      // background-size: 100%;
      font-size: 12px;
      text-align: center;
      color: rgba(41, 193, 204, 1);
      line-height: 30px;
      font-weight: 600;
    }
  }
}
</style>
