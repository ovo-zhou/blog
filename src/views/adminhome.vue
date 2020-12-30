<template>
  <el-container>
    <el-header>
      <h2 class="back" @click="backHome">回博客</h2>
      <div class="header_right">
        <img :src="user.userAvatarWithHost" alt="" />
        <el-dropdown>
          <span class="el-dropdown-link">
            {{ user.nickName }}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item><p @click="information">个人资料</p></el-dropdown-item>
            <el-dropdown-item><p @click="updatePassword">修改密码</p></el-dropdown-item>
            <el-dropdown-item><p @click="exitLogin">退出登录</p></el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-header>
    <el-container>
      <el-aside width="150px">
        <div class="menu-item">
          <router-link to="/admin/blogwrite">文章发布</router-link>
        </div>
        <div class="menu-item">
          <router-link to="/admin/resourse">资源管理</router-link>
        </div>
        <div class="menu-item"><router-link to="#">留言查看</router-link></div>
      </el-aside>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
    <el-dialog title="个人信息" :visible.sync="dialogVisible" width="20%">
      <div class="information" v-if="state">
        <img :src="user.userAvatarWithHost" alt="" />
        <p>{{ user.userName }}</p>
        <p>{{ user.nickName }}</p>
        <p><el-link type="primary" @click="editUser">编辑</el-link></p>
      </div>
      <div v-else>
        <el-upload
          class="avatar-uploader"
          :action="imgUploadUrl"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <el-input v-model="user.nickName" placeholder="请输入昵称"></el-input>
        <p><el-link type="primary" @click="updateUser">提交</el-link></p>
      </div>
    </el-dialog>
    <el-dialog title="个人信息" :visible.sync="dialogVisible1" width="20%">
      <el-input v-model="oldPassword" placeholder="请输入原密码"></el-input>
      <el-input v-model="newPassword" placeholder="请输入新密码"></el-input>
      <el-input v-model="checkPassword" placeholder="请输入再次输入新密码"></el-input>
      <el-link type="primary" @click="updatePawwword">修改</el-link>
      <el-link type="success" @click="canel">取消</el-link>
    </el-dialog>
  </el-container>
</template>
<script>
import { get, post, put } from "../utility/http";
import server from "../utility/env";
export default {
  data() {
    return {
      dialogVisible: false,
      dialogVisible1: false,
      user: {
        userId: 0,
        userName: "",
        nickName: "",
        password: "",
        userAvatar: "",
        userAvatarWithHost: "",
      },
      oldPassword: "",
      newPassword: "",
      checkPassword: "",
      state: true,
      imgUploadUrl: server + "/api/File/FileUpload",
      imageUrl: "",
    };
  },
  created() {
    this.getUser();
  },
  methods: {
    updatePawwword() {
      if (
        this.oldPassword === "" ||
        this.newPassword === "" ||
        this.checkPassword === ""
      ) {
        this.$message.error("请将信息填写完整");
        return;
      }
      if (this.newPassword != this.checkPassword) {
        this.$message.error("两次输入的密码不对");
        return;
      }
      post(
        "/api/User/CheckPassword?id=" + this.user.userId + "&password=" + this.oldPassword
      ).then((res) => {
        if (res.check == true) {
          put(
            "/api/User/UpdatePassword?id=" +
              this.user.userId +
              "&password=" +
              this.newPassword
          ).then(() => {
            this.oldPassword = "";
            this.newPassword = "";
            this.checkPassword = "";
            this.dialogVisible1 = false;
            this.$message({
              message: "密码修改成功，请重新登录",
              type: "success",
            });
            this.$router.replace("/login");
          });
        } else {
          this.$message.error("原密码不对哦");
        }
      });
    },
    canel() {
      this.oldPassword = "";
      this.newPassword = "";
      this.checkPassword = "";
      this.dialogVisible1 = false;
    },
    updatePassword() {
      this.dialogVisible1 = true;
    },
    handleAvatarSuccess(res) {
      this.imageUrl = server + "/upload/" + res;
      this.user.userAvatar = res;
    },
    updateUser() {
      put("/api/User/updateUser", this.user).then(() => {
        this.state = true;
        this.getUser();
      });
    },
    editUser() {
      this.state = false;
    },
    getUser() {
      var userName = "";
      var user = sessionStorage.getItem("user");
      if (user != null) {
        userName = JSON.parse(user).userName;
      }

      get("/getUser", { userName: userName }).then((res) => {
        this.user.userId = res.userId;
        this.user.userName = res.userName;
        this.user.nickName = res.nickName;
        this.user.userAvatar = res.userAvatar;
        this.user.userAvatarWithHost = server + "/upload/" + res.userAvatar;
      });
    },
    backHome() {
      this.$router.push("/");
    },
    exitLogin() {
      this.$router.push("/");
    },
    information() {
      this.dialogVisible = true;
    },
  },
};
</script>
<style scoped>
.el-header {
  background: #2a68c9;
  position: fixed;
  width: 100%;
  z-index: 100;
}
.el-aside {
  background: #2a68c9;
  position: fixed;
  z-index: 10;
  overflow: auto;
  height: 100%;
  padding-top: 60px;
}
.el-main {
  margin-top: 60px;
  margin-left: 150px;
  /* background: blue; */
}
.back {
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
.el-dropdown-link {
  line-height: 60px;
  color: aliceblue;
}
.header_right > p:hover .dropdown-content {
  display: block;
  z-index: 20;
}
.menu-item {
  text-align: center;
}
a {
  color: white;
  text-decoration: none;
  line-height: 50px;
}
.information > img {
  width: 200px;
  height: 200px;
  display: block;
  margin: 0px auto;
}
.information > p {
  font-size: 26px;
  line-height: 40px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
</style>
