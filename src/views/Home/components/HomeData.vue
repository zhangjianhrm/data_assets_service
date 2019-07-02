<template>
  <div class="home__data">
    <div v-for="(item,index) in data" :key="index" class="home__data_item">
      <section>
        <h4>{{item.title}}</h4>
        <h5>{{item.update | formatNum}}</h5>
      </section>
      <h3>
        <b>{{item.count | formatNum}}</b>
        <span>{{item.unit}}</span>
      </h3>
    </div>
  </div>
</template>
<script>
export default {
  name: "HomeData",
  data() {
    return {
      data: [
        { title: "数据表总量", count: 132134214, unit: "条", update: 3137 },
        { title: "集成系统", count: 16, unit: "个", update: 31 },
        { title: "数据目录", count: 132134214, unit: "个", update: 31 },
        { title: "数据接口", count: 1321, unit: "个", update: 31 },
        { title: "调用次数", count: 132134214, unit: "次", update: 31 },
        { title: "下载次数", count: 132134214, unit: "次", update: 313 }
      ]
    };
  }
};
</script>
<style lang="scss">
@import "~@/styles/variables.scss";
.home__data {
  display: flex;
  width: 1210px;
  height: 80px;
  justify-content: space-between;
  &_item {
    height: 60px;
    padding: 10px;
    cursor: pointer;
    &:hover {
      background-color: rgba(255, 255, 255, 0.2);
    }
    > section {
      height: 30px;
      overflow: hidden;
      h4 {
        float: left;
        // color: $color-blue;
        color: rgba(159, 184, 255, 1);
        font-size: 18px;
        margin-bottom: 10px;
      }
      h5 {
        float: left;
        height: 16px;
        line-height: 16px;
        font-size: 12px;
        background-color: rgba(255, 129, 19, 1);
        border-radius: 8px;
        text-align: center;
        color: #fff;
        padding: 0 5px;
      }
    }
    > h3 {
      height: 30px;
      color: #fff;
      line-height: 30px;
      b {
        font-size: 20px;
        margin-right: 4px;
      }
      span {
        font-size: 14px;
      }
    }
  }
}
</style>
