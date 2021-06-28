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
