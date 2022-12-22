<script setup>
import { onMounted, reactive } from "vue";
import data from '@/data';

console.log("posts : ", data.Posts);
// var posts = reactive([
//   {
//     bnum: 1,
//     category: "자유",
//     title: "1번 글입니다.",
//     writer: "writer1",
//     contents: "dkfkfl",
//     dates: "22/12/21",
//     comments: 4,
//     views: 4,
//   },
//   {
//     bnum: 2,
//     category: "자유",
//     title: "2번 글입니다.",
//     writer: "writer2",
//     contents: "dkfkfl2",
//     dates: "22/12/21",
//     comments: 6,
//     views: 77,
//   },
//   {
//     bnum: 3,
//     category: "자유",
//     title: "3번 글입니다.",
//     writer: "writer3",
//     contents: "dkfkfl3",
//     dates: "22/12/21",
//     comments: 0,
//     views: 42,
//   },
//   {
//     bnum: 4,
//     category: "기타",
//     title: "4번 글입니다.",
//     writer: "writer4",
//     contents: "dkfkfl4",
//     dates: "22/12/21",
//     comments: 4,
//     views: 4,
//   },
//   {
//     bnum: 5,
//     category: "질문",
//     title: "5번 글입니다.",
//     writer: "writer5",
//     contents: "dkfkfl5",
//     dates: "22/12/21",
//     comments: 2,
//     views: 12,
//   },
// ]);

// export default {
//   setup() {
//     // provide('posts', posts);
    onMounted(() => {
      console.log("마운트 성공");
    });
//     return {
//       posts
//     };
//   },
// };
</script>

<template>
  <div id="tableDiv" class="card">
    <table id="tb" class="tb">
      <thead id="tb_head">
        <tr id="thead_tr">
          <th></th>
          <th>번호</th>
          <th>말머리</th>
          <th>제목</th>
          <th>작성자</th>
          <th>작성일</th>
          <th>조회수</th>
        </tr>
      </thead>
      <tbody id="tb_body">
        <tr v-for="post in data.Posts">
          <td><input type="checkbox" /></td>
          <td>{{ post.bnum }}</td>
          <td>{{ post.category }}</td>
          <td>
            <router-link to="/read">
              {{ post.title }} ({{ post.comments }})
            </router-link>
          </td>
          <td>{{ post.writer }}</td>
          <td>{{ post.dates }}</td>
          <td>{{ post.views }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style>
#tableDiv {
  min-height: 390px;
  min-width: 650px;
}

.tb {
  border: transparent;
  border-top: grey;
  border-bottom: grey;
  border-collapse: collapse;
  min-width: 800px;
}

tr {
  height: 35px;
}

th {
  text-align: center;
  background-color: #ffb914;
  margin-top: 10px;
  margin-bottom: 10px;
}

td {
  text-align: center;
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 5px;
}

tbody tr:hover {
  background-color: #feede0;
}

th:nth-child(1) {
  min-width: 3%;
}

th:nth-child(2) {
  min-width: 6%;
}

th:nth-child(3) {
  min-width: 10%;
}

th:nth-child(4) {
  min-width: 400px;
  max-width: 400px;
}

th:nth-child(5) {
  min-width: 10%;
}

th:nth-child(6) {
  min-width: 15%;
}

th:nth-child(7) {
  min-width: 10%;
}

td {
  text-align: center;
}

td:nth-child(4) {
  text-align: left;
}

div {
  place-items: center;
}
</style>
