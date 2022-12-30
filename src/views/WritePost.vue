<template>
	{{ route.params }}
	<h2>글등록</h2>
	<hr class="my-4" />
	<form @submit.prevent>
		<div class="mb-3">
			<select v-model="post.category">
				<option value="">-- 말머리 --</option>
				<option v-for="cat in catList" :key="cat.text" :value="cat.value">
					{{ cat.text }}
				</option>
			</select>
			<div class="dropdown">
				<button
					class="btn btn-secondary dropdown-toggle"
					type="button"
					id="dropdownMenuButton1"
					data-bs-toggle="dropdown"
					aria-expanded="false"
				>
					Dropdown button
				</button>
				<ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
					<li><a class="dropdown-item" href="#">Action</a></li>
					<li><a class="dropdown-item" href="#">Another action</a></li>
					<li><a class="dropdown-item" href="#">Something else here</a></li>
				</ul>
			</div>
		</div>
		<div class="mb-3">
			<label for="title" class="form-label">제목</label>
			<input
				type="text"
				v-model="post.title"
				placeholder="제목을 입력해주세요."
			/>
			<input type="text" v-model="post.nickname" placeholder="닉네임" />
		</div>
		<div class="mb-3">
			<label for="contents" class="form-label">내용</label>
			<textarea
				v-if="num == 0"
				v-model="post.contents"
				row="20"
				cols="50"
				required
			></textarea>
			<textarea
				v-if="num > 0"
				v-model="post.contents"
				row="20"
				cols="50"
				required
			></textarea>
		</div>
		<div class="pt-4">
			<button class="btn btn-outline-warning" @click="addPost">글등록</button>
		</div>
	</form>
	<div class="float-end pt-4">
		<button
			class="btn btn-outline-warning"
			@click="
				$router.push({ name: 'Home', params: { currentPage: currentPage } })
			"
		>
			글목록
		</button>
		<router-link
			:to="{
				name: 'Home',
				params: { currentPage: currentPage },
			}"
		>
			<button class="btn btn-warning">글목록2</button>
		</router-link>
	</div>
</template>

<script setup>
import { ref } from 'vue';
// import data from '@/data';
import { useRouter, useRoute } from 'vue-router';
// import axios from 'axios';
import { writePost, readPost } from '@/api/posts';

// ref -> number, string
// reactive -> {}

const route = useRoute();
const num = ref(0);
const comments = ref([]);
const currentPage = ref();
currentPage.value = route.params.currentPage;
// console.log('WritePost - board : ', data.Posts);

const catList = [
	{
		text: '질문',
		value: 'q',
	},
	{
		text: '자유',
		value: 'f',
	},
	{
		text: '기타',
		value: 'e',
	},
];

const post = ref({
	// bnum: 0,
	category: '',
	title: '',
	nickname: '',
	contents: '',
	// dates: '22/12/22',
	comments: 0,
	views: 0,
});

const fetchPost = async () => {
	const response = await readPost(route.params.currentPage, route.params.num);
	console.log('editPost return : ', response.data);
	post.value.num = response.data.num;
	post.value.category = response.data.category;
	post.value.title = response.data.title;
	post.value.nickname = response.data.nickname;
	post.value.dates = response.data.dates;
	post.value.views = response.data.views;
	post.value.contents = String(response.data.contents).replaceAll('\n', '<br>');
	comments.value = response.data.commentList;
	// for (const comment in comments.value) {
	// 	console.log('댓글 : ', comment.value.contents);
	// 	comment.value.contents = String(comment.value.contents).replaceAll(
	// 		'\n',
	// 		'<br>',
	// 	);
	// }
	console.log('post : ', post.value);
	console.log('comments : ', comments.value);
};

if (route.params.num != null) {
	num.value = route.params.num;
	fetchPost();
	console.log('edit할 글 : ', post.value);
	post.value.category = response.data.category;
}

const errors = ref([]);

const addPost = async () => {
	// post.value.bnum = data.Posts.length;
	console.log('작성한 글', post.value);
	// console.log('before push --', data);
	// console.log('before length --', data.Posts.length);
	// var cnt = data.Posts.push(post.value);
	// console.log('결과 ', cnt);
	// console.log('after push --', data);
	// if (parseInt(cnt) == post.value.bnum + 1) {
	// const router = useRouter();
	// router.push({ name: 'Read', params: { bnum: post.value.bnum } });
	// router.push({ path: '/' });

	// router.replace({ path: '/' });
	// } else {
	// alert('오류 발생');
	// }

	const response = await writePost(post);
	console.log('글 등록 후 결과 : ', response.data);
	if (response.data.result == 0) {
		errors.value = response.data.errors;
		console.log(errors.value);
		if (errors.value.msg_category != null) {
			alert(errors.value.msg_category);
			return;
		}
		if (errors.value.msg_title != null) {
			alert(errors.value.msg_title);
			return;
		}
		if (errors.value.msg_nickname != null) {
			alert(errors.value.msg_nickname);
			return;
		}
		if (errors.value.msg_contents != null) {
			alert(errors.value.msg_contents);
			return;
		}
	} else {
		const router = useRouter();
		router.push({
			path: `/read/1/${response.data.post.num}`,
		});
	}
};

const backToList = () => {
	console.log(route.params);
};

console.log('post', post.value);
</script>

<style>
h1 {
	color: #fa7204;
}

.card {
	width: 840px;
}
</style>
