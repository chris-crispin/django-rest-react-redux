import {connect} from 'react-redux'
import * as actions from '../actions/actions'
import AboutModal from '../components/AboutModal/AboutModal'

function mapStateToProps (state, props) {
  return { displayModal: state.displayModal }
}

const ConnectedAboutModal = connect(mapStateToProps, actions)(AboutModal)

export default ConnectedAboutModal
