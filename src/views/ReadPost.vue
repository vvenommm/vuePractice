<template>
	{{ route.params }}
	<div class="mb-3">
		<button
			class="float-end"
			@click="
				$router.push(`/${currentPage}`);
				currentPage != 1 ? (currentPage = 1) : '';
			"
		>
			글목록
		</button>
		<button
			class="float-end"
			@click="
				$router.push({
					name: 'Edit',
					params: { currentPage: currentPage, num: route.params.num },
				})
			"
		>
			수정
		</button>
	</div>

	<div class="card border">
		<div class="card-header">
			<h6>{{ post.num }}</h6>
			<div class="row">
				<div class="col-2">
					<h2 class="card-title mb-0">
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
					</h2>
				</div>
				<div class="col-10">
					<h2 class="card-title mb-0">
						{{ post.title }}
					</h2>
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
				</div>
			</div>
		</div>
	</div>
	<div class="mb-3">
		<button class="float-end" @click="del">삭제</button>
	</div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { toRef, ref, onMounted, reactive } from 'vue';
import board from '@/data';
import page from '@/data';
import { readPost, delPost } from '@/api/posts';
import { useRouter } from 'vue-router';

const route = useRoute();
const currentPage = route.params.currentPage;
console.log('router param currentPage : ', currentPage);
console.log('router params : ', route.params);
const post = ref([]);
const comments = ref([]);

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
</style>
