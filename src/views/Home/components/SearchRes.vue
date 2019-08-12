<template>
  <div class="search-res">
    <pop-over-nav></pop-over-nav>
    <div class="ISM_bg"></div>
  </div>
</template>
<script>
export default {
  name: "SearchRes",
  components: {
    PopOverNav: () => import("@/components/PopOverNav/PopOverNav")
  }
};
</script>
<style lang="scss">
@import "~@/styles/variables.scss";
.search-res {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: $color-footer;
  background-image: url("../../../assets/ISM/ISM-title.svg");
  background-repeat: no-repeat;
  background-position: 0 10px;
  background-size: 100%;
  display: flex;
  align-content: center;
  flex-wrap: wrap;
  justify-content: center;
  &_bg {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-image: url(../../../assets/Common/map.png);
    background-repeat: no-repeat;
    background-position: center;
    background-size: 70%;
    opacity: 0.3;
  }
}
</style>