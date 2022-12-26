<script setup>
import { onMounted, reactive } from 'vue';
import data from '@/data';
import { getPosts } from '@/axios';
import axios from 'axios';

// console.log('BoardList - posts : ', data.Posts);

onMounted(() => {
	console.log('마운트 성공');
	getPosts();

	// axios.get('http://localhost:8080/main').then(response => {
	//   console.log('boardList : ', response.data);
	// });
});
</script>

<template>
	<div id="tableDiv" class="card">
		<table id="tb" class="tb">
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
				<tr v-for="post in data.Posts" :key="post.bnum">
					<td><input type="checkbox" /></td>
					<td>{{ post.bnum }}</td>
					<td>{{ post.category }}</td>
					<td>
						<router-link to="/read">
							{{ post.title }} ({{ post.comments }})
						</router-link>
					</td>
					<td>{{ post.writer }}</td>
					<td>{{ post.dates }}</td>
					<td>{{ post.views }}</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<style>
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
