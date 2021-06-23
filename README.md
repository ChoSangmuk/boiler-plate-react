# boiler-plate-react

- [따라하며 배우는 노드, 리액트 시리즈 - 기본 강의](https://www.inflearn.com/course/%EB%94%B0%EB%9D%BC%ED%95%98%EB%A9%B0-%EB%B0%B0%EC%9A%B0%EB%8A%94-%EB%85%B8%EB%93%9C-%EB%A6%AC%EC%95%A1%ED%8A%B8-%EA%B8%B0%EB%B3%B8/)(React)
- [강사 github](https://github.com/jaewonhimnae/boiler-plate-ko)

## Using Docker For Dev Environment
- [Ubuntu에 Node.js 설치](https://velog.io/@ywoosang/Node.js-%EC%84%A4%EC%B9%98)
```sh
# Shell
docker run -it ubuntu
  apt-get update
  apt-get install nodejs
  apt-get install npm
  apt-get install vi
  apt-get install vim
  apt-get install git-all
  mkdir workspace
docker commit -m "node, npm installed" heuristic_panini node_basic:0.1
docker run -p 3000:3000 -p 5000:5000 -v /Users/chosangmuk/Documents:/workspace -it node_basic:0.1
```

## 15장 리액트란 ?
- [React](https://reactjs.org/) : UI를 구축하기위한 선언적이고 효율적이며 유연한 JavaScript 라이브러리
- made by facebook, and not a framework
- 모든 것이 컴포넌트로 이루어짐(모듈과 유사하게 재사용성이 뛰어남)
- [Virtual DOM](https://noogoonaa.tistory.com/53)
  - 수정이 이루어질 경우, 리얼돔은 전체 로딩
  - 버츄얼 돔에서는 업데이트된 부분만 변경
  - 훨씬 빠르고 부하가 없음
  - How? 프로퍼티는 같음
  - 리얼돔을 가볍게 복사한것
  - 스냅샷을 찍어서 기억, 스냅샷과 현재에 차이가 있는 경우 리얼돔에서 바꾸어줌

## 16장 Create-React-App
- React를 사용하기 위해서는 Babel, Webpack에 대한 설정이 필요
- [create-react-app](https://create-react-app.dev/) 명령어를 사용하여 쉽게 설정
- Babel
  - 자바스크립트 이용시 ES6, ES7 등 새로 메소드가 추가됨
  - 새로 추가된 메소드를 오래된 브라우저에서 작동 가능하게 변경해줌
- Webpack
  - 커진 웹사이트를 위해 묶음으로 관리해줌
  - 매우 복잡하고 배울게 많음
  - 많은 모듈을 합쳐 간단하게 만들어줌
- create-react-app 다운 및 실행
```sh
# Shell
# 현재 경로에 react-app 다운로드
npx create-react-app .

# 실행
npm start
```

## 17장 npm npx
- npm : node package manager
  - online repository
  - 라이브러리 저장
  - -g 옵션이 없는 경우, 로컬에 다운로드 받아짐(node_modules)
  - -g 옵션을 붙이면 bin 폴더에 받아짐
  - npm install -g create-react-app 으로 받았음 
- npx : repository의 라이브러리를 다운없이 그냥 이용할 수 있음
  - 어떻게? npx이 npm repository에서 create-react-app을 찾아서(look up) 다운로드 없이 실행 시켜줌
  - disk 낭비가 없음
  - 항상 최신버전 사용

## 18장 구조 설명
- Webpack : src 폴더만 관리, public은 관리하지 않음, 따라서 src 폴더에 이미지 등을 넣음
- src/App.js : 랜더링 되어 나오게 제일 메인 화면, 컴포넌트
- src/index.js : App.js 컴포넌트가 들어감
```js
// src/index.js
ReactDOM.render(
  <React.StrictMode>
    <Provider>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
```
- public/index.html : root div 태그를 가짐
```html
<!-- public/index.html -->
<div id="root"></div>
```

## 19장 CRA to Our Boilerplate
- Create React App 기본 구조를 Boiler plate에 맞게 구조 변경
```
_actions : redux를 위한 폴더
_reducer : redux를 위한 폴더
components
  views
    Footer : 페이지 하단
    LandingPage : 첫 페이지
    LoginPage : 로그인 페이지
    NavBar : 상단 메뉴 혹은 메뉴바
    RegisterPage : 등록 페이지
App.js : 라우팅 관련된 일을 처리
Config.js : 환경변수 
hoc : higher Order Component, 다른 컴포넌트를 인자로 가지는 함수
utils : 이것저것
```

## 21장 데이터 Flow & Axios
- [Axios](https://www.npmjs.com/package/axios) : React에서 Back-End에 API를 연동하기 위해 사용 
```sh
# Shell
npm install axios --save
```

## 22장 CORS 이슈, Proxy 설정
- CROS 문제로 바로 데이터 전송은 불가능
- Front-End에 http-proxy-middleware 사용하여 해결
```sh
# Shell
npm install http-proxy-middleware --save
```
- src/setupProxy.js 생성
```js
// src/setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
  app.use( '/api', createProxyMiddleware({
      target: 'http://localhost:5000',
      changeOrigin: true,
    })
  );
};
```

- 강의 댓글 참고
1. 추가 패키지 미설치, Front-End 설정
```json
// package.json
"proxy": "http://localhost:4000", 
```
2. Back-End에 cors 패키지 설치
```js
// boiler-plate-nodejs/index.js
// 1. cors 불러오기
let cors = require("cors");
let express = require("express");
let app = express();

// 2.cors_origin 선언하기, 복수 추가 가능
let cors_origin = [`http://localhost:3000`]; // 로컬 개발용

// 3.cors 옵션 추가하기
app.use(
  cors({
    origin: cors_origin, // 허락하고자 하는 요청 주소
    credentials: true, // true로 하면 설정한 내용을 response 헤더에 추가 해줍니다.
  })
);
```

## 23장 Proxy Server ?
- 프록시 서버의 목적 [참고 1](https://j2enty.tistory.com/entry/IT-Proxy-Server), [참고 2](https://dany-it.tistory.com/107)

## 24장 Concurrently
- Back-End, Front-End 동시에 작동시키기
```sh
# Shell
# Back-End, Front-End 소스가 동시에 존재하는 상위 폴더에서 진행
npm init 

# concurrently 다운로드
npm install concurrently --save
```
- 실행 스크립트 추가
```json
// package.json
"scripts": {
  "full": "concurrently \"npm run start --prefix boiler-plate-nodejs\" \"npm run start --prefix boiler-plate-react\"",
},	
```

## 25장 Antd CSS Framwork
- CSS Framwork는 기능을 만드는데 집중할 수 있게 해줌
1. [material UI](https://material-ui.com/) - 러닝커브가 있음
2. [React Bootstrap](https://react-bootstrap.github.io/)
3. [Semantic UI](https://semantic-ui.com/)
4. [Materialize](https://materializecss.com/)
5. [Ant Design](https://ant.design/) - 사용이 편리
```sh
# Shell
npm install @material-ui/core
npm install react-bootstrap bootstrap@4.6.0
npm install -g gulp
npm install materialize-css@next
npm install antd --save
```