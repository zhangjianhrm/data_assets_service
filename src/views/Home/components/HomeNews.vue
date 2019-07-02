<template>
  <div class="home__news">
    <!-- <canvas class="peak"></canvas> -->
    <!-- <div class="decorate"></div> -->
    <!-- <p class="home__news_title">实时消息</p> -->
    <el-carousel
      height="14px"
      direction="vertical"
      :autoplay="true"
      :interval="3000"
      indicator-position="none"
    >
      <el-carousel-item v-for="(item,index) in news" :key="index">
        <p>
          <span>1. {{item[0].content}}</span>
          <i v-if="item[0] && item[0].tag">{{item[0].tag}}</i>
          <b>|</b>
          <span v-if="item[1]">2. {{item[1].content}}</span>
          <i v-if="item[1] && item[1].tag">{{item[1].tag}}</i>
          <b v-if="item[2]">|</b>
          <span v-if="item[2]">3. {{item[2].content}}</span>
          <i v-if="item[2] && item[2].tag">{{item[0].tag}}</i>
        </p>
      </el-carousel-item>
    </el-carousel>
    <span class="home__news_all">
      全部通知
      <i class="el-icon-arrow-right"></i>
    </span>
  </div>
</template>
<script>
import axios from "axios";
import url from "@/service.config.js";
export default {
  data() {
    return {
      news: []
    };
  },
  created() {
    // 获取消息
    this.getNews();
  },
  mounted() {
    // 绘制 Peak
    // const canvas = document.querySelector(".peak"); // 获取 canvas 对象
    // canvas.width = 1920; // 设置 canvas 宽高
    // canvas.height = 70;
    // const ctx = canvas.getContext("2d"); // 获取画笔对象
    // this.drawPeak(ctx, 545, 0, 1920, 70, 0, 70, "rgba(255,255,255,0.2)");
    // this.drawPeak(ctx, 380, 20, 1450, 70, 0, 70, "rgba(255,255,255,1)");
  },
  methods: {
    getNews() {
      axios({
        url: url.getNews
      }).then(res => {
        for (let i = 0; i < res.data.news.length; i += 3) {
          this.news.push(res.data.news.slice(i, i + 3));
        }
      });
    },
    drawPeak(ctx, x1, y1, x2, y2, x3, y3, color) {
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.lineTo(x3, y3);
      ctx.lineTo(x1, y1);
      ctx.fillStyle = color; // 填充颜色
      ctx.fill(); // 描边
    }
  }
};
</script>
<style lang="scss">
@import "~@/styles/variables.scss";
.home__news {
  width: 1280px;
  // height: 200px;
  position: relative;
  // background: rgba(255, 255, 255, 1);
  margin: 150px auto 0;
  cursor: pointer;
  .peak {
    position: absolute;
    top: -70px;
  }
  .decorate {
    position: absolute;
    top: -40px;
    width: 100%;
    height: 232px;
    background: url("../../../assets/home/decorate.png") center/1474px no-repeat;
  }
  &_title {
    margin: 0 auto;
    width: 660px * 2 - 100px;
    font-size: 38px;
    color: $color-header;
  }
  .el-carousel {
    // width: 660px * 2 - 100px;
    // width: 1280px;
    &__item {
      p {
        // color: $color-header;
        color: #fff;
        line-height: 14px;
        margin: 0;
        font-size: 0px;
        span {
          font-size: 14px;
          display: inline-block;
          max-width: 29%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        i {
          background: rgba(255, 129, 19, 1);
          font-style: normal;
          font-size: 12px;
          height: 14px;
          vertical-align: top;
          padding: 0 3px;
        }
        b {
          font-size: 14px;
          margin: 0 10px;
          color: #979797;
        }
      }
    }
  }
  &_all {
    position: absolute;
    top: 0;
    right: 0;
    color: #fff;
    font-size: 14px;
    line-height: 14px;
    margin: 0;
  }
}
</style>
