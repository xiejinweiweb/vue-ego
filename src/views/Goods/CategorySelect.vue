<!-- 类目选择 -->
<template>
  <div>
    <el-tree
      :props="props"
      :load="loadNode"
      lazy
      accordion
      @node-click="nodeClick"
    >
    </el-tree>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "CategorySelect",
  data() {
    return {
      props: {
        label: "name",
        children: "zones",
        isLeaf: "leaf",
      },
    };
  },
  methods: {
    nodeClick(data, node) {
      console.log("----", data, node);
      //传递数据给父组件
      this.$emit("sendTreeData", data);
    },
    loadNode(node, resolve) {
      console.log("load--会自动调用一次", node);
      if (node.level === 0) {
        const url = "user/categoryList";
        axios.post(url).then((res) => {
          //  console.log("res.data.data.data", res.data.data.data);
          //进入页面 获取第一级的tree数据
          return resolve(res.data.data.data);
        });
      }
      if (node.level > 1) return resolve([]);

      setTimeout(() => {
        const data = [
          {
            name: "手机",
            leaf: true,
          },
          {
            name: "电脑",
          },
        ];

        resolve(data);
      }, 1000);
    },
  },
};
</script>

<style scoped>
</style>
