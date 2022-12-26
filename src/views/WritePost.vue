<script setup>
import { ref } from 'vue';
import data from '@/data';
import { useRouter } from 'vue-router';
import axios from 'axios';

// ref -> number, string
// reactive -> {}

// const route = useRoute();
console.log('WritePost - board : ', data.Posts);

const catList = [
	{
		text: '질문',
		value: '질문',
	},
	{
		text: '자유',
		value: '자유',
	},
	{
		text: '기타',
		value: '기타',
	},
];

const post = ref({
	bnum: 0,
	category: '',
	title: '',
	writer: '',
	contents: '',
	dates: '22/12/22',
	comments: 0,
	views: 0,
});

const addPost = () => {
	post.value.bnum = data.Posts.length;
	console.log('작성한 글', post);
	console.log('before push --', data);
	console.log('before length --', data.Posts.length);
	var cnt = data.Posts.push(post.value);
	console.log('결과 ', cnt);
	console.log('after push --', data);
	if (parseInt(cnt) == post.value.bnum + 1) {
		const router = useRouter();
		// router.push({ name: 'Read', params: { bnum: post.value.bnum } });
		router.push({ path: '/' });

		// router.replace({ path: '/' });
	} else {
		alert('오류 발생');
	}
};

console.log('post', post);
</script>

<template>
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
		</div>
		<div class="mb-3">
			<label for="title" class="form-label">제목</label>
			<input
				type="text"
				v-model="post.title"
				placeholder="제목을 입력해주세요."
			/>
			<input type="text" v-model="post.writer" placeholder="닉네임" />
		</div>
		<div class="mb-3">
			<label for="contents" class="form-label">내용</label>
			<textarea v-model="post.contents" row="20" cols="50" required></textarea>
		</div>
		<div class="pt-4">
			<button @click="addPost()">글등록</button>
			<button @click="$router.push('/')">글목록</button>
		</div>
	</form>
</template>

<style>
h1 {
	color: #fa7204;
}

.card {
	width: 840px;
}
</style>
