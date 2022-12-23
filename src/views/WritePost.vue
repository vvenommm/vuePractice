<script setup>
import { ref } from 'vue'
import data from '@/data'

// ref -> number, string
// reactive -> {}

// const route = useRoute();
console.log('WritePost - board : ', data.Posts)

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
]

const post = ref({
  category: '',
  title: '',
  writer: '',
  contents: '',
  dates: '22/12/22',
  comments: 0,
  views: 0,
})

const addPost = () => {
  console.log('before push --', data)
  data.Posts.push(post.value)
  console.log('after push --', data)
}

console.log('post', post)
</script>

<template>
  <p>{{ post.category }}</p>
  <div class="card">
    <div class="row m-3">
      <div class="col-3">
        <select v-model="post.category">
          <option v-for="cat in catList" :key="cat" :value="cat.value">
            {{ cat.text }}
          </option>
        </select>
      </div>
      <div class="col-7">
        <input
          type="text"
          v-model="post.title"
          placeholder="제목을 입력해주세요."
          style="width: 250px"
        />
      </div>
      <div class="col-2">
        <input
          type="text"
          v-model="post.writer"
          placeholder="닉네임"
          style="width: 150px"
        />
      </div>
    </div>
    <div class="row p-3">
      <textarea v-model="post.contents" row="20" cols="50" required></textarea>
    </div>
    <div class="hstack gap-3">
      <div class="ms-auto">
        <button @click="addPost()">글등록</button>
        <button @click="data.push(post)">글등록2</button>
      </div>
      <div class="ms-auto">
        <button @click="$router.push('/')">글목록</button>
      </div>
    </div>
  </div>
</template>

<style>
h1 {
  color: #fa7204;
}

.card {
  width: 840px;
}
</style>
