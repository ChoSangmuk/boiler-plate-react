import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../../../_actions/user_action'

function LoginPage(props) {
  // dispatch를 통해 액션을 취함
  const dispatch = useDispatch()

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

  const onSubmitHandler = (event) => {
    event.preventDefault()

    let body = {
      email: email,
      password: password
    }

    // dispatch(action)
    dispatch(loginUser(body))
      .then(Response => {
        if (Response.payload.loginSuccess) {
          props.history.push('/')
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
        <label>Password</label>
        <input type='password' value={password} onChange={onPasswordHandler} />
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default LoginPage;