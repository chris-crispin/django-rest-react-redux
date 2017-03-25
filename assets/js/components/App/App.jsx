/**
 * Created by crispinc on 22/12/2016.
 */
import React from 'react'
import Pagination from 'react-bootstrap/lib/Pagination'
import ConnectedHeader from '../../containers/ConnectedHeader'
import ConnectedModelEntry from '../../containers/ConnectedModelEntry'
import ModelTable from '../ModelTable/ModelTable'
import './styles.scss'
import AppHandlerHelper from '../../helpers/AppHandlerHelper'
import ToolBar from '../Toolbar/Toolbar'
import ConnectedAboutModal from '../../containers/ConnectedAboutModal'
import ConnectedInfoModal from '../../containers/ConnectedInfoModal'

export class App extends React.Component {

  constructor (props, context) {
    super(props, context)
    // use initial state instead
    this.state = {
      entries: [],
      pages: 0,
      searchTerm: this.props.params.searchTerm ? this.props.params.searchTerm.replace('-', ' ') : '',
      page: parseInt(this.props.params.page, 10)
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.params.id !== this.props.params.id) {
      if (nextProps.params.id && nextProps.id !== 'add') {
        AppHandlerHelper.handleClick(nextProps.params.id, this)
      } else if (nextProps.params.id === 'add') {
        nextProps.goToAddView()
      } else {
        this._onLoad()
      }
    }
  }

  _onLoad () {
    const searchTerm = this.props.params.searchTerm || this.state.searchTerm
    this.props.search(searchTerm, parseInt(this.props.params.page))
  }

  _onSubmit (e) {
    e.preventDefault()
    const searchTerm = this.state.searchTerm
    this.props.search(searchTerm, 1)
  }

  componentDidMount () {
    if (this.props.params.id && this.props.id !== 'add') {
      AppHandlerHelper.handleClick(this.props.params.id, this)
    } else if (this.props.id === 'add') {
      this.props.goToAddView()
    } else {
      this._onLoad()
    }
  }

  _handleSelect (e) {
    this.props.search(this.props.searchTerm, e)
  }
  render () {
    const ids = []
    const values = []
    if (this.props.entries) {
      this.props.entries.forEach(entry => {
        values.push([entry.first_name + ' ' + entry.last_name,
          entry.username,
          entry.email,
          entry.is_active,
          entry.is_staff,
          entry.is_superuser])
        ids.push(entry.id)
      })
    }
    return (
      <div className='page'>
        <ConnectedHeader
          model={'Users'}
          username={this.props.username}
          loggedIn
          logout={AppHandlerHelper.logoutHandler} />
        <div className='page__page-container'>
          <ToolBar
            onChange={(e) => this.setState({searchTerm: e.target.value})}
            onSubmit={this._onSubmit.bind(this)}
            clearSearch={AppHandlerHelper.clearSearch.bind(this)}
            searchTerm={this.props.params.searchTerm}
            goToAddView={this.props.goToAddView} />
          { this.props.displayAddView
            ? <ConnectedModelEntry
              backFn={AppHandlerHelper.clearSearch.bind(this)}
            />
            : this.props.displayEditView
              ? <ConnectedModelEntry
                backFn={AppHandlerHelper.clearSearch.bind(this)}
              />
              : <ModelTable
                headers={['Name', 'User', 'Email', 'Active', 'Staff',
                  'Superuser']}
                ids={ids}
                entries={values}
                onRowClick={AppHandlerHelper.handleClick.bind(this)}
                displayLoader={this.props.displayLoader}
              />
          }
          {
            !this.props.displayAddView && !this.props.displayEditView &&
            <div className='pagination-container'>
              <Pagination
                prev
                next
                first
                last
                ellipsis
                boundaryLinks
                items={this.props.pages}
                maxButtons={5}
                activePage={this.props.page}
                onSelect={this._handleSelect.bind(this)}
              />
            </div>
          }
          <ConnectedAboutModal />
          <ConnectedInfoModal />

        </div>
      </div>
    )
  }
}

App.propTypes = {
}

export default App
