import axios from 'axios';

export function getPosts() {
  axios.get('http://localhost:8080/main').then(response => {
    console.log('boardList : ', response.data);
  });
}
