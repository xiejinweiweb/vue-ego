<!-- 弹框添加 -->
<template>
  <div>
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      width="80%"
      :before-close="handleClose"
    >
      <div class="my-form">
        <el-form
          :model="goodsForm"
          :rules="rules"
          ref="goodsForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="类目选择" prop="category">
            <el-button type="primary" @click="innerVisible = true"
              >类目选择</el-button
            >
            <span>{{ goodsForm.category }}</span>
          </el-form-item>
          <el-form-item label="商品名称" prop="name">
            <el-input v-model="goodsForm.name"></el-input>
          </el-form-item>
          <el-form-item label="商品价格" prop="price">
            <el-input v-model="goodsForm.price"></el-input>
          </el-form-item>
          <el-form-item label="商品数量" prop="num">
            <el-input v-model="goodsForm.num"></el-input>
          </el-form-item>
          <el-form-item label="商品图片" prop="image">
            <el-button type="primary" @click="innerVisibleImg = true"
              >上传图片</el-button
            >
            <span>{{ goodsForm.image }}</span>
          </el-form-item>
          <el-form-item label="商品日期">
            <el-col :span="11">
              <el-form-item prop="date">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="goodsForm.date"
                  style="width: 100%"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-form-item>

          <el-form-item label="商品描述" prop="text">
            <!-- <el-input type="textarea" rows="1" v-model="goodsForm.text" placeholder="请输入商品描述"></el-input> -->
            <WangEditor
              @sendGoodsText="sendGoodsText"
              ref="myEditor"
            ></WangEditor>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="resetForm('goodsForm')"
              >清空</el-button
            >
          </el-form-item>
        </el-form>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="closeForm('goodsForm')">取消</el-button>
        <el-button type="primary" @click="submitForm('goodsForm')"
          >确定</el-button
        >
      </span>
      <!-- 类目选择内层弹框 -->
      <el-dialog
        width="40%"
        title="类目选择"
        :visible.sync="innerVisible"
        append-to-body
      >
        <CategorySelect @sendTreeData="sendTreeData"></CategorySelect>
        <span slot="footer" class="dialog-footer">
          <el-button @click="innerVisible = false">取消</el-button>
          <el-button type="primary" @click="showTreeData">确定</el-button>
        </span>
      </el-dialog>

      <!-- 上传图片内层弹框 -->
      <el-dialog
        width="40%"
        title="上传图片"
        :visible.sync="innerVisibleImg"
        append-to-body
      >
        <UploadImg @sendImg="sendImg"></UploadImg>
        <span slot="footer" class="dialog-footer">
          <el-button @click="innerVisibleImg = false">取消</el-button>
          <el-button type="primary" @click="showImg">确定</el-button>
        </span>
      </el-dialog>
    </el-dialog>
  </div>
</template>

<script>
import CategorySelect from "./CategorySelect.vue";
import UploadImg from "./UploadImg.vue";
import WangEditor from "./WangEditor.vue";
import { nanoid } from "nanoid";
export default {
  components: { CategorySelect, UploadImg, WangEditor },
  name: "GoodsDialog",
  // props: ["dialogVisible"],
  // props: ["dialogTitle", "rowData"],
  props: {
    dialogTitle: {
      type: String,
      default: "",
    },
    rowData: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      treeData: {},
      innerVisibleImg: false, //内弹框
      innerVisible: false, //内弹框
      dialogVisible: false, //外弹框
      goodsForm: {
        name: "",
        id: "",
        price: "",
        num: "",
        date: "",
        image: "",
        text: "",
        category: "",
      },
      rules: {
        name: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
          // { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        text: [{ required: false, message: "请填写商品描述", trigger: "blur" }],
      },
    };
  },

  watch: {
    rowData(val) {
      console.log("监听到数据变化，新值为：", val);
      this.goodsForm = val;
      // console.log('---this.$refs.myEditor',this.$refs.myEditor);
      // this.$refs.myEditor.html=val.text
      // 设置富文本编辑的数据内容
      this.$nextTick(() => {
        console.log("---this.$refs.myEditor", this.$refs.myEditor);
        this.$refs.myEditor.html = val.text;
      });
    },
  },
  methods: {
    sendGoodsText(html) {
      // console.log('此处的html是：',html);
      this.goodsForm.text = html;
    },
    showImg() {
      this.innerVisibleImg = false;
    },
    sendImg(img) {
      console.log("显示图片地址", img);
      this.goodsForm.image = img;
    },
    showTreeData() {
      this.innerVisible = false;
      this.goodsForm.category = this.treeData.name;
    },
    sendTreeData(data) {
      console.log("sendTreeData", data);
      this.treeData = data;
    },
    // closeDialog() {
    //   // this.$emit("closeDialog");
    //   //-----------------------
    //   this.dialogVisible = false;
    // },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          // done();
          this.closeForm("goodsForm");
        })
        .catch((_) => {});
      //采用ref方式改数据dialogVisible时，以上注释可解开
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log("this.goodsForm", this.goodsForm);
          //提交到后台之前 一定记得判断选择的状态时商品添加 还是编辑商品
          if (this.dialogTitle === "添加商品") {
            this.goodsForm.id = nanoid();
            console.log("添加商品");
            this.$emit("submitToGoods", this.goodsForm);
            // alert("submit!");
            this.$message({
              message: "添加成功",
              type: "success",
            });
          } else {
            console.log("编辑商品");
            this.$emit("editToGoods", this.goodsForm);
            this.$message({
              message: "编辑成功",
              type: "success",
            });
          }
          this.closeForm(formName);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    closeForm(formName) {
      this.dialogVisible = false;
      this.resetForm("goodsForm");
    },
    resetForm(formName) {
      //this.goodsForm.id = "";
      // this.$refs[formName].resetFields();//这个用之前会自动保存一边数据先
      //  console.log('此处的this.$refs', this.$refs);
      this.goodsForm = {
        name: "",
        id: "",
        price: "",
        num: "",
        date: "",
        image: "",
        text: "",
        category: "",
      };
      this.$refs.myEditor.editor.clear();
    },
  },
};
</script>

<style scoped>
.my-form {
  background-color: #fff;
  padding: 10px 30px 10px 10px;
}
</style>
