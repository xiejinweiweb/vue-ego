<!-- 类目选择 -->
<template>
  <div>
    <el-upload
      class="upload-demo"
      ref="upload"
      action="https://jsonplaceholder.typicode.com/posts/"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :file-list="fileList"
      :auto-upload="false"
    >
      <el-button slot="trigger" size="small" type="primary" @click="selectName">
        选取文件
      </el-button>
      <el-button
        style="margin-left: 10px"
        size="small"
        type="success"
        @click="submitUpload"
        >上传到服务器</el-button
      >
    </el-upload>
  </div>
</template>

<script>
export default {
  name: "UploadImg",
  data() {
    return {
      fileList: [],
    };
  },
  methods: {
    selectName() {
      const demo='demo'
      //传递数据给父组件
      this.$emit("sendImg", demo);
    },
    submitUpload() {
      // this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
  },
};
</script>

<style scoped>
</style>
