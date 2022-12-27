# vuePractice

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

### 이벤트 관련
.enter -> input type=text @keyup.enter ... : 검색 시 엔터 쳤을 때 이벤
.tab
.delete
.esc
.space
.up
.down
.left
.right

### v-for
key는 항상 유일값으로 적어줌 v-model은 알아서 연결해줌. v-bind:~은 직접 연결이며 :~만 적어도 됨

### 반응형
1. list = reactive([{}, {}, {}]);

- 배열 요소 추가, 삭제하고 싶을 때
- push는 잘 됨. 그러나 삭제가 안 됨

2. list = list.filter(item.id == id)
-> 이러면 반응을 잃어버림

3. item = list.find()
item.key = list.key
- 3번을 실행해야 반응이 됨. 찾아서 다시 반응형으로 연결


==> 결론
{{list}}와 1번은 메모리에서 같은 배열을 가리키지만 2번은 아님.

call by value - 원시형 변수. 값만 넘어가는 방식.
call by reference - 참조형 변수. 변수에 주소가 담겨있고 그 주소는 어떤 값을 가리키는 방식.

-> list.filter는 call by value 방식으로 바뀜. 원래 배열은 cbr인데 필터로 새 값을 넘기면서 cbv가 됨
1번은 call by reference 방식이었는데 filter를 사용하면서 바뀜
그래서 반응을 잃어버림

-> 방법 두 가지가 있음
1. list = ref(value ~~) 방식으로 해주면 됨
2. list = reactive({key:[]}) 이렇게 억지로 call by reference 방식으로 바꿔줘야 됨


-----------------------------------------------------------------------------------------

axios(통신 모듈)
1. npm을 통해 라이브러리를 설치한다.
2. axios.get(url) ~ ~ / .post(~ ~, {Object}) / .put(~ ~) / axios.create(baseUrl, {header Object~ ~})
