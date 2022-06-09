<!-- 右侧内容展示区域 包括上部的用户信息区域 和 用以展示内容的路由出口  -->
<template>
  <div>
    <div class="header">
      <i
        v-if="!isCollapse"
        @click="changeMenu"
        class="iconfont icon-right-indent"
      ></i>
      <i
        v-else
        @click="changeMenu"
        class="iconfont iconfont icon-left-indent"
      ></i>
      <!-- 顶部区域 -->

      <div class="header-right">
        <div>
          <!-- 下拉菜单 -->
          <el-dropdown @command="clickLang">
            <span class="el-dropdown-link" style="color: #fff">
              <!-- 多语言 -->
              {{ $t("multiLanguage") }}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="zh">中文</el-dropdown-item>
              <el-dropdown-item command="en">English</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div class="user">
          欢迎&nbsp;:&nbsp;{{ userInfo.username }}
          <!-- <span>退出登录</span> -->
          <el-button
            icon="el-icon-switch-button"
            size="small"
            @click="exitLogin"
            circle
            style="
              background-color: rgb(20, 112, 187);
              color: #fff;
              margin-left: 20px;
            "
          ></el-button>
        </div>
      </div>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
//映射状态
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
export default {
  name: "Content",
  data() {
    return {};
  },
  props: ["isCollapse"],
  computed: {
    ...mapState("loginAbout", ["userInfo"]),
  },
  methods: {
    //借助mapMutations生成对应的方法，方法中会调用commit去联系mutations(对象写法)
    ...mapMutations("loginAbout", { clearUser: "clearUser" }),
    exitLogin() {
      //退出登录
      console.log("退出登录exitLogin");
      //1.清楚共享数据store中的state数据userInfo
      this.clearUser();
      //2.清除本地存储localStorage
      localStorage.removeItem("user");
      // 3.跳转路由至登录界面
      this.$router.push("/login");
    },
    clickLang(command) {
      // console.log("当前语言为:", this.$i18n.locale, "想改成", command);
      this.$i18n.locale = command;
    },
    changeMenu() {
      //点击切换按钮的时候修改父组件的数据 isCollapse
      this.$emit("changeCollapse");
    },
  },
};
</script>

<style scoped>
.header {
  height: 50px;
  line-height: 50px;
  background-color: #1470bb;
  color: #fff;
}
.header-right {
  float: right;
  padding-right: 20px;
  display: flex;
  font-size: 14px;
}
.user {
  margin-left: 20px;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.iconfont {
  font-size: 30px;
}
</style>
