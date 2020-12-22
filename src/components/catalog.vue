<template>
  <div class="catalog">
    <p class="title">目录</p>
    <template v-for="(item, index) in preface">
      <h4 :key="index" @click="toTitle(item.sortId)">
        {{ changeIndex(index) + " " + item.sortName }}
      </h4>
    </template>
  </div>
</template>

<script>
import { get } from "../utility/http";
export default {
  data() {
    return {
      preface: [],
    };
  },
  created() {
    get("/api/Blog/GetPreface").then((res) => {
      this.preface = res;
    });
  },
  computed: {
    changeIndex() {
      return function (index) {
        let cn = [
          "一",
          "二",
          "三",
          "四",
          "五",
          "六",
          "七",
          "八",
          "九",
          "十",
          "十一",
          "十二",
          "十三",
          "十四",
          "十五",
          "十六",
          "十七",
          "十八",
          "十九",
          "二十",
        ];
        return "第" + cn[index] + "章";
      };
    },
  },
  methods: {
    toTitle(id) {
      this.$router.push({path:"/home/title",query:{id:id}})
    },
  },
};
</script>

<style scoped>
.catalog {
  /* background: rgb(236, 151, 23); */
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
.title {
  font-size: 70px;
  font-weight: 500;
}
h4 {
  margin-top: 10px;
  cursor: pointer;
}
</style>