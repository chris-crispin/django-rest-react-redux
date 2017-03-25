import { logout } from '../auth'
import { browserHistory } from 'react-router'

export default class AppHandlerHelper {

  static handleClick (id, lookup) {
    lookup(id)
    browserHistory.push(`/app/users/entry/${id}`)
  }

  static clearSearch (e, search) {
    if (e) {
      e.preventDefault()
    }
    search('', 1)
    browserHistory.push(`/app/users/search/1`)
  }

  static logoutHandler () {
    logout()
    browserHistory.replace('/app/login')
  }

}
