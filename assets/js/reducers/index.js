/**
 * Created by crispinc on 23/12/2016.
 */
import { combineReducers } from 'redux'
import reducers from './reducers'

const App = combineReducers({
  ...reducers
})

export default App
