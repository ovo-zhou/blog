<template>
  <div class="blogwrite">
    <div class="content">
      <el-form ref="form" :model="form" label-width="80px" size="mini">
        <el-form-item label="标题">
          <el-input v-model="form.Title"></el-input>
        </el-form-item>
        <el-form-item label="发布时间">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="form.ReleaseDate"
            style="width: 100%"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="类别">
          <el-input v-model="form.SortId"></el-input>
        </el-form-item>
        <el-form-item label="正文">
          <editor/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">发布</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import editor from './tinymce'
export default {
  data() {
    return {
      form: {
       Title:'',
       ReleaseDate:'',
       SortId:''
      },
    };
  },
  components:{
editor
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
  },
};
</script>

<style scoped>
.content {
  width: 600px;
  margin: 0px auto;
  background: white;
  padding: 30px;
}
</style>