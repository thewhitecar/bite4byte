import {createStore, applyMiddeware} from 'redux'
import reducer from './reducer'
import promiseMiddleware from 'redux-promise-middleware'

export default createStore(reducer, applyMiddeware(promiseMiddleware()))