<!-- 用户信息打印 测试vue-pdf -->
<template>
  <div class="box">
    <!-- 1.合同相关 -->
    <div class="body">
      <span>签约合同内容：</span>
      <el-button type="primary" @click="showDialog" size="mini"
        >查看合同</el-button
      >
      <VuePdf ref="vuePdf" :src="src"></VuePdf>
    </div>

    <!-- 2.图片查看区域 -->
    <div class="content">
      <el-row :gutter="20">
        <el-col
          :span="8"
          v-for="(o, index) in 6"
          :key="o"
          :offset="index > 0 ? 0 : 0"
        >
          <el-card class="box-card" shadow="hover">
            <div class="clearfix" slot="header">
              <span>证书名称</span>

              <!-- <time class="time">{{ currentDate }}</time> -->
              <el-button
                type="text"
                class="button"
                style="float: right; padding: 3px 0"
                @click="download(index)"
                >下载</el-button
              >
            </div>
            <div class="text item">
              <img ref="img" :src="imgUrl" class="image" style="height: 200px" />
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import VuePdf from "./VuePdf.vue";
import img from "../../../public/certification.png";
export default {
  components: { VuePdf },
  data() {
    return {
      imgUrl: img,
      currentDate: new Date(),
      src: "",
    };
  },
  methods: {
    download(index) {
      let url = this.$refs.img;
    //   console.log(url, index);
      window.location.href = url[index].src;
    },
    showDialog() {
      this.$refs.vuePdf.centerDialogVisible = true;
      this.src =
        "http://storage.xuetangx.com/public_assets/xuetangx/PDF/PlayerAPI_v1.0.6.pdf";
    },
  },
};
</script>

<style scoped>
.box {
  margin: 20px;
}
.body {
  height: 50px;
  line-height: 50px;
  color: black;
  background-color: #fff;
  margin-bottom: 20px;
  padding-left: 10px;
}
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
.box-card{
  margin-bottom: 10px;
}
</style>