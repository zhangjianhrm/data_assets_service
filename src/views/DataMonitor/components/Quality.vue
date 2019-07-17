<template>
  <div class="data-monitor__quality">
    <h5>
      <svg-icon icon-class="tit"></svg-icon>
      <span>数据质量</span>
    </h5>
    <el-carousel height="167px" arrow="never" :autoplay="true">
      <el-carousel-item class="data-monitor__quality_1">
        <h6>
          <span>系统质量检测得分排名</span>
          <span>
            <i>查看更多</i>
            <i class="el-icon-d-arrow-right"></i>
          </span>
        </h6>
        <el-row>
          <el-col :span="7">系统名称</el-col>
          <el-col :span="3">得分</el-col>
          <el-col :span="5">数据总量</el-col>
          <el-col :span="5">问题数据量</el-col>
          <el-col :span="4">环比</el-col>
        </el-row>
        <el-row v-for="(item,index) in table" :key="index">
          <el-col :span="7">{{index+1}}.{{item.name}}</el-col>
          <el-col :span="3">{{item.grade}}</el-col>
          <el-col :span="5">{{item.total}}</el-col>
          <el-col :span="5">{{item.untreated}}</el-col>
          <el-col :span="4">
            <span>{{item.rate}}</span>
            <i v-if="item.rate>0" class="el-icon-top"></i>
            <i v-else class="el-icon-bottom"></i>
          </el-col>
        </el-row>
      </el-carousel-item>
      <el-carousel-item class="data-monitor__quality_2">
        <div class="data-monitor__quality_2_pie"></div>
      </el-carousel-item>
      <el-carousel-item class="data-monitor__quality_3">
        <h4>总体概况</h4>
        <p>
          <span>表</span>
          <b>{{1234 | formatNum}}</b>
          <span>数据项</span>
          <b>{{1234 | formatNum}}</b>
          <span>数据量</span>
          <b>{{1234 | formatNum}}</b>
        </p>
        <h4>质量概况</h4>
        <p>
          <span>问题表</span>
          <b>{{1234 | formatNum}}</b>
          <span>问题数据项</span>
          <b>{{123234234 | formatNum}}</b>
          <br />
          <span>问题数据量</span>
          <b>{{12345634523 | formatNum}}</b>
        </p>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script>
import load from "@/utils/load.js"; // 加载 Js
export default {
  data() {
    return {
      table: [
        {
          name: "人事系统",
          grade: 8.7,
          total: 12344,
          untreated: 12,
          rate: 0.04
        },
        {
          name: "一卡通系统",
          grade: 6.1,
          total: 12344,
          untreated: 12,
          rate: -0.01
        },
        {
          name: "科研系统",
          grade: 5.9,
          total: 12344,
          untreated: 12,
          rate: 0.04
        }
      ]
    };
  },
  async created() {
    await load(
      "https://echarts.baidu.com/gallery/vendors/echarts/echarts.min.js"
    );
    this.createPie();
  },
  methods: {
    createPie() {
      let dom = document.querySelector(".data-monitor__quality_2_pie");
      let myChart = echarts.init(dom);
      let option = {
        title: {
          text: "严重程度",
          left: 10,
          textStyle: {
            color: "#fff",
            fontSize: "12"
          }
        },
        tooltip: {
          trigger: "item",
          // formatter: "{d}%"
          formatter: "{c}"
        },
        legend: {
          right: 0,
          orient: "vertical",
          itemWidth: 8,
          itemHeight: 8,
          // borderRadius: 20,
          textStyle: {
            color: "#fff",
            fontSize: "10"
          },
          data: ["严重", "一般", "正常"]
        },
        calculable: true,
        series: [
          {
            name: "半径模式",
            type: "pie",
            radius: [0, 40],
            center: ["50%", "50%"],
            color: ["#992E2E", "#B36C36", "#122552"],
            roseType: "radius",
            label: {
              show: true,
              color: "#fff",
              formatter: "{c}条"
            },
            lableLine: {
              normal: {
                show: false
              },
              emphasis: {
                show: true
              }
            },
            data: [
              { value: 40, name: "严重" },
              { value: 35, name: "一般" },
              { value: 30, name: "正常" }
            ]
          }
        ]
      };
      myChart.setOption(option, true);
    }
  }
};
</script>
<style lang="scss">
.data-monitor__quality {
  width: 350px;
  height: 196px;
  background: linear-gradient(rgba(11, 1, 52, 0.5), rgba(23, 41, 77, 1));
  border: 2px solid rgba(32, 82, 160, 1);
  color: #fff;
  box-sizing: border-box;
  padding: 14px;
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
  &_1 {
    font-size: 12px;
    width: 100%;
    height: 130px;
    > h6 {
      height: 12px;
      line-height: 1;
      font-size: 12px;
      margin-bottom: 10px;
      span:nth-child(1) {
        float: left;
      }
      span:nth-child(2) {
        float: right;
        color: rgba(255, 255, 255, 0.5);
        i {
          font-style: normal;
        }
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
        padding-left: 6px;
      }
      .el-col:nth-last-child(1) {
        text-align: right;
        padding-right: 6px;
      }
    }
    .el-row:nth-child(2n-1) {
      background: rgba(0, 114, 201, 0.1);
    }
    .el-row:nth-child(3) {
      color: rgba(216, 64, 64, 1);
    }
    .el-row:nth-child(4) {
      color: rgba(204, 112, 41, 1);
    }
    .el-row:nth-child(5) {
      color: rgba(179, 156, 54, 1);
    }
  }
  &_2 {
    height: 130px;
    &_pie {
      height: 100%;
    }
  }
  &_3 {
    h4 {
      font-size: 12px;
      height: 12px;
      margin-bottom: 10px;
    }
    p {
      font-size: 12px;
      // height: 14px;
      line-height: 20px;
      span {
        margin-right: 10px;
      }
      b {
        font-size: 14px;
        margin-right: 20px;
      }
    }
    p {
      margin-bottom: 10px;
      b {
        color: rgba(41, 193, 204, 1);
      }
    }
  }
}
</style>
