<!-- 布局 -->
<template>
  <div class="layout">
    <!-- 左侧导航区域 -->
    <Menu class="menu" :isCollapse="isCollapse"></Menu>
    <!-- 右侧内容展示区域 -->
    <Content class="content" 
    :class="{isActive:isCollapse}"
    @changeCollapse="changeCollapse" 
    :isCollapse="isCollapse"></Content>
  </div>
</template>

<script>
import Content from './Content.vue';
import Menu from './Menu.vue';
export default {
  name:'Layout',
  data() {
    return {
      isCollapse: false,
    };
  },
  methods: {
    changeCollapse(){
      this.isCollapse=!this.isCollapse
    }
  },
  components: {Menu, Content},
};
</script>

<style scoped>

.menu{
  /* width: 200px; */
  /* min-height: 500px; */
  background-color: #183555;
  /* background-color: #666; */
  position: fixed;
  top: 0;
  bottom: 0;
}

.content{
  margin-left: 200px;
}
.isActive{
   margin-left: 64px;
}
</style>
