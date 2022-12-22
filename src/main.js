import { createApp } from "vue";
import App from "./App.vue";
// import Vue from 'vue/dist/vue.esm-bundler.js';
import "./assets/main.css";
import router from "./router";

// const app = createApp(App).use(router); // 이 호출을 통해 $router, $route 객체에 접근 가능. $router: 다른 컴포넌트로 이동, $route 설정된 routes 정보 꺼낼 수 있음
createApp(App).use(router).mount("#app");
