<template>
  <div class="data-map__details_scroll-card">
    <div class="data-map__details_scroll-card_top"></div>
    <div class="data-map__details_scroll-card_arrow"></div>
    <div class="data-map__details_scroll-card_center"></div>
    <div class="data-map__details_scroll-card_bottom"></div>
    <ul class="data-map__details_scroll-card_wrap">
      <li v-for="(item,index) in cardData" :key="index">
        <div>
          <p>
            <b>{{item.name}}</b>
            <span>{{item.count | formatNum}} 条数据</span>
          </p>
          <p>
            <b>数据交换</b>
            <span>
              <span style="font-size:18px;">{{item.ex | formatNum}}</span>
              个
            </span>
          </p>
          <p>
            <b>API</b>
            <span>
              <span style="font-size:18px;">{{item.api | formatNum}}</span>
              个
            </span>
          </p>
        </div>
      </li>
      <li v-for="(item,index2) in cardData.slice(0,7)" :key="index2+cardData.length">
        <div>
          <p>
            <b>{{item.name}}</b>
            <span>{{item.count | formatNum}} 条数据</span>
          </p>
          <p>
            <b>数据交换</b>
            <span>
              <span style="font-size:18px;">{{item.ex | formatNum}}</span>
              个
            </span>
          </p>
          <p>
            <b>API</b>
            <span>
              <span style="font-size:18px;">{{item.api | formatNum}}</span>
              个
            </span>
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "ScrollCard",
  data() {
    return {
      cardData: [
        { name: "全量库1", count: 123456, ex: 123, api: 456 },
        { name: "人事部2", count: 123456, ex: 123, api: 456 },
        { name: "教务部3", count: 123456, ex: 123, api: 456 },
        { name: "很长的学工部4", count: 123456, ex: 123, api: 456 },
        { name: "财务部5", count: 123456, ex: 123, api: 456 },
        { name: "后勤部6", count: 123456, ex: 123, api: 456 },
        { name: "宣传部7", count: 123456, ex: 123, api: 456 },
        { name: "保卫处8", count: 123456, ex: 123, api: 456 },
        { name: "餐饮部9", count: 123456, ex: 123, api: 456 }
      ]
    };
  }
};
</script>
<style lang="scss">
.data-map__details_scroll-card {
  width: 250px;
  box-sizing: border-box;
  overflow: hidden;
  &_top {
    position: absolute;
    top: 0;
    width: 100%;
    height: 50px;
    background-image: url(../../../assets/DataMonitor/scroll-top.png);
    background-position: top right;
    background-repeat: no-repeat;
  }
  &_arrow {
    position: absolute;
    top: 0;
    width: 100%;
    height: 50px;
    background-image: url(../../../assets/DataMonitor/arrow.png);
    background-position: top right;
    background-repeat: no-repeat;
    z-index: 2;
  }
  &_center {
    position: absolute;
    top: 50px;
    bottom: 50px;
    width: 100%;
    box-sizing: border-box;
    border-right: 1px solid rgba(41, 193, 204, 0.4);
    background: linear-gradient(
      270deg,
      rgba(0, 9, 77, 0.7) 0%,
      rgba(11, 2, 52, 0.31) 92%,
      rgba(0, 9, 77, 0.06) 99%
    );
  }
  &_bottom {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 50px;
    background-image: url(../../../assets/DataMonitor/scroll-bottom.png);
    background-position: top right;
    background-repeat: no-repeat;
  }
  &_wrap {
    position: absolute;
    top: 0;
    right: 0;
    list-style: none;
    padding: 0;
    margin: 0;
    // height: 2520px;
    animation: movee 20s linear 0s infinite normal;
    &:hover {
      animation-play-state: paused;
      li {
        opacity: 0.5;
      }
    }
    li {
      width: 208px;
      height: 120px;
      text-align: center;
      line-height: 90px;
      padding: 15px 0;
      box-sizing: border-box;
      transition: all 0.2s;
      transform-origin: right;
      cursor: pointer;
      div {
        width: 100%;
        height: 100%;
        background-image: url(../../../assets/DataMonitor/scroll-card.png);
        background-repeat: no-repeat;
        color: white;
        padding: 15px 0;
        box-sizing: border-box;
        p {
          // width: 100%;
          padding: 0 15px;
          height: 20px;
          line-height: 20px;
          font-size: 12px;
          color: rgba(41, 193, 204, 1);
          overflow: hidden;
          > b {
            float: left;
          }
          > span {
            float: right;
          }
          &:nth-child(1) {
            > span {
              color: rgba(255, 255, 255, 0.3);
            }
          }
        }
      }
      &:hover {
        transform: scale(1.1, 1.1);
        opacity: 1;
      }
    }
  }
}
@keyframes movee {
  from {
    margin-top: -1080px;
  }
  to {
    margin-top: 0;
  }
}
</style>
