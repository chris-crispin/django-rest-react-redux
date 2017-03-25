import { logout } from '../auth'
import { browserHistory } from 'react-router'
import {BASE_URL, USER_MODEL} from './RouterHelper'

export default class AppHandlerHelper {

  static handleClick (id, lookup) {
    lookup(id)
    browserHistory.push(`/${BASE_URL}/${USER_MODEL}/entry/${id}`)
  }

  static clearSearch (e, search) {
    if (e) {
      e.preventDefault()
    }
    search('', 1)
    browserHistory.push(`/${BASE_URL}/${USER_MODEL}/search/1`)
  }

  static logoutHandler () {
    logout()
    browserHistory.replace(`/${BASE_URL}/login`)
  }

}
