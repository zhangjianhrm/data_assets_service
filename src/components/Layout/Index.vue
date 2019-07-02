<template>
  <div>
    <header-nav></header-nav>
    <router-view></router-view>
    <footer-link></footer-link>
  </div>
</template>
<script>
export default {
  name: "InfoStandardIndex",
  components: {
    HeaderNav: () => import("@/components/Layout/HeaderNav"),
    FooterLink: () => import("@/components/Layout/FooterLink")
  },
  data() {
    return {};
  },
  methods: {}
};
</script>
<style lang="scss">
</style>
