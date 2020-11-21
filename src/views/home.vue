<template>
  <div class="home">
    <div class="left">左</div>
    <div class="center">
      <div class="bar">
        <div style="widtd:100%;height:90px;"></div>
        <p @click="toCover">封面</p>
        <p @click="toPreface">序言</p>
        <p @click="toCatalog">目录</p>
        <p @click="toCopyright">版权</p>
        <p @click="toLastpage">尾页</p>
        <p @click="toMessage">留言</p>
        <p></p>
      </div>
      <div class="content"><router-view/></div>
    </div>
    <div class="right">右</div>
  </div>
</template>

<script>
export default {
  methods:{
    toCover(){
      this.$router.push("/home/cover")
    },
    toPreface(){
      this.$router.push("/home/preface")   
    },
    toCatalog(){
      this.$router.push("/home/catalog")   
    },
    toCopyright(){
      this.$router.push("/home/copyright")   
    },
    toLastpage(){
      this.$router.push("/home/lastpage")   
    },
    toMessage(){
      this.$router.push("/home/message")   
    },
  }
};
</script>

<style scoped>
.left{
  width: 500px;
  height: 800px;
  float: left;
  background: burlywood;
}
.center{
  width: 600px;
  height: 800px;
  float: left;
  /* background: chartreuse; */
}
.right{
  width: 500px;
  height: 800px;
  float: left;
  background: coral;
}
.bar{
  width: 80px;
  height: 800px;
  float: left;
  /* background: crimson; */
  background: #35597b;
}
.content{
  width: 520px;
  height: 800px;
  /* background: cyan; */
  background: white;
  float: right;
}
p{
  width: 80px;
  text-align: center;
  line-height: 100px;
  font-size: 20px;
  font-weight: 800;
  cursor: pointer;
}
</style>