import { logout } from '../auth'
import { browserHistory } from 'react-router'

export default class AppHandlerHelper {

  static handleClick (id, that = this) {
    that.props.lookup(id)
    browserHistory.push(`/users/entry/${id}`)
  }

  static clearSearch (e) {
    if (e) {
      e.preventDefault()
    }
    this.props.search('', 1)
    browserHistory.push(`/users/search/1`)
  }

  static logoutHandler () {
    logout()
    browserHistory.replace('/login')
  }

}
