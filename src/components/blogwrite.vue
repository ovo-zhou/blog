<template>
  <div class="blogwrite">
    <el-row>
      <el-col :span="4">
        <!-- 所有的目录 -->
        <div class="catalog">
          <p class="add" @click="dialogFormVisible = true">添加类别</p>
          <template v-for="(item, index) in catalog">
            <p :key="index" @click="getBlogBySortId(item.sortId)">
              {{ item.sortName
              }}<span class="icon"><i class="el-icon-more-outline"></i></span>
            </p>
          </template>
        </div>
      </el-col>
      <el-col :span="4">
        <!-- 当前目录下的所有文章 -->
        <div class="article_title">
          <p class="add" @click="AddBlog">
            写博客
          </p>
          <template v-for="(item, index) in blog">
            <p :key="index" @click="update(item)">
              {{ item.title }} <span class="icon"><i class="el-icon-edit"></i></span>
            </p>
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
            </el-form-item>
            <el-form-item label="正文">
              <editor ref="content" :html="text" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">发布</el-button>
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
      <el-input v-model="SortName"></el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="AddSort">确 定</el-button>
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
      SortName: "",
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
    //添加新类别
    AddSort() {
      if (this.SortName === "") {
        this.$message.error("类别不能为空┗|｀O′|┛ 嗷~~");
        return;
      }
      post("/api/Sort/AddSort", { sortName: this.SortName }).then((res) => {
        console.log(res);
        if (res.status === 200) {
          this.SortName = "";
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
      this.form.blogId = null;
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
            this.getBlog(this.form.SortId);
          }
          console.log(res);
        });
      }
      if (this.editState === "create") {
        post("/api/Blog/AddBlog", this.form).then((res) => {
          if (res.status === 200) {
            this.getBlog(this.form.SortId);
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
}
.catalog p {
  /* background: yellowgreen; */
  line-height: 50px;
  padding-left: 20px;
  border-bottom: rgb(102, 101, 100) solid 1px;
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.article_title {
  height: 750px;
  background: white;
  border-right: rgb(102, 101, 100) solid 1px;
}
.article_title p {
  line-height: 50px;
  padding-left: 20px;
  border-bottom: rgb(102, 101, 100) solid 1px;
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
.add{
  color: #409EFF;
}
</style>
