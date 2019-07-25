<template>
  <div class="home__banner">
    <div class="home__banner_left">
      <p class="home__banner_left_title">Data Assets Platform</p>
      <p class="home__banner_left_data" v-html="details"></p>
      <div class="home__banner_left_doc">
        <p class="home__banner_left_doc_refresh">
          <i class="el-icon-refresh"></i>
          <span>换一批</span>
        </p>
        <div class="home__banner_left_doc_item" v-for="(item,index) in docItem" :key="index">
          <i :class="item.icon"></i>
          <span>{{item.name}}</span>
        </div>
      </div>
    </div>
    <div class="home__banner_right">
      <el-carousel height="600px" arrow="never" :interval="5000">
        <el-carousel-item v-for="(item,index) in carousel" :key="index">
          <img :src="item.img">
          <p>{{item.text}}</p>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      details:
        "数据资产平台已收录全国<span> 12 </span>个系统，<span> 1234 </span>张表数据，总量达到 <span> 123456789 </span> M Bytes，共<span> 1234567 </span>条数据。",
      docItem: [
        { icon: "el-icon-info", name: "数据资产管理办法" },
        { icon: "el-icon-info", name: "数据资产管理办法" },
        { icon: "el-icon-info", name: "数据资产管理办法" },
        { icon: "el-icon-info", name: "数据资产管理办法" }
      ],
      carousel: [
        {
          img: require("@/assets/home/banner.png"),
          text:
            "很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长的一段文字。"
        },
        {
          img: require("@/assets/home/banner.png"),
          text:
            "很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长的一段文字。"
        },
        {
          img: require("@/assets/home/banner.png"),
          text:
            "很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长的一段文字。"
        }
      ]
    };
  },
  mounted() {},
  methods: {}
};
</script>
<style lang="scss">
@import "~@/styles/variables.scss";
.home__banner {
  background: radial-gradient(rgba(21, 11, 82, 1), $color-header);
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  position: relative;
  overflow: hidden;
  height: 100vh;
  &_left {
    width: 560px;
    padding: 0 50px;
    color: #fff;
    &_title {
      margin-top: 100px;
      font-size: 52px;
    }
    &_data {
      margin-top: 30px;
      font-size: 18px;
      span {
        font-size: 28px;
        color: #00b3ff;
      }
    }
    &_doc {
      margin-top: 80px;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      &_refresh {
        width: 100%;
        font-size: 14px;
        cursor: pointer;
        i {
          margin-right: 10px;
        }
      }
      &_item {
        i {
          margin-right: 10px;
        }
        margin-top: 30px;
        width: 220px;
        height: 40px;
        line-height: 40px;
        padding: 20px;
        background: #190d59;
        box-shadow: 0 2px 7px 0 rgba(0, 0, 0, 0.3);
        border-radius: 1px;
      }
    }
  }
  &_right {
    width: 560px;
    height: 750px;
    padding: 0 50px;
    .el-carousel {
      margin-top: 40px;
      &__item {
        width: 100%;
        height: 100%;
        font-size: 14px;
        text-align: center;
        p {
          color: #fff;
          opacity: 0.5;
          line-height: 28px;
          text-align: left;
        }
      }
    }
  }
}
</style>
