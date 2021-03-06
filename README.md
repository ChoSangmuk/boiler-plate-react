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

## 실행 방법 (로컬)
1. React.js Front-End 실행
```sh
# Shell
# root directory에서 종속성 다운로드
npm install

# React.js 실행
npm run start
# or
npm start
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
- src/index.js : ReactDOM.render를 통해 index.html의 root태그를 App 컴포넌트로 변경함
```js
// src/index.js ...
ReactDOM.render(<App />, document.getElementById('root'));
```
- public/index.html : root div 태그를 가짐
```html
<!-- public/index.html -->
<div id="root"></div>
```

## 19장 CRA to Our Boilerplate
- Create React App 기본 구조를 Boiler plate에 맞게 구조 변경
```
_actions : Redux를 위한 폴더
_reducer : Redux를 위한 폴더
components
  views
    Footer : 페이지 하단
    LandingPage : 첫 페이지
    LoginPage : 로그인 페이지
    NavBar : 상단 메뉴 혹은 메뉴바
    RegisterPage : 등록 페이지
App.js : Routing 관련된 일을 처리
Config.js : 환경변수 
hoc : higher Order Component, 다른 컴포넌트를 인자로 가지는 함수
utils : 이것저것
```

## 20장 React Router Dom
- React에선 페이지 이동시 React Router Dom을 사용함 
- [React Router Dom 공식 예제](https://reactrouter.com/web/example/basic)
- [React Router DOM 학습 이력](https://github.com/ChoSangmuk/react-router-dom-example)
```sh
# Shell
# React Router DOM 설치
npm install react-router-dom --save
```
- app.js에서 Routing 구현
- 파일로 분리된 컴포넌트 가져오기
- [소스코드(App.js) 참고](/src/App.js)
- 읽을거리
1. exact 사용해야하는 이유?
```html
<Route path="/users" component={Users} />
<Route path="/users/create" component={CreateUser} />
```
```
exact이 없다면 http://app.com/users URL을 입력했을 때 Users 컴포넌트 실행
http://app.com/users/create URL을 입력했을 때도 Users 컴포넌트로 감

Router가 부분적으로만 닮아도 같은 것이라고 인식, 처음 보는 Route의 컴포넌트로 이동시켜 버림
이를 막기 위해 정확히 일치하는 경우에만 컴포넌트가 실행되게끔 exact를 넣어줌
``` 

## 21장 데이터 Flow & Axios
- [Axios](https://www.npmjs.com/package/axios) : React에서 Back-End에 API를 연동하기 위해 사용
```sh
# Shell
npm install axios --save
```
- 임의로 Back-End에 request 보내보기
```js
// components/views/LandingPage/LandingPage.js
import React, { useEffect } from 'react'
import axios from 'axios'

function LandingPage(props) {

  useEffect(() => {
    axios.get('/api/hello')
      .then(response => { console.log(response.data) })
  }, [])

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '70vh' }}>
        <h2>Welcome To Boiler Plate</h2>
      </div>
    </div>
  )
}

export default LandingPage
```
- Back-End 서버와 Front-End 애플리케이션 간의 CORS policy 문제로 연결이 불가능

## 22장 CORS 이슈, Proxy 설정
- CROS policy 문제로 바로 데이터 전송은 불가능
- 여러가지 방법이 있지만, 강의에서는 Front-End에 http-proxy-middleware 사용하여 해결
```sh
# Shell
# http-proxy-middleware 설치
npm install http-proxy-middleware --save
```
- src/setupProxy.js 생성
- [소스코드(setupProxy.js) 참고](/src/setupProxy.js)
- 읽을거리
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
- 프록시 서버의 목적 
  - [참고 1](https://j2enty.tistory.com/entry/IT-Proxy-Server)
  - [참고 2](https://dany-it.tistory.com/107)

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
  "nodejs-react": "concurrently \"npm run start --prefix boiler-plate-nodejs\" \"npm run start --prefix boiler-plate-react\"",
},	
```
- 상위 폴더에서 실행
```sh
# Shell
npm run nodejs-react
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

## 26장 Redux 기초
- [Redux](https://ko.redux.js.org/introduction/getting-started/) : JS App을 위한 예측 가능한 state 컨테이너
- state 관리 라이브러리 - 컴포넌트들의 공동DB(Redux Store) 
- props
  - properties
  - 컴포넌트 간 대화에 사용 
  - 부모 -> 자식 전달만 가능
  - 자식 안에서 변경 불가(immutable), 부모에서 다시 내려줘야함
  - 컴포넌트의 (HTML)속성으로 전달
- state
  - 컴포넌트 안에서 데이터 교환 및 전달
  - 수정 가능 mutable
  - 변경 시, re render
- Redux는 단방향 순환 flow
```
component --dispatch--> action -> reducer -> store --subscribe--> component
```
- action(Object 형식) : 무슨 일이 일어났는지 설명
```js
{ type : "LIKE_ARTICLE", articleId:42 } // 42번 기사에 좋아요가 눌림
{ type : "ADD_TODO", text:"read the redux docs." } // "read the redux docs." 라는 텍스트가 TODO에 추가됨
```
- reducer(pure function 형식) : action을 진행함으로 해서 일어나는 변경 사항을 설명하고 next state를 리턴
```js
(previousState, action) => nextState
```
- store : 일종 state의 DB이며 메소드가 존재하며, 그를 통해 state를 관리할 수 있음

## 27장 Redux UP !!!!!
- Redux를 Front-End 애플리케이션에 설치
```sh
# Shell
npm install redux react-redux redux-promise redux-thunk --save
```
- promise, thunk는 미들웨어, 보조 도구
  - 두 가지 보조 도구가 없으면 redux store는 객체 형식의 action만 받을 수 있음
  - 두 가지 보조 도구를 통해 promise, function을 넘길 수 있음
  - 조금 더 정확히는 dispatch가 promise(promise), function(thunk)를 어떻게 받는지 알려줌
- app과 리덕스를 연결해줘야함(소스 참고)
- Chrome의 Redux DevTools extension 설치
- [소스코드(/src/index.js) 참고](/src/index.js)
- [소스코드(/src/_reducerindex.js) 참고](/src/_reducer/index.js)
- 읽을거리
```
Redux는 state를 더욱 쉽게 관리할 수 있게 도와주는 역할을 합니다. 써도되고 안써도 됩니다. 
Redux를 쓰면 성능 부분에서 느려지기 때문에 쓸 곳과 안 쓸 곳을 잘 가려서 쓰는게 중요합니다.
```

## 28장 React Hooks
- React vs React Hooks
- [Class Component vs Functional Component](https://github.com/ChoSangmuk/react-class-vs-function-style)
  - [GitHub Pages](https://chosangmuk.github.io/react-class-vs-function-style/)
- React Components는 두 가지 방식으로 구현될 수 있음
  - Class Component : 복잡, 다양, 느려짐
  - Functional Component : 한정적, 간결, 빨라짐, 단순, (과거에는) LifeCycle 함수를 사용할 수 없었음
```js
// Class Component
import React, { Component } from 'react'

export default class Hello extends Component{
  render() {
    return (
      <div> Hello! </div>
    );
  }
}

// Functional Component
import React from 'react'

export default function Hello(){
  return (
      <div> Hello! </div>
  )
}
```
- React Hooks 발표 이후, 복잡한 기능도 Functional Component 에서 사용 가능
```js
// Class Component
import React, { Component } from 'react'
import Axios from 'axios'

export default class Hello extends Component{
  constructor(props){
    super(props);
    this.state = { name: "" }; 
  }

  componentDidMount() {
    Axios.get('/api/user/name')
      .then(response => {
        this.setState({ name: response.data.name })
      })
  }

  render() {
    return (
      <div> Hello! {this.state.name}</div>
    );
  }
}

// Functional Component
import React, {useEffect, useState} from 'react'
import Axios from 'axios'

export default function Hello(){
  const [Name, setName] = useState("")
  
  useEffect(() => {
    Axios.get('/api/user/name')
      .then(response => {
        setName(response.data.name)
      })
  }, [])

  return (
    <div> Hello! {Name}</div>
  )
}
```
- [React LifeCycle](https://ko.reactjs.org/docs/react-component.html)

## 29장 로그인 페이지 (1)
- Formik, yup 라이브러리로 다이나믹하게 효과를 줄 수 있음(but 이 강의에서는 진행하지 않음)
- Redux를 사용하여 간단하게 로그인 페이지에 작성
  - html form input value와 State를 매칭시켜줌
  - State 선언 시, useState Hook 사용
  - 이벤트(onChange) 발생 시 해당 State 변경(useState의 2번째 함수(set_Name)를 사용)
```js
// components/views/LoginPage/LoginPage.js
import React, { useState } from 'react'

function LoginPage(props) {
  // value - state 매칭
  // setEmail을 통해 state를 변경
  const [email, setEmail] = useState('example@email')
  const [password, setPassword] = useState('********')

  // 버튼이 눌려 메소드가 실행되면 state의 값을 value에 넣어줌
  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value)
  }

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value)
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh' }}>
      <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={onSubmitHandler}>
        <label>Email</label>
        <input type='email' value={email} onChange={onEmailHandler} />
        <label>Password</label>
        <input type='password' value={password} onChange={onPasswordHandler} />
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default LoginPage;
```

## 30장 로그인 페이지 (2)
- 제출 이벤트(onSubmit), onSubmitHandler 구현
- Form의 onSubmit 기본 기능을 막기 위해 preventDefault 사용
- 입력된 데이터(value, State)를 서버로 보내고 응답받기
  - 원래는 Axios.post를 사용, 특정 URL에 데이터를 보내줌
  - Redux를 사용하여 dispatch -> action -> reducer -> store 순으로 데이터를 전달할 예정
  - 우선 dispatch 만들기
- [소스코드(LoginPage.js) 참고](/src/components/views/LoginPage/LoginPage.js)

## 31장 회원 가입 페이지
- 로그인 페이지와 유사
- redux활용
- 복습 필요
```js
// components/views/RegisterPage/RegisterPage.js
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { registerUser } from '../../../_actions/user_action'

function RegisterPage(props) {
  // dispatch를 통해 액션을 취함
  const dispatch = useDispatch()

  // value - state 매칭
  // setEmail을 통해 state를 변경
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  // 버튼이 눌려 메소드가 실행되면 state의 값을 value에 넣어줌
  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value)
  }

  const onNameHandler = (event) => {
    setName(event.currentTarget.value)
  }

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value)
  }

  const onConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.currentTarget.value)
  }

  const onSubmitHandler = (event) => {
    event.preventDefault()

    if (password !== confirmPassword) return alert('비밀번호와 비밀번호 확인이 다릅니다.');
    let body = {
      email: email,
      name: name,
      password: password,
      confirmPassword: confirmPassword,
    }

    // without Redux
    // Axios.post('/api/user/register', body);

    // dispatch(action)
    dispatch(registerUser(body)) // action
      .then(Response => {
        if (Response.payload.registerSuccess) {
          props.history.push('/login')
        } else {
          alert(Response.payload.message)
        }
      })
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh' }}>
      <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={onSubmitHandler}>
        <label>Email</label>
        <input type='email' value={email} onChange={onEmailHandler} />
        <label>Name</label>
        <input type='text' value={name} onChange={onNameHandler} />
        <label>Password</label>
        <input type='password' value={password} onChange={onPasswordHandler} />
        <label>Confirm Password</label>
        <input type='password' value={confirmPassword} onChange={onConfirmPasswordHandler} />
        <br />
        <button type="submit">Register</button>
      </form>
    </div>
  )
}

export default RegisterPage
```

## 32장 로그아웃
## 33장 인증 체크 (1)
## 34장 인증 체크 (2) 강의 마무리