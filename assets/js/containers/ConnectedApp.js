import {connect} from 'react-redux'
import * as actions from '../actions/actions'
import App from '../components/App/App'

function mapStateToProps (state, ownProps) {
  return {
    username: state.username,
    entries: state.entries,
    displayLoader: state.displayLoader === undefined ? true : state.displayLoader,
    displayModal: state.displayModal,
    displayInfoModal: state.displayInfoModal,
    pages: state.pages,
    page: state.page
  }
}

const ConnectedApp = connect(mapStateToProps, actions)(App)

export default ConnectedApp
