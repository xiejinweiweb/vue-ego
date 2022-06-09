    <!-- 导航 -->
<template>
  <div>
    <!-- <el-radio-group 
       v-model="isCollapse" 
       style="margin-bottom: 20px;">
       <el-radio-button :label="false">展开</el-radio-button>
       <el-radio-button :label="true">收起</el-radio-button>
    </el-radio-group> -->
    <el-menu
      router
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      background-color="#183555"
      text-color="#fff"
      active-text-color="#ffd04b"
      isCollapse: true
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
    >
    <el-menu-item>
        <span slot="title">SHU后台管理系统</span>
      </el-menu-item>
      <el-menu-item index="/">
        <i class="el-icon-menu"></i>
        <!-- <span slot="title">首页</span> -->
        <span slot="title">{{$t("menu.home")}}</span>
      </el-menu-item>

      <el-menu-item index="/goods">
        <i class="el-icon-document"></i>
        <!-- <span slot="title">商品管理</span> -->
        <span slot="title">{{$t("menu.goods")}}</span>
      </el-menu-item>
      <el-menu-item index="/params">
        <i class="el-icon-setting"></i>
        <!-- <span slot="title">规格参数</span> -->
        <span slot="title">{{$t("menu.params")}}</span>
      </el-menu-item>
      <el-menu-item index="/advert">
        <i class="el-icon-s-data"></i>
        <!-- <span slot="title">广告分类</span> -->
        <span slot="title">{{$t("menu.advert")}}</span>
      </el-menu-item>
      <el-submenu index="/order">
        <template slot="title">
          <i class="el-icon-location"></i>
          <!-- <span>订单管理</span> -->
          <span>{{$t("menu.order")}}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/order/order-list">
            <i class="el-icon-cpu"></i>
            <span slot="title">订单列表</span>
          </el-menu-item>
          <el-menu-item index="/order/order-return">
            <i class="el-icon-s-release"></i>
            <span slot="title">退货管理</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
         <el-menu-item index="/user-print">
        <i class="el-icon-s-data"></i>
        <!-- <span slot="title">个人中心</span> -->
        <span slot="title">{{$t("menu.user")}}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "Menu",
  data() {
    return {};
  },
  props: ["isCollapse"],
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
      // console.log('$$$$',this.$route);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
  components: {},
};
</script>

<style scoped>
.el-menu {
  border-right: 0;
}
.el-menu .is-active {
  background-color: rgb(0, 65, 120) !important;
  color: #fff !important;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
