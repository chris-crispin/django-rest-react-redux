import { connect } from 'react-redux'
import * as actions from '../actions/actions'
import ModelEntry from '../components/ModelEntry/ModelEntry'
import { MODELS } from '../helpers/ModelHelper'

function mapStateToProps (state, ownProps) {
  const model = MODELS[ownProps.params.model]
  if (ownProps.params.id !== 'add') {
    if (state.entries !== undefined && state.entries.length === 1) {
      return {
        displayLoader: state.displayLoader === undefined ? true : state.displayLoader,
        entry: state.entries[0],
        id: parseInt(ownProps.params.id, 10),
        foreignField: model.foreignKey ? model.foreignKey.field : null,
        foreignKey: model.foreignKey ? model.foreignKey.model : null,
        foreignKeyField: model.foreignKey ? model.foreignKey.foreignField : null,
        foreignKeys: state.foreignKeys
      }
    } else {
      return {
        displayLoader: true,
        entry: model.default,
        id: parseInt(ownProps.params.id, 10),
        foreignField: model.foreignKey ? model.foreignKey.field : null,
        foreignKey: model.foreignKey ? model.foreignKey.model : null,
        foreignKeyField: model.foreignKey ? model.foreignKey.foreignField : null,
        foreignKeys: state.foreignKeys
      }
    }
  } else {
    const writeOnly = model.write_only
    const readWrite = model.default
    const entry = writeOnly ? {...readWrite, ...writeOnly} : readWrite
    return {
      displayLoader: false,
      entry: entry
    }
  }
}

const ConnectedModelEntry = connect(mapStateToProps, actions)(ModelEntry)

export default ConnectedModelEntry
