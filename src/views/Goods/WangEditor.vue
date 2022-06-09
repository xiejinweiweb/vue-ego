<!-- 富文本 -->
<template>
  <div id="main" style="border: 1px solid #ccc; margin-top: 10px">
    <!-- 工具栏 -->
    <Toolbar
      style="border-bottom: 1px solid #ccc"
      :editor="editor"
      :defaultConfig="toolbarConfig"
    />
    <!-- 编辑器 -->
    <Editor
      style="height: 300px; overflow-y: hidden"
      :defaultConfig="editorConfig"
      v-model="html"
      @onChange="onChange"
      @onCreated="onCreated"
    />
  </div>
</template>

<script>
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import { DomEditor } from "@wangeditor/editor";
import "@wangeditor/editor/dist/css/style.css";

export default {
  components: { Editor, Toolbar },
  data() {
    return {
      editor: null,
      html: "",
      toolbarConfig: {
        /* 显示哪些菜单，如何排序、分组 */
        // toolbarKeys: [
          // "headerSelect",
          // "|",
          // "bold",
          // "underline",
          // "italic",
          // "color",
          // "bgColor",
          // "|",
          // "fontSize",
          // "fontFamily",
          // "lineHeight",
          // "|",
          // "bulletedList",
          // "numberedList",
          // "todo",
          // "|",
          // "emotion",
          // "insertLink",
          // "insertTable",
          // "codeBlock",
          // "divider",
        // ],
        // excludeKeys: [ ], /* 隐藏哪些菜单 */
      },
      editorConfig: {
        placeholder: "请输入内容...",
        autoFocus: false,
        readOnly: false, 
        // 所有的菜单配置，都要在 MENU_CONF 属性下
        MENU_CONF: {},
      },
    };
  },
  methods: {
    onCreated(editor) {
      this.editor = Object.seal(editor); // 【注意】一定要用 Object.seal() 否则会报错
    },
    onChange(editor) {
      // console.log("onChange", editor.getHtml() ); // onChange 时获取编辑器最新内容
      // const toolbar = DomEditor.getToolbar(editor)
      // console.log("工具栏配置", toolbar.getConfig().toolbarKeys ); // 工具栏配置
      //把获取的富文本编辑内容--传递给弹框组件---父组件
      // console.log('此处的this是：',this);
      this.$emit("sendGoodsText", editor.getHtml());
    },
    getEditorText() {
      const editor = this.editor;
      if (editor == null) return;
      // console.log(editor.getText()); // 执行 editor API
    },
    printEditorHtml() {
      const editor = this.editor;
      if (editor == null) return;
      // console.log(editor.getHtml()); // 执行 editor API
    },
  },
  mounted() {
    // // 模拟 ajax 请求，异步渲染编辑器
    // setTimeout(() => {
    //   this.html = this.content;
    // }, 1500);
  },
  beforeDestroy() {
    const editor = this.editor;
    if (editor == null) return;
    editor.destroy(); // 组件销毁时，及时销毁 editor ，重要！！！
  },
};
</script>

<style scoped>
</style>
