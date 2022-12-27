import axios from 'axios';

export function getPosts() {
	return axios.get('http://localhost:8080/main/1');
}
export function getPostsOfAnotherPage(page) {
	return axios.get(`http://localhost:8080/main/${page}`);
}

export function readPost(currentPage, num) {
	console.log('--------- axios readPost() ----------');
	console.log('cp : ', currentPage);
	console.log('post num : ', num);
	return axios.get(`http://localhost:8080/read/${currentPage}/${num}`);
}
