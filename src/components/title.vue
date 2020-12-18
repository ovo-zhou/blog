<template>
  <div class="title">
    <div style="height: 30px">
      <pre class="header" @click="toCatalog">第一章  c#的前世今生</pre>
    </div>
    <div class="content" style="height: 670px">
      <template v-for="(item, index) in title">
        <div :key="index" class="item" @click="toDetail(item)">
          <p class="name">
            {{item.title}}
          </p>
          <div>
            <span class="date">发布日期：{{item.releaseDate}}</span>
            <span class="view">阅读量：{{item.viewNum}}</span>
            <span class="like">点赞数：{{item.likeNum}}</span>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
import { get } from "../utility/http";
export default {
  data() {
    return {
      title: [],
    };
  },
  created() {
    this.getTitle();
  },
  methods: {
    getTitle() {
      get("/api/Blog/GetTitleBySortId", { sortId: this.$route.query.id }).then((res) => {
        console.log(res.data);
        this.title = res.data;
      });
    },
    toCatalog(){
      this.$router.push("/home/catalog")
    },
    toDetail(item){
      this.$router.push({
        path:'/home/detail',
        query:{
          blogId:item.blogId
        }
      })
    }
  },
};
</script>
<style scoped>
.title {
  /* background: rgb(236, 151, 23); */
  width: 450px;
  height: 700px;
  margin-top: 50px;
  margin-left: 35px;
}
::-webkit-scrollbar {
  width: 4px;
}
::-webkit-scrollbar-thumb {
  background: #e2e1e1;
  border-radius: 2px;
}
.header {
  text-align: right;
  font-size: 14px;
  cursor: pointer;
}
.content {
  width: 100%;
  height: 100%;
  overflow: auto;
}
.item{
    margin-bottom: 30px;
    cursor: pointer;
    /* background: rosybrown; */
}
.name {
  margin-bottom: 2px;
}
span {
  font-size: 12px;
  margin-right: 30px;
}
</style>