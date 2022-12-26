import 'bootstrap/dist/css/bootstrap.min.css';
import { createApp } from 'vue';
import App from './App.vue';
// import Vue from 'vue/dist/vue.esm-bundler.js';
import './assets/main.css';
import router from './router';
import axios from 'axios';

// 이 호출을 통해 $router, $route 객체에 접근 가능. $router: 다른 컴포넌트로 이동, $route 설정된 routes 정보 꺼낼 수 있음
const app = createApp(App);
// app.provide('$axios', axios);
// app.config.globalProperties.$axios = axios; // 전역 변수로 선언하여 컴포넌트에서 this.$axios 호출 가능
// app.config.globalProperties.$serverUrl = '//localhost:8080';
app.use(router).mount('#app');
import 'bootstrap/dist/js/bootstrap.js';
