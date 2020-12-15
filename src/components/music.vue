<template>
  <div class="music">
    <audio id="play" preload src="http://localhost:5000/upload/123.mp3"></audio>
    <p class="title">霸王别姬--张国荣</p>
    <div class="progress">
      <el-progress
        :percentage="percentage"
        :color="customColor"
        :show-text="false"
      ></el-progress>
    </div>
    <div class="icon">
      <div class="back">
        <img src="../assets/music/up.png" alt="" />
      </div>
      <div class="back" @click="play">
        <img src="../assets/music/play.png" alt="" />
      </div>
      <div class="back">
        <img src="../assets/music/down.png" alt="" />
      </div>
      <div class="other_back" @click="openList">
        <img src="../assets/music/list.png" alt="" />
      </div>
      <div class="slider">
        <el-slider v-model="vol" @input="changeVol"> </el-slider>
      </div>
    </div>
    <div class="list" id="list">
      <p><i class="el-icon-video-play"></i> 第一首</p>
      <p><i class="el-icon-video-play"></i> 第一首</p>
      <p><i class="el-icon-video-play"></i> 第一首</p>
      <p><i class="el-icon-video-play"></i> 第一首</p>
      <p><i class="el-icon-video-play"></i> 第一首</p>
      <p><i class="el-icon-video-play"></i> 第一首</p>
      <p><i class="el-icon-video-play"></i> 第一首</p>
      <p><i class="el-icon-video-play"></i> 第一首</p>
      <p><i class="el-icon-video-play"></i> 第一首</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      percentage: 20,
      customColor: "#409eff",
      listIsOpen: false,
      vol: 50,
    };
  },
  methods: {
    openList() {
      let list = document.getElementById("list");
      if (this.listIsOpen) {
        this.listIsOpen = false;
        list.style.display = "none";
      } else {
        this.listIsOpen = true;
        list.style.display = "block";
      }
    },
    play() {
      let play = document.getElementById("play");
      play.play();
    },
    changeVol() {
    //   console.log(this.vol);
      let play = document.getElementById("play");
      play.volume = this.vol / 100;
    },
  },
};
</script>

<style scoped>
.music {
  background-image: url("../assets/music/back.jpg");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  width: 450px;
  height: 130px;
  margin-left: 25px;
  margin-top: 50px;
  border-radius: 10px;
}
.title {
  margin-left: 25px;
  padding-top: 15px;
}
.progress {
  margin-left: 25px;
  width: 400px;
  margin-top: 10px;
}
.icon {
  margin-left: 25px;
  margin-top: 20px;
}
.back {
  width: 50px;
  height: 50px;
  background: #404040;
  display: inline-block;
  border-radius: 25px;
  margin-right: 20px;
}
.slider {
  height: 26px;
  width: 140px;
  display: inline-block;
  /* background: yellowgreen; */
}
.back img {
  width: 30px;
  height: 30px;
  margin-left: 10px;
  margin-top: 10px;
}
.other_back {
  width: 30px;
  height: 30px;
  background: #404040;
  display: inline-block;
  border-radius: 15px;
  margin-right: 20px;
}
.other_back img {
  width: 15px;
  height: 15px;
  margin-left: 7px;
  margin-top: 7px;
}
.list {
  background: white;
  display: none;
  position: absolute;
  margin-top: 10px;
  width: 450px;
  height: 180px;
  overflow: auto;
}
.list p {
  margin-left: 25px;
  cursor: pointer;
  line-height: 30px;
}
</style>
