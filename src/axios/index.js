import axios from 'axios';
import data from '@/data';

export function getPosts() {
	axios.get('http://localhost:8080/main').then(response => {
		// Posts = response.data.posts;
		console.log('boardList : ', response.data);
		// console.log('boardList Posts : ', response.data.posts);
		// console.log('boardList Page : ', response.data.page);
		// console.log('before posts : ', data.Posts.value);
		console.log(data.Posts);
		for (let post in response.data.posts) {
			// data.Posts.value.push(post);
			console.log('for insdie : ', post);
		}
		console.log(data.Posts);
	});
}
