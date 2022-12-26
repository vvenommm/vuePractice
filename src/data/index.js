import { reactive } from 'vue';

export default {
	// Posts: reactive([
	//   {
	//     bnum: 1,
	//     category: '자유',
	//     title: '1번 글입니다.',
	//     writer: 'writer1',
	//     contents: 'dkfkfl',
	//     dates: '22/12/21',
	//     comments: 4,
	//     views: 4,
	//   },
	//   {
	//     bnum: 2,
	//     category: '자유',
	//     title: '2번 글입니다.',
	//     writer: 'writer2',
	//     contents: 'dkfkfl2',
	//     dates: '22/12/21',
	//     comments: 6,
	//     views: 77,
	//   },
	//   {
	//     bnum: 3,
	//     category: '자유',
	//     title: '3번 글입니다.',
	//     writer: 'writer3',
	//     contents: 'dkfkfl3',
	//     dates: '22/12/21',
	//     comments: 0,
	//     views: 42,
	//   },
	//   {
	//     bnum: 4,
	//     category: '기타',
	//     title: '4번 글입니다.',
	//     writer: 'writer4',
	//     contents: 'dkfkfl4',
	//     dates: '22/12/21',
	//     comments: 4,
	//     views: 4,
	//   },
	//   {
	//     bnum: 5,
	//     category: '질문',
	//     title: '5번 글입니다.',
	//     writer: 'writer5',
	//     contents: 'dkfkfl5',
	//     dates: '22/12/21',
	//     comments: 2,
	//     views: 12,
	//   },
	// ]),

	board: reactive({
		posts: [],
		page: {
			content: '',
			currentPage: 0,
			endPage: 0,
			startPage: 0,
			total: 0,
			totalPages: 0,
			word: '',
		},
	}),
};
