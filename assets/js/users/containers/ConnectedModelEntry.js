import { connect } from 'react-redux'
import * as actions from '../actions/actions'
import ModelEntry from '../../common/components/ModelEntry/ModelEntry'

function mapStateToProps (state, ownProps) {
  if (ownProps.params.id !== 'add') {
    if (state.entries) {
      return {
        displayLoader: state.displayLoader === undefined ? true : state.displayLoader,
        entries: state.entries,
        firstName: state.entries[0].first_name,
        lastName: state.entries[0].last_name,
        user: state.entries[0].username,
        email: state.entries[0].email,
        isActive: state.entries[0].is_active,
        isStaff: state.entries[0].is_staff,
        isSuper: state.entries[0].is_superuser,
        id: parseInt(ownProps.params.id, 10)
      }
    } else {
      return {
        displayLoader: true,
        firstName: '',
        lastName: '',
        user: '',
        email: '',
        isActive: true,
        isStaff: false,
        isSuper: false,
        id: parseInt(ownProps.params.id, 10)
      }
    }
  } else {
    return {
      displayLoader: false,
      firstName: '',
      lastName: '',
      user: '',
      email: '',
      isActive: true,
      isStaff: false,
      isSuper: false
    }
  }
}

const ConnectedModelEntry = connect(mapStateToProps, actions)(ModelEntry)

export default ConnectedModelEntry
