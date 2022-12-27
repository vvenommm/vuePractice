<template>
	<h2>hello</h2>
	<div>hello</div>
	{{ route.params }}
</template>

<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();
const currentPage = route.params.currentPage;
console.log('router param currentPage : ', currentPage);
</script>
