import axios from 'axios';

export function getPosts() {
	console.log('axios getPosts 실행 ------------------');
	return axios.get('http://localhost:8080/main/1');
}
export function getPostsOfAnotherPage(page) {
	console.log('axios getPostsOfAnotherPage 실행 ------------------');
	console.log('다른 페이지로 이동할 숫자 : ', page);
	return axios.get(`http://localhost:8080/main/${page}`);
}

export function readPost(currentPage, num) {
	console.log('--------- axios readPost() ----------');
	console.log('cp : ', currentPage);
	console.log('post num : ', num);
	return axios.get(`http://localhost:8080/read/${currentPage}/${num}`);
}

export function writePost(post) {
	console.log('post : ', post.value);
	return axios.post('http://localhost:8080/writePost', post.value);
	// return axios.post('http://localhost:8080/writePost', post);
}

export function delPost(num) {
	const numArr = [num];
	console.log('삭제할 글 번호 : ', numArr);
	return axios.post('http://localhost:8080/delete', numArr);
}

//////////////////////////////////////////////////////////////////////////////

export function insertComment(comment) {
	console.log('add comment!!!! : ', comment.value);
	return axios.post('http://localhost:8080/insertComment', comment.value);
}
