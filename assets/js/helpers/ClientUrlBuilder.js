import { browserHistory } from 'react-router'
import {BASE_URL, USER_MODEL} from './RouterHelper'

export default class ClientUrlBuilder {

  static addUserView () {
    browserHistory.push(`/${BASE_URL}/${USER_MODEL}/entry/add`)
  }

}
