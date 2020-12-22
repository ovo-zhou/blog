<template>
  <div class="detail">
    <h3>{{ blog.title }}</h3>
    <div>
      <span class="date">{{ blog.releaseDate }}</span>
      <span>第一梦</span>
    </div>
    <div class="content" v-html="blog.content">{{ blog.content }}</div>
  </div>
</template>

<script>
import { get } from "../utility/http";
export default {
  data() {
    return {
      blogId: 0,
      blog: {},
    };
  },
  created() {
    this.getBlog();
  },
  methods: {
    getBlog() {
      this.blogId = this.$route.query.blogId;
      get("/api/Blog/GetBlogById", { id: this.blogId }).then((res) => {
        this.blog = res;
      });
    },
  },
  watch: {
    $route() {
      this.getBlog();
    },
  },
};
</script>

<style scoped>
.detail {
  /* background: rgb(236, 151, 23);  */
  width: 450px;
  height: 700px;
  margin-top: 50px;
  margin-left: 35px;
  overflow: auto;
}
span {
  font-size: 12px;
  margin-right: 20px;
}
.content {
  margin-top: 20px;
}
</style>
