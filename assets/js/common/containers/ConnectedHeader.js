import {connect} from 'react-redux'
import * as actions from '../actions/actions'
import Header from '../components/Header/Header'

function mapStateToProps (state, ownProps) {
  return {
    username: state.username
  }
}

const ConnectedHeader = connect(mapStateToProps, actions)(Header)

export default ConnectedHeader
