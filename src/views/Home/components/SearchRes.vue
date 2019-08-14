<template>
  <div class="search-res">
    <pop-over-nav></pop-over-nav>
    <div class="search-res_bg"></div>
    <h1 class="search-res_title">{{title}}</h1>
    <div class="search-res_wrap">
      <div class="search-res_left-top SR-card">
        <div class="SR-card-top"></div>
        <div class="SR-card-center"></div>
        <div class="SR-card-bottom"></div>
        <div class="SR-card-title">数据表业务信息</div>
        <div class="search-res_left-top_item" v-for="(item,index) in leftTop" :key="index">
          <h3>
            <span>{{item.count}}</span>
            <span>个</span>
          </h3>
          <p>{{item.name}}</p>
        </div>
      </div>
      <div class="search-res_right-top SR-card">
        <div class="SR-card-top"></div>
        <div class="SR-card-center"></div>
        <div class="SR-card-bottom"></div>
        <div class="SR-card-title">数据定位分析</div>
        <div class="search-res_right-top_item">
          <p>全链分析</p>
        </div>
        <div class="search-res_right-top_item">
          <p>影响分析</p>
        </div>
        <div class="search-res_right-top_item">
          <p>血缘分析</p>
        </div>
        <div class="search-res_right-top_btn">查看数据详情</div>
      </div>
      <div class="search-res_left-bottom SR-card">
        <div class="SR-card-top"></div>
        <div class="SR-card-center"></div>
        <div class="SR-card-bottom"></div>
        <div class="SR-card-title" @click="popupVisible=true">UC 矩阵</div>
        <div class="search-res_left-bottom_table">
          <el-table :data="tableData" style="width: 100%" height="200" size="mini">
            <el-table-column prop="name" label="表名" width="120">
              <template slot-scope="scope">
                <span style="color:rgba(179, 108, 54, 1);">{{ scope.row.name }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="a" label="宿舍管理系统" width="100"></el-table-column>
            <el-table-column prop="b" label="XX系统" width="100"></el-table-column>
            <el-table-column prop="c" label="XX系统" width="100"></el-table-column>
            <el-table-column prop="d" label="XX系统" width="100"></el-table-column>
            <el-table-column prop="e" label="XX系统" width="100"></el-table-column>
          </el-table>
        </div>
      </div>
      <div class="search-res_right-bottom SR-card">
        <div class="SR-card-top"></div>
        <div class="SR-card-center"></div>
        <div class="SR-card-bottom"></div>
        <div class="SR-card-title">数据关系</div>
        <div class="search-res_right-bottom_left-top">
          <h4>数据表</h4>
          <p>教职工信息表</p>
        </div>
        <div class="search-res_right-bottom_right-top">
          <h4>视图</h4>
          <vue-seamless-scroll
            class="search-res_right-bottom_right-top_wrap"
            :data="scrollData1"
            :class-option="scrollOption"
          >
            <p
              class="search-res_right-bottom_right-top_wrap_item"
              v-for="(item,index) in scrollData1"
              :key="index"
            >{{item}}-{{index}}</p>
          </vue-seamless-scroll>
        </div>
        <div class="search-res_right-bottom_left-bottom">
          <h4>映射关系</h4>
          <vue-seamless-scroll
            class="search-res_right-bottom_left-bottom_wrap"
            :data="scrollData2"
            :class-option="scrollOption"
          >
            <p
              class="search-res_right-bottom_left-bottom_wrap_item"
              v-for="(item,index) in scrollData2"
              :key="index"
            >{{item}}-{{index}}</p>
          </vue-seamless-scroll>
        </div>
        <div class="search-res_right-bottom_right-bottom">
          <h4>相关人</h4>
          <vue-seamless-scroll
            class="search-res_right-bottom_right-bottom_wrap"
            :data="scrollData3"
            :class-option="scrollOption"
          >
            <p
              class="search-res_right-bottom_right-bottom_wrap_item"
              v-for="(item,index) in scrollData3"
              :key="index"
            >{{item}}-{{index}}</p>
          </vue-seamless-scroll>
        </div>
        <div class="search-res_right-bottom_center">
          <h4>学生基本信息</h4>
        </div>
      </div>
      <div class="search-res_center"></div>
    </div>
    <div class="search-res_cover"  v-show="popupVisible" @click="popupVisible=false"></div>
    <div class="search-res_popup" v-show="popupVisible">
      <div class="search-res_popup_title">UC 矩阵</div>
      <el-table :data="tableData" style="width: 100%" height="480" size="mini">
        <el-table-column prop="name" label="表名" width="120">
          <template slot-scope="scope">
            <span style="color:rgba(179, 108, 54, 1);">{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="a" label="宿舍管理系统" width="100"></el-table-column>
        <el-table-column prop="b" label="XX系统" width="100"></el-table-column>
        <el-table-column prop="c" label="XX系统" width="100"></el-table-column>
        <el-table-column prop="d" label="XX系统" width="100"></el-table-column>
        <el-table-column prop="e" label="XX系统" width="100"></el-table-column>
        <el-table-column prop="a" label="宿舍管理系统" width="100"></el-table-column>
        <el-table-column prop="b" label="XX系统" width="100"></el-table-column>
        <el-table-column prop="c" label="XX系统" width="100"></el-table-column>
        <el-table-column prop="d" label="XX系统" width="100"></el-table-column>
        <el-table-column prop="e" label="XX系统" width="100"></el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
export default {
  name: "SearchRes",
  components: {
    PopOverNav: () => import("@/components/PopOverNav/PopOverNav"),
    VueSeamlessScroll: () => import("vue-seamless-scroll")
  },
  data() {
    return {
      title: this.$route.params.keyword,
      leftTop: [
        { name: "数据交换作业数", count: 20 },
        { name: "数据质量监测作业数", count: 20 },
        { name: "数据目录数", count: 20 },
        { name: "数据服务数", count: 20 }
      ],
      tableData: [
        {
          name: "学生信息表",
          a: "U",
          b: "",
          c: "UC",
          d: "UC",
          e: "C"
        },
        {
          name: "学生信息表",
          a: "U",
          b: "",
          c: "UC",
          d: "UC",
          e: "C"
        },
        {
          name: "学生信息表",
          a: "U",
          b: "",
          c: "UC",
          d: "UC",
          e: "C"
        },
        {
          name: "学生信息表",
          a: "U",
          b: "",
          c: "UC",
          d: "UC",
          e: "C"
        },
        {
          name: "学生信息表",
          a: "U",
          b: "",
          c: "UC",
          d: "UC",
          e: "C"
        },
        {
          name: "学生信息表",
          a: "U",
          b: "",
          c: "UC",
          d: "UC",
          e: "C"
        },
        {
          name: "学生信息表",
          a: "U",
          b: "",
          c: "UC",
          d: "UC",
          e: "C"
        },
        {
          name: "学生信息表",
          a: "U",
          b: "",
          c: "UC",
          d: "UC",
          e: "C"
        },
        {
          name: "学生信息表",
          a: "U",
          b: "",
          c: "UC",
          d: "UC",
          e: "C"
        },
        {
          name: "学生信息表",
          a: "U",
          b: "",
          c: "UC",
          d: "UC",
          e: "C"
        },
        {
          name: "学生信息表",
          a: "U",
          b: "",
          c: "UC",
          d: "UC",
          e: "C"
        },
        {
          name: "学生信息表",
          a: "U",
          b: "",
          c: "UC",
          d: "UC",
          e: "C"
        },
        {
          name: "学生信息表",
          a: "U",
          b: "",
          c: "UC",
          d: "UC",
          e: "C"
        },
        {
          name: "学生信息表",
          a: "U",
          b: "",
          c: "UC",
          d: "UC",
          e: "C"
        },
        {
          name: "学生信息表",
          a: "U",
          b: "",
          c: "UC",
          d: "UC",
          e: "C"
        },
        {
          name: "学生信息表",
          a: "U",
          b: "",
          c: "UC",
          d: "UC",
          e: "C"
        },
        {
          name: "学生信息表",
          a: "U",
          b: "",
          c: "UC",
          d: "UC",
          e: "C"
        },
        {
          name: "学生信息表",
          a: "U",
          b: "",
          c: "UC",
          d: "UC",
          e: "C"
        }
      ],
      scrollData1: ["视图", "视图", "视图", "视图", "视图", "视图", "视图"],
      scrollData2: [
        "映射关系",
        "映射关系",
        "映射关系",
        "映射关系",
        "映射关系",
        "映射关系",
        "映射关系",
        "映射关系"
      ],
      scrollData3: [
        "相关人",
        "相关人",
        "相关人",
        "相关人",
        "相关人",
        "相关人",
        "相关人"
      ],
      popupVisible: false
    };
  },
  computed: {
    scrollOption() {
      return {
        step: 0.5
      };
    }
  }
};
</script>
<style lang="scss">
@import "~@/styles/variables.scss";
.search-res {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: $color-footer;
  background-image: url("../../../assets/Home/search-title.svg");
  background-repeat: no-repeat;
  background-position: 0 10px;
  background-size: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  &_bg {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-image: url(../../../assets/Common/map.png);
    background-repeat: no-repeat;
    background-position: center;
    background-size: 70%;
    opacity: 0.3;
  }
  &_title {
    position: absolute;
    top: 16px;
    right: 0;
    left: 0;
    margin: auto;
    font-size: 24px;
    text-align: center;
    color: rgba(126, 250, 252, 1);
  }
  &_wrap {
    width: 1300px;
    height: 540px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-content: space-between;
  }
  &_left-top {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    padding: 50px 10px 0;
    &_item {
      width: 190px;
      height: 85px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: relative;
      z-index: 1;
      background-size: 100%;
      h3 {
        span:nth-child(1) {
          font-size: 24px;
          margin-right: 4px;
        }
        span:nth-child(2) {
          font-size: 12px;
        }
      }
      p {
        color: #fff;
        font-size: 12px;
      }
      &:nth-child(5) {
        background-image: url("../../../assets/Home/c.svg");
        h3 {
          color: rgba(179, 108, 54, 1);
        }
      }
      &:nth-child(6) {
        background-image: url("../../../assets/Home/g.svg");
        h3 {
          color: rgba(46, 153, 124, 1);
        }
      }
      &:nth-child(7) {
        background-image: url("../../../assets/Home/b.svg");
        h3 {
          color: rgba(63, 100, 209, 1);
        }
      }
      &:nth-child(8) {
        background-image: url("../../../assets/Home/y.svg");
        h3 {
          color: rgba(179, 156, 54, 1);
        }
      }
    }
  }
  &_right-top {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 60px 30px 0;
    &_item {
      position: relative;
      z-index: 1;
      font-size: 12px;
      width: 100px;
      height: 100px;
      opacity: 0.5;
      background-image: url(../../../assets/DataMonitor/ring.png);
      background-size: 100%;
      color: rgba(41, 193, 204, 1);
      line-height: 100px;
      text-align: center;
      cursor: pointer;
      &:hover {
        opacity: 1;
        animation: clockwise 5s infinite linear;
        p {
          animation: anticlockwise 5s infinite linear;
          color: #fff;
        }
      }
      @keyframes clockwise {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }
      @keyframes anticlockwise {
        from {
          transform: rotate(360deg);
        }
        to {
          transform: rotate(0deg);
        }
      }
    }
    &_btn {
      width: 120px;
      height: 38px;
      text-align: center;
      background-image: url(../../../assets/Home/btn.png);
      position: relative;
      z-index: 1;
      line-height: 38px;
      color: #fff;
      font-size: 12px;
      cursor: pointer;
    }
  }
  &_left-bottom {
    padding: 40px 15px 0;
    &_table {
      .el-table {
        background-color: transparent !important;
        color: #fff;
        thead tr th {
          background-color: rgba(255, 255, 255, 0.1);
          color: rgba(179, 156, 54, 1);
        }
        &::before {
          background-color: rgba(255, 255, 255, 0.1);
        }
        tr {
          &:nth-child(2n) {
            background-color: rgba(255, 255, 255, 0.1) !important;
          }
          &:nth-child(2n-1) {
            background-color: transparent !important;
          }
          &:hover > td {
            background-color: rgba(255, 255, 255, 0.1) !important;
          }
        }
        .el-table__body-wrapper {
          /*滚动条中可以拖动的那部分*/
          &::-webkit-scrollbar-thumb {
            background-color: rgba(255, 255, 255, 0.2);
            border-radius: 4px;
            &:hover {
              background-color: rgba(255, 255, 255, 0.3);
            }
          }
        }
        * {
          border-color: rgba(255, 255, 255, 0.1) !important;
        }
      }
    }
  }
  &_right-bottom {
    &_left-top {
      position: absolute;
      top: 55px;
      left: 25px;
      width: 195px;
      height: 90px;
      background-image: url("../../../assets/Home/search-orange.png");
      padding-left: 10px;
      box-sizing: border-box;
      h4 {
        color: rgba(41, 193, 204, 1);
        font-size: 12px;
        position: absolute;
        transform: rotate(315deg);
        top: 50px;
        right: 15px;
      }
      p {
        width: 200px;
        height: 14px;
        font-size: 12px;
        color: rgba(216, 64, 64, 1);
        line-height: 90px;
      }
    }
    &_right-top {
      position: absolute;
      top: 55px;
      right: 25px;
      width: 195px;
      height: 90px;
      background-image: url("../../../assets/Home/search-green.png");
      h4 {
        color: rgba(41, 193, 204, 1);
        font-size: 12px;
        position: absolute;
        transform: rotate(45deg);
        top: 45px;
        left: 20px;
      }
      &_wrap {
        width: 120px;
        height: 90px;
        overflow: hidden;
        position: absolute;
        right: 0;
        &_item {
          height: 30px;
          line-height: 30px;
          color: #fff;
          font-size: 12px;
          &:nth-child(3n-2) {
            color: rgba(216, 64, 64, 1);
          }
          &:nth-child(3n-1) {
            color: rgba(179, 108, 54, 1);
          }
          &:nth-child(3n) {
            color: rgba(179, 156, 54, 1);
          }
        }
      }
    }
    &_left-bottom {
      position: absolute;
      top: 155px;
      left: 25px;
      width: 195px;
      height: 90px;
      background-image: url("../../../assets/Home/search-blue.png");
      h4 {
        color: rgba(41, 193, 204, 1);
        font-size: 12px;
        position: absolute;
        transform: rotate(45deg);
        top: 22px;
        right: 10px;
      }
      &_wrap {
        width: 120px;
        height: 90px;
        overflow: hidden;
        position: absolute;
        left: 10px;
        &_item {
          height: 30px;
          line-height: 30px;
          color: #fff;
          font-size: 12px;
          &:nth-child(3n-2) {
            color: rgba(216, 64, 64, 1);
          }
          &:nth-child(3n-1) {
            color: rgba(179, 108, 54, 1);
          }
          &:nth-child(3n) {
            color: rgba(179, 156, 54, 1);
          }
        }
      }
    }
    &_right-bottom {
      position: absolute;
      top: 155px;
      right: 25px;
      width: 195px;
      height: 90px;
      background-image: url("../../../assets/Home/search-yellow.png");
      h4 {
        color: rgba(41, 193, 204, 1);
        font-size: 12px;
        position: absolute;
        transform: rotate(315deg);
        top: 22px;
        left: 17px;
      }
      &_wrap {
        width: 120px;
        height: 90px;
        overflow: hidden;
        position: absolute;
        right: 0;
        &_item {
          height: 30px;
          line-height: 30px;
          color: #fff;
          font-size: 12px;
          &:nth-child(3n-2) {
            color: rgba(216, 64, 64, 1);
          }
          &:nth-child(3n-1) {
            color: rgba(179, 108, 54, 1);
          }
          &:nth-child(3n) {
            color: rgba(179, 156, 54, 1);
          }
        }
      }
    }
    &_center {
      position: absolute;
      left: 0;
      right: 0;
      top: 119px;
      margin: auto;
      width: 60px;
      height: 60px;
      background: rgba(41, 193, 204, 0.2);
      border: 1px solid rgba(41, 193, 204, 1);
      border-radius: 50%;
      font-size: 12px;
      color: rgba(41, 193, 204, 1);
      line-height: 18px;
      text-align: center;
      box-sizing: border-box;
      padding: 10px;
    }
  }
  &_center {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    width: 540px;
    height: 524px;
    background-image: url("../../../assets/Home/search-earth.png");
  }
  &_cover {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.7);
    z-index: 2;
  }
  &_popup {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    width: 980px;
    height: 550px;
    background-image: url("../../../assets/Home/popup.svg");
    z-index: 3;
    padding: 0 20px;
    box-sizing: border-box;
    &_title {
      text-align: center;
      font-size: 14px;
      line-height: 30px;
      color: rgba(41, 193, 204, 1);
      margin-bottom: 20px;
    }
    .el-table {
      background-color: transparent !important;
      color: #fff;
      thead tr th {
        background-color: rgba(255, 255, 255, 0.1);
        color: rgba(179, 156, 54, 1);
      }
      &::before {
        background-color: rgba(255, 255, 255, 0.1);
      }
      tr {
        &:nth-child(2n) {
          background-color: rgba(255, 255, 255, 0.1) !important;
        }
        &:nth-child(2n-1) {
          background-color: transparent !important;
        }
        &:hover > td {
          background-color: rgba(255, 255, 255, 0.1) !important;
        }
      }
      .el-table__body-wrapper {
        /*滚动条中可以拖动的那部分*/
        &::-webkit-scrollbar-thumb {
          background-color: rgba(255, 255, 255, 0.2);
          border-radius: 4px;
          &:hover {
            background-color: rgba(255, 255, 255, 0.3);
          }
        }
      }
      * {
        border-color: rgba(255, 255, 255, 0.1) !important;
      }
    }
  }
  .SR-card {
    width: 450px;
    height: 260px;
    // position: absolute;
    position: relative;
    box-sizing: border-box;
    &-top {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 50px;
      background-image: url(../../../assets/ISM/top.png);
      background-repeat: no-repeat;
      background-position: top center;
      background-size: 100%;
    }
    &-center {
      position: absolute;
      top: 50px;
      right: 2px;
      bottom: 50px;
      left: 0;
      border-right: 1px solid rgba(39, 115, 230, 0.4);
      border-left: 1px solid rgba(39, 115, 230, 0.4);
      background-color: rgba(13, 29, 76, 0.4);
    }
    &-bottom {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 50px;
      background-image: url(../../../assets/ISM/bottom.png);
      background-repeat: no-repeat;
      background-position: bottom center;
      background-size: 100%;
    }
    &-title {
      position: absolute;
      top: 0;
      width: 100%;
      text-align: center;
      font-size: 13px;
      color: rgba(41, 193, 204, 1);
      line-height: 30px;
      background-image: url(../../../assets/ISM/title.png);
      background-repeat: no-repeat;
      background-position: bottom center;
      font-weight: 600;
      cursor: pointer;
    }
  }
}
</style>