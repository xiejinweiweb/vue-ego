"use strict";(self["webpackChunkvue_ego"]=self["webpackChunkvue_ego"]||[]).push([[349],{9349:function(e,t,r){r.r(t),r.d(t,{default:function(){return d}});var o=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"add-goods"},[r("div",{staticClass:"title"},[r("el-breadcrumb",{attrs:{separator:">"}},[r("el-breadcrumb-item",{attrs:{to:{path:"/"}}},[e._v("首页")]),r("el-breadcrumb-item",{attrs:{to:{path:"/goods"}}},[e._v("商品管理")]),r("el-breadcrumb-item",[e._v("添加商品")])],1)],1),r("div",{staticClass:"my-form"},[r("el-form",{ref:"goodsForm",staticClass:"demo-ruleForm",attrs:{model:e.goodsForm,rules:e.rules,"label-width":"100px"}},[r("el-form-item",{attrs:{label:"类目选择",prop:"category"}},[r("el-button",{attrs:{type:"primary"}},[e._v("类目选择")])],1),r("el-form-item",{attrs:{label:"商品名称",prop:"name"}},[r("el-input",{model:{value:e.goodsForm.name,callback:function(t){e.$set(e.goodsForm,"name",t)},expression:"goodsForm.name"}})],1),r("el-form-item",{attrs:{label:"商品价格",prop:"price"}},[r("el-input",{model:{value:e.goodsForm.price,callback:function(t){e.$set(e.goodsForm,"price",t)},expression:"goodsForm.price"}})],1),r("el-form-item",{attrs:{label:"商品数量",prop:"num"}},[r("el-input",{model:{value:e.goodsForm.num,callback:function(t){e.$set(e.goodsForm,"num",t)},expression:"goodsForm.num"}})],1),r("el-form-item",{attrs:{label:"商品图片",prop:"image"}},[r("el-button",{attrs:{type:"primary"}},[e._v("上传图片")])],1),r("el-form-item",{attrs:{label:"商品日期",required:""}},[r("el-col",{attrs:{span:11}},[r("el-form-item",{attrs:{prop:"date"}},[r("el-date-picker",{staticStyle:{width:"100%"},attrs:{type:"date",placeholder:"选择日期"},model:{value:e.goodsForm.date,callback:function(t){e.$set(e.goodsForm,"date",t)},expression:"goodsForm.date"}})],1)],1)],1),r("el-form-item",{attrs:{label:"商品描述",prop:"text"}},[r("el-input",{attrs:{type:"textarea",rows:"5",placeholder:"请输入商品描述"},model:{value:e.goodsForm.text,callback:function(t){e.$set(e.goodsForm,"text",t)},expression:"goodsForm.text"}})],1),r("el-form-item",[r("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.submitForm("goodsForm")}}},[e._v("确定")]),r("el-button",{on:{click:function(t){return e.resetForm("goodsForm")}}},[e._v("重置")])],1)],1)],1)])},s=[],a={name:"AddGoods",data(){return{goodsForm:{name:"",id:"",price:"",num:"",date:"",image:"",text:"",category:""},rules:{name:[{required:!0,message:"请输入商品名称",trigger:"blur"}],date:[{type:"date",required:!0,message:"请选择日期",trigger:"change"}],text:[{required:!0,message:"请填写商品描述",trigger:"blur"}]}}},methods:{submitForm(e){this.$refs[e].validate((e=>{if(!e)return console.log("error submit!!"),!1;alert("submit!")}))},resetForm(e){this.$refs[e].resetFields()}}},l=a,m=r(1001),i=(0,m.Z)(l,o,s,!1,null,"7b9b2733",null),d=i.exports}}]);
//# sourceMappingURL=349.3d46296b.js.map