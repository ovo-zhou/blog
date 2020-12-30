<template>
  <div class="record">
    <el-steps direction="vertical" :active="1">
      <template v-for="(item,index) in Record">
<el-step
        :title="item.time"
        :description="item.desc"
        icon="el-icon-success"
        :key="index"
      >
      </el-step>
      </template>
      
    </el-steps>
  </div>
</template>

<script>
import { get } from '../utility/http';
export default {
  data(){
    return{
      Record:[]
    }
  },
  created(){
    this.getRecord()
  },
  methods:{
    getRecord(){
      get("/api/Record").then(res=>{
        this.Record=res
      })
    }
  }
};
</script>

<style scoped>
.record {
  width: 450px;
  height: 700px;
  margin-top: 50px;
  margin-left: 50px;
  overflow: auto;
}
</style>
