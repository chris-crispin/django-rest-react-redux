import { browserHistory } from 'react-router'
import {BASE_URL, USER_MODEL} from './RouterHelper'

export default class ClientUrlBuilder {

  static addUserView () {
    browserHistory.push(`/${BASE_URL}/${USER_MODEL}/entry/add`)
  }

  static searchUserView (searchTerm, page) {
    if (searchTerm) {
      const decodedSearchTerm = searchTerm.replace(' ', '-')
      browserHistory.push(`/${BASE_URL}/${USER_MODEL}/search/${decodedSearchTerm}/${page}`)
    } else {
      browserHistory.push(`/${BASE_URL}/${USER_MODEL}/search/${page}`)
    }
  }

  static editUserView (id) {
    browserHistory.push(`/${BASE_URL}/${USER_MODEL}/entry/${id}`)
  }

  static loginView () {
    browserHistory.replace(`/${BASE_URL}/login`)
  }

}
