<template>
  <div class="music">
    <audio id="myAudioPlay" preload :src="curMusic.url"></audio>
    <p class="title">{{ curMusic.name }}--{{ curMusic.author }}</p>
    <div class="progress">
      <el-progress
        :percentage="percentage"
        :color="customColor"
        :show-text="false"
      ></el-progress>
    </div>
    <div class="icon">
      <div class="back" @click="up">
        <img src="../assets/music/up.png" alt="" />
      </div>
      <div class="back" @click="playOrPause">
        <img id="playBtn" src="../assets/music/pause.png" alt="" />
      </div>
      <div class="back" @click="down">
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
      <template v-for="(item, index) in music">
        <p :key="index" @click="clickToPlay(item)"><i class="el-icon-video-play"></i> {{ item.name }}</p>
      </template>
    </div>
  </div>
</template>

<script>
import { get } from "../utility/http";
import server from "../utility/env";
import pause from "../assets/music/pause.png";
import play from "../assets/music/play.png";
export default {
  data() {
    return {
      music: [],
      curMusic: {},
      curIndex: 0,
      percentage: 20,
      customColor: "#409eff",
      listIsOpen: false,
      vol: 50,
      playState: false,
    };
  },
  created() {
    this.getMusic();
  },
  methods: {
    getMusic() {
      get("/api/Music/GetMusic").then((res) => {
          res.forEach((element) => {
            element.url = server + "/upload/" + element.url;
          });
          this.music = res;
          this.curMusic = this.music[this.curIndex];    
      });
    },
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
    playOrPause() {
      if (this.playState === true) {
        this.playState = false;
        this.pause();
      } else {
        this.playState = true;
        this.play();
      }
    },
    play() {
      document.getElementById("myAudioPlay").play();
      document.getElementById("playBtn").src = play;
    },
    pause() {
      document.getElementById("myAudioPlay").pause();
      document.getElementById("playBtn").src = pause;
    },
    up() {
      this.curIndex = (this.curIndex - 1 + this.music.length) % this.music.length;
      this.curMusic = this.music[this.curIndex];
      this.playState = true;
      document.getElementById("myAudioPlay").addEventListener("canplay", function () {
        this.play();
        document.getElementById("playBtn").src = play;
      });
    },
    down() {
      this.curIndex = (this.curIndex + 1) % this.music.length;
      this.curMusic = this.music[this.curIndex];
      this.playState = true;
      document.getElementById("myAudioPlay").addEventListener("canplay", function () {
        this.play();
        document.getElementById("playBtn").src = play;
      });
    },
    clickToPlay(item){
      this.curMusic=item
      document.getElementById("myAudioPlay").addEventListener("canplay", function () {
        this.play();
        document.getElementById("playBtn").src = play;
      });
    },
    changeVol() {
      let play = document.getElementById("myAudioPlay");
      play.volume = this.vol / 100;
    },
  },
};
</script>

<style scoped>
.music {
  width: 450px;
  height: 130px;
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
.list p:hover{
 color: #409EFF;
}
</style>
