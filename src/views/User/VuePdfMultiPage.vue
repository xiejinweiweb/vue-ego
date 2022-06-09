<!-- 用户信息打印 测试vue-pdf -->
<template>
  <div>
    <el-dialog
      title="合同信息"
      :visible.sync="centerDialogVisible"
      width="60%"
      center
    >
    <el-button type="text" @click="print">打印</el-button>
    <span>这里显示pdf</span>
      <div style="margin-bottom: 15px; text-align: right">
        <el-button type="primary" size="small" @click.stop="previousPage">
          上一页
        </el-button>
        <el-button type="primary" size="small" @click.stop="nextPage">
          下一页
        </el-button>
        <span>当前第{{ pdfPage }}页 / 共{{ pageCount }}页</span>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import pdf from "vue-pdf";
export default {
  // components: { pdf },
  data() {
    return {
      centerDialogVisible: false,
      src: null,
      pdfPage: 1,
      pageCount: 0,
      pdfUrl1:
        "http://storage.xuetangx.com/public_assets/xuetangx/PDF/PlayerAPI_v1.0.6.pdf",
      pdfUrl2:
        "https://clinic-trial-attachments.oss-cn-beijing.aliyuncs.com/output/123demo",
    };
  },
  methods: {
    print(){
      // this.$refs.myPdf.print()
    },
    //PDF改变页数
    previousPage() {
      var p = this.pdfPage;
      p = p > 1 ? p - 1 : this.pageCount;
      this.pdfPage = p;
    },
    nextPage() {
      var p = this.pdfPage;
      p = p < this.pageCount ? p + 1 : 1;
      this.pdfPage = p;
    },
  },
};
</script>

<style scoped>
</style>

