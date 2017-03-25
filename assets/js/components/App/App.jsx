import React from 'react'
import ConnectedHeader from '../../containers/ConnectedHeader'
import './styles.scss'
import AppHandlerHelper from '../../helpers/AppHandlerHelper'
import ClientUrlBuilder from '../../helpers/ClientUrlBuilder'
import ToolBar from '../Toolbar/Toolbar'
import ConnectedAboutModal from '../../containers/ConnectedAboutModal'
import ConnectedInfoModal from '../../containers/ConnectedInfoModal'

export class App extends React.Component {

  constructor (props, context) {
    super(props, context)
    this.state = {
      entries: [],
      pages: 0,
      searchTerm: this.props.params.searchTerm ? this.props.params.searchTerm.replace('-', ' ') : '',
      page: parseInt(this.props.params.page, 10)
    }
  }

  _onSubmit (e) {
    e.preventDefault()
    const searchTerm = this.state.searchTerm
    this.props.search(searchTerm, 1).then(() => {
      ClientUrlBuilder.searchUserView(searchTerm, 1)
    })
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.params.searchTerm !== nextProps.params.searchTerm) {
      this.setState({searchTerm: nextProps.params.searchTerm ? nextProps.params.searchTerm.replace('-', ' ') : ''})
      this.props.search(nextProps.params.searchTerm, parseInt(this.props.params.page, 10))
    }
    if (this.props.params.page !== nextProps.params.page) {
      this.setState({page: parseInt(nextProps.params.page, 10)})
      this.props.search(this.props.params.searchTerm, parseInt(nextProps.params.page, 10))
    }
  }

  componentDidMount () {
    if (this.props.params.id && this.props.params.id !== 'add') {
      AppHandlerHelper.handleClick(this.props.params.id, this.props.lookup)
    }
    if (this.state.searchTerm || this.props.params.page) {
      this.props.search(this.state.searchTerm, parseInt(this.props.params.page, 10))
    }
  }

  render () {
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
            clearSearch={AppHandlerHelper.clearSearch.bind(null, null, this.props.search)}
            searchTerm={this.state.searchTerm}
            goToAddView={ClientUrlBuilder.addUserView} />

          {this.props.modelView}
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
