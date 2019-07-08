<template>
  <div class="management-norms">
    <div class="management-norms__left">
      <h3>
        <span>标准规范管理文档</span>
        <el-button type="warning" size="small" @click="showCollect">已收藏</el-button>
      </h3>
      <p class="management-norms__left_search">
        <el-input placeholder="输入关键词" v-model="input4" size="small">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </p>
      <el-collapse v-model="collapseActiveName" accordion @change="changeLibrary">
        <el-collapse-item
          v-for="(item,index) in documentLibrary"
          :key="index"
          :title="item.title"
          :name="item.name"
        >
          <template slot="title">
            <p style="width:100%;" @mouseenter="openCollapse(item.name)">{{item.title}}</p>
          </template>
          <el-scrollbar wrap-class="management-norms__left_item">
            <el-checkbox-group
              v-model="checkList"
              v-for="(item,index) in item.document"
              :key="index"
            >
              <el-checkbox v-for="(item,index) in item" :key="index" :label="item.name"></el-checkbox>
            </el-checkbox-group>
          </el-scrollbar>
        </el-collapse-item>
      </el-collapse>
      <div class="management-norms__left_op">
        <el-button type="primary" size="medium">收藏</el-button>
        <el-button type="primary" size="medium">下载</el-button>
      </div>
    </div>
    <div class="management-norms__right">
      <!-- 书架 -->
      <div class="management-norms__right_shelf">
        <section></section>
        <div></div>
        <section></section>
        <div></div>
        <section></section>
        <div></div>
      </div>
      <el-carousel
        indicator-position="none"
        height="580px"
        arrow="always"
        v-for="(item,outerIndex) in documentLibrary"
        v-show="outerIndex == collapseActiveName"
        :key="outerIndex"
        :autoplay="false"
        :loop="false"
      >
        <el-carousel-item v-for="(item,index) in item.document" :key="index">
          <el-checkbox-group v-model="checkList">
            <el-checkbox v-for="(item,index) in item" :key="index" :label="item.name">
              <el-tooltip class="item" effect="dark" content="点击阅览" placement="top">
                <div class="color-books" @click.prevent="read">
                  <svg-icon :icon-class="'document'+ outerIndex" />
                  <svg-icon icon-class="collected" v-show="item.collected" />
                </div>
              </el-tooltip>
              <section>
                <p>{{item.name}}</p>
              </section>
            </el-checkbox>
          </el-checkbox-group>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>
<script>
import { isNumber } from "util";
export default {
  name: "ManagementNorms",
  data() {
    return {
      input4: "",
      collapseActiveName: 0,
      checkList: ["复选框 0-1", "复选框 A"],
      documentLibrary: [
        {
          name: 0,
          title: "信息标准管理规范文档库",
          document: [
            [
              {
                name: "复选框 0-1",
                id: "0-1",
                collected: false
              },
              {
                name: "复选框 0-2",
                id: "0-2",
                collected: true
              },
              {
                name: "复选框 0-3",
                id: "0-3",
                collected: false
              },
              {
                name: "复选框 0-4",
                id: "0-4",
                collected: false
              },
              {
                name: "复选框 0-5",
                id: "0-5",
                collected: true
              },
              {
                name: "复选框 0-6",
                id: "0-6",
                collected: false
              },
              {
                name: "复选框 0-7",
                id: "0-7",
                collected: false
              },
              {
                name: "复选框 0-8",
                id: "0-8",
                collected: false
              },
              {
                name: "复选框 0-9",
                id: "0-9",
                collected: false
              }
            ],
            [
              {
                name: "复选框 0-10",
                id: "0-10",
                collected: false
              },
              {
                name: "复选框 0-11",
                id: "0-11",
                collected: false
              }
            ]
          ]
        },
        {
          name: 1,
          title: "数据集成管理规范文档库",
          document: [
            [
              {
                name: "复选框 A",
                id: "1-1",
                collected: false
              },
              {
                name:
                  "复选框 BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB",
                id: "1-2",
                collected: false
              },
              {
                name: "复选框 C",
                id: "1-2",
                collected: false
              },
              {
                name: "复选框 D",
                id: "1-2",
                collected: false
              }
            ]
          ]
        },
        {
          name: 2,
          title: "数据管理规范文档库",
          document: [
            [
              {
                name: "复选框 E",
                id: "2-1",
                collected: false
              },
              {
                name: "复选框 F",
                id: "2-2",
                collected: false
              },
              {
                name: "复选框 G",
                id: "2-3",
                collected: false
              },
              {
                name: "复选框 H",
                id: "2-4",
                collected: false
              }
            ]
          ]
        },
        {
          name: 3,
          title: "数据治理规范文档库",
          document: [
            [
              {
                name: "复选框 I",
                id: "3-1",
                collected: false
              },
              {
                name: "复选框 J",
                id: "3-2",
                collected: false
              },
              {
                name: "复选框 K",
                id: "3-3",
                collected: false
              },
              {
                name: "复选框 L",
                id: "3-4",
                collected: false
              }
            ]
          ]
        },
        {
          name: 4,
          title: "数据安全管理规范文档库",
          document: [
            [
              {
                name: "复选框 M",
                id: "4-1",
                collected: false
              },
              {
                name: "复选框 N",
                id: "4-2",
                collected: false
              },
              {
                name: "复选框 O",
                id: "4-3",
                collected: false
              },
              {
                name: "复选框 P",
                id: "4-4",
                collected: false
              }
            ]
          ]
        }
      ],
      currentLibrary: {}
    };
  },
  created() {
    this.changeLibrary(this.collapseActiveName);
  },
  methods: {
    // 折叠面板
    changeLibrary(li) {
      // if (isNumber(li)) {
      //   this.currentLibrary = this.documentLibrary[li].document;
      //   // this.collapseTempName = li;
      // }
    },
    // 鼠标经过打开
    openCollapse(name) {
      // console.log(name);
      this.collapseActiveName = name;
    },
    // 鼠标划走回到之前状态
    // closeCollapse() {
    //   this.collapseActiveName = this.collapseTempName;
    //   console.log(11111);
    // }
    //
    read() {
      console.log(1);
    },
    showCollect() {}
  }
};
</script>
<style lang="scss">
@import "~@/styles/variables.scss";
.management-norms {
  width: 1280px;
  margin: 0 auto;
  padding: 50px 0;
  overflow: hidden;
  &__left {
    float: left;
    width: 375px;
    margin-top: 15px;
    h3 {
      font-size: 32px;
      height: 32px;
      margin-bottom: 28px;
      > span:nth-child(1) {
        color: $color-header;
        float: left;
        line-height: 32px;
      }
      > button:nth-child(2) {
        float: right;
        color: #fff;
      }
    }
    &_search {
      margin-bottom: 28px;
    }
    .el-collapse-item__header {
      font-size: 14px;
    }
    .el-collapse-item__header.is-active {
      font-size: 20px !important;
      font-weight: 900;
    }
    &_item {
      // max-height: 96px;
      overflow-x: hidden;
      .el-checkbox-group {
        &:nth-last-child(1) {
          padding-bottom: 25px;
        }
        .el-checkbox {
          width: 320px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          margin-right: 0;
          margin-bottom: 5px;
          margin-left: 20px;
          // visibility: hidden;
          display: none;
          // &:nth-last-child(1) {
          //   margin-bottom: 12px;
          // }
        }
        .el-checkbox.is-checked {
          // visibility: visible;
          display: inline-block;
        }
      }
    }
    &_op {
      margin-top: 20px;
    }
  }
  &__right {
    float: right;
    width: 808px;
    position: relative;
    &_shelf {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      section {
        width: 609px;
        height: 10px;
        background: $color-header;
        position: absolute;
        left: 0;
        right: 0;
        margin: auto;
        &:nth-child(1) {
          top: 125px;
        }
        &:nth-child(3) {
          top: 325px;
        }
        &:nth-child(5) {
          top: 525px;
        }
        &:before {
          content: "";
          position: absolute;
          width: 15px;
          height: 20px;
          border: 3px solid $color-header;
          border-right: none;
          border-bottom: none;
          border-left: none;
          background: linear-gradient(
            to bottom left,
            rgba(12, 0, 53, 0.2),
            transparent,
            transparent
          );
          transform: skewY(112deg);
          top: -17px;
          left: 0px;
          z-index: -1;
        }
        &:after {
          content: "";
          position: absolute;
          width: 15px;
          height: 20px;
          border: 3px solid $color-header;
          border-right: none;
          border-bottom: none;
          border-left: none;
          background: linear-gradient(
            to bottom right,
            rgba(12, 0, 53, 0.2),
            transparent,
            transparent
          );
          transform: skewY(-112deg);
          top: -17px;
          right: 0px;
          z-index: -1;
        }
      }
      div {
        width: 600px;
        height: 5px;
        background: rgba(12, 0, 53, 0.7);
        position: absolute;
        left: 0;
        right: 0;
        margin: auto;
        &:nth-child(2) {
          top: 135px;
        }
        &:nth-child(4) {
          top: 335px;
        }
        &:nth-child(6) {
          top: 535px;
        }
      }
      svg {
        position: absolute;
        top: 0;
        bottom: 0;
      }
    }
    .el-checkbox-group {
      width: 609px;
      margin: 0 auto;
      // overflow: hidden;
    }
    .el-checkbox {
      float: left;
      width: 203px;
      margin-bottom: 15px;
      margin-right: 0px;
      position: relative;
      margin-top: 15px;
      &__input {
        position: absolute;
        bottom: 21px;
        left: 6px;
      }
      &__label {
        display: block;
        margin: 0 auto;
        padding-left: 0px;
        > div {
          width: 90px;
          height: 110px;
          margin: 0 auto;
          // background: rgb(80, 127, 223);
          margin-bottom: 20px;
          position: relative;
          transition: all 0.2s;
          // transform-origin: top;
          &:hover {
            transform: scale(1.1, 1.1);
          }
          > svg:nth-child(1) {
            position: absolute;
            right: 7px;
            bottom: 0px;
            width: 100px;
            height: 110px;
          }
          > svg:nth-child(2) {
            position: absolute;
            right: -7px;
            top: -10px;
            width: 50px;
            height: 50px;
            transform: rotate(36deg);
          }
        }
        > section {
          height: 40px;
          p {
            width: 80%;
            margin: 0 auto;
            text-align: center;
            font-size: 14px;
            line-height: 20px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
    }
    // div.el-carousel:nth-child(2) {
    //   .color-books {
    //     background: rgb(80, 127, 223);
    //   }
    // }
    // div.el-carousel:nth-child(3) {
    //   .color-books {
    //     background: #8c67d3;
    //   }
    // }
    // div.el-carousel:nth-child(4) {
    //   .color-books {
    //     background: rgb(161, 179, 237);
    //   }
    // }
    // div.el-carousel:nth-child(5) {
    //   .color-books {
    //     background: #ffb75c;
    //   }
    // }
    // div.el-carousel:nth-child(6) {
    //   .color-books {
    //     background: #5960ee;
    //   }
    // }
  }
}
</style>
