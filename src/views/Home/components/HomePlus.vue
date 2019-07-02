<template>
  <div class="home__plus">
    <div class="home__plus_news">
      <div class="home__plus_news_content">
        <h4>
          <b>消息通知</b>
          <span>
            <span>查看更多</span>
            <i class="el-icon-arrow-right"></i>
          </span>
        </h4>
        <p v-for="(item,index) in news" :key="index">
          <span>{{item.title}}</span>
          <span>{{item.date}}</span>
        </p>
      </div>
    </div>
    <div class="home__plus_files">
      <div class="home__plus_files_content">
        <h4>
          <b>文件下载</b>
          <span>
            <span>查看更多</span>
            <i class="el-icon-arrow-right"></i>
          </span>
        </h4>
        <p v-for="(item,index) in files" :key="index">
          <i class="el-icon-document"></i>
          <span>{{item.title}}</span>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "HomePlus",
  data() {
    return {
      news: [
        {
          title: "Adobe发布公告：Creative Cloud用户仅能下载软件最新版。",
          date: "2019/6/28",
          link: ""
        },
        {
          title: "大家都在用的「点赞」功能还能怎么创新？",
          date: "2019/6/28",
          link: ""
        },
        {
          title: " 如何增加儿童产品中的趣味性？用多个实战案例告诉你！",
          date: "2019/6/28",
          link: ""
        },
        {
          title: "拆解了14个案例，我为你总结出6条增长心法",
          date: "2019/6/28",
          link: ""
        },
        {
          title: "为什么“中国式审美”被群嘲？因为我们缺乏真正的美感教育",
          date: "2019/6/28",
          link: ""
        },
        {
          title: "当甲方说「字要大」时，到底是在说什么？",
          date: "2019/6/28",
          link: ""
        },
        {
          title: "当甲方说「字要大」时，到底是在说什么？",
          date: "2019/6/28",
          link: ""
        }
      ],
      files: [
        {
          title: "Adobe发布公告：Creative Cloud用户仅能下载软件最新版。"
        },
        {
          title: "大家都在用的「点赞」功能还能怎么创新？"
        },
        {
          title: "Adobe发布公告：Creative Cloud用户仅能下载软件最新版。"
        },
        {
          title: "大家都在用的「点赞」功能还能怎么创新？"
        },
        {
          title: "Adobe发布公告：Creative Cloud用户仅能下载软件最新版。"
        },
        {
          title: "大家都在用的「点赞」功能还能怎么创新？"
        }
      ]
    };
  }
};
</script>
<style lang="scss">
@import "~@/styles/variables.scss";
.home__plus {
  width: 1280px;
  height: 160px;
  overflow: hidden;
  @media only screen and (min-height: 580px) and (min-height: 619px) {
    height: 160px;
  }
  @media only screen and (min-height: 620px) and (min-height: 749px) {
    height: 240px;
  }
  @media only screen and (min-height: 750px) and (min-height: 899px) {
    height: 270px;
  }
  @media only screen and (min-height: 900px) {
    height: 310px;
  }
  &_news {
    float: left;
    box-sizing: border-box;
    width: 840px;
    height: 100%;
    padding: 10px;
    background-color: rgba(255, 255, 255, 0.1);
    color: #fff;
    &_content {
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      padding: 20px;
      background-color: rgba(255, 255, 255, 0.1);
      overflow: hidden;
      h4 {
        height: 24px;
        display: flex;
        justify-content: space-between;
        padding-bottom: 8px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        margin-bottom: 12px;
        b {
          font-size: 18px;
        }
        > span {
          font-size: 14px;
          font-weight: 300;
          cursor: pointer;
          margin-top: 6px;
        }
      }
      p {
        display: flex;
        justify-content: space-between;
        line-height: 36px;
        font-size: 14px;
        font-weight: 300;
        cursor: pointer;
      }
    }
  }
  &_files {
    float: right;
    box-sizing: border-box;
    width: 400px;
    height: 100%;
    padding: 10px;
    background-color: rgba(255, 255, 255, 0.1);
    color: #fff;
    &_content {
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      padding: 20px;
      background-color: rgba(255, 255, 255, 0.1);
      overflow: hidden;
      h4 {
        height: 24px;
        display: flex;
        justify-content: space-between;
        padding-bottom: 8px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        margin-bottom: 12px;
        b {
          font-size: 18px;
        }
        > span {
          font-size: 14px;
          font-weight: 300;
          cursor: pointer;
          margin-top: 6px;
        }
      }
      p {
        line-height: 36px;
        font-size: 14px;
        font-weight: 300;
        cursor: pointer;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        i {
          margin-right: 5px;
          color: rgba(255, 108, 46, 1);
        }
      }
    }
  }
}
</style>
