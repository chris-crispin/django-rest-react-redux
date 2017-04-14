import {connect} from 'react-redux'
import * as actions from '../actions/actions'
import ModelTable from '../components/ModelTable/ModelTable'

function mapStateToProps (state) {
  const ids = []
  const values = []
  if (state.entries) {
    state.entries.forEach(entry => {
      values.push(Object.values(entry).slice(1))
      ids.push(entry.id)
    })
  }
  return {
    ids: ids,
    entries: values,
    displayLoader: state.displayLoader || false,
    pages: state.pages || 1,
    page: state.page || 1
  }
}

const ConnectedModelTable = connect(mapStateToProps, actions)(ModelTable)

export default ConnectedModelTable
