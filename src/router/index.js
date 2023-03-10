import { createRouter, createWebHistory } from 'vue-router';
import BoardList from '@/views/BoardList.vue';
import WritePost from '@/views/WritePost.vue';
import ReadPost from '@/views/ReadPost.vue';
import NotFound from '@/views/NotFound.vue';

const routes = [
	// routes 배열에 들어가는 요소 중 필수적인 값은 path, component이고, 부수적으로 key:value 형태로 다른 정보 추가 가능
	{
		path: '/:currentPage',
		name: 'Home',
		component: BoardList,
	},
	{
		path: '/:currentPage/word/:word',
		name: 'List',
		component: BoardList,
	},
	{
		path: '/write/:currentPage',
		name: 'Wirte',
		component: WritePost,
	},
	{
		path: '/write/:currentPage/num/:num',
		name: 'Edit',
		component: WritePost,
	},
	{
		path: '/read/:currentPage/num/:num',
		name: 'Read',
		component: ReadPost,
	},
	{ path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
];

const router = createRouter({
	history: createWebHistory('/'),
	routes, // key와 value가 같은 경우 이렇게 처리. 실제는 routes: routes로 작성
});

export default router; // js 파일이 반환하는 정보. 이렇게 설정한 라우터 객체를 vue 인스턴스에 추가해주면 어디서든 route 관련 객체 사용 가능
