<template>
  <div class="rate">
    <p class="rate__title">{{title}}</p>
  </div>
</template>
<script>
export default {
  name: "RatePage",
  data() {
    return {
      title:
        this.$route.params.year +
        "年" +
        this.$route.params.month +
        this.$route.params.name +
        "采标率"
    };
  }
};
</script>
<style lang="scss">
.rate {
  width: 1280px;
  margin: 0 auto;
  &__title {
    font-size: 16px;
  }
}
</style>
