<template>
  <div class="home__search">
    <div class="home__search_wrap">
      <el-button
        icon="el-icon-monitor"
        class="home__search_wrap_framework"
        @click="frameworkVisible = true"
      ></el-button>
      <el-input clearable placeholder="请输入表名" v-model="value" class="home__search_wrap_search">
        <el-select v-model="select" slot="prepend" placeholder="请选择业务系统">
          <el-option
            v-for="(item,index) in options"
            :key="index"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-button slot="append">
          <i class="su-icon-inquire" style="margin-right:5px;"></i>
          <span>搜索</span>
        </el-button>
      </el-input>
    </div>
    <div class="home__search_cover" v-if="frameworkVisible" @click="frameworkVisible = false"></div>
    <transition name="slide-fade">
      <div class="home__search_framework" v-if="frameworkVisible">
        <div class="home__search_framework_title"></div>
        <div class="home__search_framework_center">
          <div class="home__search_framework_center_bg">
            <div class="home__search_framework_center_bg_b"></div>
          </div>
          <div class="home__search_framework_center_bg2">
            <div class="home__search_framework_center_bg2_b"></div>
          </div>
          <div class="home__search_framework_center_item ODS">
            <p>ODS</p>
          </div>
          <div class="home__search_framework_center_item ETL">
            <p>ETL</p>
          </div>
          <div class="home__search_framework_center_item API">
            <p>API</p>
          </div>
          <div class="home__search_framework_center_item ZTK">
            <p>主题库</p>
          </div>
          <div class="home__search_framework_center_item BFK">
            <p>备份库</p>
          </div>
          <div class="home__search_framework_center_item DMK">
            <p>代码库</p>
          </div>
          <div class="home__search_framework_center_item LSK">
            <p>历史库</p>
          </div>
          <div class="home__search_framework_center_dot api_to_right"></div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  name: "HomeSearch",
  data() {
    return {
      value: "",
      select: "",
      options: [
        { label: "很长很长很长的", value: 1 },
        { label: "很长很长很长的", value: 2 },
        { label: "很长很长很长的", value: 3 },
        { label: "很长很长很长的", value: 4 },
        { label: "很长很长很长的", value: 5 },
        { label: "很长很长很长的", value: 6 },
        { label: "很长很长很长很长很长的搜索", value: 7 }
      ],
      frameworkVisible: false
    };
  }
};
</script>
<style lang="scss">
@import "~@/styles/variables.scss";
.home__search {
  width: 1280px;
  height: 140px;
  background-color: rgba(255, 255, 255, 0.1);
  position: relative;
  &_wrap {
    position: absolute;
    top: 10px;
    right: 10px;
    bottom: 10px;
    left: 10px;
    background-color: rgba(255, 255, 255, 0.1);
    padding: 30px 20px;
    &_framework {
      float: left;
      width: 60px;
      height: 60px;
    }
    &_search {
      float: right;
      height: 60px;
      width: 93.5%;
      .el-select {
        .el-input {
          width: 145px;
        }
      }
      .el-input__inner {
        height: 60px;
      }
      .el-input-group__append {
        button {
          width: 170px;
        }
      }
    }
  }
  &_cover {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
  }
  &_framework {
    position: fixed;
    top: 100px;
    right: 100px;
    bottom: 100px;
    left: 100px;
    background-image: url(../../../assets/DataMonitor/grid.png);
    background-color: $color-footer;
    overflow: hidden;
    &_title {
      height: 200px;
      position: absolute;
      top: 0;
      right: 20px;
      left: 20px;
      background-position: top center;
      background-image: url("../../../assets/Home/framework-title.svg");
      background-repeat: no-repeat;
    }
    &_center {
      position: absolute;
      top: 100px;
      right: 0;
      left: 0;
      margin: auto;
      width: 972px;
      height: 534px;
      &_bg {
        position: absolute;
        top: 79px;
        right: 0;
        left: 0;
        margin: auto;
        width: 972px;
        transform: rotateX(56.675deg);
        &_b {
          position: absolute;
          top: 0;
          right: 0;
          left: 0;
          margin: auto;
          width: 687.313px;
          height: 687.313px;
          background: rgba(39, 115, 229, 0.16);
          transform: rotate(45deg);
          box-shadow: 0 0 100px rgba(31, 115, 255, 0.5) inset;
        }
      }
      &_bg2 {
        position: absolute;
        top: 172px;
        right: 78px;
        margin: auto;
        width: 529px;
        transform: rotateX(56.675deg);
        &_b {
          position: absolute;
          top: 0;
          right: 0;
          left: 0;
          margin: auto;
          width: 362px;
          height: 362px;
          background: rgba(39, 115, 229, 0.16);
          transform: rotate(45deg);
          box-shadow: 0 0 100px rgba(31, 115, 255, 0.5) inset;
        }
      }
      &_item {
        width: 150px;
        height: 150px;
        background-position: bottom center;
        background-repeat: no-repeat;
        position: absolute;
        p {
          color: rgba(126, 250, 252, 1);
          text-align: center;
          position: absolute;
          bottom: 10px;
          width: 100%;
          line-height: 14px;
          font-size: 14px;
        }
        &.ODS {
          background-image: url("../../../assets/Home/ODS.png");
          bottom: 225px;
          left: 117px;
        }
        &.ETL {
          background-image: url("../../../assets/Home/ETL.png");
          bottom: 314px;
          left: 269px;
        }
        &.API {
          background-image: url("../../../assets/Home/API.png");
          bottom: 127px;
          left: 298px;
        }
        &.ZTK {
          background-image: url("../../../assets/Home/ZTK.png");
          bottom: 216px;
          left: 440px;
        }
        &.BFK {
          background-image: url("../../../assets/Home/BFK.png");
          bottom: 288px;
          left: 555px;
        }
        &.DMK {
          background-image: url("../../../assets/Home/DMK.png");
          bottom: 221px;
          left: 669px;
        }
        &.LSK {
          background-image: url("../../../assets/Home/LSK.png");
          bottom: 152px;
          left: 549px;
        }
      }
      &_dot {
        position: absolute;
        width: 6px;
        height: 6px;
        background: rgba(14, 208, 222, 1);
        border-radius: 50%;
        &.api_to_right {
          top: 397px;
          left: 392px;
          animation: api_to_right 5s linear infinite normal;
          @keyframes api_to_right {
            0% {
              transform: translate(0, 0);
            }
            40% {
              transform: translate(197px, 125px);
            }
            70% {
              transform: translate(390px, 18px);
            }
            100% {
              transform: translate(540px, 65px);
            }
          }
        }
      }
    }
  }
  .slide-fade-enter-active {
    transition: all 0.3s ease;
  }
  .slide-fade-leave-active {
    transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
  }
  .slide-fade-enter,
  .slide-fade-leave-to {
    transform: translateX(10px);
    opacity: 0;
  }
}
</style>
