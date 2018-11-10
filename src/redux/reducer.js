import axios from 'axios'

export const LOGIN = 'LOGIN'
export const LOGIN_FULFILLED = 'LOGIN_FULFILLED'
export const LOGOUT = 'LOGOUT'
export const LOGOUT_FULFILLED = 'LOGOUT_FULFILLED'
export const GET_ITEMS ='GET_ITEMS'
export const GET_ITEMS_FULFILLED = 'GET_ITEMS_FULFILLED'

let initialState = {
  inventory:[],
  user: null,

}

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case LOGIN_FULFILLED:  
      return {...state, user: action.payload}
    case LOGOUT_FULFILLED:
      return { ...state, user: null} //IDK?
    case GET_ITEMS_FULFILLED: 
      return {...state, items: action.payload}
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

export function getItems(searchTerm) {
  let items = axios.get(`/api/inventory/?searchTerm=${searchTerm}`).then(results => {
    return results.data
  })
  return {
    type: GET_ITEMS,
    payload: items
  }
}
