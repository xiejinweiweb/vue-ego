<!-- 用户信息打印 测试vue-pdf -->
<template>
  <div>
    <el-dialog
      title="合同样本"
      :visible.sync="centerDialogVisible"
      width="70%"
      :before-close="handleClose"
    >
      <div class="parent">
        <el-button @click="$refs.pdf.print()">打印</el-button>
        <pdf
          ref="pdf"
          :src="src"
          :page="currentPage"
          @progress="getProgress"
          @page-loaded="currentPage = $event"
          @loaded="loadPdfHandler"
        ></pdf>
      </div>
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="1"
        :total="numPages"
        @current-change="changePage"
      ></el-pagination>
    </el-dialog>
    <div id="line"></div>
  </div>
</template>

<script>
import pdf from "vue-pdf";
var loadingTask = pdf.createLoadingTask("./sxt.pdf");
export default {
  components: { pdf },
  data() {
    return {
      centerDialogVisible: false,
      src: loadingTask,
      currentPage: 1,
      numPages: 1,
      pdfUrl1:
        "http://storage.xuetangx.com/public_assets/xuetangx/PDF/PlayerAPI_v1.0.6.pdf",
      pdfUrl2:
        "https://clinic-trial-attachments.oss-cn-beijing.aliyuncs.com/output/123demo",
    };
  },
  mounted() {
    this.src.promise.then((pdf) => {
      this.numPages = pdf.numPages;
    });
  },
  methods: {
    handleClose() {
  
          this.centerDialogVisible = false
      
    },
    changePage(page) {
      this.currentPage = page;
    },
    getProgress(e) {
      console.log("加载进度：", e);
    },
    loadPdfHandler() {
      console.log("PDF加载完成啦");
    },
  },
};
</script>

<style scoped>
#line {
  width: 400px;
  height: 400px;
}
</style>

