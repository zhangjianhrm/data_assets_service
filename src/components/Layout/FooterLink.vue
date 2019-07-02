<template>
  <div class="footer">
    <div class="footer__left">
      <div class="footer__left_logo">
        <img :src="logo">
        <span>数据资产服务平台</span>
      </div>
      <div class="footer__left_desc">{{sw_desc}}</div>
      <div class="footer__left_copyright">{{copyright}}</div>
    </div>
    <div class="footer__right">
      <h3 class="footer__right_title">友情链接</h3>
      <p class="footer__right_links">
        <a href="#" v-for="(item,index) in links" :key="index">{{item[0]}}</a>
      </p>
      <svg-icon icon-class="international"/>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import url from "@/service.config.js";
export default {
  name: "FooterLink",
  data() {
    return {
      logo: require("@/assets/sw.png"),
      sw_desc: "",
      copyright: "©2019 上海树维信息科技有限公司",
      links: []
    };
  },
  created() {
    // 获取消息
    this.getNews();
  },
  mounted() {},
  methods: {
    getNews() {
      axios({
        url: url.getFooter
      }).then(res => {
        this.sw_desc = res.data.sw_desc;
        this.links = res.data.links;
      });
    }
  }
};
</script>
<style lang="scss">
@import "~@/styles/variables.scss";
.footer {
  width: 100%;
  height: 220px;
  background: $color-footer;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  color: #fff;
  &__left {
    width: 840px;
    margin-top: 34px;
    padding-right: 70px;
    opacity: 0.5;
    &_logo {
      height: 36px;
      line-height: 36px;
      img {
        float: left;
        margin-right: 10px;
        margin-left: -4px;
      }
      span {
        font-size: 18px;
      }
    }
    &_desc {
      margin-top: 14px;
      font-size: 14px;
    }
    &_copyright {
      font-size: 14px;
      margin-top: 21px;
    }
  }
  &__right {
    margin-top: 34px;
    width: 370px;
    opacity: 0.5;
    &_title {
      line-height: 36px;
      font-size: 18px;
    }
    &_links {
      font-size: 14px;
      width: inherit;
      display: flex;
      flex-wrap: wrap;
      margin-top: 14px;
      a {
        margin-right: 14px;
      }
    }
    svg {
      margin-top: 20px;
      width: 30px !important;
      height: 30px !important;
      color: #fff;
    }
  }
}
</style>
