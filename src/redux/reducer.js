import axios from 'axios'

export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'
export const LOGOUT_FULFILLED = 'LOGOUT_FULFILLED'
export const GET_ITEMS ='GET_ITEMS'
export const GET_ITEMS_FULFILLED = 'GET_ITEMS_FULFILLED'
export const GET_INVENTORY = "GET_INVENTORY"
export const GET_INVENTORY_FULFILLED = "GET_INVENTORY_FULFILLED"

let initialState = {
  inventory: null,
  user: null,
  families: null
}

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case LOGIN:  
      return {...state, user: action.payload}
    case LOGOUT:
      return { ...state, user: null} //IDK?
    case GET_ITEMS_FULFILLED: 
      return {...state, items: action.payload}
    case GET_INVENTORY_FULFILLED:
      return {...state, inventory: action.payload.inventory, families: action.payload.families}
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
    type: LOGOUT
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

export function getInventory(pantryID) {
  let inventory = axios.get(`/api/inventory/${pantryID}`).then(results => {
    return results.data
  })
  return {
    type: GET_INVENTORY,
    payload: inventory
  }
}