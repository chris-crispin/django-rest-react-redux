import {connect} from 'react-redux'
import * as actions from '../actions/actions'
import Login from '../components/Login/Login'

function mapStateToProps (state) {
  return { displayModal: state.displayModal }
}

const ConnectedLogin = connect(mapStateToProps, actions)(Login)

export default ConnectedLogin
