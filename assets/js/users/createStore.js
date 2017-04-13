import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

import reducers from './reducers/reducers'

const composeEnhancers =
  process.env.NODE_ENV !== 'production' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    name: 'MyApp', actionsBlacklist: []
  }) : compose

const enhancer = composeEnhancers(
  applyMiddleware(thunk)
)

export default (data = {}) => {
  return createStore(reducers, data, enhancer)
}
