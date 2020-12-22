<template>
  <div class="error">
    <p>404</p>
    <img src="../assets/error.png" alt="" />
    <el-link type="primary" @click="toHome">
        <p class="text">首页</p>
    </el-link>
  </div>
</template>

<script>
export default {
    methods:{
        toHome(){
            this.$router.push("/")
        }
    }
};
</script>

<style scoped>
.error {
  /* background: blue; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.error>p {
  font-size: 100px;
  color: #409eff;
}
.text{
  font-size: 40px;
}
</style>
