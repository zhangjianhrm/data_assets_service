<template>
  <div class="data-monitor__live">
    <h5>
      <svg-icon icon-class="tit"></svg-icon>
      <span>实时操作提醒</span>
    </h5>
    <div class="data-monitor__live_content">
      <el-carousel
        height="26px"
        direction="vertical"
        indicator-position="none"
        v-for="(item,index) in table"
        :key="index"
        :autoplay="true"
      >
        <el-carousel-item v-for="itemChild in 3" :key="itemChild">
          <el-row>
            <el-col :span="14">{{item.event}}</el-col>
            <el-col :span="10">{{item.time}}</el-col>
          </el-row>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="data-monitor__live_cover"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      table: [
        {
          event: "用户陈肖下载了数据目录",
          time: "2019-7-15 17:14"
        },
        {
          event: "用户李瑞秋下载了很多的数据目录",
          time: "2019-7-15 17:14"
        },
        {
          event: "用户朱阳亭下载了数据目录",
          time: "2019-7-15 17:14"
        }
      ]
    };
  }
};
</script>
<style lang="scss">
.data-monitor__live {
  width: 350px;
  height: 138px;
  background: linear-gradient(rgba(11, 1, 52, 0.5), rgba(23, 41, 77, 1));
  border: 2px solid rgba(32, 82, 160, 1);
  color: #fff;
  box-sizing: border-box;
  padding: 14px;
  position: relative;
  > h5 {
    height: 12px;
    line-height: 1;
    font-size: 12px;
    margin-bottom: 10px;
    svg {
      margin-right: 4px;
    }
    span {
      color: rgba(41, 193, 204, 1);
    }
  }
  &_content {
    font-size: 12px;
    width: 100%;
    height: 130px;
    .el-carousel:nth-child(2n-1) {
      .el-row {
        background: rgba(0, 114, 201, 0.1);
      }
    }
    .el-row {
      line-height: 26px;
      font-weight: 600;
      .el-col {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .el-col:nth-child(1) {
        padding-left: 10px;
      }
      .el-col:nth-child(2) {
        padding-right: 10px;
        text-align: right;
      }
    }
    .el-carousel:nth-child(1) {
      color: rgba(216, 64, 64, 1);
    }
    .el-carousel:nth-child(2) {
      color: rgba(204, 112, 41, 1);
    }
    .el-carousel:nth-child(3) {
      color: rgba(179, 156, 54, 1);
    }
  }
  &_cover {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 2;
  }
}
</style>
