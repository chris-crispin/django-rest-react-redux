import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, browserHistory } from 'react-router'
import ConnectedApp from './containers/ConnectedApp'
import ConnectedLogin from './containers/ConnectedLogin'
import NotFound from './components/NotFound/NotFound'
import { loggedIn } from './auth'
import { Provider } from 'react-redux'

import createStore from './createStore'

let store = createStore()

function requireAuth (nextState, replace) {
  if (!loggedIn()) {
    replace({
      pathname: '/app/login',
      state: {nextPathname: '/epl'}
    })
  }
}

// refactor to include root component and named inner components
// <Route path="/" component={App}>
//     <Route path="groups" components={{main: Groups, sidebar: GroupsSidebar}} />
//     <Route path="users" components={{main: Users, sidebar: UsersSidebar}}>
//       <Route path=":userId" component={Profile} />
//     </Route>
//   </Route>

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='login' component={ConnectedLogin} />
      <Route path='users' component={ConnectedApp} onEnter={requireAuth} >
        <Route path='search/:page' />
        <Route path='search/:page/' />
        <Route path='search/:searchTerm/:page' />
        <Route path='search/:searchTerm/:page/' />
        <Route path='entry/:id/' />
        <Route path='entry/:id' />
        <Route path='entry/add/' />
        <Route path='entry/add' />
      </Route>
      <Route path='*' component={NotFound} />
    </Router>
  </Provider>,
  document.getElementById('container')
)
