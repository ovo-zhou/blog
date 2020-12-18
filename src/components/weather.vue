<template>
  <div class="weather">
    <el-row>
      <el-col :span="12">
        <div class="today">
          <h2>{{ weather.data[0].week }}</h2>
          <p>{{ weather.data[0].date }}</p>
          <p><i class="el-icon-map-location"></i> {{ weather.city }}</p>
          <img
            :src="require('../assets/cake/' + weather.data[0].wea_img + '.png')"
            alt=""
          />
          <h1>{{ weather.data[0].tem }}</h1>
          <h3>{{ weather.data[0].wea }}</h3>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="next">
          <div class="param">
            <span class="param_name">空气质量</span>
            <span class="data">{{weather.data[0].air}}</span>
          </div>
          <div class="param">
            <span class="param_name">湿度</span>
            <span class="data">{{weather.data[0].humidity}}%</span>
          </div>
          <div class="param">
            <span class="param_name">风速</span>
            <span class="data">{{weather.data[0].win_speed}}</span>
          </div>
          <div class="nextday">
            <div class="nextday_item">
              <img :src="require('../assets/cake/' + weather.data[1].wea_img + '.png')" alt="" />
              <p>{{ weather.data[1].week }}</p>
              <p>{{ weather.data[1].tem }}</p>
            </div>
            <div class="nextday_item">
              <img :src="require('../assets/cake/' + weather.data[2].wea_img + '.png')" alt="" />
              <p>{{ weather.data[2].week }}</p>
              <p>{{ weather.data[2].tem }}</p>
            </div>
            <div class="nextday_item">
              <img :src="require('../assets/cake/' + weather.data[3].wea_img + '.png')" alt="" />
              <p>{{ weather.data[3].week }}</p>
              <p>{{ weather.data[3].tem }}</p>
            </div>
          </div>
          <div class="btn" @click="changeCity"><i class="el-icon-map-location"></i>更改位置</div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { get } from "../utility/http";
export default {
  data() {
    return {
    //下面给的默认值，如果不给会报错，在created中weather会被覆盖
      weather: {
        data: [
          {
            week: "星期五",
            wea: "晴",
            wea_img: "qing",
            tem: "11℃",
          },
          {
            week: "星期五",
            wea: "晴",
            wea_img: "qing",
            tem: "11℃",
          },
          {
            week: "星期五",
            wea: "晴",
            wea_img: "qing",
            tem: "11℃",
          },
          {
            week: "星期五",
            wea: "晴",
            wea_img: "qing",
            tem: "11℃",
          },
        ],
      },
    };
  },
  created() {
    get("/api/Others/weather", { cityName: "武汉" }).then((res) => {
      console.log(res);
      if (res.status === 200) {
        this.weather = res.data;
      }
    });
  },
  methods:{
      changeCity(){
           this.$message({
          message: '功能等待完善',
          type: 'warning'
        });
      }
  }
};
</script>
<style scoped>
.weather {
  background: #e8ebf1;
  width: 450px;
  height: 250px;
  overflow: hidden;
  margin-bottom: 50px;
}
.today {
  /* background-image: linear-gradient(to bottom right, #4df2f8, #5460e6); */
  height: 250px;

  /* color: white; */
  padding-left: 25px;
  padding-top: 15px;
}
.today img {
  width: 50px;
  margin-top: 30px;
}
.today h1 {
  font-size: 40px;
}
.today h3 {
  font-size: 0.8em;
}
.next {
  /* background: blueviolet; */
  height: 250px;
  /* color: white; */
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 20px;
}
.param {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.nextday {
  margin-top: 20px;
}
.nextday_item {
  width: 60px;
  height: 100px;
  /* background: red; */
  display: inline-block;

}
.nextday_item img {
  width: 30px;
  height: 30px;
  margin-left: 15px;
}
.nextday_item p {
  text-align: center;
  margin-top: 5px;
}
.btn {
  width: 100%;
  height: 25px;
  border-radius: 15px;
  /* background-image: linear-gradient(to right, #85eef3, #5960e9); */
  margin-top: 5px;
  text-align: center;
  line-height: 25px;
  font-size: 10px;
  cursor: pointer;
}
</style>
