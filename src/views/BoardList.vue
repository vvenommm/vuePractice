<script setup>
import { toRef, ref, onMounted, reactive } from 'vue';
import board from '@/data';
import page from '@/data';
import { getPosts } from '@/api/posts';
import getPostsWithPage from '@/api/posts';
import { useRouter } from 'vue-router';

console.log('여기는 보드리스트--------------------');
console.log('서버에서 가져온 DB : ', board);

const startPage = ref([]);
const currentPage = ref([]);
const endPage = ref([]);

const fetchPosts = async () => {
	const response = await getPosts();
	console.log('getPosts return : ', response.data);
	board.posts = response.data.posts;
	page.value = response.data.page;
	console.log('page : ', page.value);
	console.log('posts : ', board.posts);

	startPage.value = page.value.startPage;
	currentPage.value = page.value.currentPage;
	endPage.value = page.value.endPage;
};
fetchPosts();

const readPost = num => {
	console.log('글번호 파라미터 ', num);
	// const router = useRouter();
	// router.push({
	// 	path: `/read/${currentPage.value}/${num}`,
	// });
};
</script>

<template>
	<div id="tableDiv" class="card">
		<table id="tb" class="tb table">
			<thead id="tb_head">
				<tr id="thead_tr">
					<th></th>
					<th>번호</th>
					<th>말머리</th>
					<th>제목</th>
					<th>작성자</th>
					<th>작성일</th>
					<th>조회수</th>
				</tr>
			</thead>
			<tbody id="tb_body">
				<!-- key는 항상 유일값으로 적어줌 v-model은 알아서 연결해줌. v-bind:~은 직접 연결이며 :~만 적어도 됨-->
				<tr v-for="post in board.posts" :key="post.num">
					<td><input type="checkbox" /></td>
					<td>{{ post.rownum }}</td>
					<!-- <td>{{ post.category }}</td> -->
					<td v-if="post.category === 'q'">질문</td>
					<td v-if="post.category === 'f'">자유</td>
					<td v-if="post.category === 'e'">기타</td>
					<td>
						<!-- <router-link :to="`/read/${currentPage}/${post.num}`">
							{{ post.title }} ({{ post.commentCnt }})
						</router-link> -->
						<router-link
							:to="{
								name: 'Read',
								params: { currentPage: currentPage, num: post.num },
							}"
						>
							{{ post.title }} ({{ post.commentCnt }})
						</router-link>
						<!-- <a href="" @click="readPost(post.num)">
							{{ post.title }} ({{ post.commentCnt }})
						</a> -->
					</td>
					<td>{{ post.nickname }}</td>
					<td>{{ post.dates }}</td>
					<td>{{ post.views }}</td>
				</tr>
			</tbody>
		</table>
	</div>
	<span v-if="currentPage == 1">1인가?</span>
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
				<a v-else class="page-link" href="#" aria-label="Previous">
					<span aria-hidden="true">&laquo;</span>
				</a>
			</li>
			<li class="page-item" v-for="index in endPage" :key="index">
				<a class="page-link" href="#">{{ index }}</a>
			</li>
			<li class="page-item">
				<a
					v-if="endPage < 6"
					class="page-link disabled"
					href="#"
					aria-label="Next"
					area-disabled="true"
				>
					<span aria-hidden="true">&raquo;</span>
				</a>
				<a v-else class="page-link" href="#" aria-label="Next">
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
	background-color: #ffb914;
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
	background-color: #feede0;
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
</style>
