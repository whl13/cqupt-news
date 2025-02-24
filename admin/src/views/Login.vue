<template>
  <div>
    <Particles
      id="tsparticles"
      :particlesInit="particlesInit"
      :options="options"
    />
    <div class="loginForm">
      <div class="loginTitle">
        <img src="https://www.cqupt.edu.cn/dfiles/13011/cqupt/img/logo.jpg" />
        <h3>新闻管理系统</h3>
      </div>
      <el-form
        ref="loginFormRef"
        style="max-width: 350px"
        :model="loginForm"
        status-icon
        :rules="loginRules"
        label-width="auto"
        class="loginForm-body"
        @keyup.enter="submitForm"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="loginForm.username" autocomplete="off" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm()" class="login-btn">
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script setup>
import { reactive, ref } from "vue";
import { loadSlim } from "tsparticles-slim";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import store from "@/store";
import axios from "axios";
const particlesInit = async (engine) => {
  //await loadFull(engine);
  await loadSlim(engine);
};

const loginForm = reactive({
  username: "",
  password: "",
});
const loginFormRef = ref();
const loginRules = reactive({
  username: [
    { required: true, message: "请输入用户名", trigger: "blur" },
    { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 6, max: 10, message: "长度在 6 到 10 个字符", trigger: "blur" },
  ],
});
const router = useRouter();
const submitForm = () => {
  loginFormRef.value.validate((valid) => {
    if (valid) {
      axios
        .post("/adminapi/user/login", loginForm)
        .then((res) => {
          if (res.data.code === 200) {
            ElMessage({
              message: "登陆成功",
              type: "success",
            });
            console.log(res.data.data);
            store.commit("setUserInfo", {
              username: res.data.data.username,
              role: res.data.data.role,
              avatar: res.data.data.avatar,
              introduction: res.data.data.introduction,
            });
            store.commit("setGetRouter", false);
            router.push("/index");
          } else {
            ElMessage.error("用户名或密码错误");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("error submit!!");
      return false;
    }
  });
};
const options = reactive({
  background: {
    color: {
      value: "rgb(143,188,143)", // 粒子颜色
    },
  },
  fpsLimit: 60,
  interactivity: {
    events: {
      onClick: {
        enable: true,
        mode: "push", // 可用的click模式有: "push", "remove", "repulse", "bubble"。
      },
      onHover: {
        enable: true,
        mode: "grab", // 可用的hover模式有: "grab", "repulse", "bubble"。
      },
      resize: true,
    },
    modes: {
      bubble: {
        distance: 400,
        duration: 2,
        opacity: 0.8,
        size: 40,
      },
      push: {
        quantity: 4,
      },
      repulse: {
        distance: 200,
        duration: 0.4,
      },
    },
  },
  particles: {
    color: {
      value: "#ffffff",
    },
    links: {
      color: "#ffffff", // '#dedede'。线条颜色。
      distance: 150, // 线条长度
      enable: true, // 是否有线条
      opacity: 0.5, // 线条透明度。
      width: 1, // 线条宽度。
    },
    collisions: {
      enable: false,
    },
    move: {
      direction: "none",
      enable: true,
      outMode: "bounce",
      random: false,
      speed: 4, // 粒子运动速度。
      straight: false,
    },
    number: {
      density: {
        enable: true,
        area: 800,
      },
      value: 80, // 粒子数量。
    },
    opacity: {
      value: 0.5, // 粒子透明度。
    },
    shape: {
      type: "circle", // 可用的粒子外观类型有："circle","edge","triangle", "polygon","star"
    },
    size: {
      random: true,
      value: 5,
    },
  },
  detectRetina: true,
});
</script>
<style lang="scss" scoped>
.loginForm {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 700px;
  height: 400px;
  background-color: rgba($color: #fff, $alpha: 0.8);
  text-align: center;
  .loginTitle {
    margin: 30px auto;
    font-size: 30px;
  }
  .loginForm-body {
    margin: 0 auto;
    .login-btn {
      margin: 0 auto;
    }
  }
}
</style>