<template>
  <div class="detail">
    <h3>{{ blog.title }}</h3>
    <div>
      <span class="date">{{ blog.releaseDate }}</span>
      <span>第一梦</span>
    </div>
    <p class="content">{{blog.content}}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      blog: null,
    };
  },
  created() {
    this.blog = this.$route.params.blog;
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
::-webkit-scrollbar {
  width: 4px;
}
::-webkit-scrollbar-thumb {
  background: #e2e1e1;
  border-radius: 2px;
}
span {
  font-size: 12px;
  margin-right: 20px;
}
.content{
    margin-top: 20px;
}
</style>