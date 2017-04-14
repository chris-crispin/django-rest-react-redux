import { browserHistory } from 'react-router'
import {BASE_URL} from './RouterHelper'

export default class ClientUrlBuilder {

  static addView (model) {
    browserHistory.push(`/${BASE_URL}/${model}/entry/add`)
  }

  static searchView (searchTerm, page, model) {
    if (searchTerm) {
      const decodedSearchTerm = searchTerm.replace(' ', '-')
      browserHistory.push(`/${BASE_URL}/${model}/search/${decodedSearchTerm}/${page}`)
    } else {
      browserHistory.push(`/${BASE_URL}/${model}/search/${page}`)
    }
  }

  static editView (id, model) {
    browserHistory.push(`/${BASE_URL}/${model}/entry/${id}`)
  }

  static loginView () {
    browserHistory.replace(`/${BASE_URL}/login`)
  }

}
