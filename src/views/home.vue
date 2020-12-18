<template>
  <div class="home">
    <weekly />
    <el-row>
      <el-col :span="14">
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
          <div class="content">
            <router-view />
          </div>
        </div>
      </el-col>
      <el-col :span="10">
        <div>
          <weather />
          <helplink />
          <music />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import weather from "../components/weather";
import music from "../components/music";
import helplink from "../components/link";
import weekly from "../components/weekly";
export default {
  components: {
    weather,
    music,
    helplink,
    weekly,
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
.home {
  /* background: rgb(17, 200, 233); */
  width: 1200px;
  margin: 0px auto;
}
.header {
  background: #09a5be;
  color: white;
}
.header p {
  line-height: 50px;
  text-align: center;
  margin-bottom: 20px;
}
.center {
  width: 650px;
  height: 800px;
  float: left;
}

.bar {
  width: 100px;
  height: 800px;
  float: left;
}
.content {
  width: 550px;
  height: 800px;
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
