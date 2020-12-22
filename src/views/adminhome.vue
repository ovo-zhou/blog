<template>
  <el-container>
    <el-header>
      <h2 class="back" @click="backHome">回博客</h2>
      <div class="header_right">
        <img src="../assets/tx.png" alt="">
        <p>第一梦<img src="../assets/dropdown.png" alt="" class="icon">
          <ul class="dropdown-content">
            <li>个人资料</li>
            <li>退出登录</li>
          </ul>
        </p>
      </div>
    </el-header>
    <el-container>
      <el-aside width="150px">
      <div class="menu-item"><router-link to="/admin/blogwrite">文章发布</router-link></div>
      <div class="menu-item"><router-link to="/admin/resourse">资源管理</router-link></div>
      <div class="menu-item"><router-link to="#">留言查看</router-link></div>
      </el-aside>
      <el-main>
         <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  methods:{
    backHome(){
      this.$router.push("/")
    }
  }
};
</script>
<style scoped>
.el-header{
  background: #2a68c9;
  position: fixed;
  width: 100%;
  z-index: 100;
}
.el-aside{
  background: #2a68c9;
  position: fixed;
  z-index: 10;
  overflow: auto;
  height: 100%;
  padding-top: 60px;
}
.el-main{
  margin-top: 60px;
  margin-left: 150px;
  /* background: blue; */
}
.back{
  line-height: 60px;
  color: white;
  cursor: pointer;
  display: inline-block;
}
.header_right {
  float: right;
  display: flex;
  flex-direction: row;
}
.header_right > img {
  width: 40px;
  height: 40px;
  border-radius: 20px;
  margin-top: 10px;
  margin-right: 20px;
}
.header_right > p {

  line-height: 60px;
  margin-right: 20px;
  cursor: pointer;
}
.icon {
  width: 12px;
}
.dropdown-content {
  display: none;
  position: absolute;
  list-style: none;
  background-color: rgb(0, 0, 0, 0.5);
  padding-left: 5px;
  padding-right: 5px;
  border-radius: 0px 0px 5px 5px;
}
.dropdown-content > li {
  line-height: 30px;
  cursor: pointer;
}
.header_right > p:hover .dropdown-content {
  display: block;
  z-index: 20;
}
.menu-item{
  text-align: center;
}
a {
  color: white;
  text-decoration: none;
  line-height: 50px;
}

</style>
