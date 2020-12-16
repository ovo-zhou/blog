<template>
  <div class="home">
    <div class="left">
      <weather/>
      <music/>
    </div>
    <div class="center">
      <div class="bar">
        <div style="widtd: 100%; height: 90px"></div>
        <p @click="toCover">封面</p>
        <p @click="toPreface">序言</p>
        <p @click="toCatalog">目录</p>
        <p @click="toCopyright">版权</p>
        <p @click="toLastpage">尾页</p>
        <p @click="toMessage">留言</p>
      </div>
      <div class="content"><router-view /></div>
    </div>
    <div class="right"><helplink/></div>
  </div>
</template>

<script>
import weather from '../components/weather'
import music from '../components/music'
import helplink from '../components/link'
export default {
  components:{
    weather,
    music,
    helplink
  },
  methods: {
    toCover() {
      this.$router.push("/home/cover");
    },
    toPreface() {
      this.$router.push("/home/preface");
    },
    toCatalog() {
      this.$router.push("/home/catalog");
    },
    toCopyright() {
      this.$router.push("/home/copyright");
    },
    toLastpage() {
      this.$router.push("/home/lastpage");
    },
    toMessage() {
      this.$router.push("/home/message");
    },
  },
};
</script>

<style scoped>
.left {
  width: 500px;
  height: 800px;
  float: left;
  /* background: burlywood; */
}
.center {
  width: 600px;
  height: 800px;
  float: left;
  /* background: chartreuse; */
}
.right {
  width: 500px;
  height: 800px;
  float: left;
  /* background: coral; */
}
.bar {
  width: 80px;
  height: 800px;
  float: left;
  /* background: crimson; */
  background: #35597b;
}
.content {
  width: 520px;
  height: 800px;
  /* background: cyan; */
  background: white;
  float: right;
}
.bar p {
  width: 80px;
  text-align: center;
  line-height: 100px;
  font-size: 20px;
  font-weight: 800;
  cursor: pointer;
}
</style>
