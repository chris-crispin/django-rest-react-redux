import { connect } from 'react-redux'
import * as actions from '../actions/actions'
import ModelEntry from '../components/ModelEntry/ModelEntry'
import React from 'react'

function mapStateToProps (state, ownProps) {
  if (state.displayAddView || !state.entries) {
    return {
      displayLoader: false,
      displayAddView: state.displayAddView,
      firstName: '',
      lastName: '',
      user: '',
      email: '',
      isActive: true,
      isStaff: false,
      isSuper: false
    }
  } else {
    return {
      displayLoader: state.displayLoader === undefined ? true : state.displayLoader,
      entries: state.entries,
      displayAddView: state.displayAddView,
      firstName: state.entries[0].first_name,
      lastName: state.entries[0].last_name,
      user: state.entries[0].username,
      email: state.entries[0].email,
      isActive: state.entries[0].is_active,
      isStaff: state.entries[0].is_staff,
      isSuper: state.entries[0].is_superuser,
      id: state.entries[0].id
    }
  }
}

const ConnectedModelEntry = connect(mapStateToProps, actions)(ModelEntry)

ConnectedModelEntry.propTypes = {
  backFn: React.PropTypes.func.isRequired
}

export default ConnectedModelEntry
