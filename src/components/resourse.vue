<template>
  <div class="resourse">
    <el-row>
      <el-col :span="6">
        <div class="music">
          <h3 style="text-align: center">music</h3>
          <p class="name-author" style="color: #409eff" @click="addMusic">添加音乐</p>
          <template v-for="(item, index) in music">
            <el-row :key="index">
              <el-col :span="21">
                <p class="name-author">{{ item.name }}--{{ item.author }}</p>
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
          </template>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="music">
          <h3 style="text-align: center">link</h3>
          <p class="name-author" style="color: #409eff" @click="addLink">添加链接</p>
          <ul class="myul">
            <template v-for="(item, index) in links">
              <li :key="index">
                <div class="item">
                  <img :src="item.linkIcon" />
                  <p>{{ item.linkName }}</p>
                  <el-button type="primary" size="mini" @click="editLink(item)"
                    >编辑</el-button
                  >
                  <el-button type="danger" size="mini" @click="deleteLink(item.id)"
                    >删除</el-button
                  >
                </div>
              </li>
            </template>
          </ul>
        </div>
      </el-col>
      <el-col :span="6"><div class="grid-content bg-purple">1</div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple">1</div></el-col>
    </el-row>
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
    <!-- 链接上传 -->
    <el-dialog
      title="添加"
      :visible.sync="dialogFormVisible2"
      :modal="false"
      width="30%"
      top="30vh"
    >
      <el-form ref="form" :model="link" label-width="80px">
        <el-form-item label="连接名">
          <el-input v-model="link.linkName"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="link.url"></el-input>
        </el-form-item>
        <el-form-item label="图标">
          <el-upload
            class="upload-demo"
            action="http://localhost:5000/api/File/FileUpload"
            :on-success="successlink"
            :limit="1"
            :on-remove="removelink"
            :file-list="fileList"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传.png,.jpg,.jpeg文件</div>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="uploadLink">上传</el-button>
          <el-button @click="dialogFormVisible2 = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 链接编辑 -->
    <el-dialog
      title="编辑"
      :visible.sync="dialogFormVisible3"
      :modal="false"
      width="30%"
      top="30vh"
    >
      <el-form ref="form" :model="link" label-width="80px">
        <el-form-item label="连接名">
          <el-input v-model="link.linkName"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="link.url"></el-input>
        </el-form-item>
        <el-form-item label="图标">
          <el-upload
            class="upload-demo"
            action="http://localhost:5000/api/File/FileUpload"
            :on-success="successlink"
            :limit="1"
            :on-remove="removelink"
            :file-list="fileList"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传.png,.jpg,.jpeg文件</div>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="updateLink">上传</el-button>
          <el-button @click="dialogFormVisible3 = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import server from "../utility/env";
import { get, post } from "../utility/http";
export default {
  data() {
    return {
      fileList: [],
      music: [],
      links: [],
      updateMusic: {
        musicId: 0,
        name: "",
        url: "",
        author: "",
      },
      link: {
        id: 0,
        linkIcon: "",
        linkName: "",
        url: "",
      },
      dialogFormVisible: false,
      dialogFormVisible1: false,
      dialogFormVisible2: false,
      dialogFormVisible3: false,
    };
  },
  created() {
    this.getMusic();
    this.getLink();
  },
  methods: {
    updateLink() {
      if (this.link.linkIcon === "") {
        this.$message.error("请上传图标");
        return;
      }
      if (this.link.linkName === "") {
        this.$message.error("请输入链接名");
        return;
      }
      if (this.link.url === "") {
        this.$message.error("请填写url");
        return;
      }
      console.log(this.link);
      post("/api/Link/UpdateLink", this.link).then((res) => {
        console.log(res);
        if (res.status === 200) {
          this.getLink();
          this.dialogFormVisible3 = false;
        }
      });
    },
    editLink(item) {
      this.link.id = item.id;
      this.link.linkIcon = item.linkIcon.split("/").pop();
      this.link.linkName = item.linkName;
      this.link.url = item.url;
      this.dialogFormVisible3 = true;
    },

    deleteLink(id) {
      this.$confirm("删除操作不可逆, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          post("/api/Link/DeleteLink?id=" + id).then((res) => {
            console.log(res);
            if (res.status === 200) {
              this.getLink();
              this.$message({
                message: "删除成功",
                type: "success",
              });
            }
          });
        })
        .catch(() => {});
    },
    getLink() {
      get("/api/Link/GetLink").then((res) => {
        if (res.status === 200) {
          res.data.forEach((element) => {
            element.linkIcon = server + "/upload/" + element.linkIcon;
          });
          this.links = res.data;
        }
      });
    },
    addLink() {
      this.link.id=0;
      this.link.linkIcon = "";
      this.link.linkName = "";
      this.link.url = "";
      this.dialogFormVisible2 = true;
    },
    uploadLink() {
      console.log(this.link);

      if (this.link.linkIcon === "") {
        this.$message.error("请上传图标");
        return;
      }
      if (this.link.linkName === "") {
        this.$message.error("请输入链接名");
        return;
      }
      if (this.link.url === "") {
        this.$message.error("请填写url");
        return;
      }
      post("/api/Link/CreateLink", this.link).then((res) => {
        console.log(res);
        if (res.status === 200) {
          this.$message({
            message: "上传成功",
            type: "success",
          });
          this.link.linkIcon = "";
          this.link.linkName = "";
          this.link.url = "";
          this.dialogFormVisible2 = false;
        }
      });
    },
    successlink(res) {
      console.log(res);
      this.link.linkIcon = res;
    },
    removelink() {
      this.link.linkIcon = "";
    },
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
      post("/api/Music/CreateMusic", this.updateMusic).then((res) => {
        console.log(res);
        if (res.status === 200) {
          this.$message({
            message: "上传成功",
            type: "success",
          });
          this.updateMusic.name = "";
          this.updateMusic.url = "";
          this.updateMusic.author = "";
          this.fileList = [];
          this.getMusic();
        }
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
        console.log(res);
        if (res.status == 200) {
          this.music = res.data;
        }
      });
    },
    editMusic(item) {
      console.log(item);
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
      console.log(this.updateMusic);
      post("/api/Music/UpdateMusic", this.updateMusic).then((res) => {
        if (res.status == 200) {
          this.getMusic();
          this.dialogFormVisible = false;
        }
      });
    },
    deleteMusic(id) {
      console.log(id);
      this.$confirm("此操作将永久删除该音乐, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          post("/api/Music/DeleteMusic?id=" + id).then((res) => {
            console.log(res);
            if (res.status === 200) {
              this.getMusic();
            }
          });
        })
        .catch(() => {});
    },
  },
};
</script>

<style scoped>
.resourse {
  /* background: blue; */
}
.music {
  background: white;
  height: 750px;
  overflow: auto;
  border-right: black solid 1px;
}
.icon {
  width: 26px;
  line-height: 50px;
  margin-top: 12px;
  cursor: pointer;
}
.name-author {
  line-height: 50px;
  padding-left: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
}
.myul > li {
  display: inline-block;
  margin-left: 40px;
  margin-top: 10px;
}
.myul img {
  width: 100px;
  height: 100px;
  border-radius: 50px;
  margin-left: 10px;
}
.item {
  /* background: blue; */
  width: 128px;
}
.item p {
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
