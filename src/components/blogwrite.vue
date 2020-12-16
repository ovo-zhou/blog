<template>
  <div class="blogwrite">
    <el-row>
      <el-col :span="4">
        <!-- 所有的目录 -->
        <div class="catalog">
          <div class="item">
            <p class="add" @click="openAddCatalog">添加类别</p>
          </div>
          <template v-for="(item, index) in catalog">
            <div :key="index" class="item">
              <el-row>
                <el-col :span="20">
                  <p @click="getBlogBySortId(item.sortId)">
                    {{ item.sortName }}
                  </p>
                </el-col>
                <el-col :span="4">
                  <el-dropdown>
                    <img class="icon" src="../assets/more.png" />
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item><p @click="openCatalogEdit(item)">编辑</p></el-dropdown-item>
                      <el-dropdown-item><p @click="deleteCatalog(item.sortId)">删除</p></el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </el-col>
              </el-row>
            </div>
          </template>
        </div>
      </el-col>
      <el-col :span="4">
        <!-- 当前目录下的所有文章 -->
        <div class="article_title">
          <div class="item">
            <p class="add" @click="AddBlog">写博客</p>
          </div>
          <template v-for="(item, index) in blog">
            <div :key="index" class="item">
              <el-row>
                <el-col :span="20">
                  <p @click="update(item)">
                    {{ item.title }}
                  </p>
                </el-col>
                <el-col :span="4">
                  <el-dropdown>
                    <img class="icon" src="../assets/more1.png" />
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item
                        ><p @click="deleteBlog(item.blogId)">删除</p></el-dropdown-item
                      >
                    </el-dropdown-menu>
                  </el-dropdown>
                </el-col>
              </el-row>
            </div>
          </template>
        </div>
      </el-col>
      <el-col :span="16">
        <!-- 编辑器 -->
        <div class="content">
          <el-form
            ref="form"
            :model="form"
            label-width="40px"
            size="mini"
            class="fromstyle"
          >
            <el-form-item label="标题">
              <el-input v-model="form.Title"></el-input>
            </el-form-item>
            <el-form-item label="时间">
              <el-date-picker
                type="datetime"
                placeholder="选择日期"
                v-model="form.ReleaseDate"
                value-format="yyyy-MM-ddTHH:mm:ss"
              ></el-date-picker>
              <el-button type="primary" plain @click="onSubmit" style="margin-left: 20px">
                保存
              </el-button>
            </el-form-item>
            <el-form-item label="正文">
              <editor ref="content" :html="text" />
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>
    <el-dialog
      title="添加博客类别"
      :visible.sync="dialogFormVisible"
      :modal="false"
      width="30%"
      top="30vh"
    >
      <el-input v-model="Sort.sortName"></el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="AddSort">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="编辑"
      :visible.sync="dialogFormVisible1"
      :modal="false"
      width="30%"
      top="30vh"
    >
      <el-input v-model="Sort.sortName"></el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="updateSort">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import editor from "./tinymce";
import { get, post } from "../utility/http";
export default {
  data() {
    return {
      form: {
        blogId: 0,
        Title: "",
        ReleaseDate: "",
        SortId: null,
        content: "",
      },
      catalog: [],
      blog: [],
      text: "",
      dialogFormVisible: false,
      dialogFormVisible1: false,
      Sort: {
        sortId: 0,
        sortName: "",
      },
      currentSortId: null,
      editState: "create",
    };
  },
  components: {
    editor,
  },
  created() {
    this.getSort();
  },
  methods: {
    //删除目录
    deleteCatalog(id){
      console.log(id)
      this.$confirm("此操作将永久删除该类别下的所有博客, 请谨慎！", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        get("/api/Sort/DeleteSort", { id: id }).then((res) => {
          console.log(res);
          if (res.status === 200) {
            this.getSort();
            this.blog=[]
          }
        });
      });
    },
    //删除博客
    deleteBlog(id) {
      console.log(id);
      this.$confirm("此操作将永久删除该博客, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        get("/api/Blog/DeleteBlog", { id: id }).then((res) => {
          console.log(res);
          if (res.status === 200) {
            this.getBlog(this.currentSortId);
          }
        });
      }).catch(()=>{});
    },
    //打开目录编辑弹窗
    openCatalogEdit(item) {
      console.log(item);
      this.dialogFormVisible1 = true;
      this.Sort.sortId = item.sortId;
      this.Sort.sortName = item.sortName;
    },
    //更新目录update
    updateSort() {
      post("/api/Sort/UpdateSort", this.Sort).then((res) => {
        console.log(res);
        if (res.status === 200) {
          this.dialogFormVisible1 = false;
          this.getSort();
        }
      });
    },
    openAddCatalog() {
      this.dialogFormVisible = true;
      this.Sort.sortName = "";
    },
    //添加新类别
    AddSort() {
      if (this.Sort.sortName === "") {
        this.$message.error("类别不能为空┗|｀O′|┛ 嗷~~");
        return;
      }
      post("/api/Sort/AddSort", this.Sort).then((res) => {
        console.log(res);
        if (res.status === 200) {
          this.dialogFormVisible = false;
          this.getSort();
        }
      });
    },
    //查询所有类别
    getSort() {
      get("/api/Blog/GetPreface").then((res) => {
        console.log(res);
        this.catalog = res.data;
      });
    },
    //查询所有文章
    getBlogBySortId(id) {
      this.getBlog(id);
    },
    getBlog(id) {
      this.currentSortId = id;
      get("/api/Blog/GetTitleBySortId", { sortId: id }).then((res) => {
        console.log(res);
        if (res.status === 200) {
          this.blog = res.data;
        }
      });
    },
    AddBlog() {
      if (this.currentSortId === null) {
        this.$message.error("请先选择文章类别");
        return;
      }
      this.editState = "create";
      this.form.Title = "";
      this.form.ReleaseDate = "";
      this.form.blogId = 0;
      this.text = "";
    },
    //编辑文章
    update(item) {
      this.editState = "update";
      this.form.blogId = item.blogId;
      this.form.Title = item.title;
      this.form.ReleaseDate = item.releaseDate;
      this.text = item.content;
    },
    onSubmit() {
      this.form.content = this.$tinymce.activeEditor.getContent();
      this.form.SortId = this.currentSortId;
      if (this.form.Title === "") {
        this.$message.error("博客标题不能为空");
        return;
      }
      if (this.form.ReleaseDate === "") {
        this.$message.error("请选择发布时间");
        return;
      }
      if (this.form.SortId == null) {
        this.$message.error("请选择博客类别");
        return;
      }
      if (this.form.content === "") {
        this.$message.error("写点什么吧铁汁");
        return;
      }
      if (this.form.Title.length > 45) {
        this.$message.error("标题好像太长了");
        return;
      }
      if (this.form.content > 4900) {
        this.$message.error("内容写的有点多哦铁汁");
        return;
      }
      console.log(this.form);
      if (this.editState === "update") {
        post("/api/Blog/UpdateBlog", this.form).then((res) => {
          if (res.status === 200) {
            this.$message({
              message: "保存成功",
              type: "success",
            });
            this.getBlog(this.form.SortId);
          }
          console.log(res);
        });
      }
      if (this.editState === "create") {
        post("/api/Blog/AddBlog", this.form).then((res) => {
          if (res.status === 200) {
            this.getBlog(this.form.SortId);
            this.$message({
              message: "保存成功",
              type: "success",
            });
            this.form.Title = "";
            this.form.ReleaseDate = "";
            this.form.blogId = 0;
            this.text = "";
          }
          console.log(res);
        });
      }
    },
  },
};
</script>

<style scoped>
.catalog {
  background: white;
  height: 750px;
  border-right: rgb(102, 101, 100) solid 1px;
  overflow:auto;
}
.item {
  /* background: yellowgreen; */
  border-bottom: rgb(102, 101, 100) solid 1px;
  height: 50px;
}
.catalog p {
  line-height: 50px;
  padding-left: 20px;
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.article_title {
  height: 750px;
  background: white;
  border-right: rgb(102, 101, 100) solid 1px;
overflow: auto;
}
.article_title p {
  line-height: 50px;
  padding-left: 20px;
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.content {
  background: white;
  height: 750px;
  overflow: auto;
  padding-left: 20px;
  /* padding-top: 20px; */
}
.fromstyle {
  margin-top: 20px;
}
.add {
  color: #409eff;
}
.icon {
  width: 26px;
  line-height: 50px;
  margin-top: 12px;
  cursor: pointer;
}
</style>
