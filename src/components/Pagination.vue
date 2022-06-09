<template>
  <div class="laypage">
    <el-pagination
      background
      layout="total,prev, pager, next,jumper"
      :page-size="pageSize"
      :total="total"
      @current-change="changePage"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: ["total", "pageSize"],
  methods: {
    changePage(page) {
      // console.log(page);
      this.$emit("changePage", page);
    },
  },
};
</script>

<style scoped>
.laypage {
  text-align: center;
  margin-top: 30px;
}
</style>