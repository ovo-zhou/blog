<template>
  <div class="link">
    <el-carousel height="250px">

      <!-- <el-carousel-item>
        <ul>
          <li>
            <div class="item">
              <img src="../assets/icon.png" alt="银河系知名弹幕网站" />
              <p>bilibili</p>
            </div>
          </li>
          <li>
            <div class="item">
              <img src="../assets/icon.png" alt="" />
              <p>bilibili</p>
            </div>
          </li>
          <li>
            <div class="item">
              <img src="../assets/icon.png" alt="" />
              <p>bilibili</p>
            </div>
          </li>
          <li>
            <div class="item">
              <img src="../assets/icon.png" alt="" />
              <p>bilibili</p>
            </div>
          </li>
          <li>
            <div class="item">
              <img src="../assets/icon.png" alt="" />
              <p>bilibili</p>
            </div>
          </li>
          <li>
            <div class="item">
              <img src="../assets/icon.png" alt="" />
              <p>bilibili</p>
            </div>
          </li>
          <li>
            <div class="item">
              <img src="../assets/icon.png" alt="" />
              <p>bilibili</p>
            </div>
          </li>
          <li>
            <div class="item">
              <img src="../assets/icon.png" alt="" />
              <p>bilibili</p>
            </div>
          </li>
        </ul>
      </el-carousel-item> -->
    
    </el-carousel>
  </div>
</template>
<script>
import {get} from '../utility/http'
import server from '../utility/env'
export default {
  data(){
    return{
      links:[],
      total:0,
      page:0
    }
  },
  created(){
    this.GetLink()
  },
  computed:{
    getPage(){
      return this.total/8
    }
  },
  methods:{
    GetLink(){
      get("/api/Link/GetLink").then(res=>{
        if(res.status===200){
          res.data.forEach(element => {
            element.linkIcon=server+"/upload/"+element.linkIcon
          });
          this.links=res.data
          this.page=Math.ceil(this.links.length/8);
          this.total=this.links.length
        }
      })
    }
  },
};
</script>

<style scoped>
.link {
  /* background: #dde1e6; */
  width: 450px;
  height: 250px;
  margin-left: 25px;
  margin-top: 50px;
  border-radius: 10px;
  overflow: hidden;
}
ul > li {
  display: inline-block;
  margin-left: 25px;
  margin-top: 10px;
}
img {
  width: 80px;
  height: 80px;
  border-radius: 40px;
}
.item {
  /* background: burlywood; */
}
.item p {
  text-align: center;
  overflow: hidden;
	text-overflow:ellipsis;
	white-space: nowrap;
}
</style>
