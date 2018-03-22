import {
  combineReducers,
  createStore,
  applyMiddleware,
  compose,
} from 'redux'
import thunkMiddleware from 'redux-thunk'

// environment
const env = 'development'

const isBrowser = (typeof window !== 'undefined')

// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = isBrowser && 'development' === env && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose

export default (storeData = {}, reducers = {}) =>
  createStore(
    combineReducers(reducers),
    storeData,
    composeEnhancers(applyMiddleware(thunkMiddleware)),
  )
