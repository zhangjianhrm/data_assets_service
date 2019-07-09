<template>
  <div class="data-catalog-details">
    <div class="data-catalog-details__title">
      <h2>{{title}}</h2>
      <el-rate disabled v-model="currentRate" :max="5" :colors="colors"></el-rate>
      <b>{{currentRate | addZero}}</b>
    </div>
    <div class="data-catalog-details__count">
      <div class="data-catalog-details__count_format">
        <b v-for="(item,index) in format" :key="index">{{item}}</b>
      </div>
      <p class="data-catalog-details__count_count">
        <span>数据量</span>
        <b>50</b>
        <span>条，文件数</span>
        <b>3</b>
        <span>个，接口数量</span>
        <b>1</b>
        <span>个。</span>
      </p>
    </div>
    <hr />
    <div class="data-catalog-details__type">
      <el-button size="small" icon="el-icon-back" @click="$router.go(-1)">返回</el-button>
      <el-radio-group v-model="radio" size="small">
        <el-radio-button label="基本信息"></el-radio-button>
        <el-radio-button label="数据项"></el-radio-button>
        <el-radio-button label="数据详情"></el-radio-button>
        <el-radio-button label="文件下载"></el-radio-button>
        <el-radio-button label="API 服务"></el-radio-button>
        <el-radio-button label="数据纠错"></el-radio-button>
      </el-radio-group>
    </div>
    <div class="data-catalog-details__form">
      <h3>基本信息</h3>
      <div class="data-catalog-details__form_content">
        <el-row>
          <el-col :span="3">数据目录名称</el-col>
          <el-col :span="9">数据目录名称</el-col>
          <el-col :span="3">数据目录名称</el-col>
          <el-col :span="9">数据目录名称</el-col>
        </el-row>
        <el-row>
          <el-col :span="3">数据目录名称</el-col>
          <el-col :span="9">数据目录名称</el-col>
          <el-col :span="3">数据目录名称</el-col>
          <el-col :span="9">数据目录名称</el-col>
        </el-row>
        <el-row>
          <el-col :span="3">数据目录名称</el-col>
          <el-col :span="21">数据目录名称</el-col>
        </el-row>
        <el-row>
          <el-col :span="3">数据目录名称</el-col>
          <el-col :span="9">数据目录名称</el-col>
          <el-col :span="3">数据目录名称</el-col>
          <el-col :span="9">数据目录名称</el-col>
        </el-row>
      </div>
      <h3>内容简介</h3>
      <div class="data-catalog-details__form_content">
        <el-row>
          <el-col :span="3">简介</el-col>
          <el-col :span="21">数据目录名称</el-col>
        </el-row>
      </div>
      <h3>使用情况</h3>
      <div class="data-catalog-details__form_content">
        <el-row>
          <el-col :span="3">数据目录名称</el-col>
          <el-col :span="5">数据目录名称</el-col>
          <el-col :span="3">数据目录名称</el-col>
          <el-col :span="5">数据目录名称</el-col>
          <el-col :span="3">数据目录名称</el-col>
          <el-col :span="5">数据目录名称</el-col>
        </el-row>
      </div>
    </div>
    <div class="data-catalog-details__evaluate">
      <h3>用户评价</h3>
      <div class="data-catalog-details__evaluate_overview">
        <div class="data-catalog-details__evaluate_overview_average">
          <p>
            <b>{{currentRate | addZero}}</b>
            <span>分</span>
          </p>
          <el-rate
            disabled
            v-model="currentRate"
            :max="5"
            :colors="['rgba(255, 129, 19, 1)', 'rgba(255, 129, 19, 1)', 'rgba(255, 129, 19, 1)']"
          ></el-rate>
          <p>综合评分</p>
          <p>5646466 人已评分</p>
        </div>
        <div class="data-catalog-details__evaluate_overview_rate">
          <span>完整性</span>
          <el-rate v-model="rate1" :colors="colors"></el-rate>
          <span>准确性</span>
          <el-rate v-model="rate2" :colors="colors"></el-rate>
          <span>及时性</span>
          <el-rate v-model="rate3" :colors="colors"></el-rate>
          <span>可用性</span>
          <el-rate v-model="rate4" :colors="colors"></el-rate>
          <span>满意度</span>
          <el-rate v-model="rate5" :colors="colors"></el-rate>
        </div>
        <div class="data-catalog-details__evaluate_overview_text">
          <el-input
            type="textarea"
            placeholder="请输入内容"
            v-model="textarea"
            maxlength="240"
            show-word-limit
          ></el-input>
          <el-button type="primary" size="small">发布</el-button>
        </div>
      </div>
    </div>
    <el-tabs
      v-show="evaluationToggle"
      v-model="activeName"
      @tab-click="handleClick"
      class="data-catalog-details__evaluation"
    >
      <el-tab-pane :label="'全部('+evaluation.length+')'" name="first">
        <div
          class="data-catalog-details__evaluation_item"
          v-for="(item,index) in evaluation"
          :key="index"
        >
          <el-avatar :src="item.avatar"></el-avatar>
          <p>
            <span>{{item.username}}</span>
            <el-rate disabled v-model="item.rate" :colors="colors"></el-rate>
          </p>
          <p>{{item.content}}</p>
          <p>
            <span>{{item.time}}</span>
            <span>
              <svg-icon icon-class="reply" @click="replyEvaluation()" />
              <span>({{item.reply.length}})</span>
              <svg-icon icon-class="likes" @click="likesEvaluation()" />
              <span>({{item.like}})</span>
            </span>
          </p>
          <div
            class="data-catalog-details__evaluation_item_child"
            v-for="(child,childIndex) in item.reply"
            :key="childIndex"
          >
            <hr />
            <el-avatar :src="child.avatar"></el-avatar>
            <p>
              <span>{{child.username}}</span>
              <el-rate disabled v-model="child.rate" :colors="colors"></el-rate>
            </p>
            <p>{{child.content}}</p>
            <p>{{child.time}}</p>
          </div>
          <hr />
        </div>
      </el-tab-pane>
      <el-tab-pane label="好评" name="second">好评</el-tab-pane>
      <el-tab-pane label="中评" name="third">中评</el-tab-pane>
      <el-tab-pane label="差评" name="fourth">差评</el-tab-pane>
    </el-tabs>
    <div class="data-catalog-details__toggle">
      <el-button size="small" @click="evaluationToggle = !evaluationToggle">
        <span v-if="evaluationToggle">收起评论</span>
        <span v-else>展开评论</span>
      </el-button>
    </div>
  </div>
</template>
<script>
export default {
  name: "DataCatalogDetails",
  data() {
    return {
      id: this.$route.params.id,
      title: this.$route.params.name,
      currentRate: 4.5,
      format: ["XLS", "XML", "JSON", "CSV"],
      radio: "基本信息",
      colors: [
        "rgba(255, 129, 19, 1)",
        "rgba(255, 129, 19, 1)",
        "rgba(255, 129, 19, 1)"
      ],
      rate1: 5,
      rate2: 5,
      rate3: 5,
      rate4: 5,
      rate5: 5,
      textarea: "",
      evaluationToggle: true,
      activeName: "first",
      evaluation: [
        {
          id: "srgf1sdfg568474",
          username: "陈肖",
          avatar:
            "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
          rate: 5,
          content: "不错啊，挺好用的，准确性挺高的！",
          time: "2019年7月9日 17点31分",
          like: 234,
          reply: [
            {
              id: "",
              username: "张茜",
              avatar:
                "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
              rate: 5,
              content: "真的吗？等会儿我也试试。",
              time: "2019年7月9日 17点31分",
              like: 234,
              reply: []
            },
            {
              id: "",
              username: "小阳子",
              avatar:
                "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
              rate: 1,
              content: "骗子，一点都不好用。",
              time: "2019年7月9日 17点31分",
              like: 234,
              reply: []
            },
            {
              id: "",
              username: "杨柳",
              avatar:
                "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
              rate: 3,
              content: "只能说一般。",
              time: "2019年7月9日 17点31分",
              like: 234,
              reply: []
            }
          ]
        },
        {
          id: "srgf1sdfg568474",
          username: "李瑞秋",
          avatar:
            "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
          rate: 3,
          content: "一般般吧",
          time: "2019年7月9日 17点31分",
          like: 234,
          reply: []
        },
        {
          id: "srgf1sdfg568474",
          username: "李孟哲",
          avatar:
            "https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg",
          rate: 5,
          content: "我觉得还行",
          time: "2019年7月9日 17点31分",
          like: 234,
          reply: []
        },
        {
          id: "srgf1sdfg568474",
          username: "江畔",
          avatar:
            "https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg",
          rate: 5,
          content: "我觉得也还行~",
          time: "2019年7月9日 17点31分",
          like: 234,
          reply: []
        },
        {
          id: "srgf1sdfg568474",
          username: "朱阳亭",
          avatar:
            "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
          rate: 5,
          content: "不错啊，挺好用的！",
          time: "2019年7月9日 17点31分",
          like: 234,
          reply: []
        }
      ]
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    replyEvaluation() {},
    likesEvaluation() {}
  },
  filters: {
    addZero(value) {
      value *= 2;
      if (value % 1 == 0) {
        return value + ".0";
      } else {
        return value;
      }
    }
  }
};
</script>
<style lang="scss">
@import "~@/styles/variables.scss";
.data-catalog-details {
  display: flex;
  flex-direction: column;
  align-items: center;
  &__title {
    width: 1280px;
    height: 22px;
    margin-top: 25px;
    margin-bottom: 10px;
    h2 {
      float: left;
      font-size: 22px;
      line-height: 22px;
      margin-right: 26px;
      color: $color-header;
    }
    .el-rate {
      float: left;
      margin-top: 1px;
      &__text {
        font-size: 20px;
      }
    }
    b {
      color: $color-orange;
    }
  }
  &__count {
    width: 1280px;
    height: 24px;
    margin-bottom: 20px;
    &_format {
      float: left;
      height: 100%;
      margin-right: 24px;
      b {
        float: left;
        width: 47px;
        height: 100%;
        // margin-right: 4px;
        color: #fff;
        text-align: center;
        font-size: 12px;
        line-height: 24px;
        &:nth-child(1) {
          background: #39259e;
          border-radius: 4px 0 0 4px;
        }
        &:nth-child(2) {
          background: #444f84;
        }
        &:nth-child(3) {
          background: #2b92ff;
        }
        &:nth-child(4) {
          background: #ffa32b;
        }
        &:nth-last-child(1) {
          border-radius: 0 4px 4px 0;
        }
      }
    }
    &_count {
      float: left;
      font-size: 16px;
      color: $color-header;
      line-height: 24px;
      b {
        color: $color-blue;
        font-size: 22px;
        margin: 0 4px;
      }
    }
  }
  hr {
    width: 1280px;
    margin-bottom: 24px;
  }
  &__type {
    width: 1280px;
    height: 32px;
    margin-bottom: 24px;
    * {
      user-select: none;
      outline: none;
    }
    > button {
      float: left;
      margin-right: 10px;
    }
    .el-radio-group {
      float: left;
    }
  }
  &__form {
    width: 1280px;
    h3 {
      font-size: 18px;
      margin-bottom: 12px;
    }
    &_content {
      margin-bottom: 24px;
      .el-row {
        &:nth-child(1) {
          .el-col {
            border-top: 1px solid $color-header-10;
          }
        }
        .el-col {
          height: 36px;
          line-height: 34px;
          padding: 0 18px;
          font-size: 14px;
          border-right: 1px solid $color-header-10;
          border-bottom: 1px solid $color-header-10;
          &-3 {
            // width: 150px;
            background: rgba(12, 0, 53, 0.04);
            text-align: right;
          }
          &:nth-child(1) {
            border-left: 1px solid $color-header-10;
          }
        }
      }
    }
  }
  &__evaluate {
    width: 1280px;
    h3 {
      font-size: 18px;
      margin-bottom: 12px;
    }
    &_overview {
      width: 1280px;
      height: 194px;
      padding: 20px;
      box-sizing: border-box;
      background: rgba(12, 0, 53, 0.02);
      margin-bottom: 24px;
      &_average {
        float: left;
        width: 120px;
        margin-right: 30px;
        p:nth-child(1) {
          height: 56px;
          font-size: 14px;
          line-height: 1;
          text-align: center;
          margin-bottom: 10px;
          b {
            font-size: 56px;
            color: $color-orange;
          }
          span {
            font-size: 14px;
          }
        }
        .el-rate {
          margin-bottom: 20px;
        }
        p:nth-child(3) {
          font-size: 14px;
          text-align: center;
          color: $color-header;
          margin-bottom: 10px;
          font-weight: 600;
        }
        p:nth-child(4) {
          font-size: 14px;
          text-align: center;
          color: $color-header-50;
        }
      }
      &_rate {
        float: left;
        width: 200px;
        height: 100%;
        margin-right: 10px;
        > * {
          float: left;
          margin-bottom: 14px;
        }
        > span {
          font-size: 14px;
          margin-right: 10px;
        }
      }
      &_text {
        float: left;
        width: 880px;
        height: 100%;
        .el-textarea {
          margin-bottom: 8px;
          textarea {
            max-height: 114px !important;
            min-height: 114px !important;
          }
        }
        button {
          float: right;
        }
      }
    }
  }
  &__evaluation {
    width: 1280px;
    margin-bottom: 24px;
    &_item {
      overflow: hidden;
      font-size: 14px;
      > span {
        float: left;
      }
      > p:nth-child(2) {
        float: right;
        width: 1220px;
        height: 18px;
        margin-bottom: 12px;
        > * {
          float: left;
        }
        > span {
          color: $color-header;
          line-height: 18px;
          margin-right: 10px;
        }
      }
      > p:nth-child(3) {
        float: right;
        width: 1220px;
        margin-bottom: 12px;
        color: $color-header-80;
      }
      > p:nth-child(4) {
        float: right;
        width: 1220px;
        margin-bottom: 12px;
        color: $color-header-50;
        > span:nth-last-child(1) {
          float: right;
          cursor: pointer;
          > svg {
            margin-right: 4px;
            &:hover {
              color: $color-blue;
            }
          }
          > span:nth-child(2) {
            margin-right: 30px;
          }
        }
      }
      &_child {
        float: right;
        width: 1220px;
        hr {
          width: 1220px;
          margin-bottom: 12px;
        }
        > span {
          float: left;
        }
        > p:nth-child(3) {
          float: right;
          width: 1160px;
          height: 18px;
          margin-bottom: 12px;
          > * {
            float: left;
          }
          > span {
            color: $color-header;
            line-height: 18px;
            margin-right: 10px;
          }
        }
        > p:nth-child(4) {
          float: right;
          width: 1160px;
          margin-bottom: 12px;
          color: $color-header-80;
        }
        > p:nth-child(5) {
          float: right;
          width: 1160px;
          margin-bottom: 12px;
          color: $color-header-50;
        }
      }
      > hr {
        float: right;
        width: 1280px;
        margin-bottom: 12px;
      }
    }
  }
  &__toggle {
    margin-bottom: 100px;
  }
}
</style>
