import {connect} from 'react-redux'
import * as actions from '../actions/actions'
import ModelTable from '../components/ModelTable/ModelTable'
import { MODELS } from '../helpers/ModelHelper'

function mapStateToProps (state, ownProps) {
  const ids = []
  const entries = []
  if (state.entries) {
    state.entries.forEach(entry => {
      const values = []
      Object.keys(MODELS[ownProps.params.model].table).forEach(field => {
        values.push(entry[field])
      })
      entries.push(values)
      ids.push(entry.id)
    })
  }
  return {
    ids: ids,
    entries: entries,
    displayLoader: state.displayLoader || false,
    pages: state.pages || 1,
    page: state.page || 1,
    headers: Object.values(MODELS[ownProps.params.model].table)

  }
}

const ConnectedModelTable = connect(mapStateToProps, actions)(ModelTable)

export default ConnectedModelTable
