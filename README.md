# SHU后台管理系统

    某个后天管理系统，包含商品管理 用户管理 订单等等信息
  
前后端分离：用户 ---> 前端-视图-数据 ---> 后台-提供接口 ---> 数据库

## 技术点

    Vue + Vue-router + Vuex + Element-ui + Axios + Echarts +其他三方库

## 项目搭建

1. vue create vue-ego
2. vue-router vuex
3. axios
4. vue add element --(按需)

## 项目初始化

1. 删除无用的组件home. vue about.vue hello...
2. css初始化
3. iconfont 图标导入

## 后台服务

后台数据采用mockjs实现，满足多条件选择，分页等需求...

## 路由配置

1. 1

└─ TodoList
   ├─ TodoItem
   │  ├─ TodoButtonDelete
   │  └─ TodoButtonEdit
   └─ TodoListFooter
      ├─ TodosButtonClear
      └─ TodoListStatistics
