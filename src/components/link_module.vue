<template>
  <div>
    <h3>常用链接管理</h3>
    <p class="add" @click="addLink">添加链接</p>
    <div class="link">
      <template v-for="(item, index) in links">
        <div class="link-item" :key="index">
          <img :src="item.linkIcon" />
          <p>{{ item.linkName }}</p>
          <el-button type="primary" size="mini" @click="editLink(item)">编辑</el-button>
          <el-button type="danger" size="mini" @click="deleteLink(item.id)"
            >删除</el-button
          >
        </div>
      </template>
    </div>
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
import { del, get, post, put } from "../utility/http";
export default {
  data() {
    return {
      links: [],

      link: {
        id: 0,
        linkIcon: "",
        linkName: "",
        url: "",
      },
      dialogFormVisible2: false,
      dialogFormVisible3: false,
    };
  },
  created() {
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
      put("/api/Link/UpdateLink", this.link).then(() => {
        this.getLink();
        this.dialogFormVisible3 = false;
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
          del("/api/Link/DeleteLink?id=" + id).then(() => {
            this.getLink();
            this.$message({
              message: "删除成功",
              type: "success",
            });
          });
        })
        .catch(() => {});
    },
    getLink() {
      get("/api/Link/GetLink").then((res) => {
        res.forEach((element) => {
          element.linkIcon = server + "/upload/" + element.linkIcon;
        });
        this.links = res;
      });
    },
    addLink() {
      this.link.id = 0;
      this.link.linkIcon = "";
      this.link.linkName = "";
      this.link.url = "";
      this.dialogFormVisible2 = true;
    },
    uploadLink() {
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
      post("/api/Link/CreateLink", this.link).then(() => {
        this.$message({
          message: "上传成功",
          type: "success",
        });
        this.link.linkIcon = "";
        this.link.linkName = "";
        this.link.url = "";
        this.dialogFormVisible2 = false;
        this.getLink();
      });
    },
    successlink(res) {
      console.log(res);
      this.link.linkIcon = res;
    },
    removelink() {
      this.link.linkIcon = "";
    },
  },
};
</script>

<style scoped>
.link {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  /* background: fuchsia; */
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
.link-item {
  width: 130px;
  /* background: chartreuse; */
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-right: 10px;
}
.link-item img {
  width: 130px;
  height: 130px;
  border-radius: 65px;
}
.link-item p {
  line-height: 40px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: center;
}
</style>
