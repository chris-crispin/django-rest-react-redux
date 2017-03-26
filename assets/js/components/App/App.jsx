import React from 'react'
import ConnectedHeader from '../../containers/ConnectedHeader'
import ClientUrlBuilder from '../../helpers/ClientUrlBuilder'
import ToolBar from '../Toolbar/Toolbar'
import ConnectedAboutModal from '../../containers/ConnectedAboutModal'
import ConnectedInfoModal from '../../containers/ConnectedInfoModal'
import { logout } from '../../auth'
import './styles.scss'

export class App extends React.Component {

  constructor (props, context) {
    super(props, context)
    this.state = {
      searchTerm: this.props.params.searchTerm
        ? this.props.params.searchTerm.replace('-', ' ') : ''
    }
  }

  _logout () {
    logout()
    ClientUrlBuilder.loginView()
  }

  _onSubmit (e) {
    e.preventDefault()
    ClientUrlBuilder.searchUserView(this.state.searchTerm, 1)
  }

  componentWillUpdate (nextProps) {
    if (this.props.params.searchTerm !== nextProps.params.searchTerm) {
      this.setState({searchTerm: nextProps.params.searchTerm
        ? nextProps.params.searchTerm.replace('-', ' ') : ''})
    }
  }

  render () {
    return (
      <div className='page'>
        <ConnectedHeader
          model={'Users'}
          username={this.props.username}
          loggedIn
          logout={this._logout} />
        <div className='page__page-container'>
          <ToolBar
            onChange={(e) => this.setState({searchTerm: e.target.value})}
            onSubmit={this._onSubmit.bind(this)}
            clearSearch={ClientUrlBuilder.searchUserView.bind(null, '', 1)}
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
