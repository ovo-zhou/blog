<template>
  <div class="message">
    <p style="font-weight: bold">关于我</p>
    <hr />
    <p>笔名：第一梦</p>
    <p>性别：男</p>
    <p>所在地：湖北武汉</p>
    <p>Email:1239746898@qq.com</p>
    <p>QQ:1239746898</p>
    <p style="font-weight: bold; margin-top: 20px">留言</p>
    <hr style="margin-bottom: 20px" />
    <el-input type="textarea" :rows="20" placeholder="请输入内容" v-model="textarea">
    </el-input>
    <div class="submit">
      <span class="link"
        >联系方式：<el-input
          style="width: 180px"
          v-model="input"
          placeholder="请输入有效的联系方式"
          size="mini"
        ></el-input></span
      ><span class="submitbtn">提交</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      textarea: "",
      input: "",
    };
  },
};
</script>

<style scoped>
.message {
  /* background: rgb(236, 151, 23);  */
  width: 450px;
  height: 700px;
  margin-top: 50px;
  margin-left: 50px;
  overflow: auto;
}
p {
  line-height: 25px;
}
.submit {
  margin-top: 10px;
}
.submitbtn {
  margin-left: 20px;
  cursor: pointer;
}
</style>
