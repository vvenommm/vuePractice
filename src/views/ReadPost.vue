<template>
	{{ route.params }}
	<div class="mb-3">
		<router-link
			:to="{
				name: 'Home',
				params: { currentPage: currentPage },
			}"
		>
			<button class="btn btn-outline-warning">글목록</button>
		</router-link>
	</div>

	<div class="card border">
		<div class="card-header p-3">
			<div class="row">
				<div class="col-2">
					<h4 class="card-title mb-0">
						[
						{{
							post.category == 'q'
								? '질문'
								: post.category == 'f'
								? '자유'
								: post.category == 'e'
								? '기타'
								: ''
						}}
						]
					</h4>
				</div>
				<div class="col-10">
					<h4 class="card-title mb-0">
						{{ post.title }}
					</h4>
				</div>
			</div>
			<div class="text-end">
				<!-- <span class="badge bg-primary align-middle fs-10"> -->
				{{ post.nickname }} ({{ post.dates }})
				<!-- </span> -->
			</div>
		</div>
		<div class="card-body">
			<div class="card">
				<div class="card-body" v-html="post.contents"></div>
			</div>
			<div class="card border">
				<!-- <div class="card-header">댓글</div> -->
				<div class="card-body">
					<h6>댓글</h6>
					<hr />

					<table class="table table-borderless table-nowrap" id="commentTable">
						<!-- <thead>
							<tr>
								<th scope="col">Id</th>
								<th scope="col">Name</th>
								<th scope="col">Job Title</th>
								<th scope="col">Date</th>
								<th scope="col">Status</th>
								<th scope="col"></th>
							</tr>
						</thead> -->
						<tbody>
							<tr v-if="comments.length == 0">
								<td>
									<p class="text-muted">
										댓글이 없습니다. 첫 번째로 댓글을 달아보세요!
									</p>
								</td>
							</tr>
							<tr v-for="comment in comments" :key="comment.cnum">
								<td>{{ comment.cnum }}</td>
								<td>{{ comment.writer }}</td>
								<td v-html="comment.contents"></td>
								<td>
									<div class="hstack gap-3 fs-15">
										<a href="javascript:void(0);" class="link-primary"
											><i class="bi bi-pencil-fill"></i>
										</a>
										<a href="javascript:void(0);" class="link-danger">
											<i class="bi bi-trash"></i>
										</a>
									</div>
								</td>
								<td>{{ comment.dates }}</td>
								<td><span class="badge badge-soft-success">Active</span></td>
							</tr>
						</tbody>
					</table>
					<div class="card">
						<div class="card-body">
							<div class="row">
								<div class="col-2">
									<input
										type="text"
										class="form-control"
										v-model="comment.writer"
										placeholder="닉네임"
									/>
								</div>
								<div class="col-8">
									<textarea
										class="form-control"
										row="50"
										cols="74"
										v-model="comment.contents"
										id="c_contents"
										placeholder="댓글을 달아주세요!"
									></textarea>
								</div>
								<div class="col-2">
									<input
										type="button"
										class="btn btn-outline-warning"
										id="insertCmtBtn"
										value="댓글 등록"
										@click="addComment"
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="mb-3">
		<button
			class="float-end btn btn-outline-warning"
			@click="
				$router.push({
					name: 'Edit',
					params: { currentPage: currentPage, num: route.params.num },
				})
			"
		>
			수정
		</button>
		<button class="float-end btn btn-outline-warning" @click="del">삭제</button>
	</div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import { toRef, ref, onMounted, reactive } from 'vue';
import board from '@/data';
import page from '@/data';
import { readPost, delPost, insertComment } from '@/api/posts';

const route = useRoute();
const router = useRouter;
const currentPage = ref();
currentPage.value = route.params.currentPage;
console.log('router params : ', route.params);
const post = ref([]);
const comments = ref([]);
const comment = ref({
	bnum: route.params.num,
	contents: '',
	writer: '',
});

const fetchPost = async () => {
	const response = await readPost(route.params.currentPage, route.params.num);
	console.log('readPost return : ', response.data);
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
fetchPost();

const del = () => {
	const response = delPost(post.value.num);
	console.log('삭제 결과 : ', response.data);
	if (response.data.result > 0) {
		router.push({ name: 'Home', params: { currentPage: currentPage } });
	} else {
		alert('오류 발생!');
	}
};

const addComment = () => {
	console.log('보낼 댓글 값 : ', comment.value);
	const response = insertComment(comment);
	console.log('댓글 추가 결과 : ', response.data);
};
</script>

<style scoped>
#commentTable {
	border: 1px solid #ffb914;
	border-collapse: collapse;
}

.card-header {
	background-color: #feede0;
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
</style>
