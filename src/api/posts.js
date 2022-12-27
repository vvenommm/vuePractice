import axios from 'axios';

export function getPosts() {
	return axios.get('http://localhost:8080/main/1');
}
export function getPostsOfAnotherPage(page) {
	return axios.get(`http://localhost:8080/main/${page}`).then;
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
