import React from 'react'
import ReactDOM from 'react-dom'
import { login } from '../../auth'
import ConnectedAboutModal from '../../containers/ConnectedAboutModal'
import Button from 'react-bootstrap/lib/Button'
import Form from 'react-bootstrap/lib/Form'
import FormGroup from 'react-bootstrap/lib/FormGroup'
import Col from 'react-bootstrap/lib/Col'
import FormControl from 'react-bootstrap/lib/FormControl'
import ControlLabel from 'react-bootstrap/lib/ControlLabel'
import Checkbox from 'react-bootstrap/lib/Checkbox'
import Jumbotron from 'react-bootstrap/lib/Jumbotron'
import Panel from 'react-bootstrap/lib/Panel'
import './styles.scss'
import ConnectedHeader from '../../containers/ConnectedHeader'
import { browserHistory } from 'react-router'

export class Login extends React.Component {

  constructor (props, context) {
    super(props, context)
    this.state = {
      failedLogin: false
    }
  }

  handleSubmit (e) {
    e.preventDefault()
    // needs react dom for ref -> needs refactoring to use store state and action
    // add remember me for session/local
    const username = ReactDOM.findDOMNode(this.refs.username).value
    const password = ReactDOM.findDOMNode(this.refs.password).value

    login(username, password)
      .then((loggedIn) => {
        if (loggedIn) {
          this.props.setUser(username)
          browserHistory.replace('/app/users/search/1')
        } else {
          this.setState({failedLogin: true})
        }
      })
  }

  render () {
    return (
      <div className='page'>
        <ConnectedHeader loggedIn={false} />
        <div className='page__page-container page__page-container--login'>
          <Jumbotron className='jumbotron'>
            <h1>django-rest-react-redux</h1>
            <p>A Django API management tool for model and non-model endpoints</p>
          </Jumbotron>
          <Panel header='Login' bsStyle='primary' className='login-panel'>
            <Form horizontal onSubmit={this.handleSubmit.bind(this)}>
              <FormGroup controlId='FormUsername'>
                <Col componentClass={ControlLabel} sm={2} smOffset={2}>
                  Username:
                </Col>
                <Col sm={3}>
                  <FormControl
                    type='text'
                    placeholder='Username'
                    ref='username'
                  />
                </Col>
              </FormGroup>

              <FormGroup controlId='FormPassword'>
                <Col componentClass={ControlLabel} sm={2} smOffset={2}>
                  Password:
                </Col>
                <Col sm={3}>
                  <FormControl
                    type='password'
                    placeholder='Password'
                    ref='password'
                  />
                </Col>
              </FormGroup>
              <FormGroup>
                <Col smOffset={4} sm={3}>
                  { this.state.failedLogin &&
                  <p className='failed-message'> Incorrect username or
                    password</p> }
                </Col>
              </FormGroup>
              <FormGroup>
                <Col smOffset={4} sm={3}>
                  <Checkbox>Remember me</Checkbox>
                </Col>
              </FormGroup>

              <FormGroup>
                <Col smOffset={4} sm={3}>
                  <Button type='submit'>
                    Sign in
                  </Button>
                </Col>
              </FormGroup>
            </Form>
          </Panel>
          <ConnectedAboutModal />
        </div>
      </div>
    )
  }
}

Login.propTypes = {
}

export default Login
