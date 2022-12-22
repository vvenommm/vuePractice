<script>
import { useRoute } from "vue-router";
import BoardList from "@/views/BoardList.vue";

// ref -> number, string
// reactive -> {}

// const route = useRoute();

export default {
  //   props: ['category', 'title', 'contents', 'writer'],
  //   props: {
  //     type: {
  //       type: Object,
  //       default: "post",
  //       validator: (value) => {
  //         return ["post"].includes(value);
  //       },
  //     },
  //     category: {
  //       type: String,
  //       required: true,
  //     },
  //     title: {
  //       type: String,
  //       required: true,
  //     },
  //     contents: {
  //       type: String,
  //       required: true,
  //     },
  //     writer: {
  //       type: String,
  //       required: true,
  //     },
  //     obj: {
  //       type: Object,
  //       // default: {} -> x default: function() 형태로 해야 한다.
  //       default: function () {
  //         return {};
  //       },
  //     },
  //   },
  setup() {
    //     console.log("title : ", props.title);
    //     console.log("title : ", post.title);
    //     console.log("contents : ", props.contents);
    //     console.log("writer : ", props.writer);
    const catList = [
      {
        text: "말머리",
        value: "c",
      },
      {
        text: "질문",
        value: "q",
      },
      {
        text: "자유",
        value: "f",
      },
      {
        text: "기타",
        value: "e",
      },
    ];

    const post = {
      category: "",
      title: "",
      writer: "",
      contents: "",
      dates: "22/12/22",
      comments: 0,
      views: 0,
    };

    const writingPost = (category, title, writer, contents) => {
      post[category] = category;
      post[title] = title;
      post[writer] = writer;
      post[contents] = contents;
    };

    console.log(post);
    return {
      post,
      writingPost,
      catList
    };
  },
};
</script>

<template>
  <p>{{ post.category }}</p>
  <div class="card">
    <div class="row m-3">
      <div class="col-3">
        <!-- <select v-model="category" required>
          <option value="c" selected>말머리</option>
          <option value="q">질문</option>
          <option value="f">자유</option>
          <option value="e">기타</option>
        </select> -->
        <select v-model="post">
            <option v-for="cat in catList" v-bind:key="cat.text" :value="cat.value">{{ cat.text }}</option>
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
        <input type="text" v-model="post.writer" placeholder="닉네임" style="width: 150px" />
      </div>
    </div>
    <div class="row p-3">
      <textarea row="20" cols="50" required></textarea>
    </div>
    <div class="hstack gap-3">
      <div class="ms-auto">
        <button @click="writingPost()">글등록</button>
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
