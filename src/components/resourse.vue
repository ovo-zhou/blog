<template>
  <div class="resourse">
    <el-row>
      <el-col :span="6">
        <div class="music">
          <h3 style="text-align: center">music</h3>
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
                      <p>删除</p>
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </el-col>
            </el-row>
          </template>
        </div>
      </el-col>
      <el-col :span="6"><div class="grid-content bg-purple-light">1</div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple">1</div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple">1</div></el-col>
    </el-row>
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
          <el-button @click="dialogFormVisible=false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { get } from "../utility/http";
export default {
  data() {
    return {
      music: [],
      updateMusic: {
        musicId: 0,
        name: "",
        url: "",
        author: "",
      },
      dialogFormVisible: false,
    };
  },
  created() {
    this.getMusic();
  },
  methods: {
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
      this.dialogFormVisible = true;
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
}
</style>
