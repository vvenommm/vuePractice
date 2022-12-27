import axios from 'axios';

export function getPosts() {
	return axios.get('http://localhost:8080/main/1');
}

export default function getPostsWithPage(page) {
	console.log('page? : ', page);
	// return axios.get('http://localhost:8080/main/' + page);
}
