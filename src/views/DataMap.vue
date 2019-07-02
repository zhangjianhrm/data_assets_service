<template>
  <div>
    <data-map-v1 :pointData="pointData"></data-map-v1>
    <data-map-v2></data-map-v2>
    <data-map-v3></data-map-v3>
  </div>
</template>
<script>
export default {
  name: "DataMap",
  components: {
    DataMapV1: () => import("@/components/DataMap/DataMapV1"),
    DataMapV2: () => import("@/components/DataMap/DataMapV2"),
    DataMapV3: () => import("@/components/DataMap/DataMapV3")
  },
  data() {
    return {
      // 需要传递数据地图的数据
      pointData: [
        { name: "全量库", coord: [105, 40] }, // 中心点放在最前面
        { name: "宿管系统", coord: [130, 50, { in: 10, out: 9 }] },
        { name: "人事系统", coord: [130, 45, { in: 10, out: 9 }] },
        { name: "资产系统", coord: [130, 40, { in: 1, out: 1 }] },
        { name: "迎新系统", coord: [130, 35, { in: 10, out: 9 }] },
        { name: "学工系统", coord: [130, 30, { in: 10, out: 9 }] },
        { name: "财务系统", coord: [80, 50, { in: 10, out: 9 }] },
        { name: "招生系统", coord: [80, 45, { in: 10, out: 9 }] },
        { name: "离校系统", coord: [80, 40, { in: 10, out: 9 }] },
        { name: "图书馆系统", coord: [80, 35, { in: 10, out: 9 }] },
        { name: "一卡通系统", coord: [80, 30, { in: 10, out: 9 }] },
        { name: "教务系统", coord: [105, 30, { in: 10, out: 9 }] },
        { name: "其他1", coord: [105, 50, { in: 10, out: 9 }] }
      ]
    };
  }
};
</script>
<style lang="scss">
</style>
