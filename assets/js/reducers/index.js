import { combineReducers } from 'redux'
import reducers from './reducers'

const App = combineReducers({
  ...reducers
})

export default App
