<template>
  <div>
    <vue-tinymce v-model="content" :setting="setting" />
  </div>
</template>

<script>
import server from "../utility/env";
export default {
  props:{
    html:{
      type:String,
      default:""
    }
  },
  data() {
    return {
      content: "写点什么吧",
      setting: {
        menubar: false,
        statusbar: false,
        toolbar_mode: "wrap",
        toolbar:
          "fullscreen preview | formatselect alignleft aligncenter alignright alignjustify indent2em| link | image media table | fontselect fontsizeselect forecolor backcolor | bold italic underline strikethrough | superscript subscript |",
        plugins: "link image media table lists fullscreen indent2em preview",
        language: "zh_CN",
        height: 800,
        images_upload_url: server + "/api/File/ImgUpload",
        images_upload_base_path: server,
      },
    };
  },
  watch:{
    html(newV){
      // console.log(newV)
      this.$tinymce.activeEditor.setContent(newV)
    }
  }
};
</script>

<style scoped></style>
