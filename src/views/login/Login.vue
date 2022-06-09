<!-- 登录界面 -->
<template>
  <div class="login_container">
    <div class="header">
      <h1>SHU后台管理系统</h1>
      <h3>欢迎登录</h3>
    </div>
    <div class="login_box">
      <el-form
        status-icon
        ref="loginForm"
        :model="loginForm"
        :rules="loginRules"
        class="login_form"
        label-width="100px"
      >
        <el-form-item label="账号" prop="username" class="whiteItem">
          <el-input
            v-model="loginForm.username"
            auto-complete="on"
            prefix-icon="el-icon-user"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" class="whiteItem">
          <el-input
            v-model="loginForm.password"
            auto-complete="on"
            prefix-icon="el-icon-unlock"
            type="password"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-checkbox v-model="checked" class="loginRem">记住我</el-checkbox>
          <el-button @click="resetForm('loginForm')" class="btns">
            重置
          </el-button>
          <el-button
            type="primary"
            @click="submitForm('loginForm')"
            class="btns"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <div class="avatar_box">
      <img src="../../assets/logo.png" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
//映射状态
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
export default {
  name: "Login",
  data() {
    var validateUser = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else {
        if (this.loginForm.username !== "") {
          //   this.$refs.ruleForm.validateField("username");
        }
        callback();
      }
    };

    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.loginForm.password !== "") {
          //this.$refs.ruleForm.validateField("password");
        }
        callback();
      }
    };
    return {
      checked: true,
      loginForm: {
        username: "",
        password: "",
      },
      loginRules: {
        username: [
          { validator: validateUser, message: "请输入用户名", trigger: "blur" },
          { min: 2, max: 8, message: "长度在 2 到 8 个字符", trigger: "blur" },
        ],
        password: [
          { validator: validatePass, message: "请输入密码", trigger: "blur" },
          { min: 2, max: 8, message: "密码为 2~8 位", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    //借助mapMutations生成对应的方法，方法中会调用commit去联系mutations(对象写法)
    ...mapMutations("loginAbout", { setUser: "setUser" }),
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const url = "/test/login";
          // console.log("校验loginForm", this.loginForm);
          const { data: res } = await axios.post(url, {
            params: {
              username: this.loginForm.username,
              password: this.loginForm.password,
            },
          }); //发送请求
          if (res.meta.status === 200) {
            //成功
            this.$message.success("登录成功");
            // console.log("成功返回的token和name在res.user里面", res.user);
            // 1.Mutations写入store
            let obj = {
              username: res.user.username,
              token: res.user.token,
            };
            this.setUser(obj);
            // 2.存到本地localStorage
            localStorage.setItem("user", JSON.stringify(obj));
            // 3.跳转路由至首页
            this.$router.push("/");
          } else {
            //失败
            return this.$message.error("用户名或密码错误");
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.getUser();
      console.log("------");
      console.log(this.$refs);
      this.$refs[formName].resetFields();
    },
    async getUser() {
      const { data: res } = await axios.get("/user-list");
      console.log(res);
    },
  },
};
</script>

<style scoped>
/*  根节点样式 */
.login_container {
  width: 100%;
  height: 100%;
  position: fixed;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-image: url("../../assets/images/20191028161458231.gif");
}
.header {
  width: 450px;
  color: #fff;
  position: absolute; /* 绝对定位 */
  left: 50%;
  top: 20%;
  transform: translate(-20%, -50%);
}
.header h3 {
  float: right;
}
/* 登录框 */
.login_box {
  width: 450px;
  height: 360px;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  background-color: rgba(221, 221, 221, 0.5);
  background-image: url("../../assets/images/下载.png");
  border-radius: 3px; /* 圆角 */
  position: absolute; /* 绝对定位 */
  left: 60%;
  top: 50%;
  transform: translate(-50%, -50%); /* 根据自己位置 以自己为长度位移 */
}

/* 头像框 */
.avatar_box {
  width: 130px;
  height: 130px;
  border: 1px solid #eee;
  border-radius: 50%; /* 加圆角 */
  padding: 10px;
  box-shadow: 0 0 10px #ddd; /* 盒子阴影 */
  position: absolute;
  opacity: 0.8; /* 透明属性 */
  left: 60%;
  top: 25%;
  transform: translate(-50%, -50%);
  background-color: rgba(221, 221, 221, 0.5);
}
.avatar_box img {
  width: 100%;
  height: 100%;
  border-radius: 50%; /* 加圆角 */
  background-color: #eee;
}
.loginRem {
  float: left;
  color: rgb(255, 255, 255);
  font-weight: 500;
  padding-right: 10px;
}
.btns {
  float: right;
  border-radius: 30px;
  margin: 0 10px 0 10px;
}

.login_form {
  position: absolute;
  bottom: 0%;
  width: 100%;
  padding: 0 50px 0 10px;
  box-sizing: border-box; /* 设置边框 */
}
</style>
