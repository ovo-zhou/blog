<template>
  <div class="link">
    <el-carousel height="250px" :autoplay="false">
      <el-carousel-item v-for="i in page" :key="i">
        <ul>
          <li v-for="j in range(i)" :key="j">
            <div class="item" @click="toUrl(links[j])">
              <img :src="links[j].linkIcon" />
              <p>{{ links[j].linkName }}</p>
            </div>
          </li>
        </ul>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script>
import { get } from "../utility/http";
import server from "../utility/env";
export default {
  data() {
    return {
      links: [],
      total: 0,
      page: 0,
    };
  },
  created() {
    this.GetLink();
  },
  computed: {
    getPage() {
      return this.total / 8;
    },
  },
  methods: {
    toUrl(item) {
      window.open(item.url);
    },
    range(i) {
      var range = [];
      for (let k = (i - 1) * 8; k < i * 8; k++) {
        if (k < this.total) {
          range.push(k);
        }
      }
      return range;
    },
    GetLink() {
      get("/api/Link/GetLink").then((res) => {
        res.forEach((element) => {
          element.linkIcon = server + "/upload/" + element.linkIcon;
        });
        this.links = res;
        this.page = Math.ceil(this.links.length / 8);
        this.total = this.links.length;
      });
    },
  },
};
</script>

<style scoped>
.link {
  width: 450px;
  height: 250px;
  overflow: hidden;
  margin-bottom: 50px;
}
ul > li {
  display: inline-block;
  margin-left: 25px;
  margin-top: 10px;
}
.item {
  width: 80px;
  cursor: pointer;
}
.item img {
  width: 80px;
  height: 80px;
  border-radius: 40px;
}
.item p {
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
