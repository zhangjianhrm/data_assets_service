<template>
  <div class="data-catalog">
    <div class="data-catalog__title">
      <h3>数据目录首页</h3>
    </div>

    <el-button @click="$router.push('/data_catalog/catalog')" style="margin:100px auto;">数据目录</el-button>
    <!-- <RateBarGraph></RateBarGraph>
    <DownloadRank></DownloadRank>
    <DataCatalogCategory></DataCatalogCategory>-->
  </div>
</template>
<script>
export default {
  name: "DataCatalog",
  components: {
    RateBarGraph: () => import("@/views/DataCatalog/components/StatBarGraph"),
    DownloadRank: () => import("@/views/DataCatalog/components/DownloadRank"),
    DataCatalogCategory: () =>
      import("@/views/DataCatalog/components/DataCatalogCategory")
  }
};
</script>
<style lang="scss">
@import "~@/styles/variables.scss";
.data-catalog {
  display: flex;
  flex-direction: column;
  align-items: center;
  &__title {
    width: 100%;
    height: 160px;
    background: $color-header;
    color: #fff;
    font-size: 28px;
    h3 {
      text-align: center;
      line-height: 160px;
    }
  }
}
</style>
