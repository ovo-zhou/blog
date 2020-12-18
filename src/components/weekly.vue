<template>
  <div class="weekly">
    <el-carousel :interval="4000" type="card" height="250px" indicator-position="none">
      <el-carousel-item v-for="(src, index) in srcList" :key="index">
        <el-image :src="src" fit="scale-down"></el-image>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  data() {
    return {
      srcList: [
        "http://cn.bing.com/th?id=OHR.SleepingArcticFox_ZH-CN8743925021_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp",
        "http://cn.bing.com/th?id=OHR.QueenoftheAndes_ZH-CN9019108680_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp",
        "http://cn.bing.com/th?id=OHR.BractCloseup_ZH-CN9096611979_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp",
        "http://cn.bing.com/th?id=OHR.PolarExpress_ZH-CN9522496479_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp",
        "http://cn.bing.com/th?id=OHR.PineGrosbeak_ZH-CN9629000282_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp",
        "http://cn.bing.com/th?id=OHR.ElbeBastei_ZH-CN9708654240_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp",
        "http://cn.bing.com/th?id=OHR.MunnarMist_ZH-CN8816703625_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp",
        "http://cn.bing.com/th?id=OHR.NarniaForest_ZH-CN8466850438_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp",
      ],
    };
  },
};
</script>

<style scoped>
.weekly{
  width: 100%;
  height: 250px;
margin-top: 50px;
margin-bottom: 50px;
}
</style>
