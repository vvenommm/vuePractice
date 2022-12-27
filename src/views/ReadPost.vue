<template>
	<h2>hello</h2>
	<div>hello</div>
	{{ route.params }}
</template>

<script setup>
import { useRoute } from 'vue-router';
import { toRef, ref, onMounted, reactive } from 'vue';
import board from '@/data';
import page from '@/data';
import { getPosts } from '@/api/posts';
import getPostsWithPage from '@/api/posts';
import { useRouter } from 'vue-router';

const route = useRoute();
const currentPage = route.params.currentPage;
console.log('router param currentPage : ', currentPage);
</script>
