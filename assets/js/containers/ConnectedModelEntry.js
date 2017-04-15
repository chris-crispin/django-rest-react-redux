import { connect } from 'react-redux'
import * as actions from '../actions/actions'
import ModelEntry from '../components/ModelEntry/ModelEntry'
import { MODELS } from '../helpers/ModelHelper'

function mapStateToProps (state, ownProps) {
  if (ownProps.params.id !== 'add') {
    if (state.entries !== undefined && state.entries.length === 1) {
      return {
        displayLoader: state.displayLoader === undefined ? true : state.displayLoader,
        entry: state.entries[0],
        id: parseInt(ownProps.params.id, 10)
      }
    } else {
      return {
        displayLoader: true,
        entry: MODELS[ownProps.params.model].default,
        id: parseInt(ownProps.params.id, 10)
      }
    }
  } else {
    const writeOnly = MODELS[ownProps.params.model].write_only
    const readWrite = MODELS[ownProps.params.model].default
    const entry = writeOnly ? {...readWrite, ...writeOnly} : readWrite
    return {
      displayLoader: false,
      entry: entry
    }
  }
}

const ConnectedModelEntry = connect(mapStateToProps, actions)(ModelEntry)

export default ConnectedModelEntry
