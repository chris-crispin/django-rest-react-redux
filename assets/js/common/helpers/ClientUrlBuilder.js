import { browserHistory } from 'react-router'
import {BASE_URL} from './RouterHelper'

export default class ClientUrlBuilder {

  static loginView () {
    browserHistory.replace(`/${BASE_URL}/login`)
  }

}
