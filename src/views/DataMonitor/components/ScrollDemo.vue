<template>
  <div class="scroll-demo">
    <!-- <div class="test1">
      <ul>
        <li v-for="item in 4" :key="item">{{item}}</li>
        <li>1</li>
        <li>2</li>
      </ul>
    </div> -->
    <div class="test2">
      <ul>
        <li v-for="item in 8" :key="item">{{item}}</li>
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: "ScrollDemo"
};
</script>
<style lang="scss">
.scroll-demo {
  .test1 {
    margin: 20px auto;
    width: 520px;
    height: 140px;
    box-sizing: border-box;
    overflow: hidden;
    ul {
      list-style: none;
      padding: 0;
      margin: 0;
      width: 2600px;
      animation: move 10s linear 0s infinite normal;
      &:hover {
        animation-play-state: paused;
        li {
          opacity: 0.5;
        }
      }
      li {
        float: left;
        width: 260px;
        height: 140px;
        text-align: center;
        line-height: 140px;
        &:nth-child(1) {
          background: #d9d9f3;
        }
        &:nth-child(2) {
          background: #f4f0e6;
        }
        &:nth-child(3) {
          background: #ceefe4;
        }
        &:nth-child(4) {
          background: #9dd3a8;
        }
        &:nth-child(5) {
          background: #d9d9f3;
        }
        &:nth-child(6) {
          background: #f4f0e6;
        }
        &:hover {
          opacity: 1;
        }
      }
    }
  }
  .test2 {
    margin: 20px auto;
    width: 260px;
    height: 700px;
    box-sizing: border-box;
    overflow: hidden;
    ul {
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
        width: 260px;
        height: 140px;
        text-align: center;
        line-height: 140px;
        &:nth-child(2n-1) {
          background: #d9d9f3;
        }
        &:nth-child(2n) {
          background: #f4f0e6;
        }
        &:hover {
          opacity: 1;
        }
      }
    }
  }
  @keyframes move {
    from {
      margin-left: 0;
    }
    to {
      margin-left: -1040px;
    }
  }
  @keyframes movee {
    from {
      margin-top: -1120px;
    }
    to {
      margin-top: 0;
    }
  }
}
</style>
