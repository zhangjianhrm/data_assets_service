<template>
  <div class="home__search">
    <div class="home__search_wrap">
      <el-button
        icon="el-icon-monitor"
        class="home__search_wrap_framework"
        type="primary"
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
    <div class="home__search_cover" v-if="frameworkVisible" @click="frameworkVisible = false">
      <div class="home__search_cover_bg">
        <div class="home__search_cover_bg_title"></div>
      </div>
    </div>
    <transition name="slide-fade">
      <div class="home__search_framework" v-if="frameworkVisible">
        <div class="home__search_framework_left">
          <div class="home__search_framework_left_stage">
            <div class="home__search_framework_left_arrow"></div>
            <div class="home__search_framework_left_arrow"></div>
            <div class="home__search_framework_left_arrow"></div>
            <div class="home__search_framework_left_arrow"></div>
            <div class="home__search_framework_left_conveyor">
              <ul>
                <li v-for="(item,index) in DB" :key="index">
                  <img :src="item.img" />
                  <p>{{item.name}}</p>
                </li>
                <li v-for="(item2,index2) in DB.slice(0,5)" :key="index2+DB.length">
                  <img :src="item2.img" />
                  <p>{{item2.name}}</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="home__search_framework_right">
          <div class="home__search_framework_right_stage">
            <div class="home__search_framework_right_arrow"></div>
            <div class="home__search_framework_right_arrow"></div>
            <div class="home__search_framework_right_arrow"></div>
            <div class="home__search_framework_right_arrow"></div>
            <div class="home__search_framework_right_title">指标库</div>
            <div class="home__search_framework_right_conveyor">
              <ul>
                <li v-for="(item,index) in norm" :key="index">
                  <p>{{item}}</p>
                </li>
                <li v-for="(item2,index2) in norm.slice(0,5)" :key="index2+norm.length">
                  <p>{{item2}}</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="home__search_framework_center">
          <div class="home__search_framework_center_bg">
            <div class="home__search_framework_center_bg_b"></div>
          </div>
          <div class="home__search_framework_center_bg2">
            <div class="home__search_framework_center_bg2_b"></div>
          </div>
          <div class="home__search_framework_center_item ODS">
            <section class="home__search_framework_center_item_info">
              <p>
                <span style="display:inline-block;width:36px;">集成：</span>
                <span>20个业务系统</span>
              </p>
              <p>
                <span style="display:inline-block;width:36px;"></span>
                <span>54张表</span>
              </p>
              <p>
                <span style="display:inline-block;width:36px;"></span>
                <span>30.4万条数据</span>
              </p>
            </section>
            <i class="home__search_framework_center_item_line"></i>
            <p class="home__search_framework_center_item_name">ODS</p>
          </div>
          <div class="home__search_framework_center_item ETL">
            <section class="home__search_framework_center_item_info">
              <p>集成：50个交换作业</p>
            </section>
            <i class="home__search_framework_center_item_line"></i>
            <p class="home__search_framework_center_item_name">ETL</p>
          </div>
          <div class="home__search_framework_center_item API">
            <section class="home__search_framework_center_item_info">
              <p>数据服务（API）：80个</p>
            </section>
            <i class="home__search_framework_center_item_line"></i>
            <p class="home__search_framework_center_item_name">API</p>
          </div>
          <div class="home__search_framework_center_item ZTK">
            <section class="home__search_framework_center_item_info">
              <p>
                <span style="display:inline-block;width:36px;">集成：</span>
                <span>10个业务系统，占比85%</span>
              </p>
              <p>
                <span style="display:inline-block;width:36px;"></span>
                <span>54张表，占比2%</span>
              </p>
              <p>
                <span style="display:inline-block;width:36px;"></span>
                <span>30.4万条数据，占比25%</span>
              </p>
              <p>
                <span style="display:inline-block;width:36px;">生成：</span>
                <span>25个主题</span>
              </p>
            </section>
            <i class="home__search_framework_center_item_line"></i>
            <p class="home__search_framework_center_item_name">主题库</p>
          </div>
          <div class="home__search_framework_center_item BFK">
            <p class="home__search_framework_center_item_name">备份库</p>
          </div>
          <div class="home__search_framework_center_item DMK">
            <section class="home__search_framework_center_item_info">
              <p>20个代码类，1820条代码</p>
            </section>
            <i class="home__search_framework_center_item_line"></i>
            <p class="home__search_framework_center_item_name">代码库</p>
          </div>
          <div class="home__search_framework_center_item LSK">
            <p class="home__search_framework_center_item_name">历史库</p>
          </div>
          <div class="home__search_framework_center_line"></div>
          <div class="home__search_framework_center_dot api_to_right"></div>
          <div class="home__search_framework_center_dot api_to_lsk"></div>
          <div class="home__search_framework_center_dot api_to_ztk"></div>
          <div class="home__search_framework_center_dot api_to_ods"></div>
          <div class="home__search_framework_center_dot ztk_to_etl"></div>
          <div class="home__search_framework_center_dot dmk_to_right"></div>
          <div class="home__search_framework_center_dot etl_to_ods"></div>
          <div class="home__search_framework_center_dot ods_to_left"></div>
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
        { label: "全量数据中心", value: 1 },
        { label: "人事系统", value: 2 },
        { label: "学工系统", value: 3 },
        { label: "财务系统", value: 4 },
        { label: "教务系统", value: 5 },
        { label: "科研系统", value: 6 },
      ],
      frameworkVisible: false,
      DB: [
        {
          name: "财务系统",
          img: require("@/assets/icon/datamap/财务系统.png")
        },
        {
          name: "教务系统",
          img: require("@/assets/icon/datamap/教务系统.png")
        },
        {
          name: "人事系统",
          img: require("@/assets/icon/datamap/人事系统.png")
        },
        {
          name: "图书馆系统",
          img: require("@/assets/icon/datamap/图书馆系统.png")
        },
        {
          name: "宿管系统",
          img: require("@/assets/icon/datamap/宿管系统.png")
        },
        {
          name: "一卡通系统",
          img: require("@/assets/icon/datamap/一卡通系统.png")
        },
        { name: "资产系统", img: require("@/assets/icon/datamap/资产系统.png") }
      ],
      norm: [
        "教学指标",
        "科研指标",
        "成绩指标",
        "人数指标",
        "学生指标",
        "资产指标",
        "很长很长很长的科研指标"
      ]
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
    &_bg {
      position: absolute;
      top: 20px;
      right: 20px;
      left: 20px;
      bottom: 20px;
      margin: auto;
      background-image: url(../../../assets/DataMonitor/grid.png);
      background-color: $color-footer;
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
    }
  }
  &_framework {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    width: 1340px;
    height: 600px;
    overflow: hidden;
    &_left {
      position: absolute;
      left: 25px;
      top: 45px;
      margin: auto;
      width: 210px;
      height: 520px;
      perspective: 550px;
      &_stage {
        width: 100%;
        height: 100%;
        background: linear-gradient(
          -90deg,
          rgba(0, 9, 77, 0.7) 0%,
          rgba(11, 2, 52, 0.33) 87%,
          rgba(0, 9, 77, 0.07) 99%
        );
        box-shadow: 0 0 100px rgba(31, 115, 255, 0.2) inset;
        border-right: 1px solid rgba(14, 208, 222, 0.4);
        transform: rotateY(10deg);
      }
      &_arrow {
        position: absolute;
        width: 10px;
        height: 10px;
        &:nth-child(1) {
          top: -2px;
          right: -2px;
          background-image: url("../../../assets/Home/arrow.png");
        }
        &:nth-child(2) {
          bottom: -2px;
          right: -2px;
          background-image: url("../../../assets/Home/arrow.png");
          transform: rotate(90deg);
        }
        &:nth-child(3) {
          bottom: -2px;
          left: -2px;
          background-image: url("../../../assets/Home/arrow.png");
          transform: rotate(180deg);
        }
        &:nth-child(4) {
          top: -2px;
          left: -2px;
          background-image: url("../../../assets/Home/arrow.png");
          transform: rotate(270deg);
        }
      }
      &_conveyor {
        width: 210px;
        height: 520px;
        box-sizing: border-box;
        overflow: hidden;
        ul {
          list-style: none;
          padding: 0;
          margin: 0;
          animation: conveyor 20s linear 0s infinite normal;
          li {
            width: 210px;
            height: 104px;
            text-align: center;
            overflow: hidden;
            position: relative;
            img {
              width: 100px;
            }
            p {
              position: absolute;
              top: 0;
              left: 135px;
              font-size: 12px;
              color: rgba(126, 250, 252, 1);
            }
          }
        }
      }
      @keyframes conveyor {
        from {
          margin-top: 0;
        }
        to {
          margin-top: -728px;
        }
      }
    }
    &_right {
      position: absolute;
      right: 25px;
      top: 45px;
      margin: auto;
      width: 210px;
      height: 520px;
      perspective: 550px;
      &_stage {
        width: 100%;
        height: 100%;
        background: linear-gradient(
          -90deg,
          rgba(0, 9, 77, 0.7) 0%,
          rgba(11, 2, 52, 0.33) 87%,
          rgba(0, 9, 77, 0.07) 99%
        );
        box-shadow: 0 0 100px rgba(31, 115, 255, 0.2) inset;
        border-right: 1px solid rgba(14, 208, 222, 0.4);
        transform: rotateY(-10deg);
      }
      &_arrow {
        position: absolute;
        width: 10px;
        height: 10px;
        &:nth-child(1) {
          top: -2px;
          right: -2px;
          background-image: url("../../../assets/Home/arrow.png");
        }
        &:nth-child(2) {
          bottom: -2px;
          right: -2px;
          background-image: url("../../../assets/Home/arrow.png");
          transform: rotate(90deg);
        }
        &:nth-child(3) {
          bottom: -2px;
          left: -2px;
          background-image: url("../../../assets/Home/arrow.png");
          transform: rotate(180deg);
        }
        &:nth-child(4) {
          top: -2px;
          left: -2px;
          background-image: url("../../../assets/Home/arrow.png");
          transform: rotate(270deg);
        }
      }
      &_title {
        text-align: center;
        color: rgba(126, 250, 252, 1);
        height: 40px;
        line-height: 40px;
        font-size: 14px;
      }
      &_conveyor {
        width: 210px;
        height: 480px;
        box-sizing: border-box;
        overflow: hidden;
        ul {
          list-style: none;
          padding: 0;
          margin: 0;
          animation: conveyor_right 20s linear 0s infinite normal;
          li {
            width: 210px;
            height: 96px;
            text-align: center;
            overflow: hidden;
            position: relative;
            background-position: center;
            background-repeat: no-repeat;
            p {
              font-size: 12px;
              line-height: 96px;
              color: rgba(126, 250, 252, 1);
            }
            &:nth-child(2n-1) {
              background-image: url("../../../assets/Home/orange.png");
            }
            &:nth-child(2n) {
              background-image: url("../../../assets/Home/gold.png");
            }
            &:nth-child(3n) {
              background-image: url("../../../assets/Home/green.png");
            }
          }
        }
      }
      @keyframes conveyor_right {
        from {
          margin-top: 0;
        }
        to {
          margin-top: -672px;
        }
      }
    }
    &_center {
      position: absolute;
      top: 60px;
      right: 0;
      left: 0;
      margin: auto;
      width: 972px;
      height: 534px;
      z-index: 1;
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
        &_info {
          position: absolute;
          padding: 8px 0 0 8px;
          box-sizing: border-box;
          > p {
            line-height: 20px;
            font-size: 12px;
            position: relative;
            color: rgba(126, 250, 252, 1) !important;
          }
        }
        &_line {
          position: absolute;
          display: block;
          width: 1px;
          background-color: rgba(39, 115, 230, 0.4);
        }
        &_name {
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
          > section {
            top: -76px;
            left: -30px;
            width: 130px;
            height: 74px;
            background-image: url("../../../assets/Home/ODS-bg.png");
          }
          > i {
            height: 108px;
            top: -5px;
            left: 9px;
          }
        }
        &.ETL {
          background-image: url("../../../assets/Home/ETL.png");
          bottom: 314px;
          left: 269px;
          > section {
            top: -35px;
            left: -10px;
            width: 130px;
            height: 37px;
            background-image: url("../../../assets/Home/ETL-bg.png");
          }
          > i {
            height: 102px;
            top: 0px;
            left: 9px;
          }
        }
        &.API {
          background-image: url("../../../assets/Home/API.png");
          bottom: 127px;
          left: 298px;
          > section {
            top: -34px;
            left: -16px;
            width: 149px;
            height: 38px;
            background-image: url("../../../assets/Home/API-bg.png");
          }
          > i {
            height: 101px;
            top: 2px;
            left: 11px;
          }
        }
        &.ZTK {
          background-image: url("../../../assets/Home/ZTK.png");
          bottom: 216px;
          left: 440px;
          > section {
            top: -160px;
            left: 24px;
            width: 193px;
            height: 92px;
            background-image: url("../../../assets/Home/ZTK-bg.png");
          }
          > i {
            height: 144px;
            top: -70px;
            left: 75px;
          }
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
          > section {
            top: -78px;
            left: 15px;
            width: 159px;
            height: 38px;
            background-image: url("../../../assets/Home/DMK-bg.png");
          }
          > i {
            height: 144px;
            top: -42px;
            left: 135px;
          }
        }
        &.LSK {
          background-image: url("../../../assets/Home/LSK.png");
          bottom: 152px;
          left: 549px;
        }
      }
      &_line {
        position: absolute;
        top: 186px;
        left: 31px;
        width: 902px;
        height: 336px;
        background-image: url("../../../assets/Home/line.png");
      }
      &_dot {
        position: absolute;
        width: 6px;
        height: 6px;
        background: rgba(14, 208, 222, 1);
        border-radius: 50%;
        box-shadow: 0 0 5px white;
        &.api_to_right {
          left: 922px;
          top: 451px;
          animation: api_to_right 5s linear infinite normal;
          @keyframes api_to_right {
            0% {
              transform: translate(0, 0);
            }
            20% {
              transform: translate(-93px, -53px);
            }
            60% {
              transform: translate(-310px, 65px);
            }
            100% {
              transform: translate(-530px, -59px);
            }
          }
        }
        &.api_to_lsk {
          left: 560px;
          top: 372px;
          animation: api_to_lsk 2s linear infinite normal;
          @keyframes api_to_lsk {
            0% {
              transform: translate(0, 0);
            }
            50% {
              transform: translate(-77px, 42px);
            }
            100% {
              transform: translate(-142px, 5px);
            }
          }
        }
        &.api_to_ztk {
          left: 407px + 65px;
          top: 331px - 37px;
          animation: api_to_ztk 1.3s linear infinite normal;
          @keyframes api_to_ztk {
            0% {
              transform: translate(0, 0);
            }
            100% {
              transform: translate(-65px, 37px);
            }
          }
        }
        &.api_to_ods {
          left: 322px - 91px;
          top: 338px - 56px;
          animation: api_to_ods 1.3s linear infinite normal;
          @keyframes api_to_ods {
            0% {
              transform: translate(0, 0);
            }
            100% {
              transform: translate(91px, 56px);
            }
          }
        }
        &.ztk_to_etl {
          left: 445px - 60px;
          top: 226px - 35px;
          animation: ztk_to_etl 1.3s linear infinite normal;
          @keyframes ztk_to_etl {
            0% {
              transform: translate(0, 0);
            }
            100% {
              transform: translate(60px, 35px);
            }
          }
        }
        &.dmk_to_right {
          top: 318px;
          left: 790px;
          animation: dmk_to_right 1.3s linear infinite normal;
          @keyframes dmk_to_right {
            0% {
              transform: translate(0, 0);
            }
            100% {
              transform: translate(132px, 76px);
            }
          }
        }
        &.etl_to_ods {
          left: 303px - 74px;
          top: 195px + 42px;
          animation: etl_to_ods 1.3s linear infinite normal;
          @keyframes etl_to_ods {
            0% {
              transform: translate(0, 0);
            }
            100% {
              transform: translate(74px, -42px);
            }
          }
        }
        &.ods_to_left {
          left: 44px;
          top: 192px;
          // left: 134px;
          // top: 245px;
          animation: ods_to_left 1.3s linear infinite normal;
          @keyframes ods_to_left {
            0% {
              transform: translate(0, 0);
            }
            100% {
              transform: translate(90px, 53px);
            }
          }
        }
      }
    }
  }
  .slide-fade-enter-active {
    transition: all 0.8s ease;
  }
  .slide-fade-leave-active {
    transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
  }
  .slide-fade-enter,
  .slide-fade-leave-to {
    transform: translateX(10px);
    opacity: 0;
  }
}
</style>
