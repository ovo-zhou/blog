<template>
  <div class="login">
    <el-form :model="user" class="demo-form-inline" label-width="80px" size="mini">
      <el-form-item label="用户名">
        <el-input v-model="user.userName" placeholder="用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="user.password" placeholder="密码" show-password></el-input>
      </el-form-item>
      <el-form-item>
        <el-link type="primary" @click="onSubmit">登录</el-link>
        <el-link type="success" @click="reset">重置</el-link>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { post } from "../utility/http";
export default {
  data() {
    return {
      user: {
        userId: 0,
        userName: "",
        password: "",
      },
    };
  },
  methods: {
    onSubmit() {
      if (this.user.userName === "" || this.user.password === "") {
        this.$message.error("你在试图绕过登录？");
        return;
      }
      post("/api/Authentication/Login", this.user).then((res) => {
        let user = {
          userName: "",
          token: "",
          loginState: true,
        };
        user.userName = this.user.userName;
        user.token = res;
        sessionStorage.setItem("user", JSON.stringify(user));
        this.$router.push("/admin");
      });
    },
    reset() {
      this.user.userName = "";
      this.user.password = "";
    },
  },
};
</script>

<style scoped>
.login {
  width: 300px;
  height: 150px;
  /* background: chartreuse; */
  position: fixed;
  top: 40%;
  left: 50%;
  margin-left: -150px;
  margin-top: -75px;
}
.el-link {
  margin-right: 20px;
}
</style>
