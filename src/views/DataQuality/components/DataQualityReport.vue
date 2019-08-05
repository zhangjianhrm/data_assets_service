<template>
  <div class="data-quality-report">
    <div class="data-quality-report__left">
      <h3>
        <p>数据质量报告</p>
        <p>Data quality report</p>
      </h3>
      <div class="data-quality-report__left_type">
        <el-select v-model="currentType" placeholder="请选择" size="small">
          <el-option v-for="item in type" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
        <el-radio-group v-model="radio" size="small">
          <el-radio-button label="周报"></el-radio-button>
          <el-radio-button label="月报"></el-radio-button>
          <el-radio-button label="年报"></el-radio-button>
        </el-radio-group>
      </div>
      <div class="data-quality-report__left_date">
        <el-cascader
          v-model="currentDate"
          size="small"
          placeholder="年 / 周"
          :options="tableOptions"
          @change="handleChange"
        ></el-cascader>
      </div>
      <div class="data-quality-report__left_op">
        <el-button type="primary" size="small">查询</el-button>
        <el-button type="primary" size="small" plain>下载</el-button>
      </div>
    </div>
    <div class="data-quality-report__right">
      <!-- 书架 -->
      <div class="data-quality-report__right_shelf">
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
        v-show="item.name == radio"
        :key="outerIndex"
        :autoplay="false"
        :loop="false"
      >
        <el-carousel-item v-for="(item,index) in item.document" :key="index">
          <el-checkbox-group v-model="checkList">
            <el-checkbox v-for="(item,index) in item" :key="index" :label="item.name">
              <el-tooltip class="item" effect="dark" content="点击阅览" placement="top">
                <div class="color-books" @click.prevent="read">
                  <svg-icon :icon-class="'quality'+ outerIndex" />
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
  name: "DataQualityReport",
  data() {
    return {
      // 全部 质量分析报告 质量问题报告
      type: [
        {
          value: "all",
          label: "全部"
        },
        {
          value: "ana",
          label: "质量分析报告"
        },
        {
          value: "problem",
          label: "质量问题报告"
        }
      ],
      currentType: "全部",
      radio: "周报",

      // 表菜单
      tableOptions: [
        {
          id: "DB_01",
          label: "数据库_01",
          children: [
            {
              id: "DB_01_Table_01",
              label: "表_01"
            },
            {
              id: "DB_01_Table_02",
              label: "表_02"
            }
          ]
        }
      ],
      currentDate: [],
      collapseActiveName: 0,
      checkList: ["复选框 0-1", "复选框 A"],
      documentLibrary: [
        {
          name: "周报",
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
          name: "月报",
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
          name: "年报",
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
        }
      ],
      years: [
        {
          value: "选项1",
          label: "2019"
        },
        {
          value: "选项2",
          label: "2018"
        },
        {
          value: "选项3",
          label: "2017"
        },
        {
          value: "选项4",
          label: "2016"
        },
        {
          value: "选项5",
          label: "2015"
        }
      ],
      currentYear: "2019"
    };
  },
  created() {},
  methods: {
    read() {
      console.log(1);
    },
    handleChange(value) {
      console.log(value);
    }
  }
};
</script>
<style lang="scss">
@import "~@/styles/variables.scss";
.data-quality-report {
  width: 1280px;
  margin: 0 auto;
  padding: 50px 0;
  overflow: hidden;
  &__left {
    float: left;
    width: 375px;
    margin-top: 15px;
    h3 {
      > p:nth-child(1) {
        height: 32px;
        line-height: 32px;
        font-size: 32px;
        color: $color-header;
        margin-bottom: 20px;
      }
      > p:nth-child(2) {
        height: 20px;
        line-height: 20px;
        font-size: 20px;
        font-weight: 600;
        color: $color-header-50;
        margin-bottom: 24px;
      }
    }
    &_type {
      height: 32px;
      margin-bottom: 24px;
      overflow: hidden;
      .el-select {
        float: left;
        width: 140px;
        margin-right: 24px;
      }
    }
    &_date {
      .el-select:nth-child(1) {
        width: 90px;
        margin-right: 10px;
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
  }
}
</style>
