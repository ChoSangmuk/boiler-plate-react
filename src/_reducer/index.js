import { combineReducers } from 'redux';// 여러 Reducer를 하나로 합쳐줌
import user from './user_reducer';
//import commment from './commment_reducer';// 생성될 수도 있는 Reducer

const rootReducer = combineReducers({
  user
  // commment
})

export default rootReducer;