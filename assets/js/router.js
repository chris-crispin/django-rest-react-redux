import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRedirect, browserHistory } from 'react-router'
import ConnectedApp from './containers/ConnectedApp'
import ConnectedLogin from './containers/ConnectedLogin'
import NotFound from './components/NotFound/NotFound'
import ConnectedModelTable from './containers/ConnectedModelTable'
import ConnectedModelEntry from './containers/ConnectedModelEntry'
import {BASE_URL, USER_MODEL} from './helpers/RouterHelper'
import { loggedIn } from './auth'
import { Provider } from 'react-redux'

import createStore from './createStore'

let store = createStore()

function requireAuth (nextState, replace) {
  if (!loggedIn()) {
    replace({
      pathname: '/app/login'
    })
  }
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path={BASE_URL}>
        <IndexRedirect to={USER_MODEL} />
        <Route path='login' component={ConnectedLogin} />
        <Route path={USER_MODEL} component={ConnectedApp} onEnter={requireAuth}>
          <IndexRedirect to='search/1' />
          <Route path='search/:page' components={{modelView: ConnectedModelTable}} />
          <Route path='search/:searchTerm/:page' components={{modelView: ConnectedModelTable}} />
          <Route path='entry/:id' components={{modelView: ConnectedModelEntry}} />
          <Route path='entry/add' components={{modelView: ConnectedModelEntry}} />
        </Route>
        <Route path='*' component={NotFound} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('container')
)
