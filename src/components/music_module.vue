<template>
  <div>
    <h3>音乐管理</h3>
    <p class="add" @click="addMusic">添加音乐</p>
    <div class="music">
      <template v-for="(item, index) in music">
        <div :key="index" class="music-item">
          <el-row>
            <el-col :span="21">
              <p class="music-title">{{ item.name }}--{{ item.author }}</p>
            </el-col>
            <el-col :span="3">
              <el-dropdown>
                <img class="icon" src="../assets/more.png" />
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>
                    <p @click="editMusic(item)">编辑</p>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <p @click="deleteMusic(item.musicId)">删除</p>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
          </el-row>
        </div>
      </template>
    </div>
    <!-- 音乐编辑 -->
    <el-dialog
      title="编辑"
      :visible.sync="dialogFormVisible"
      :modal="false"
      width="30%"
      top="30vh"
    >
      <el-form ref="form" :model="updateMusic" label-width="80px">
        <el-form-item label="音乐名">
          <el-input v-model="updateMusic.name"></el-input>
        </el-form-item>
        <el-form-item label="歌手">
          <el-input v-model="updateMusic.author"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">修改</el-button>
          <el-button @click="dialogFormVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 音乐上传 -->
    <el-dialog
      title="添加"
      :visible.sync="dialogFormVisible1"
      :modal="false"
      width="30%"
      top="30vh"
    >
      <el-form ref="form" :model="updateMusic" label-width="80px">
        <el-form-item label="音乐名">
          <el-input v-model="updateMusic.name"></el-input>
        </el-form-item>
        <el-form-item label="歌手">
          <el-input v-model="updateMusic.author"></el-input>
        </el-form-item>
        <el-form-item label="文件">
          <el-upload
            class="upload-demo"
            action="http://localhost:5000/api/File/FileUpload"
            :on-success="success"
            :limit="1"
            :on-remove="remove"
            accept=".mp3"
            :file-list="fileList"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传mp3文件</div>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="uploadMusic">上传</el-button>
          <el-button @click="dialogFormVisible1 = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
// import server from "../utility/env";
import { del, get, post, put } from "../utility/http";
export default {
  data() {
    return {
      fileList: [],
      music: [],

      updateMusic: {
        musicId: 0,
        name: "",
        url: "",
        author: "",
      },

      dialogFormVisible: false,
      dialogFormVisible1: false,
    };
  },
  created() {
    this.getMusic();
  },
  methods: {
    uploadMusic() {
      if (this.updateMusic.name == "") {
        this.$message.error("名字不能为空");
        return;
      }
      if (this.updateMusic.author === "") {
        this.$message.error("歌手不能为空");
        return;
      }
      if (this.updateMusic.url === "") {
        this.$message.error("请上传歌曲");
        return;
      }
      post("/api/Music/CreateMusic", this.updateMusic).then(() => {
        this.$message({
          message: "上传成功",
          type: "success",
        });
        this.updateMusic.name = "";
        this.updateMusic.url = "";
        this.updateMusic.author = "";
        this.fileList = [];
        this.getMusic();
      });
    },
    remove() {
      this.updateMusic.url = "";
    },
    success(res) {
      console.log(res);
      this.updateMusic.url = res;
    },
    addMusic() {
      this.dialogFormVisible1 = true;
    },
    getMusic() {
      get("/api/Music/GetMusic").then((res) => {
        this.music = res;
      });
    },
    editMusic(item) {
      this.updateMusic.musicId = item.musicId;
      this.updateMusic.name = item.name;
      this.updateMusic.author = item.author;
      this.updateMusic.url = item.url;
      this.dialogFormVisible = true;
    },
    onSubmit() {
      if (this.updateMusic.name === "") {
        this.$message.error("音乐名不能为空");
        return;
      }
      if (this.updateMusic.author === "") {
        this.$message.error("歌手不能为空");
        return;
      }
      put("/api/Music/UpdateMusic", this.updateMusic).then(() => {
        this.getMusic();
        this.dialogFormVisible = false;
      });
    },
    deleteMusic(id) {
      this.$confirm("此操作将永久删除该音乐, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          del("/api/Music/DeleteMusic?id=" + id).then(() => {
            this.getMusic();
          });
        })
        .catch(() => {});
    },
  },
};
</script>

<style scoped>
.music {
  /* background: burlywood; */
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.add {
  line-height: 50px;
  /* background: cadetblue; */
  width: 290px;
  margin-right: 10px;
  padding-left: 10px;
  color: #409eff;
  cursor: pointer;
  margin-top: 5px;
}
.music-item {
  height: 50px;
  width: 300px;
  /* background: chartreuse; */
  margin-right: 10px;
  margin-top: 5px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.music-title {
  line-height: 50px;
  margin-left: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.icon {
  width: 30px;
  height: 30px;
  margin-top: 10px;
  cursor: pointer;
}
</style>
