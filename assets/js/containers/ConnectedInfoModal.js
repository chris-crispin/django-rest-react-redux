import {connect} from 'react-redux'
import * as actions from '../actions/actions'
import InfoModal from '../components/InfoModal/InfoModal'

function mapStateToProps (state, props) {
  return {
    displayInfoModal: state.displayInfoModal,
    infoMsg: state.infoMsg
  }
}

const ConnectedInfoModal = connect(mapStateToProps, actions)(InfoModal)

export default ConnectedInfoModal
