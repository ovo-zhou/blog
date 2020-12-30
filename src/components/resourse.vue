<template>
  <div>
    <music_module />
    <div style="height: 50px"></div>
    <link_module />
  </div>
</template>

<script>
import music_module from "./music_module";
import link_module from "./link_module";
export default {
  components: {
    music_module,
    link_module,
  },
};
</script>
