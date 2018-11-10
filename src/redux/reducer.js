import axios from 'axios'

export const LOGIN = 'LOGIN'
export const LOGIN_FULFILLED = 'LOGIN_FULFILLED'
export const LOGOUT = 'LOGOUT'
export const LOGOUT_FULFILLED = 'LOGOUT_FULFILLED'

let initialState = {
  user: null
}

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case LOGIN_FULFILLED:  
      return {...state, user: action.payload}
    case LOGOUT_FULFILLED:
      return { ...state, user: null} //IDK?
    default:
      return state;
  }
}

export function login(user){
  return {
    type: LOGIN,
    payload: user
  }
}


export function logout() {
  return {
    type: LOGOUT,
    payload: null   //IDK???
  }
}

