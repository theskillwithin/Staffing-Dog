import {
  combineReducers,
  createStore,
  applyMiddleware,
  compose,
} from 'redux'
import thunkMiddleware from 'redux-thunk'

import reduxRegister from './register'


// environment
const env = 'development'
const isDev = 'development' === env

const isBrowser = (typeof window !== 'undefined')

// generated combine reducers based off reducers passed in
// allow default store generated for initialSate (would be provided by server)
// allows data to be added into store before store is created :)
const reduxCombine = (reducers, initialState) => {
  const reduxReducers = { ...reducers }
  const reducerNames = Object.keys(reducers)

  // if there is data pre-loaded into the store,
  // let's make a fake reducer so it does not yell,
  // we'll add the reducer later to support it using reduxRegister.register
  Object.keys(initialState).forEach((item) => {
    if (reducerNames.indexOf(item) === -1) {
      reduxReducers[item] = state => state
    }
  })

  return combineReducers(reduxReducers)
}

const composeEnhancers = isBrowser && isDev && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ // eslint-disable-line no-underscore-dangle
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ // eslint-disable-line no-underscore-dangle
  : compose

export default (storeData = {}, reducers = {}) => {
  const store = createStore(
    reduxCombine(reducers, storeData),
    storeData,
    composeEnhancers(applyMiddleware(thunkMiddleware)),
  )

  // replace redux store based on newely updated list of reducers
  reduxRegister.setChangeListener((updatedListOfReducers) => {
    store.replaceReducer(reduxCombine({
      ...reducers,
      ...updatedListOfReducers,
    }, storeData))
  })

  return store
}
