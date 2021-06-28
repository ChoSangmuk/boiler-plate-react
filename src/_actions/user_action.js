import Axios from 'axios'
import {
  LOGIN_USER,
  REGISTER_USER
} from './types'

export function loginUser(dataSubmit) {
  const request = Axios.post('/api/user/login', dataSubmit)
    .then(response => response.data)

  // action -> reducer
  return {
    type: LOGIN_USER,
    payload: request
  }
}

export function registerUser(dataSubmit) {
  const request = Axios.post('/api/user/register', dataSubmit)
    .then(response => response.data)

  // action -> reducer
  return {
    type: REGISTER_USER,
    payload: request
  }
}