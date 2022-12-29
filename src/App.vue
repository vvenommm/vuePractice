<script setup>
import HelloWorld from './components/HelloWorld.vue'; // ESLint는 세미콜론 안 씀
// import TheWelcome from './components/TheWelcome.vue';
// import BoardList from './views/BoardList.vue';

// import { useRoute, useRouter } from 'vue-router';
// import { inject } from 'vue';

// const route = useRoute();
// console.log('route.path: {}', route.path);

// const router = useRouter();
// const goWritePage = () => {
// 	router.push('/write');
// };

// created(){
// const $axios = inject('$axios');
// console.log('axios? : ', $axios);
// }
</script>

<template>
	<header>
		<div class="headerBox">
			<img
				alt="Vue logo"
				class="logo"
				src="./assets/crewmate.png"
				width="613"
				height="131"
			/>

			<div class="wrapper">
				<HelloWorld msg="You're my crewmate!" />
			</div>
		</div>
	</header>
	<nav>
		<div id="navBox">
			<router-link to="/1">
				<button class="btn btn-outline-warning">Home</button>
			</router-link>
			<!-- <router-link to="/write">글쓰기</router-link> -->
			<!-- 페이지 리로딩 없이 맵핑된 페이지 렌더링 -->
		</div>
	</nav>
	<main>
		<div class="container">
			<RouterView></RouterView>
			<!-- url에 맵핑된 컴포넌트를 화면에 표시 -->
		</div>
	</main>
	<footer>
		<h6>@2022 Crewmate</h6>
	</footer>
</template>

<style scoped>
header {
	line-height: 1.5;
	margin-top: 10%;
	margin-bottom: 5%;
}

.logo {
	display: block;
	margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
	header {
		/* display: flex; */
		display: block;
		place-items: center;
		padding-right: calc(var(--section-gap) / 2);
	}

	.headerBox {
		/* display: flex; */
	}

	.logo {
		margin: 0 2rem 0 0;
	}

	header .wrapper {
		display: flex;
		place-items: flex-start;
		flex-wrap: wrap;
	}
}

nav,
main {
	display: flex;
	margin-bottom: 5%;
}

#navBox {
	text-align: center;
}

/* .btn-outline-warning {
	border: 1px solid #ffb914;
}

.btn-outline-warning:hover {
	background-color: #feede0;
} */

.btn-outline-warning {
	color: #fa7204;
	--bs-btn-border-color: #fa7204;
	--bs-btn-hover-bg: #fff7f1;
	--bs-btn-hover-color: #000000;
	--bs-btn-hover-border-color: #fa7204;
	--bs-btn-active-color: #000;
	--bs-btn-active-bg: #fff7f1;
	--bs-btn-active-border-color: #fa7204;
}
</style>
