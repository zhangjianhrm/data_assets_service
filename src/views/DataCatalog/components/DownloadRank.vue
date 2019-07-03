<template>
  <div class="download-rank">
    <div class="download-rank__left">
      <h3>
        <span>数据下载 TOP10</span>
        <b>···</b>
      </h3>
      <el-button-group>
        <el-button size="small" type="primary">本周</el-button>
        <el-button size="small">本月</el-button>
        <el-button size="small">本年</el-button>
      </el-button-group>
      <div class="download-rank__left_rank">
        <p v-for="(item,index) in downloadRank" :key="index">
          <b>
            <svg-icon v-if="item.rank<=3" :icon-class="'rank'+item.rank"></svg-icon>
            <svg-icon v-else icon-class="rank4"></svg-icon>
            <span>{{item.rank}}</span>
          </b>
          <span>
            <span>{{item.title}}</span>
            <i>{{item.downloadTimes | formatNum}}次</i>
          </span>
        </p>
      </div>
    </div>
    <div class="download-rank__right"></div>
  </div>
</template>
<script>
export default {
  name: "DownloadRank",
  data() {
    return {
      downloadRank: [
        { rank: 1, title: "计算机学院课程", downloadTimes: 76512, link: "" },
        { rank: 2, title: "计算机", downloadTimes: 76512, link: "" },
        { rank: 3, title: "计算机学院", downloadTimes: 76512, link: "" },
        { rank: 4, title: "计算机学院课程", downloadTimes: 76512, link: "" },
        { rank: 5, title: "课表基本信息", downloadTimes: 76512, link: "" },
        { rank: 6, title: "图书基本信息", downloadTimes: 76512, link: "" },
        { rank: 7, title: "缴费基本信息", downloadTimes: 76512, link: "" },
        { rank: 8, title: "一卡通消费流水", downloadTimes: 76512, link: "" },
        { rank: 9, title: "学生奖惩基本信息", downloadTimes: 76512, link: "" },
        { rank: 10, title: "科研项目基本信息", downloadTimes: 76512, link: "" }
      ]
    };
  }
};
</script>
<style lang="scss">
.download-rank {
  height: 626px;
  background: rgba(245, 245, 245, 1);
  display: flex;
  justify-content: center;
  &__left {
    width: 640px;
    height: 626px;
    box-sizing: border-box;
    padding-top: 70px;
    padding-right: 85px;
    h3 {
      font-size: 18px;
      line-height: 18px;
      height: 18px;
      margin-bottom: 26px;
      b {
        float: right;
      }
    }
    .el-button-group {
      margin-bottom: 15px;
    }
    &_rank {
      p {
        width: 100%;
        height: 39px;
        line-height: 30px;
        overflow: hidden;
        font-size: 14px;
        > b {
          float: left;
          width: 30px;
          height: 30px;
          margin: 4px 0;
          margin-right: 15px;
          position: relative;
          color: #fff;
          text-align: center;
          svg {
            position: absolute;
            width: 30px !important;
            height: 30px !important;
            top: 0;
            right: 0;
            z-index: 0;
          }
          span {
            // line-height:
            position: relative;
            z-index: 1;
          }
        }
        > span {
          float: left;
          width: 510px;
          line-height: 30px;
          border-bottom: 1px solid rgba(12, 0, 53, 0.1);
          padding: 4px 0;
          > i {
            float: right;
            font-style: normal;
            color: rgba(12, 0, 53, 0.5);
          }
        }
      }
    }
  }
  &__right {
    width: 640px;
    height: 626px;
    background: seagreen;
  }
}
</style>
