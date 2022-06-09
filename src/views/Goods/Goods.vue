<!-- 商品管理 -->
<template>
  <div class="goods">
    <!-- 1.搜索区域 -->
    <div class="header">
      <!-- change	仅在输入框失去焦点或用户按下回车时触发	(value: string | number) -->
      <el-input
        @change="searchInput"
        v-model="searchInfo.searchKey"
        placeholder="请输入内容"
      ></el-input>
      <el-button type="primary" @click="searchInput">查询</el-button>
      <el-button type="primary">
        <router-link to="/add-goods" style="color: #fff">页面添加</router-link>
      </el-button>
      <el-button type="primary" @click="addGoods">弹框添加</el-button>
    </div>
    <!-- 2.表格区域展示 -->
    <div class="wrapper">
      <el-table :data="tableData" border>
        <el-table-column type="selection" width="50"></el-table-column>
        <el-table-column prop="id" label="商品ID" width="170"></el-table-column>
        <el-table-column
          prop="name"
          label="商品名称"
          width="120"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="price"
          label="商品价格"
          width="80"
        ></el-table-column>
        <el-table-column
          prop="num"
          label="商品数量"
          width="80"
        ></el-table-column>
        <el-table-column
          prop="category"
          label="规格类目"
          width="80"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="image"
          label="商品图片"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="date"
          label="商品日期"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="text"
          label="商品描述"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column prop="operation" label="操作" width="180">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
              >编辑
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 3.分页展示 -->
    <div class="laypage">
      <Pagination
        :total="total"
        :pageSize="pageSize"
        @changePage="changePage"
      ></Pagination>
    </div>
    <!-- 4.弹框添加 -->
    <!-- 显示弹框组件操作子组件: 1.父传子props $emit 2.children 3.ref-->
    <!-- <GoodsDialog :dialogVisible="dialogVisible" @closeDialog="closeDialog"></GoodsDialog> -->
    <GoodsDialog
      :dialogTitle="dialogTitle"
      :rowData="rowData"
      ref="dialog"
      @submitToGoods="submitToGoods"
      @editToGoods="editToGoods"
    ></GoodsDialog>
  </div>
</template>

<script>
// import { getList } from "../../../api/getData";
import axios from "axios";
import Pagination from "../../components/Pagination.vue";
import GoodsDialog from "./GoodsDialog.vue";
// import moment from "moment";
export default {
  data() {
    return {
      rowData: {}, //选中的那条数据
      dialogTitle: "",
      // dialogVisible:false,
      tableData: [
        // {
        //   date: "2016-05-02",
        //   name: "王小虎",
        //   address: "上海市普陀区金沙江路 1518 弄",
        // },
        // {
        //   date: "2016-05-04",
        //   name: "王小虎",
        //   address: "上海市普陀区金沙江路 1517 弄",
        // },
        // {
        //   date: "2016-05-01",
        //   name: "王小虎",
        //   address: "上海市普陀区金沙江路 1519 弄",
        // },
        // {
        //   date: "2016-05-03",
        //   name: "王小虎",
        //   address: "上海市普陀区金沙江路 1516 弄",
        // },
      ],
      pageSize: 0, //每页条数
      total: 0, //总计条数
      searchInfo: { searchKey: "" }, //多条件搜索
    };
  },
  components: { Pagination, GoodsDialog },

  methods: {
    editToGoods(newTableData) {
      // console.log('注意页面我没有调整');
      console.log("newTableData", newTableData);
      this.tableData.forEach((item) => {
        if (item.id === newTableData.id) {
          item.name = newTableData.name;
          item.price = newTableData.price;
          item.num = newTableData.num;
          item.date = newTableData.date;
          item.image = newTableData.image;
          item.text = newTableData.text;
          item.category = newTableData.category;
        }
      });
    },
    submitToGoods(newTableData) {
      // console.log('注意页面我没有调整');
      // newTableData.date=moment(newTableData.date).format("YYYY-MM-DD")
      console.log("newTableData", newTableData);
      this.tableData.unshift(newTableData);
    },
    addGoods() {
      //  this.dialogVisible=true
      //----------------------
      //修改子组件变量的数据
      this.$refs.dialog.dialogVisible = true;
      this.dialogTitle = "添加商品";
      // this.rowData={}
    },
    // closeDialog(){
    //   this.dialogVisible=false
    // },
    searchInput(val) {
      // console.log("搜索", val);
      this.getMockList(0);
    },
    changePage(page) {
      // debugger
      this.getMockList(page - 1);
    },
    handleEdit(index, row) {
      console.log("index", index, "row", row);
      this.$refs.dialog.dialogVisible = true;
      this.dialogTitle = "编辑商品";
      //第一种方法
      // this.$refs.dialog.goodsForm = row;
      // this.rowData=row  //row={} 每次点击同一条数据 不会引起监听
      this.rowData = { ...row };
    },
    handleDelete(index, row) {
      console.log("index", index, "row", row);
      this.$confirm("删除此条数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //删除一项 模拟数据
          this.tableData = this.tableData.filter((item) => {
            return item.id !== row.id;
          });
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    async getMockList(num) {
      //获取虚拟数据
      try {
        const url = "user/goodsList";
        // console.log(this);
        const res = await axios.post(url, {
          params: {
            pageIndex: num, //页码
            pageSize: 10,
            searchKey: this.searchInfo.searchKey.trim(),
          },
        });
        // console.log("res.data", res.data);
        this.tableData = res.data.data.rows;
        this.total = res.data.data.total;
        this.pageSize = res.data.data.pageSize;
      } catch (err) {
        console.dir(err);
        this.$message.error({
          message: err.message,
          duration: 1500,
        });
      }
    },
  },
  mounted() {
    this.getMockList(0);
  },
};
</script>


<style scoped>
.goods {
  margin: 20px;
}
.header {
  display: flex;
}
.header button {
  margin-left: 10px;
}
.wrapper {
  margin-top: 20px;
}
</style>
