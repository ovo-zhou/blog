<template>
  <div class="admin">
    <div class="header">
      <div class="header_right">
        <img src="../assets/tx.png" alt="">
        <p>第一梦<img src="../assets/dropdown.png" alt="" class="icon">
          <ul class="dropdown-content">
            <li>个人资料</li>
            <li>退出登录</li>
          </ul>
        </p>
      </div>
    </div>
    <div class="menu">
      <div><router-link to="/admin/blogwrite">文章发布</router-link></div>
      <div><router-link to="/admin/resourse">资源管理</router-link></div>
      <div><router-link to="#">留言查看</router-link></div>
    </div>
    <div class="main">
      <router-view/>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style scoped>
.admin {
  position: relative;
   width: 1600px;
  height: 800px;
margin: 50px auto;
}
.header {
  height: 50px;
  width: 100%;
  background-color:#222324;
  color: white;
}
.header_right {
  float: right;
  display: flex;
  flex-direction: row;
}
.header_right>img{
  width: 40px;
  height: 40px;
  border-radius: 20px;
  margin-top: 5px;
  margin-right: 20px;
}
.header_right>p{
/* background: chocolate; */
line-height: 50px;
margin-right: 20px;
cursor: pointer;
}
.icon{
  width: 12px;
}
.dropdown-content{
  display: none;
  position: absolute;
  list-style: none;
  background-color:rgb(0,0,0,0.5);
  padding-left: 5px;
  padding-right: 5px;
  border-radius: 0px 0px 5px 5px;
}
.dropdown-content>li{
  line-height: 30px;
  cursor: pointer;
}
.header_right>p:hover .dropdown-content{
  display: block;
  z-index: 20;
}
.menu {
  width: 150px;
height: 750px;
  background-color:#222324;
  color: white;
}
.menu>div{
  height: 50px;
  text-align: center;
}
a{
  color: white;
  text-decoration: none;
  line-height: 50px;
}
.main {
  position: absolute;
  top: 50px;
  left: 150px;
    width: 1450px;
  height: 750px;
  z-index: 10;
  overflow: auto;
}
</style>