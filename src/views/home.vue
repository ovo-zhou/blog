<template>
  <div class="home">
    <el-row>
      <el-col :span="14">
        <div class="center">
          <div class="bar">
            <ul>
              <li><router-link to="/home/cover"> 封面</router-link></li>
              <li><router-link to="/home/preface"> 序言</router-link></li>
              <li><router-link to="/home/catalog"> 目录</router-link></li>
              <li><router-link to="/home/copyright"> 版权</router-link></li>
              <li><router-link to="/home/record"> 日志</router-link></li>
              <li><router-link to="/home/message"> 留言</router-link></li>
            </ul>
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

export default {
  components: {
    weather,
    music,
    helplink,
  },
  methods: {},
};
</script>

<style scoped>
.home {
  width: 1200px;
  margin: 30px auto;
}
.center {
  width: 650px;
  height: 800px;
}

.bar {
  width: 100px;
  height: 800px;
  float: left;
  /* background: aquamarine; */
}
.content {
  width: 550px;
  height: 800px;
  float: right;
  /* background: aquamarine; */
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
ul {
  list-style: none;
}
ul > li {
  line-height: 50px;
  font-size: 30px;
  margin-top: 60px;
  text-align: center;
}
a {
  text-decoration: none;
  color: black;
}
.router-link-active {
  color: #409eff;
}
</style>
