<template>
  <div>
    <vue-tinymce v-model="content" :setting="setting" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      content: "写点什么吧ovo",
      setting: {
        menubar: false,
        statusbar: false,
        toolbar_mode:'wrap',
        toolbar:
          "fullscreen preview | formatselect alignleft aligncenter alignright alignjustify indent2em| link | image media table | fontselect fontsizeselect forecolor backcolor | bold italic underline strikethrough | superscript subscript |",
        plugins: "link image media table lists fullscreen indent2em preview",
        language: "zh_CN",
        height: 800,
      },
    };
  },
};
</script>

<style scoped>
</style>
