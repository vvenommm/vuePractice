<script setup>
import {
	toRef,
	ref,
	onMounted,
	reactive,
	onBeforeUpdate,
	onUpdated,
	watch,
	watchEffect,
} from 'vue';
import board from '@/data';
import page from '@/data';
import { getPosts } from '@/api/posts';
import { getPostsOfAnotherPage } from '@/api/posts';
import { useRouter, useRoute } from 'vue-router';

console.log('여기는 보드리스트--------------------');
console.log('서버에서 가져온 DB : ', board);

const route = useRoute();
const router = useRouter();
const startPage = ref();
const currentPage = ref(1);
const endPage = ref();
const totalPage = ref();
const pages = ref([]);

console.log('route params ????? ', route.params);
// currentPage.value = route.params.currentPage;

if (route.params.currentPage != null) {
	currentPage.value = route.params.currentPage;
}

watchEffect(async () => {
	console.log('watcheffect@@@ ');
	console.log('와치이펙트의 현재 페이지 값 : ', currentPage.value);

	const response = await getPostsOfAnotherPage(currentPage.value);
	console.log('getPosts return : ', response.data);
	setPosts(response);

	router.push({
		path: `/${currentPage.value}`,
	});
});

// const fetchPosts = async () => {
// 	// const response = await getPosts();
// 	const response = await getPostsOfAnotherPage(route.params.currentPage);
// 	console.log('getPosts return : ', response.data);

// 	setPosts(response);

// 	// board.posts = response.data.posts;
// 	// page.value = response.data.page;
// 	// console.log('page : ', page.value);
// 	// console.log('posts : ', board.posts);

// 	// startPage.value = page.value.startPage;
// 	// currentPage.value = page.value.currentPage;
// 	// endPage.value = page.value.endPage;
// 	// totalPage.value = page.value.totalPage;
// 	// pages.value = response.data.pageList;
// 	// console.log('페이지 리스트 : ', pages.value);
// };
// fetchPosts();

const setPosts = response => {
	// console.log('assign Posts : ', response.data);
	board.posts = response.data.posts;
	page.value = response.data.page;
	// console.log('page : ', page.value);
	// console.log('posts : ', board.posts);

	startPage.value = page.value.startPage;
	currentPage.value = page.value.currentPage;
	endPage.value = page.value.endPage;
	totalPage.value = page.value.totalPage;
	pages.value = response.data.pageList;
	// console.log('페이지 리스트 : ', pages.value);
};

// watch(currentPage, (newPage, oldPage) => {
// 	console.log('oldPage : ', oldPage);
// 	console.log('newPage : ', newPage);
// 	console.log('currentPage : ', currentPage);

// 	const response = getPostsOfAnotherPage(newPage);
// 	console.log('getPosts return : ', response.data);

// 	assignPosts(response);
// 	router.push({
// 		path: `/${newPage}`,
// 	});
// });

const nextPage = () => {
	console.log('nextPage work? : ');
	console.log('startPage value : ', startPage.value);
	console.log('endPage value : ', endPage.value);

	currentPage.value = startPage.value + 5;
};

const beforePage = () => {
	console.log('its beforePage');
	console.log('startPage value : ', startPage.value);
	console.log('endPage value : ', endPage.value);
	currentPage.value = startPage.value - 5;
};

const moveToAnotherPage = pageNum => {
	console.log('선택한 페이지 넘버 ', pageNum);
	currentPage.value = pageNum;
	// const response = await getPostsOfAnotherPage(pageNum);
	// console.log('getPosts return : ', response.data);

	// assignPosts(response);
};

// onBeforeUpdate(() => {
// 	console.log('before update');
// });
// onUpdated(() => {
// 	console.log('updated');
// });
</script>

<template>
	{{ route.params }}
	<div id="btnDiv" class="">
		<!-- <router-link to="/write/${currentPage.value}"> -->
		<button
			class="float-end btn btn-outline-warning"
			@click="$router.push(`/write/${currentPage}`)"
		>
			글쓰기
		</button>
		<!-- </router-link> -->
	</div>
	<div id="tableDiv" class="card">
		<table class="table table-hover table-nowrap mb-0" id="tb">
			<thead id="tb_head">
				<tr id="thead_tr">
					<th scope="col"></th>
					<th scope="col">번호</th>
					<th scope="col">말머리</th>
					<th scope="col">제목</th>
					<th scope="col">작성자</th>
					<th scope="col">작성일</th>
					<th scope="col">조회수</th>
				</tr>
			</thead>
			<tbody id="tb_body">
				<tr v-for="post in board.posts" :key="post.num">
					<td scope="row">
						<div class="form-check">
							<input
								class="form-check-input"
								type="checkbox"
								id="inlineCheckbox2"
								value="option1"
							/>
						</div>
					</td>
					<td>{{ post.rownum }}</td>
					<td v-if="post.category === 'q'">질문</td>
					<td v-if="post.category === 'f'">자유</td>
					<td v-if="post.category === 'e'">기타</td>
					<td>
						<router-link
							:to="{
								name: 'Read',
								params: { currentPage: currentPage, num: post.num },
							}"
						>
							{{ post.title }} ({{ post.commentCnt }})
						</router-link>
					</td>
					<td>{{ post.nickname }}</td>
					<td>{{ post.dates }}</td>
					<td>{{ post.views }}</td>
				</tr>
			</tbody>
		</table>
	</div>

	<!-- ---------------------- 페이징 ---------------------- -->
	<!-- <span v-if="currentPage == 1">1인가?</span> -->
	<nav aria-label="Page navigation">
		<ul class="pagination item-center">
			<li class="page-item" data>
				<a
					v-if="currentPage < 6"
					class="page-link disabled"
					href="#"
					aria-label="Previous"
					aria-disabled="true"
				>
					<span aria-hidden="true">&laquo;</span>
				</a>
				<a
					v-else
					@click="beforePage"
					class="page-link btn-outline-warning"
					href="#"
					aria-label="Previous"
				>
					<span aria-hidden="true">&laquo;</span>
				</a>
			</li>
			<!-- <li class="page-item" v-for="page in pages" :key="page"> -->
			<!-- <a class="page-link warning" href="#">{{ page }}</a>  -->
			<!-- <router-link
					:to="{
						name: 'Home',
						params: { currentPage: page },
					}"
					><button class="page-link warning">
						{{ page }}
					</button>
				</router-link>
			</li> -->
			<li class="page-item" v-for="page in pages" :key="page">
				<!-- <a class="page-link warning" href="#">{{ page }}</a> -->
				<button
					class="page-link btn-outline-warning"
					@click="moveToAnotherPage(`${page}`)"
					:class="currentPage == page ? 'btnActive' : ''"
				>
					{{ page }}
				</button>
			</li>
			<li class="page-item">
				<a
					v-if="totalPage < 6"
					class="page-link disabled"
					href="#"
					aria-label="Next"
					area-disabled="true"
				>
					<span aria-hidden="true">&raquo;</span>
				</a>
				<a
					v-else
					class="page-link btn-outline-warning"
					href="#"
					aria-label="Next"
					@click="nextPage()"
				>
					<span aria-hidden="true">&raquo;</span>
				</a>
			</li>
		</ul>
	</nav>
</template>

<style scoped>
#tableDiv {
	min-height: 390px;
	min-width: 650px;
}

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

.table {
	--bs-table-hover-bg: #feede0;
}

.tb {
	border: transparent;
	border-top: grey;
	border-bottom: grey;
	border-collapse: collapse;
	min-width: 800px;
}

tr {
	height: 35px;
}

th {
	text-align: center;
	/* background-color: #fac599; */
	background-color: #feede0;
	margin-top: 10px;
	margin-bottom: 10px;
}

td {
	text-align: center;
	margin-top: 10px;
	margin-bottom: 10px;
	padding: 5px;
}

tbody tr:hover {
	background-color: #fffaf5;
}

th:nth-child(1) {
	min-width: 3%;
}

th:nth-child(2) {
	min-width: 6%;
}

th:nth-child(3) {
	min-width: 10%;
}

th:nth-child(4) {
	min-width: 400px;
	max-width: 400px;
}

th:nth-child(5) {
	min-width: 10%;
}

th:nth-child(6) {
	min-width: 15%;
}

th:nth-child(7) {
	min-width: 10%;
}

td {
	text-align: center;
}

td:nth-child(4) {
	text-align: left;
}

div {
	place-items: center;
}

.btnActive {
	font-weight: bold;
	color: #fa7204;
	background-color: #fae4d4;
}
</style>
